"""
Generate All Regional & English Audio Files (MP3)
==================================================
Uses gTTS (Google Text-to-Speech) to pre-render authentic regional audio
for all 6 languages: en (English), kn (Kannada), hi (Hindi), te (Telugu),
ta (Tamil), ml (Malayalam).

Saves to: citizen-services-portal/public/audio/<id>_<lang>.mp3
Produces: citizen-services-portal/src/data/audioManifest.json
"""

import os
import json
import time
import hashlib
from concurrent.futures import ThreadPoolExecutor, as_completed
from gtts import gTTS

OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'citizen-services-portal', 'public', 'audio'))
MANIFEST_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'citizen-services-portal', 'src', 'data', 'audioManifest.json'))

os.makedirs(OUTPUT_DIR, exist_ok=True)

LANGUAGES = ['en', 'kn', 'hi', 'te', 'ta', 'ml']

# 1. Welcome Sample Phrases
WELCOME_PHRASES = {
    'en': 'Welcome to Citizen Services Portal. Get simple guidance for government services in English.',
    'kn': 'ನಾಗರಿಕ ಸೇವೆಗಳ ಪೋರ್ಟಲ್‌ಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ಸರ್ಕಾರಿ ಸೇವೆಗಳಿಗೆ ಸರಳ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',
    'hi': 'नागरिक सेवा पोर्टल में आपका स्वागत है। अपनी पसंदीदा भाषा में सरकारी सेवाओं के लिए सरल मार्गदर्शन प्राप्त करें।',
    'te': 'పౌర సేవల పోర్టల్‌కు స్వాగతం. మీ ప్రాధాన్యత గల భాషలో ప్రభుత్వ సేవలకు సరళమైన మార్గదర్శకత్వం పొందండి.',
    'ta': 'குடிமக்கள் சேவை தளத்திற்கு வரவேற்கிறோம். உங்கள் விருப்பமான மொழியில் அரசு சேவைகளுக்கான எளிய வழிகாட்டுதலைப் பெறுங்கள்.',
    'ml': 'പൗര സേവന പോർട്ടലിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷയിൽ സർക്കാർ സേവനങ്ങൾക്കായി ലളിതമായ മാർഗ്ഗനിർദ്ദേശം നേടുക.'
}

# 2. Home Sample Guidance
HOME_SAMPLE_PHRASES = {
    'en': 'We believe reading difficulties or visual strain should never prevent you from receiving your government entitlements. Every service on this portal includes human-paced audio narration in 6 regional languages.',
    'kn': 'ಓದುವ ತೊಂದರೆ ಅಥವಾ ದೃಷ್ಟಿ ದೋಷವು ನಿಮಗೆ ನಿಮ್ಮ ಸರ್ಕಾರಿ ಸವಲತ್ತುಗಳನ್ನು ಪಡೆಯಲು ಎಂದಿಗೂ ಅಡ್ಡಿಯಾಗಬಾರದು ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ. ಈ ಪೋರ್ಟಲ್‌ನಲ್ಲಿರುವ ಪ್ರತಿಯೊಂದು ಸೇವೆಯು 6 ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳಲ್ಲಿ ಧ್ವನಿ ವಿವರಣೆಯನ್ನು ಒಳಗೊಂಡಿದೆ.',
    'hi': 'हम मानते हैं कि पढ़ने में कठिनाई या दृष्टि दोष आपको आपके सरकारी अधिकारों को प्राप्त करने से कभी नहीं रोकना चाहिए। इस पोर्टल की प्रत्येक सेवा में 6 क्षेत्रीय भाषाओं में ऑडियो विवरण शामिल है।',
    'te': 'చదవడంలో ఇబ్బంది లేదా దృష్టి లోపం మీకు మీ ప్రభుత్వ హక్కులను పొందడంలో ఎప్పుడూ అడ్డంకి కాకూడదని మేము నమ్ముతున్నాము. ఈ పోర్టల్‌లోని ప్రతి సేవ 6 ప్రాంతీయ భాషలలో ఆడియో వివరణను కలిగి ఉంది.',
    'ta': 'படிப்பதில் உள்ள சிரமம் அல்லது பார்வை குறைபாடு உங்களுக்கு உங்கள் அரசு உரிமைகளைப் பெறுவதற்கு ஒருபோதும் தடையாக இருக்கக்கூடாது என்று நாங்கள் நம்புகிறோம். இந்த தளத்தில் உள்ள ஒவ்வொரு சேவையும் 6 பிராந்திய மொழிகளில் ஆடியோ விளக்கத்தைக் கொண்டுள்ளது.',
    'ml': 'വായിക്കാനുള്ള ബുദ്ധിമുട്ടോ കാഴ്ചക്കുറവോ നിങ്ങൾക്ക് നിങ്ങളുടെ സർക്കാർ അവകാശങ്ങൾ നേടുന്നതിന് ഒരിക്കലും തടസ്സമാകരുതെന്ന് ഞങ്ങൾ വിശ്വസിക്കുന്നു. ഈ പോർട്ടലിലെ ഓരോ സേവനത്തിലും 6 പ്രാദേശിക ഭാഷകളിൽ ഓഡിയോ വിവരണം ഉൾപ്പെടുത്തിയിട്ടുണ്ട്.'
}

# 3. Glossary Overview
GLOSSARY_OVERVIEW_PHRASES = {
    'en': 'Plain Language Government Dictionary. Understand complex bureaucratic and legal words with simple translations and practical examples in all six regional languages.',
    'kn': 'ಸರಳ ಭಾಷೆಯ ಸರ್ಕಾರಿ ಶಬ್ದಕೋಶ. ಎಲ್ಲಾ ಆರು ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳಲ್ಲಿ ಸರಳ ಅನುವಾದಗಳು ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಉದಾಹರಣೆಗಳೊಂದಿಗೆ ಸಂಕೀರ್ಣ ಕಾನೂನು ಪದಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
    'hi': 'सरल भाषा सरकारी शब्दकोश। सभी छह क्षेत्रीय भाषाओं में सरल अनुवादों और व्यावहारिक उदाहरणों के साथ जटिल कानूनी शब्दों को समझें।',
    'te': 'సరళమైన భాషా ప్రభుత్వ నిఘంటువు. అన్ని ఆరు ప్రాంతీయ భాషలలో సరళమైన అనువాదాలు మరియు ఆచరణాత్మక ఉదాహరణలతో సంక్లిష్టమైన చట్టపరమైన పదాలను అర్థం చేసుకోండి.',
    'ta': 'எளிய மொழி அரசு அகராதி. அனைத்து ஆறு பிராந்திய மொழிகளிலும் எளிய மொழிபெயர்ப்புகள் மற்றும் நடைமுறை உதாரணங்களுடன் கடினமான சட்ட வார்த்தைகளைப் புரிந்து கொள்ளுங்கள்.',
    'ml': 'ലളിതമായ ഭാഷാ സർക്കാർ നിഘണ്ടു. എല്ലാ ആറ് പ്രാദേശിക ഭാഷകളിലും ലളിതമായ വിവർത്തനങ്ങളും പ്രായോഗിക ഉദാഹരണങ്ങളും ഉപയോഗിച്ച് സങ്കീർണ്ണമായ നിയമപരമായ വാക്കുകൾ മനസ്സിലാക്കുക.'
}

# 4. Assistant 6 Steps Overview Phrases
ASSISTANT_STEPS_PHRASES = {
    1: {
        'en': 'Step 1: Choose the government service you need guidance with from the options below.',
        'kn': 'ಹಂತ 1: ಕೆಳಗಿನ ಆಯ್ಕೆಗಳಿಂದ ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ಬೇಕಾದ ಸರ್ಕಾರಿ ಸೇವೆಯನ್ನು ಆರಿಸಿ.',
        'hi': 'चरण 1: नीचे दिए गए विकल्पों में से उस सरकारी सेवा का चयन करें जिसके लिए आपको मार्गदर्शन चाहिए।',
        'te': 'దశ 1: క్రింది ఎంపికల నుండి మీకు మార్గదర్శకత్వం అవసరమైన ప్రభుత్వ సేవను ఎంచుకోండి.',
        'ta': 'படி 1: கீழே உள்ள விருப்பங்களிலிருந்து உங்களுக்கு வழிகாட்டுதல் தேவைப்படும் அரசு சேவையைத் தேர்ந்தெடுக்கவும்.',
        'ml': 'ഘട്ടം 1: താഴെ നൽകിയിരിക്കുന്ന ഓപ്ഷനുകളിൽ നിന്ന് നിങ്ങൾക്ക് മാർഗ്ഗനിർദ്ദേശം ആവശ്യമായ സർക്കാർ സേവനം തിരഞ്ഞെടുക്കുക.'
    },
    2: {
        'en': 'Step 2: Understand the service requirements, official fee, and citizen entitlements before applying.',
        'kn': 'ಹಂತ 2: ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮುನ್ನ ಸೇವಾ ಅಗತ್ಯತೆಗಳು, ಅಧಿಕೃತ ಶುಲ್ಕ ಮತ್ತು ನಾಗರಿಕ ಸವಲತ್ತುಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
        'hi': 'चरण 2: आवेदन करने से पहले सेवा की आवश्यकताओं, आधिकारिक शुल्क और नागरिक अधिकारों को समझें।',
        'te': 'దశ 2: దరఖాస్తు చేయడానికి ముందు సేవా అవసరాలు, అధికారిక రుసుము మరియు పౌర హక్కులను అర్థం చేసుకోండి.',
        'ta': 'படி 2: விண்ணப்பிக்கும் முன் சேவையின் தேவைகள், அதிகாரப்பூர்வ கட்டணம் மற்றும் குடிமக்கள் உரிமைகளைப் புரிந்து கொள்ளுங்கள்.',
        'ml': 'ഘട്ടം 2: അപേക്ഷിക്കുന്നതിന് മുമ്പ് സേവന ആവശ്യകതകൾ, ഔദ്യോഗിക ഫീസ്, പൗരാവകാശങ്ങൾ എന്നിവ മനസ്സിലാക്കുക.'
    },
    3: {
        'en': 'Step 3: Check your eligibility criteria. Review age, income, and residency requirements.',
        'kn': 'ಹಂತ 3: ನಿಮ್ಮ ಅರ್ಹತಾ ಮಾನದಂಡಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ವಯಸ್ಸು, ಆದಾಯ ಮತ್ತು ನಿವಾಸದ ಅಗತ್ಯತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
        'hi': 'चरण 3: अपनी पात्रता मानदंडों की जाँच करें। आयु, आय और निवास की आवश्यकताओं की समीक्षा करें।',
        'te': 'దశ 3: మీ అర్హత ప్రమాణాలను తనిఖీ చేయండి. వయస్సు, ఆదాయం మరియు నివాస అవసరాలను సమీక్షించండి.',
        'ta': 'படி 3: உங்கள் தகுதி அளவுகோல்களைச் சரிபார்க்கவும். வயது, வருமானம் மற்றும் இருப்பிடத் தேவைகளை மதிப்பாய்வு செய்யவும்.',
        'ml': 'ഘട്ടം 3: നിങ്ങളുടെ യോഗ്യതാ മാനദണ്ഡങ്ങൾ പരിശോധിക്കുക. പ്രായം, വരുമാനം, താമസ ആവശ്യകതകൾ എന്നിവ അവലോകനം ചെയ്യുക.'
    },
    4: {
        'en': 'Step 4: Prepare your documents checklist. Keep necessary photocopies ready in hand before visiting.',
        'kn': 'ಹಂತ 4: ನಿಮ್ಮ ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಿ. ಭೇಟಿ ನೀಡುವ ಮುನ್ನ ಅಗತ್ಯ ಛಾಯಾಪ್ರತಿಗಳನ್ನು ಕೈಯಲ್ಲಿ ಇಟ್ಟುಕೊಳ್ಳಿ.',
        'hi': 'चरण 4: अपने दस्तावेजों की चेकलिस्ट तैयार करें। जाने से पहले आवश्यक फोटोकॉपी अपने पास तैयार रखें।',
        'te': 'దశ 4: మీ పత్రాల చెక్‌లిస్ట్‌ను సిద్ధం చేయండి. సందర్శించడానికి ముందు అవసరమైన ఫోటోకాపీలను సిద్ధంగా ఉంచుకోండి.',
        'ta': 'படி 4: உங்கள் ஆவணங்களின் சரிபார்ப்புப் பட்டியலைத் தயாரிக்கவும். அலுவலகம் செல்வதற்கு முன் தேவையான நகல்களை கையில் தயாராக வைத்திருங்கள்.',
        'ml': 'ഘട്ടം 4: നിങ്ങളുടെ രേഖകളുടെ ചെക്ക്‌ലിസ്റ്റ് തയ്യാറാക്കുക. സന്ദർശിക്കുന്നതിന് മുമ്പ് ആവശ്യമായ ഫോട്ടോകോപ്പികൾ കയ്യിൽ തയ്യാറാക്കി വെക്കുക.'
    },
    5: {
        'en': 'Step 5: Follow official application instructions. Submit photocopies and receive your acknowledgment receipt.',
        'kn': 'ಹಂತ 5: ಅಧಿಕೃತ ಅರ್ಜಿ ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ. ದಾಖಲೆಗಳನ್ನು ಸಲ್ಲಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಸ್ವೀಕೃತಿ ರಸೀದಿಯನ್ನು ಪಡೆದುಕೊಳ್ಳಿ.',
        'hi': 'चरण 5: आधिकारिक आवेदन निर्देशों का पालन करें। दस्तावेज जमा करें और अपनी पावती रसीद प्राप्त करें।',
        'te': 'దశ 5: అధికారిక దరఖాస్తు సూచనలను పాటించండి. పత్రాలను సమర్పించి, మీ రసీదును పొందండి.',
        'ta': 'படி 5: அதிகாரப்பூர்வ விண்ணப்ப வழிமுறைகளைப் பின்பற்றவும். ஆவணங்களைச் சமர்ப்பித்து உங்கள் ஒப்புகைச் சீட்டைப் பெறுங்கள்.',
        'ml': 'ഘട്ടം 5: ഔദ്യോഗിക അപേക്ഷാ നിർദ്ദേശങ്ങൾ പാലിക്കുക. രേഖകൾ സമർപ്പിച്ച് നിങ്ങളുടെ രസീത് കൈപ്പറ്റുക.'
    },
    6: {
        'en': 'Step 6: Open the verified official government portal safely. Check domain credentials before submitting.',
        'kn': 'ಹಂತ 6: ಪರಿಶೀಲಿಸಿದ ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಅನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ತೆರೆಯಿರಿ. ಸಲ್ಲಿಸುವ ಮುನ್ನ ವೆಬ್‌ಸೈಟ್ ವಿಳಾಸವನ್ನು ಪರಿಶೀಲಿಸಿ.',
        'hi': 'चरण 6: सत्यापित आधिकारिक सरकारी पोर्टल को सुरक्षित रूप से खोलें। जमा करने से पहले वेबसाइट पते की पुष्टि करें।',
        'te': 'దశ 6: ధ్రువీకరించబడిన అధికారిక ప్రభుత్వ పోర్టల్‌ను సురక్షితంగా తెరవండి. సమర్పించే ముందు డొమైన్‌ను ధ్రువీకరించండి.',
        'ta': 'படி 6: சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ அரசு தளத்தைப் பாதுகாப்பாகத் திறக்கவும். சமர்ப்பிக்கும் முன் இணைய முகவரியைச் சரிபார்க்கவும்.',
        'ml': 'ഘട്ടം 6: പരിശോധിച്ചുറപ്പിച്ച ഔദ്യോഗിക സർക്കാർ പോർട്ടൽ സുരക്ഷിതമായി തുറക്കുക. സമർപ്പിക്കുന്നതിന് മുമ്പ് ഡൊമെയ്ൻ പരിശോധിക്കുക.'
    }
}

def generate_tts_file(task):
    audio_id, lang, text = task
    filename = f"{audio_id}_{lang}.mp3"
    filepath = os.path.join(OUTPUT_DIR, filename)
    rel_url = f"/audio/{filename}"

    # If file already exists and is not empty, skip
    if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
        return audio_id, lang, rel_url, True

    max_retries = 5
    for attempt in range(max_retries):
        try:
            time.sleep(0.4 * attempt) # Exponential backoff
            tts = gTTS(text=text, lang=lang)
            tts.save(filepath)
            return audio_id, lang, rel_url, False
        except Exception as e:
            if attempt == max_retries - 1:
                print(f"Failed to generate {filename}: {e}")
                return audio_id, lang, None, False
            time.sleep(2)

def main():
    print("=" * 70)
    print("PRE-GENERATING REGIONAL AUDIO MP3 ASSETS (6 LANGUAGES)")
    print("=" * 70)

    tasks = []

    # 1. Welcome Samples
    for lang, phrase in WELCOME_PHRASES.items():
        tasks.append((f"welcome-sample-{lang}", lang, phrase))

    # 2. Home Samples
    for lang, phrase in HOME_SAMPLE_PHRASES.items():
        tasks.append(("home-sample-guidance", lang, phrase))

    # 3. Glossary Overview
    for lang, phrase in GLOSSARY_OVERVIEW_PHRASES.items():
        tasks.append(("glossary-overview-audio", lang, phrase))

    # 4. Assistant Steps (1-6)
    for step_num, lang_dict in ASSISTANT_STEPS_PHRASES.items():
        for lang, phrase in lang_dict.items():
            tasks.append((f"assistant-step-{step_num}", lang, phrase))

    # 5. Service Translations from normalized_seed_data.json
    seed_data_path = os.path.join(os.path.dirname(__file__), 'normalized_seed_data.json')
    with open(seed_data_path, 'r', encoding='utf-8') as f:
        seed_data = json.load(f)

    for trans in seed_data.get('translations', []):
        sid = trans['service_id']
        lang = trans['language_code']
        title = trans['title']
        summary = trans['spoken_summary']
        desc = trans['short_description']

        spoken_card = f"{title}. {desc}"
        spoken_detail = f"{title}. {summary}"

        tasks.append((f"service-card-{sid}", lang, spoken_card))
        tasks.append((f"service-summary-{sid}", lang, spoken_detail))
        tasks.append((f"service-desc-{sid}", lang, f"{title}. {desc}"))

    # Documents summary for each service
    docs_by_service_lang = {}
    for d in seed_data.get('documents', []):
        key = (d['service_id'], d['language_code'])
        docs_by_service_lang.setdefault(key, []).append(d['document_name'])

    for (sid, lang), doc_names in docs_by_service_lang.items():
        doc_text = f"Required documents for {sid.replace('-', ' ')}: {', '.join(doc_names[:5])}."
        tasks.append((f"docs-all-{sid}", lang, doc_text))

    # Eligibility summary for each service
    elig_by_service_lang = {}
    for e in seed_data.get('eligibility', []):
        key = (e['service_id'], e['language_code'])
        elig_by_service_lang.setdefault(key, []).append(e['question_text'])

    for (sid, lang), questions in elig_by_service_lang.items():
        elig_text = f"Eligibility requirements for {sid.replace('-', ' ')}: {'. '.join(questions[:4])}."
        tasks.append((f"eligibility-all-{sid}", lang, elig_text))

    # Guidance steps summary for each service
    steps_by_service_lang = {}
    for s in seed_data.get('steps', []):
        key = (s['service_id'], s['language_code'])
        steps_by_service_lang.setdefault(key, []).append(f"Step {s['step_number']}: {s['step_title']}. {s['instruction_text']}")

    for (sid, lang), step_texts in steps_by_service_lang.items():
        guidance_text = f"Application steps for {sid.replace('-', ' ')}: {' '.join(step_texts[:4])}"
        tasks.append((f"guidance-all-{sid}", lang, guidance_text))

    # 6. Plain-language Terminology from i18n locales
    locales_dir = os.path.join(os.path.dirname(__file__), '..', 'citizen-services-portal', 'src', 'i18n', 'locales')
    for lang in LANGUAGES:
        lpath = os.path.join(locales_dir, f"{lang}.json")
        if os.path.exists(lpath):
            with open(lpath, 'r', encoding='utf-8') as lf:
                ldata = json.load(lf)
                terms = ldata.get('terminology', {}).get('terms', {})
                for term_id, term_info in terms.items():
                    official = term_info.get('official', '')
                    simplified = term_info.get('simplified', '')
                    example = term_info.get('example', '')
                    text = f"{official}. Simple meaning: {simplified}. Example: {example}."
                    tasks.append((f"plain-lang-{term_id}", lang, text))

    print(f"Total audio generation tasks: {len(tasks)}")

    # Execute in parallel with 6 workers
    manifest = {}
    completed_count = 0
    cached_count = 0

    with ThreadPoolExecutor(max_workers=2) as executor:
        futures = {executor.submit(generate_tts_file, task): task for task in tasks}
        for future in as_completed(futures):
            audio_id, lang, rel_url, is_cached = future.result()
            if rel_url:
                manifest.setdefault(audio_id, {})[lang] = rel_url
            if is_cached:
                cached_count += 1
            else:
                completed_count += 1

            total_done = cached_count + completed_count
            if total_done % 25 == 0 or total_done == len(tasks):
                print(f"Progress: {total_done}/{len(tasks)} (New: {completed_count}, Cached: {cached_count})")

    # Save manifest
    with open(MANIFEST_PATH, 'w', encoding='utf-8') as mf:
        json.dump(manifest, mf, indent=2, ensure_ascii=False)

    print(f"\nSUCCESS! Audio manifest written to {MANIFEST_PATH}")
    print(f"Audio files stored in: {OUTPUT_DIR}")
    print(f"Unique audio IDs registered: {len(manifest)}")

if __name__ == '__main__':
    main()
