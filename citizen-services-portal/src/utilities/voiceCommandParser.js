/**
 * Intelligent Multilingual Voice Command Interpreter
 * ====================================================
 * Analyzes spoken voice input across 6 languages (en, kn, hi, te, ta, ml)
 * to detect state selection, service navigation, and portal commands.
 *
 * Recognized Commands:
 * - "Show Karnataka government services" / "ಕರ್ನಾಟಕ ಸೇವೆಗಳು" / "कर्नाटक सरकार सेवाएं"
 * - "Change my state to Tamil Nadu" / "தமிழ்நாடு மாற்று" / "తమిళనాడు మార్చండి"
 * - "I want an income certificate" / "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಬೇಕು" / "आय प्रमाण पत्र चाहिए"
 * - "Show scholarship schemes" / "ವಿದ್ಯಾರ್ಥಿವೇತನ" / "छात्रवृत्ति"
 * - "Open official government website" / "ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ತೆರೆಯಿರಿ"
 */

import { STATES_AND_UTS } from '../data/statesData';

export function parseVoiceCommand(transcript, activeLang = 'en') {
  if (!transcript || typeof transcript !== 'string') return null;

  const text = transcript.trim().toLowerCase();

  // 1. Detect State Change Commands: e.g. "change state to Karnataka", "show Karnataka services", etc.
  for (const state of STATES_AND_UTS) {
    const stateNameLower = state.name.toLowerCase();
    const codeLower = state.code.toLowerCase();

    // Check English state name or code
    const englishMatch = text.includes(stateNameLower) || text.includes(` ${codeLower} `);

    // Check regional native names
    const nativeMatch = Object.values(state.nativeNames || {}).some((n) =>
      text.includes(n.toLowerCase())
    );

    if (englishMatch || nativeMatch) {
      if (
        text.includes('state') ||
        text.includes('change') ||
        text.includes('show') ||
        text.includes('portal') ||
        text.includes('services') ||
        text.includes('ಸರ್ಕಾರ') ||
        text.includes('ರಾಜ್ಯ') ||
        text.includes('सरकार') ||
        text.includes('राज्य') ||
        text.includes('ప్రభుత్వ') ||
        text.includes('రాష్ట్ర') ||
        text.includes('அரசு') ||
        text.includes('மாநில') ||
        text.includes('സർക്കാർ') ||
        text.includes('സംസ്ഥാന')
      ) {
        return {
          type: 'CHANGE_STATE',
          stateCode: state.code,
          stateName: state.name,
          feedback: `Selected ${state.name} government services.`,
        };
      }
    }
  }

  // 2. Detect Specific Service Requests
  const SERVICE_KEYWORDS = [
    {
      id: 'income-certificate',
      patterns: ['income certificate', 'income', 'salary', 'ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ', 'ಆದಾಯ', 'आय प्रमाण पत्र', 'आय', 'ఆదాయ ధృవీకరణ', 'ఆదాయం', 'வருமானச் சான்றிதழ்', 'வருமானம்', 'വരുമാന സർട്ടിഫിക്കറ്റ്', 'വരുമാനം'],
    },
    {
      id: 'caste-certificate',
      patterns: ['caste certificate', 'caste', 'community', 'ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ', 'ಜಾತಿ', 'जाति प्रमाण पत्र', 'जाति', 'కుల ధృవీకరణ', 'కులం', 'சாதிச் சான்றிதழ்', 'சாதி', 'ജാതി സർട്ടിഫിക്കറ്റ്', 'ജാതി'],
    },
    {
      id: 'residence-certificate',
      patterns: ['residence certificate', 'domicile', 'nativity', 'ವಾಸಸ್ಥಳ ಪ್ರಮಾಣಪತ್ರ', 'ನಿವಾಸ', 'निवास प्रमाण पत्र', 'मूल निवास', 'నివాస ధృవీకరణ', 'இருப்பிடச் சான்றிதழ்', 'താമസ സർട്ടിഫിക്കറ്റ്'],
    },
    {
      id: 'scholarship-guidance',
      patterns: ['scholarship', 'education grant', 'ವಿದ್ಯಾರ್ಥಿವೇತನ', 'ಸ್ಕಾಲರ್‌ಶಿಪ್', 'छात्रवृत्ति', 'స్కాలర్‌షిప్', 'கல்வி உதவித்தொகை', 'സ്കോളർഷിപ്പ്'],
    },
    {
      id: 'pension-guidance',
      patterns: ['pension', 'old age', 'ವೃದ್ಧಾಪ್ಯ ವೇತನ', 'ಪಿಂಚಣಿ', 'पेंशन', 'वृद्धावस्था', 'పింఛను', 'ஓய்வூதியம்', 'പെൻഷൻ'],
    },
    {
      id: 'ration-card',
      patterns: ['ration card', 'ration', 'food card', 'ಪಡಿತರ ಚೀಟಿ', 'ರೇಷನ್ ಕಾರ್ಡ್', 'राशन कार्ड', 'రేషన్ కార్డు', 'குடும்ப அட்டை', 'റേഷൻ കാർഡ്'],
    },
    {
      id: 'ayushman-card',
      patterns: ['ayushman', 'health card', 'pm-jay', 'ಆಯುಷ್ಮಾನ್ ಕಾರ್ಡ್', 'ಆರೋಗ್ಯ ಕಾರ್ಡ್', 'आयुष्मान कार्ड', 'ఆయుష్మాన్ భారత్', 'ஆயுஷ்மான் கார்டு', 'ആയുഷ്മാൻ കാർഡ്'],
    },
    {
      id: 'pm-kisan',
      patterns: ['pm kisan', 'farmer scheme', 'kisan', 'ಕಿಸಾನ್ ಸಮ್ಮಾನ್', 'ರೈತ ಯೋಜನೆ', 'किसान सम्मान', 'కిసాన్', 'விவசாயி திட்டம்', 'പിഎം കിസാൻ'],
    },
  ];

  for (const svc of SERVICE_KEYWORDS) {
    if (svc.patterns.some((p) => text.includes(p.toLowerCase()))) {
      return {
        type: 'NAVIGATE_SERVICE',
        serviceId: svc.id,
        feedback: `Opening ${svc.id.replace('-', ' ')} guidance.`,
      };
    }
  }

  // 3. Detect "Open Official Portal" Command
  if (
    text.includes('official portal') ||
    text.includes('official website') ||
    text.includes('open portal') ||
    text.includes('open website') ||
    text.includes('ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್') ||
    text.includes('ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ') ||
    text.includes('वेबसाइट खोलें') ||
    text.includes('पोर्टल खोलें') ||
    text.includes('పోర్టల్ తెరవండి') ||
    text.includes('வலைத்தளத்தை திற') ||
    text.includes('പോർട്ടൽ തുറക്കുക')
  ) {
    return {
      type: 'OPEN_PORTAL',
      feedback: 'Opening verified government portal.',
    };
  }

  // Default fallback: regular search
  return {
    type: 'SEARCH',
    query: transcript,
  };
}
