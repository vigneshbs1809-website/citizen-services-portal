# -*- coding: utf-8 -*-
"""
Master generator for 100% full-stack regional language coverage across all 8 services:
1. income-certificate
2. caste-certificate
3. residence-certificate
4. scholarship-guidance
5. pension-guidance
6. ration-card
7. ayushman-card
8. pm-kisan

Translates every question, explanation, step title, step instruction, target group, benefit, and required document
into all 6 official languages: en, kn, hi, te, ta, ml.
"""

import json, os, sqlite3

SERVICES_DATA = {
    # 1. INCOME CERTIFICATE
    "income-certificate": {
        "en": {
            "title": "Income Certificate",
            "shortDescription": "Official government document certifying the annual family income required for scholarships, fee waivers, and welfare schemes.",
            "processingTime": "7 to 10 Working Days",
            "officialFee": "₹15 (Nominal Portal Fee)",
            "benefitAmount": "Mandatory for fee waivers and state/central subsidies",
            "spokenSummary": "The Income Certificate proves your family annual income. It is required for fee waivers, school admissions, and scholarships. The official fee is fifteen rupees. You need your salary slip or income self-declaration, ration card, and residence proof.",
            "targetGroup": "Any permanent resident citizen or family head",
            "incomeLimit": "No upper ceiling for applying; used to certify any bracket",
            "residenceRequirement": "Permanent resident of the state/district for at least 1 year",
            "questions": [
                {"id": "residence", "question": "Are you a permanent resident of this district or state?", "explanation": "Requires a standard local address proof such as electricity bill or voter card."},
                {"id": "income_records", "question": "Do you have salary slips, farm earnings proof, or an income self-declaration affidavit?", "explanation": "Informal workers can submit a simple self-declaration notarized affidavit."},
                {"id": "aadhaar_linked", "question": "Do you have an active Aadhaar card with updated mobile number?", "explanation": "Used for e-KYC and digital certificate authentication."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "Gather Income Proof", "instruction": "Collect salary slips, village pradhan income letter, or bank statements showing earnings.", "tip": "Keep self-declaration affidavit ready if informal worker."},
                {"stepNumber": 2, "title": "Submit Application Form", "instruction": "Apply online through your state e-District portal or visit your nearest Common Service Center (CSC).", "tip": "Save your submission acknowledgement receipt."},
                {"stepNumber": 3, "title": "Revenue Inspector Verification", "instruction": "The local revenue accountant (Lekhpal / Talathi / VAO) verifies family income status.", "tip": "No middleman fees required."},
                {"stepNumber": 4, "title": "Download Digitally Signed Certificate", "instruction": "An SMS link is sent to your phone. Download or collect your digitally signed government certificate.", "tip": "Digital QR code certificate is legally valid everywhere."}
            ],
            "requiredDocuments": [
                "Salary Slip, Employer Letter, or Income Self-Declaration Affidavit",
                "Ration Card copy or Family Registry document",
                "Aadhaar Card of the family head",
                "Recent passport-size photograph"
            ]
        },
        "te": {
            "title": "ఆదాయ ధ్రువీకరణ పత్రం (Income Certificate)",
            "shortDescription": "స్కాలర్‌షిప్‌లు, ఫీజు రాయితీలు మరియు సంక్షేమ పథకాల కోసం కుటుంబ వార్షిక ఆదాయాన్ని ధ్రువీకరించే అధికారిక పత్రం.",
            "processingTime": "7 నుండి 10 పనిదినాలు",
            "officialFee": "₹15 (నామమాత్రపు పోర్టల్ రుసుము)",
            "benefitAmount": "ఫీజు రీయింబర్స్‌మెంట్ మరియు ప్రభుత్వ సబ్సిడీలకు తప్పనిసరి",
            "spokenSummary": "ఆదాయ ధ్రువీకరణ పత్రం మీ కుటుంబ వార్షిక ఆదాయాన్ని రుజువు చేస్తుంది. ఫీజు రాయితీలు, పాఠశాల ప్రవేశాలు మరియు స్కాలర్‌షిప్‌లకు ఇది అవసరం. అధికారిక రుసుము కేవలం పదిహేను రూపాయలు. మీ జీతం స్లిప్ లేదా స్వయం-ధ్రువీకరణ పత్రం, రేషన్ కార్డు మరియు చిరునామా రుజువు సిద్ధం చేసుకోండి.",
            "targetGroup": "రాష్ట్రంలో శాశ్వతంగా నివసించే ఏ పౌరుడైనా లేదా కుటుంబ పెద్ద",
            "incomeLimit": "దరఖాస్తుకు ఎలాంటి పరిమితి లేదు; నిర్దిష్ట ఆదాయాన్ని ధ్రువీకరించడానికి ఉపయోగపడుతుంది",
            "residenceRequirement": "కనీసం 1 సంవత్సరం పాటు ఈ జిల్లా/రాష్ట్రంలో శాశ్వత నివాసి అయి ఉండాలి",
            "questions": [
                {"id": "residence", "question": "మీరు ఈ జిల్లా లేదా రాష్ట్రంలో శాశ్వత నివాసిగా ఉన్నారా?", "explanation": "కరెంట్ బిల్లు, నివాస పత్రం లేదా ఓటరు కార్డు వంటి ప్రామాణిక స్థానిక చిరునామా రుజువు అవసరం."},
                {"id": "income_records", "question": "మీ వద్ద జీతం స్లిప్పులు, వ్యవసాయ ఆదాయ రుజువు లేదా ఆదాయ స్వయం-ధ్రువీకరణ అఫిడవిట్ ఉందా?", "explanation": "అసంఘటిత రంగ కార్మికులు సాధారణ నోటరీ స్వయం-ధ్రువీకరణ అఫిడవిట్‌ను సమర్పించవచ్చు."},
                {"id": "aadhaar_linked", "question": "మీ వద్ద మొబైల్ నంబర్‌తో లింక్ చేయబడిన ఆధార్ కార్డు ఉందా?", "explanation": "ఇ-కేవైసీ మరియు డిజిటల్ సర్టిఫికేట్ ధ్రువీకరణ కోసం ఉపయోగించబడుతుంది."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ఆదాయ రుజువులు సేకరించండి", "instruction": "జీతం స్లిప్పులు, వ్యవసాయ ఆదాయం లేదా బ్యాంకు స్టేట్‌మెంట్‌లను ఒకచోట చేర్చండి.", "tip": "అసంఘటిత రంగ కార్మికులు ₹20 స్టాంప్ పేపర్‌పై నోటరీ అఫిడవిట్ తీసుకోవచ్చు."},
                {"stepNumber": 2, "title": "దరఖాస్తు ఫారమ్‌ను సమర్పించండి", "instruction": "రాష్ట్ర మీ-సేవా పోర్టల్ ద్వారా ఆన్‌లైన్‌లో లేదా సమీప గ్రామ సచివాలయం / సిఎస్‌సి కేంద్రంలో దరఖాస్తు చేయండి.", "tip": "దరఖాస్తు చేసిన రసీదు (Acknowledgement) తప్పక భద్రపరుచుకోండి."},
                {"stepNumber": 3, "title": "గ్రామ రెవెన్యూ అధికారి (VRO) పరిశీలన", "instruction": "స్థానిక వీఆర్వో / రెవెన్యూ ఇన్‌స్పెక్టర్ మీ కుటుంబ వార్షిక ఆదాయ వివరాలను ధ్రువీకరిస్తారు.", "tip": "మధ్యవర్తులకు ఎటువంటి అదనపు నగదు చెల్లించవద్దు."},
                {"stepNumber": 4, "title": "డిజిటల్ ధ్రువీకరణ పత్రాన్ని పొందండి", "instruction": "మీ మొబైల్‌కు ఎస్ఎమ్ఎస్ లింక్ వస్తుంది. డిజిటల్ సంతకం చేసిన సర్టిఫికెట్‌ను డౌన్‌లోడ్ చేసుకోండి.", "tip": "క్యూఆర్ కోడ్‌తో కూడిన డిజిటల్ సర్టిఫికెట్ అన్ని ప్రభుత్వ పథకాలకు చెల్లుబాటు అవుతుంది."}
            ],
            "requiredDocuments": [
                "జీతం స్లిప్ లేదా ఆదాయ ప్రమాణ పత్రం (అఫిడవిట్)",
                "రేషన్ కార్డు లేదా కుటుంబ రిజిస్టర్ కాపీ",
                "కుటుంబ పెద్ద ఆధార్ కార్డు",
                "ఇటీవలి పాస్‌పోర్ట్ సైజు ఫోటోగ్రాఫ్"
            ]
        },
        "kn": {
            "title": "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ (Income Certificate)",
            "shortDescription": "ವಿದ್ಯಾರ್ಥಿವೇತನ, ಶುಲ್ಕ ವಿನಾಯಿತಿ ಮತ್ತು ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳಿಗಾಗಿ ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯವನ್ನು ದೃಢೀಕರಿಸುವ ಅಧಿಕೃತ ದಾಖಲೆ.",
            "processingTime": "7 ರಿಂದ 10 ಕೆಲಸದ ದಿನಗಳು",
            "officialFee": "₹15 (ನಿಗದಿತ ಪೋರ್ಟಲ್ ಶುಲ್ಕ)",
            "benefitAmount": "ಶುಲ್ಕ ವಿನಾಯಿತಿ ಮತ್ತು ಸರ್ಕಾರದ ಸಬ್ಸಿಡಿಗಳಿಗೆ ಕಡ್ಡಾಯವಾಗಿದೆ",
            "spokenSummary": "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರವು ನಿಮ್ಮ ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯವನ್ನು ಸಾಬೀತುಪಡಿಸುತ್ತದೆ. ಶಾಲಾ ಕಾಲೇಜು ಪ್ರವೇಶ, ಶುಲ್ಕ ವಿನಾಯಿತಿ ಮತ್ತು ಸ್ಕಾಲರ್‌ಶಿಪ್‌ಗೆ ಇದು ಅಗತ್ಯ. ಅಧಿಕೃತ ಶುಲ್ಕ ಕೇವಲ ಹದಿನೈದು ರೂಪಾಯಿಗಳು. ನಿಮ್ಮ ವೇತನ ಚೀಟಿ ಅಥವಾ ಅಫಿಡವಿಟ್, ರೇಷನ್ ಕಾರ್ಡ್ ಮತ್ತು ಆಧಾರ್ ಕಾರ್ಡ್ ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ.",
            "targetGroup": "ರಾಜ್ಯದ ಯಾವುದೇ ಖಾಯಂ ನಿವಾಸಿ ನಾಗರಿಕ ಅಥವಾ ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥ",
            "incomeLimit": "ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಯಾವುದೇ ಗರಿಷ್ಠ ಮಿತಿಯಿಲ್ಲ; ಅರ್ಹತಾ ಆದಾಯವನ್ನು ಪ್ರಮಾಣೀಕರಿಸಲು ಬಳಸಲಾಗುತ್ತದೆ",
            "residenceRequirement": "ಕನಿಷ್ಠ 1 ವರ್ಷ ಕಾಲ ಜಿಲ್ಲೆ ಅಥವಾ ರಾಜ್ಯದಲ್ಲಿ ಖಾಯಂ ನಿವಾಸಿಯಾಗಿರಬೇಕು",
            "questions": [
                {"id": "residence", "question": "ನೀವು ಈ ಜಿಲ್ಲೆ ಅಥವಾ ರಾಜ್ಯದ ಖಾಯಂ ನಿವಾಸಿಯೇ?", "explanation": "ವಿದ್ಯುತ್ ಬಿಲ್ ಅಥವಾ ವೋಟರ್ ಕಾರ್ಡ್‌ನಂತಹ ಪ್ರಮಾಣಿತ ಸ್ಥಳೀಯ ವಿಳಾಸ ಪುರಾವೆ ಅಗತ್ಯವಿದೆ."},
                {"id": "income_records", "question": "ನಿಮ್ಮ ಬಳಿ ವೇತನ ಚೀಟಿ, ಕೃಷಿ ಆದಾಯ ಪುರಾವೆ ಅಥವಾ ಆದಾಯ ಸ್ವಯಂ ಘೋಷಣಾ ಅಫಿಡವಿಟ್ ಇದೆಯೇ?", "explanation": "ಅಸಂಘಟಿತ ವಲಯದ ಕಾರ್ಮಿಕರು ಸರಳ ನೋಟರಿ ಸ್ವಯಂ ಘೋಷಣಾ ಅಫಿಡವಿಟ್ ಸಲ್ಲಿಸಬಹುದು."},
                {"id": "aadhaar_linked", "question": "ನಿಮ್ಮ ಬಳಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಲಿಂಕ್ ಆಗಿರುವ ಸಕ್ರಿಯ ಆಧಾರ್ ಕಾರ್ಡ್ ಇದೆಯೇ?", "explanation": "ಇ-ಕೆವೈಸಿ ಮತ್ತು ಡಿಜಿಟಲ್ ಪ್ರಮಾಣಪತ್ರ ದೃಢೀಕರಣಕ್ಕಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ಆದಾಯ ಪುರಾವೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ", "instruction": "ವೇತನ ಚೀಟಿ, ಕೃಷಿ ಆದಾಯ ಅಥವಾ ಬ್ಯಾಂಕ್ ಸ್ಟೇಟ್‌ಮೆಂಟ್‌ಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸಿ.", "tip": "ಅಸಂಘಟಿತ ಕೆಲಸಗಾರರು ನೋಟರಿ ಅಫಿಡವಿಟ್ ಇಟ್ಟುಕೊಳ್ಳಿ."},
                {"stepNumber": 2, "title": "ಅರ್ಜಿ ನಮೂನೆಯನ್ನು ಸಲ್ಲಿಸಿ", "instruction": "ನಾಡಕಚೇರಿ ಅಥವಾ ಸೇವಾ ಸಿಂಧು / ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರದಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.", "tip": "ಅರ್ಜಿ ಸಂಖ್ಯೆ (GSC ಸಂಖ್ಯೆ) ಇರುವ ಸ್ವೀಕೃತಿ ರಸೀದಿಯನ್ನು ತಪ್ಪದೆ ಪಡೆಯಿರಿ."},
                {"stepNumber": 3, "title": "ಕಂದಾಯ ನಿರೀಕ್ಷಕರ ಪರಿಶೀಲನೆ", "instruction": "ಗ್ರಾಮ ಲೆಕ್ಕಿಗರು ಮತ್ತು ಕಂದಾಯ ನಿರೀಕ್ಷಕರು ನಿಮ್ಮ ಆದಾಯದ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.", "tip": "ಯಾವುದೇ ದಲ್ಲಾಳಿಗಳಿಗೆ ಹಣ ನೀಡಬೇಡಿ."},
                {"stepNumber": 4, "title": "ಡಿಜಿಟಲ್ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ", "instruction": "ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಬರುವ ಎಸ್‌ಎಂಎಸ್ ಲಿಂಕ್ ಮೂಲಕ ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.", "tip": "ಡಿಜಿಟಲ್ ಸಹಿ ಇರುವ ಪ್ರಮಾಣಪತ್ರವು ಎಲ್ಲಾ ಸರ್ಕಾರಿ ಕೆಲಸಗಳಿಗೆ ಮಾನ್ಯವಾಗಿದೆ."}
            ],
            "requiredDocuments": [
                "ವೇತನ ಚೀಟಿ ಅಥವಾ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅಫಿಡವಿಟ್",
                "ಪಡಿತರ ಚೀಟಿ (ರೇಷನ್ ಕಾರ್ಡ್) ಅಥವಾ ಕುಟುಂಬ ರಿಜಿಸ್ಟರ್",
                "ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರ ಆಧಾರ್ ಕಾರ್ಡ್",
                "ಇತ್ತೀಚಿನ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರ"
            ]
        },
        "hi": {
            "title": "आय प्रमाण पत्र (Income Certificate)",
            "shortDescription": "छात्रवृत्ति, शुल्क माफी और सरकारी कल्याणकारी योजनाओं के लिए परिवार की वार्षिक आय प्रमाणित करने वाला आधिकारिक दस्तावेज।",
            "processingTime": "7 से 10 कार्य दिवस",
            "officialFee": "₹15 (सरकारी पोर्टल शुल्क)",
            "benefitAmount": "शुल्क प्रतिपूर्ति और सभी सरकारी योजनाओं के लिए अनिवार्य",
            "spokenSummary": "आय प्रमाण पत्र आपके परिवार की वार्षिक आय को प्रमाणित करता है। यह स्कूल कॉलेज फीस माफी, प्रवेश और छात्रवृत्ति के लिए आवश्यक है। सरकारी शुल्क मात्र पंद्रह रुपये है। अपने वेतन पर्ची या शपथ पत्र, राशन कार्ड और आधार कार्ड को तैयार रखें।",
            "targetGroup": "राज्य का कोई भी स्थायी निवासी नागरिक या परिवार का मुखिया",
            "incomeLimit": "आवेदन के लिए कोई अधिकतम सीमा नहीं; आय प्रमाणित करने हेतु आवश्यक",
            "residenceRequirement": "कम से कम 1 वर्ष से जिले या राज्य का स्थायी निवासी होना चाहिए",
            "questions": [
                {"id": "residence", "question": "क्या आप इस जिले या राज्य के स्थायी निवासी हैं?", "explanation": "बिजली बिल, निवास प्रमाण पत्र या वोटर कार्ड जैसे पते के प्रमाण की आवश्यकता होती है।"},
                {"id": "income_records", "question": "क्या आपके पास वेतन पर्ची, कृषि आय प्रमाण या आय स्व-घोषणा शपथ पत्र है?", "explanation": "असंगठित कामगार एक साधारण नोटरीकृत स्व-घोषणा हलफनामा जमा कर सकते हैं।"},
                {"id": "aadhaar_linked", "question": "क्या आपके पास मोबाइल नंबर से जुड़ा सक्रिय आधार कार्ड है?", "explanation": "ई-केवाईसी और डिजिटल प्रमाणपत्र प्रमाणीकरण के लिए उपयोग किया जाता है।"}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "आय प्रमाण दस्तावेज एकत्र करें", "instruction": "वेतन पर्ची, कृषि आय विवरण या बैंक खाता पासबुक एकत्र करें।", "tip": "असंगठित क्षेत्र के श्रमिक ₹20 स्टांप पेपर पर नोटरी शपथ पत्र तैयार रखें।"},
                {"stepNumber": 2, "title": "आवेदन पत्र जमा करें", "instruction": "राज्य के ई-डिस्ट्रिक्ट पोर्टल पर ऑनलाइन या नजदीकी सीएससी जन सेवा केंद्र पर आवेदन करें।", "tip": "आवेदन पावती रसीद (Acknowledgement) संभाल कर रखें।"},
                {"stepNumber": 3, "title": "लेखपाल / पटवारी द्वारा सत्यापन", "instruction": "स्थानीय राजस्व निरीक्षक या लेखपाल आपकी पारिवारिक आय की पुष्टि करते हैं।", "tip": "किसी भी दलाल को अतिरिक्त नकद भुगतान न करें।"},
                {"stepNumber": 4, "title": "डिजिटल हस्ताक्षरित प्रमाणपत्र डाउनलोड करें", "instruction": "आपके मोबाइल पर एसएमएस लिंक आएगा। अपना आधिकारिक डिजिटल प्रमाणपत्र डाउनलोड करें।", "tip": "क्यूआर कोड वाला डिजिटल प्रमाणपत्र हर जगह कानूनी रूप से मान्य है।"}
            ],
            "requiredDocuments": [
                "वेतन पर्ची या आय शपथ पत्र (एफिडेविट)",
                "राशन कार्ड या परिवार रजिस्टर की नकल",
                "परिवार के मुखिया का आधार कार्ड",
                "हाल की पासपोर्ट आकार की फोटो"
            ]
        },
        "ta": {
            "title": "வருமானச் சான்றிதழ் (Income Certificate)",
            "shortDescription": "கல்வி உதவித்தொகை, கல்விக் கட்டணச் சலுகை மற்றும் அரசு நலத்திட்டங்களுக்கு குடும்ப ஆண்டு வருமானத்தை உறுதிப்படுத்தும் அதிகாரப்பூர்வ சான்றிதழ்.",
            "processingTime": "7 முதல் 10 வேலை நாட்கள்",
            "officialFee": "₹15 (அரசு போர்டல் கட்டணம்)",
            "benefitAmount": "கட்டண விலக்கு மற்றும் அரசு மானியங்களுக்கு கட்டாயம் தேவை",
            "spokenSummary": "வருமானச் சான்றிதழ் உங்கள் குடும்பத்தின் ஆண்டு வருமானத்தை நிரூபிக்கிறது. பள்ளிக் கட்டணச் சலுகை, சேர்க்கை மற்றும் உதவித்தொகைக்கு இது தேவை. அதிகாரப்பூர்வ கட்டணம் பதினைந்து ரூபாய் மட்டுமே. உங்கள் சம்பள ரசீது அல்லது உறுதிமொழிப் பத்திரம், ரேஷன் அட்டை மற்றும் ஆதார் அட்டையைத் தயாராக வைத்திருக்கவும்.",
            "targetGroup": "மாநிலத்தின் நிரந்தரக் குடியுரிமை பெற்ற எந்தவொரு குடிமகனும் அல்லது குடும்பத் தலைவரும்",
            "incomeLimit": "விண்ணப்பிக்க உச்ச வரம்பு இல்லை; வருமானத்தை சான்றளிக்கப் பயன்படுகிறது",
            "residenceRequirement": "குறைந்தது 1 வருடம் இந்த மாவட்டத்தில் அல்லது மாநிலத்தில் நிரந்தரமாக வசித்திருக்க வேண்டும்",
            "questions": [
                {"id": "residence", "question": "நீங்கள் இந்த மாவட்டம் அல்லது மாநிலத்தின் நிரந்தர குடியிருப்பாளரா?", "explanation": "மின்சாரக் கட்டணம் அல்லது வாக்காளர் அட்டை போன்ற இருப்பிடச் சான்று தேவை."},
                {"id": "income_records", "question": "உங்களிடம் சம்பள ரசீது, விவசாய வருமானச் சான்று அல்லது வருமான உறுதிமொழிப் பத்திரம் உள்ளதா?", "explanation": "முறைசாரா தொழிலாளர்கள் எளிய நோட்டரி உறுதிமொழிப் பத்திரத்தை சமர்ப்பிக்கலாம்."},
                {"id": "aadhaar_linked", "question": "மொபைல் எண் இணைக்கப்பட்ட ஆதார் அட்டை உங்களிடம் உள்ளதா?", "explanation": "மின்-கேஒய்சி மற்றும் டிஜிட்டல் சான்றிதழ் சரிபார்ப்புக்குப் பயன்படுத்தப்படுகிறது."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "வருமானச் சான்றுகளை சேகரிக்கவும்", "instruction": "சம்பள ரசீது, வங்கி அறிக்கை அல்லது கிராம நிர்வாக அலுவலர் அறிக்கையை சேகரிக்கவும்.", "tip": "நோட்டரி உறுதிமொழிப் பத்திரத்தை முன்கூட்டியே தயாராக வைக்கவும்."},
                {"stepNumber": 2, "title": "விண்ணப்பப் படிவத்தை சமர்ப்பிக்கவும்", "instruction": "தமிழ்நாடு இ-சேவை போர்டல் வழியாக அல்லது அருகில் உள்ள இ-சேவை மையத்தில் விண்ணப்பிக்கவும்.", "tip": "விண்ணப்ப ஒப்புகைச் சீட்டை (Acknowledgement Slip) தவறாமல் பெறவும்."},
                {"stepNumber": 3, "title": "கிராம நிர்வாக அலுவலர் (VAO) சரிபார்ப்பு", "instruction": "விஏஓ மற்றும் வருவாய் ஆய்வாளர் உங்கள் குடும்ப ஆண்டு வருமானத்தை ஆய்வு செய்து சான்றளிப்பார்கள்.", "tip": "இடைத்தரகர்களுக்கு பணம் கொடுக்க வேண்டாம்."},
                {"stepNumber": 4, "title": "டிஜிட்டல் சான்றிதழைப் பதிவிறக்கவும்", "instruction": "உங்கள் மொபைலுக்கு வரும் எஸ்எம்எஸ் இணைப்பு மூலம் சான்றிதழைப் பதிவிறக்கவும்.", "tip": "கியூஆர் குறியீட்டுடன் கூடிய டிஜிட்டல் சான்றிதழ் எல்லா இடங்களிலும் செல்லுபடியாகும்."}
            ],
            "requiredDocuments": [
                "சம்பள ரசீது அல்லது வருமான உறுதிமொழிப் பத்திரம்",
                "குடும்ப அட்டை (ரேஷன் கார்டு) அல்லது குடும்பப் பதிவேடு",
                "குடும்பத் தலைவரின் ஆதார் அட்டை",
                "சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படம்"
            ]
        },
        "ml": {
            "title": "വരുമാന സർട്ടിഫിക്കറ്റ് (Income Certificate)",
            "shortDescription": "സ്കോളർഷിപ്പുകൾ, ഫീസ് ഇളവുകൾ, മറ്റ് സർക്കാർ ആനുകൂല്യങ്ങൾ എന്നിവയ്ക്കായി കുടുംബത്തിന്റെ വാർഷിക വരുമാനം സാക്ഷ്യപ്പെടുത്തുന്ന ഔദ്യോഗിക രേഖ.",
            "processingTime": "7 മുതൽ 10 പ്രവൃത്തിദിനങ്ങൾ",
            "officialFee": "₹15 (ഔദ്യോഗിക ഫീസ്)",
            "benefitAmount": "ഫീസ് ഇളവിനും വിവിധ സബ്സിഡികൾക്കും അത്യന്താപേക്ഷിതം",
            "spokenSummary": "വരുമാന സർട്ടിഫിക്കറ്റ് നിങ്ങളുടെ കുടുംബത്തിന്റെ വാർഷിക വരുമാനം തെളിയിക്കുന്നു. ഫീസ് ഇളവുകൾക്കും വിദ്യാഭ്യാസ സ്കോളർഷിപ്പുകൾക്കും ഇത് ആവശ്യമാണ്. ഔദ്യോഗിക ഫീസ് വെറും പതിനഞ്ച് രൂപയാണ്. ശമ്പള സർട്ടിഫിക്കറ്റ് അല്ലെങ്കിൽ സത്യവാങ്മൂലം, റേഷൻ കാർഡ്, ആധാർ എന്നിവ തയ്യാറാക്കി വയ്ക്കുക.",
            "targetGroup": "സംസ്ഥാനത്തെ ഏതൊരു സ്ഥിരതാമസക്കാരനും അല്ലെങ്കിൽ കുടുംബനാഥനും",
            "incomeLimit": "അപേക്ഷിക്കാൻ ഉയർന്ന വരുമാന പരിധിയില്ല; വരുമാനം സാക്ഷ്യപ്പെടുത്താൻ ഉപകരിക്കുന്നു",
            "residenceRequirement": "കുറഞ്ഞത് 1 വർഷമായി ജില്ലയിലോ സംസ്ഥാനത്തോ സ്ഥിരതാമസമായിരിക്കണം",
            "questions": [
                {"id": "residence", "question": "നിങ്ങൾ ഈ ജില്ലയിലെ അല്ലെങ്കിൽ സംസ്ഥാനത്തെ സ്ഥിരതാമസക്കാരനാണോ?", "explanation": "വൈദ്യുതി ബിൽ അല്ലെങ്കിൽ വോട്ടർ കാർഡ് പോലുള്ള വിലാസ തെളിവ് ആവശ്യമാണ്."},
                {"id": "income_records", "question": "നിങ്ങളുടെ പക്കൽ ശമ്പള സർട്ടിഫിക്കറ്റ്, കാർഷിക വരുമാന തെളിവ്, അല്ലെങ്കിൽ സത്യവാങ്മൂലം ഉണ്ടോ?", "explanation": "തൊഴിലാളികൾക്ക് ലളിതമായ നോട്ടറി സാക്ഷ്യപ്പെടുത്തിയ സത്യവാങ്മൂലം സമർപ്പിക്കാം."},
                {"id": "aadhaar_linked", "question": "മൊബൈൽ നമ്പർ ലിങ്ക് ചെയ്ത സജീവ ആധാർ കാർഡ് നിങ്ങളുടെ പക്കലുണ്ടോ?", "explanation": "ഇ-കെവൈസിക്കും ഡിജിറ്റൽ സർട്ടിഫിക്കറ്റ് പരിശോധനയ്ക്കും ആവശ്യമാണ്."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "വരുമാന തെളിവുകൾ ശേഖരിക്കുക", "instruction": "ശമ്പള സർട്ടിഫിക്കറ്റ്, വരുമാന രേഖകൾ അല്ലെങ്കിൽ ബാങ്ക് പാസ്സ്ബുക്ക് ശേഖരിക്കുക.", "tip": "നോട്ടറി സാക്ഷ്യപ്പെടുത്തിയ സത്യവാങ്മൂലം കരുതുക."},
                {"stepNumber": 2, "title": "അപേക്ഷ സമർപ്പിക്കുക", "instruction": "ഇ-ഡിസ്ട്രിക്റ്റ് പോർട്ടൽ വഴിയോ അടുത്തുള്ള അക്ഷയ കേന്ദ്രം വഴിയോ അപേക്ഷിക്കുക.", "tip": "അപേക്ഷാ നമ്പർ അടങ്ങിയ രസീത് സൂക്ഷിക്കുക."},
                {"stepNumber": 3, "title": "വില്ലേജ് ഓഫീസർ പരിശോധന", "instruction": "വില്ലേജ് ഓഫീസർ നിങ്ങളുടെ കുടുംബ വരുമാന വിവരങ്ങൾ പരിശോധിച്ച് റിപ്പോർട്ട് നൽകുന്നു.", "tip": "ഇടനിലക്കാർക്ക് പണം നൽകരുത്."},
                {"stepNumber": 4, "title": "സർട്ടിഫിക്കറ്റ് ഡൗൺലോഡ് ചെയ്യുക", "instruction": "മൊബൈലിൽ വരുന്ന എസ്എംഎസ് ലിങ്ക് വഴി ഡിജിറ്റൽ സർട്ടിഫിക്കറ്റ് ഡൗൺലോഡ് ചെയ്യുക.", "tip": "ഡിജിറ്റൽ ഒപ്പുള്ള സർട്ടിഫിക്കറ്റ് എല്ലാ ആവശ്യങ്ങൾക്കും സാധുവാണ്."}
            ],
            "requiredDocuments": [
                "ശമ്പള സർട്ടിഫിക്കറ്റ് അല്ലെങ്കിൽ വരുമാന സത്യവാങ്മൂലം",
                "റേഷൻ കാർഡ് അല്ലെങ്കിൽ കുടുംബ രജിസ്റ്റർ പകർപ്പ്",
                "കുടുംബനാഥന്റെ ആധാർ കാർഡ്",
                "പാസ്പോർട്ട് സൈസ് ഫോട്ടോ"
            ]
        }
    },

    # 2. CASTE CERTIFICATE
    "caste-certificate": {
        "en": {
            "title": "Caste Certificate",
            "shortDescription": "Document affirming citizen category (SC, ST, OBC, EWS) to avail constitutional reservations, subsidies, and educational benefits.",
            "processingTime": "10 to 14 Working Days",
            "officialFee": "₹15 (Official Fixed Fee)",
            "benefitAmount": "Unlocks category reservation quotas and educational benefits",
            "spokenSummary": "The Caste Certificate verifies your caste category for school admissions, competitive exams, and government job quotas. The fee is fifteen rupees. You need your father or paternal relative caste certificate, school leaving certificate, and Aadhaar card.",
            "targetGroup": "Citizens belonging to notified SC, ST, OBC, or EWS categories",
            "incomeLimit": "OBC non-creamy layer ceiling: ₹8 Lakhs / EWS: ₹8 Lakhs",
            "residenceRequirement": "Permanent resident with ancestral linkage in the state",
            "questions": [
                {"id": "category", "question": "Do you belong to an officially notified community (SC, ST, OBC, or EWS)?", "explanation": "Official lists maintained by state and central welfare departments."},
                {"id": "paternal_record", "question": "Do you have previous caste proof from your father, grandfather, or paternal uncle?", "explanation": "Paternal bloodline documentation is statutory proof."},
                {"id": "school_tc", "question": "Do you possess a School Leaving Certificate or Birth Certificate with community mentioned?", "explanation": "School registers record historical community entry."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "Gather Family Caste Proof", "instruction": "Find father's school TC, old caste certificate, or settlement land record.", "tip": "Paternal relatives documents are mandatory."},
                {"stepNumber": 2, "title": "Apply via Tehsildar Portal", "instruction": "Submit form online or at Taluk / Revenue office.", "tip": "Attach verified photocopies only."},
                {"stepNumber": 3, "title": "Field Inquiry by Revenue Inspector", "instruction": "Revenue staff confirms ancestral community status in village.", "tip": "Local witness statement may be recorded."},
                {"stepNumber": 4, "title": "Receive Statutory Caste Certificate", "instruction": "Collect certificate valid for lifetime (or 1 yr for OBC-NCL/EWS).", "tip": "Verify QR code digital signature."}
            ],
            "requiredDocuments": [
                "Father or Paternal Relative's Caste Certificate",
                "School Leaving Certificate (TC) showing caste",
                "Applicant's Aadhaar Card",
                "Affidavit of community declaration"
            ]
        },
        "te": {
            "title": "కుల ధ్రువీకరణ పత్రం (Caste Certificate)",
            "shortDescription": "రాజ్యాంగబద్ధ రిజర్వేషన్లు, ఫీజు రాయితీలు మరియు ప్రభుత్వ పథకాల కోసం పౌరుల వర్గాన్ని (SC, ST, BC, EWS) ధ్రువీకరించే పత్రం.",
            "processingTime": "10 నుండి 14 పనిదినాలు",
            "officialFee": "₹15 (అధికారిక నిర్ణీత రుసుము)",
            "benefitAmount": "రిజర్వేషన్ కోటాలు మరియు ఉన్నత విద్యా ప్రయోజనాలను అన్‌లాక్ చేస్తుంది",
            "spokenSummary": "కుల ధ్రువీకరణ పత్రం మీ సామాజిక వర్గాన్ని ధ్రువీకరిస్తుంది. ఉద్యోగ రిజర్వేషన్లు, విద్యా కోటాలు మరియు పోటీ పరీక్షలకు ఇది అవసరం. అధికారిక రుసుము పదిహేను రూపాయలు. మీ తండ్రి లేదా పితృస్వామ్య బంధువుల కుల సర్టిఫికెట్, పాఠశాల టీసీ మరియు ఆధార్ కార్డు అవసరం.",
            "targetGroup": "నోటిఫై చేయబడిన SC, ST, BC లేదా EWS వర్గాలకు చెందిన పౌరులు",
            "incomeLimit": "బీసీ నాన్-క్రీమీలేయర్ మరియు ఈడబ్ల్యూఎస్ పరిమితి: వార్షిక ఆదాయం ₹8 లక్షల లోపు",
            "residenceRequirement": "రాష్ట్రంలో పూర్వీకుల నివాస సంబంధం కలిగిన శాశ్వత నివాసి",
            "questions": [
                {"id": "category", "question": "మీరు అధికారికంగా గుర్తించబడిన సామాజిక వర్గానికి (SC, ST, BC లేదా EWS) చెందినవారా?", "explanation": "రాష్ట్ర మరియు కేంద్ర సంక్షేమ శాఖల గుర్తింపు జాబితాల ప్రకారం."},
                {"id": "paternal_record", "question": "మీ తండ్రి, తాత లేదా పితృ బంధువుల కుల ధ్రువీకరణ పత్రం లేదా పాత రికార్డు ఉందా?", "explanation": "తండ్రి తరఫు రక్త సంబంధ పత్రాలు చట్టబద్ధమైన ప్రాథమిక రుజువు."},
                {"id": "school_tc", "question": "కులం నమోదు చేయబడిన పాఠశాల బదిలీ పత్రం (TC) లేదా జనన ధ్రువీకరణ పత్రం ఉందా?", "explanation": "పాఠశాల రికార్డులలో కులం వివరాలు అధికారికంగా నమోదు చేయబడతాయి."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "కుటుంబ కుల రుజువులు సేకరించండి", "instruction": "తండ్రి స్కూల్ టీసీ, పాత కుల ధ్రువీకరణ పత్రం లేదా భూ రికార్డులను సిద్ధం చేసుకోండి.", "tip": "తండ్రి తరపు బంధువుల పత్రాలు తప్పనిసరి."},
                {"stepNumber": 2, "title": "తహశీల్దార్ పోర్టల్‌లో దరఖాస్తు చేయండి", "instruction": "రాష్ట్ర మీ-సేవా లేదా రెవెన్యూ కార్యాలయంలో దరఖాస్తు సమర్పించండి.", "tip": "ధ్రువీకరించిన జిరాక్స్ కాపీలను మాత్రమే జతచేయండి."},
                {"stepNumber": 3, "title": "రెవెన్యూ ఇన్‌స్పెక్టర్ క్షేత్రస్థాయి విచారణ", "instruction": "గ్రామంలో మీ పూర్వీకుల కుల స్థితిని రెవెన్యూ అధికారులు ధ్రువీకరిస్తారు.", "tip": "స్థానిక సాక్షుల వాంగ్మూలం నమోదు చేయవచ్చు."},
                {"stepNumber": 4, "title": "అధికారిక కుల సర్టిఫికెట్ పొందండి", "instruction": "జీవితకాలం చెల్లుబాటు అయ్యే సర్టిఫికెట్‌ను డౌన్‌లోడ్ చేసుకోండి (ఓబీసీ/ఈడబ్ల్యూఎస్‌కు వర్తించే నిబంధనలు).", "tip": "డిజిటల్ క్యూఆర్ కోడ్ తనిఖీ చేసుకోండి."}
            ],
            "requiredDocuments": [
                "తండ్రి లేదా పితృ బంధువుల కుల ధ్రువీకరణ పత్రం",
                "కులం నమోదైన స్కూల్ బదిలీ పత్రం (TC)",
                "దరఖాస్తుదారుడి ఆధార్ కార్డు",
                "కుల స్వయం-ధ్రువీకరణ అఫిడవిట్"
            ]
        },
        "kn": {
            "title": "ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (Caste Certificate)",
            "shortDescription": "ಮೀಸಲಾತಿ, ಸರ್ಕಾರಿ ಉದ್ಯೋಗ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಸವಲತ್ತುಗಳನ್ನು ಪಡೆಯಲು ನಾಗರಿಕರ ವರ್ಗವನ್ನು (SC, ST, OBC, EWS) ದೃಢೀಕರಿಸುವ ದಾಖಲೆ.",
            "processingTime": "10 ರಿಂದ 14 ಕೆಲಸದ ದಿನಗಳು",
            "officialFee": "₹15 (ನಿಗದಿತ ಸರ್ಕಾರಿ ಶುಲ್ಕ)",
            "benefitAmount": "ಮೀಸಲಾತಿ ಕೋಟಾಗಳು ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಸೌಲಭ್ಯಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ",
            "spokenSummary": "ಜಾತಿ ಪ್ರಮಾಣಪತ್ರವು ನಿಮ್ಮ ಜಾತಿ ವರ್ಗವನ್ನು ದೃಢೀಕರಿಸುತ್ತದೆ. ಶಾಲಾ ಕಾಲೇಜು ಸೀಟುಗಳು, ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಉದ್ಯೋಗಗಳಿಗೆ ಇದು ಅನಿವಾರ್ಯ. ಸರ್ಕಾರಿ ಶುಲ್ಕ ಹದಿನೈದು ರೂಪಾಯಿಗಳು. ನಿಮ್ಮ ತಂದೆಯ ಜಾತಿ ದಾಖಲೆ, ಶಾಲಾ ವರ್ಗಾವಣೆ ಪ್ರಮಾಣಪತ್ರ (TC) ಮತ್ತು ಆಧಾರ್ ಸಿದ್ಧವಾಗಿರಲಿ.",
            "targetGroup": "ಅಧಿಸೂಚಿತ SC, ST, OBC ಅಥವಾ EWS ವರ್ಗಕ್ಕೆ ಸೇರಿದ ನಾಗರಿಕರು",
            "incomeLimit": "ಹಿಂದುಳಿದ ವರ್ಗಗಳ ನಾನ್-ಕ್ರೀಮಿ ಲೇಯರ್ ಮತ್ತು ಇಡಬ್ಲ್ಯೂಎಸ್ ಮಿತಿ: ₹8 ಲಕ್ಷ",
            "residenceRequirement": "ರಾಜ್ಯದಲ್ಲಿ ಪೂರ್ವಜರ ನೆಲೆ ಹೊಂದಿರುವ ಖಾಯಂ ನಿವಾಸಿ",
            "questions": [
                {"id": "category", "question": "ನೀವು ಅಧಿಕೃತವಾಗಿ ಮಾನ್ಯತೆ ಪಡೆದ ಸಮುದಾಯಕ್ಕೆ (SC, ST, OBC, ಅಥವಾ EWS) ಸೇರಿದವರೇ?", "explanation": "ರಾಜ್ಯ ಮತ್ತು ಕೇಂದ್ರ ಸಮಾಜ ಕಲ್ಯಾಣ ಇಲಾಖೆಯ ಪಟ್ಟಿಯ ಪ್ರಕಾರ."},
                {"id": "paternal_record", "question": "ನಿಮ್ಮ ತಂದೆ, ಅಜ್ಜ ಅಥವಾ ರಕ್ತಸಂಬಂಧಿ ಕುಟುಂಬದ ಹಳೆಯ ಜಾತಿ ಪುರಾವೆ ಇದೆಯೇ?", "explanation": "ಪಿತೃಪಕ್ಷದ ರಕ್ತಸಂಬಂಧಿ ದಾಖಲೆಗಳು ಶಾಸನಬದ್ಧ ಪುರಾವೆಯಾಗಿದೆ."},
                {"id": "school_tc", "question": "ಜಾತಿ ನಮೂದಾಗಿರುವ ಶಾಲಾ ವರ್ಗಾವಣೆ ಪತ್ರ (TC) ಅಥವಾ ಜನನ ಪ್ರಮಾಣಪತ್ರ ಹೊಂದಿದ್ದೀರಾ?", "explanation": "ಶಾಲಾ ದಾಖಲಾತಿ ರಿಜಿಸ್ಟರ್‌ನಲ್ಲಿರುವ ನಮೂದು ಮುಖ್ಯ ದಾಖಲೆಯಾಗಿದೆ."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ಕುಟುಂಬದ ಜಾತಿ ದಾಖಲೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ", "instruction": "ತಂದೆಯ ಶಾಲಾ ಟಿಸಿ, ಹಳೆಯ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಪಹಣಿ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಿರಿ.", "tip": "ತಂದೆಯ ರಕ್ತಸಂಬಂಧಿ ದಾಖಲೆಗಳು ಅನಿವಾರ್ಯ."},
                {"stepNumber": 2, "title": "ನಾಡಕಚೇರಿ / ಸೇವಾ ಸಿಂಧು ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ", "instruction": "ಆನ್‌ಲೈನ್ ಪೋರ್ಟಲ್ ಅಥವಾ ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರದಲ್ಲಿ ಅರ್ಜಿ ಹಾಕಿ.", "tip": "ದೃಢೀಕರಿಸಿದ ಪ್ರತಿಗಳನ್ನು ಮಾತ್ರ ಲಗತ್ತಿಸಿ."},
                {"stepNumber": 3, "title": "ಕಂದಾಯ ಅಧಿಕಾರಿಗಳಿಂದ ಸ್ಥಳ ಪರಿಶೀಲನೆ", "instruction": "ಗ್ರಾಮ ಲೆಕ್ಕಿಗರು ಮತ್ತು ಕಂದಾಯ ನಿರೀಕ್ಷಕರು ವಂಶಾವಳಿ ಪರಿಶೀಲನೆ ಮಾಡುತ್ತಾರೆ.", "tip": "ಸ್ಥಳೀಯ ಸಾಕ್ಷಿಗಳ ಹೇಳಿಕೆಯನ್ನು ದಾಖಲಿಸಿಕೊಳ್ಳಬಹುದು."},
                {"stepNumber": 4, "title": "ಅಧಿಕೃತ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ", "instruction": "ಡಿಜಿಟಲ್ ಸಹಿ ಹೊಂದಿರುವ ಪ್ರಮಾಣಪತ್ರವನ್ನು ನೇರವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.", "tip": "ಡಿಜಿಟಲ್ ಕ್ಯೂಆರ್ ಕೋಡ್ ಪರಿಶೀಲಿಸಿಕೊಳ್ಳಿ."}
            ],
            "requiredDocuments": [
                "ತಂದೆ ಅಥವಾ ರಕ್ತ ಸಂಬಂಧಿಯ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ",
                "ಜಾತಿ ನಮೂದಾಗಿರುವ ಶಾಲಾ ವರ್ಗಾವಣೆ ಪ್ರಮಾಣಪತ್ರ (TC)",
                "ಅರ್ಜಿದಾರರ ಆಧಾರ್ ಕಾರ್ಡ್",
                "ನೋಟರಿ ಜಾತಿ ಘೋಷಣಾ ಅಫಿಡವಿಟ್"
            ]
        },
        "hi": {
            "title": "जाति प्रमाण पत्र (Caste Certificate)",
            "shortDescription": "संवैधानिक आरक्षण, छात्रवृत्ति और सरकारी योजनाओं के लाभ के लिए नागरिक की श्रेणी (SC, ST, OBC, EWS) प्रमाणित करने वाला दस्तावेज।",
            "processingTime": "10 से 14 कार्य दिवस",
            "officialFee": "₹15 (निर्धारित सरकारी शुल्क)",
            "benefitAmount": "आरक्षण कोटा और विशेष सरकारी योजनाओं के लाभ हेतु अनिवार्य",
            "spokenSummary": "जाति प्रमाण पत्र आपकी जाति श्रेणी को प्रमाणित करता है। यह सरकारी नौकरियों, कॉलेज आरक्षण और छात्रवृत्ति के लिए आवश्यक है। शुल्क मात्र पंद्रह रुपये है। अपने पिता का जाति प्रमाण, स्कूल टीसी और आधार कार्ड साथ रखें।",
            "targetGroup": "अधिसूचित अनुसूचित जाति, जनजाति, अन्य पिछड़ा वर्ग या ईडब्ल्यूएस के नागरिक",
            "incomeLimit": "ओबीसी नॉन-क्रीमी लेयर और ईडब्ल्यूएस के लिए वार्षिक पारिवारिक आय ₹8 लाख तक",
            "residenceRequirement": "राज्य में पैतृक संबंध और स्थायी निवास होना आवश्यक",
            "questions": [
                {"id": "category", "question": "क्या आप आधिकारिक रूप से अधिसूचित समुदाय (SC, ST, OBC, या EWS) से संबंध रखते हैं?", "explanation": "राज्य और केंद्र सरकार की कल्याणकारी सूचियों के अनुसार।"},
                {"id": "paternal_record", "question": "क्या आपके पास पिता, दादा या पैतृक परिवार का कोई पुराना जाति प्रमाण उपलब्ध है?", "explanation": "पिता पक्ष के रक्त संबंध का दस्तावेज कानूनी रूप से मान्य साक्ष्य है।"},
                {"id": "school_tc", "question": "क्या आपके पास जाति दर्ज स्कूल ट्रांसफर सर्टिफिकेट (TC) या जन्म प्रमाण पत्र है?", "explanation": "स्कूल रिकॉर्ड में दर्ज जाति को प्राथमिकता दी जाती है।"}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "पारिवारिक जाति दस्तावेज एकत्र करें", "instruction": "पिता की स्कूल टीसी, पुराना जाति प्रमाण पत्र या भूमि रिकॉर्ड ढूंढें।", "tip": "पिता पक्ष के दस्तावेज अनिवार्य हैं।"},
                {"stepNumber": 2, "title": "ई-डिस्ट्रिक्ट पोर्टल पर आवेदन करें", "instruction": "पोर्टल पर ऑनलाइन या नजदीकी सीएससी जन सेवा केंद्र पर फॉर्म भरें।", "tip": "सत्यापित फोटोकॉपी ही संलग्न करें।"},
                {"stepNumber": 3, "title": "राजस्व निरीक्षक द्वारा स्थलीय जांच", "instruction": "लेखपाल द्वारा गांव में पैतृक जाति स्थिति की पुष्टि की जाती है।", "tip": "स्थानीय गवाहों के बयान लिए जा सकते हैं।"},
                {"stepNumber": 4, "title": "डिजिटल जाति प्रमाण पत्र प्राप्त करें", "instruction": "सत्यापन उपरांत डिजिटल हस्ताक्षरित प्रमाण पत्र डाउनलोड करें।", "tip": "क्यूआर कोड की वैधता जांचें।"}
            ],
            "requiredDocuments": [
                "पिता या पैतृक रिश्तेदार का जाति प्रमाण पत्र",
                "जाति दर्ज स्कूल लीविंग सर्टिफिकेट (TC)",
                "आवेदक का आधार कार्ड",
                "जाति स्व-घोषणा शपथ पत्र"
            ]
        },
        "ta": {
            "title": "சாதிச் சான்றிதழ் (Caste Certificate)",
            "shortDescription": "அரசியலமைப்பு இடஒதுக்கீடு, கல்விச் சலுகைகள் மற்றும் அரசு நலத்திட்டங்களைப் பெற குடிமக்களின் பிரிவை (SC, ST, OBC, EWS) உறுதிப்படுத்தும் ஆவணம்.",
            "processingTime": "10 முதல் 14 வேலை நாட்கள்",
            "officialFee": "₹15 (அரசு நிர்ணயித்த கட்டணம்)",
            "benefitAmount": "இடஒதுக்கீட்டு உரிமைகள் மற்றும் கல்வி நலன்களைப் பெற உதவுகிறது",
            "spokenSummary": "சாதிச் சான்றிதழ் உங்கள் சாதிப் பிரிவை உறுதிப்படுத்துகிறது. பள்ளி கல்லூரி சேர்க்கை, அரசு வேலைவாய்ப்பு இடஒதுக்கீட்டிற்கு இது கட்டாயம். கட்டணம் பதினைந்து ரூபாய். தந்தையின் சாதிச் சான்று, பள்ளி மாற்றுச் சான்றிதழ் (TC) மற்றும் ஆதார் தேவைப்படும்.",
            "targetGroup": "அங்கீகரிக்கப்பட்ட SC, ST, OBC அல்லது EWS பிரிவுகளைச் சேர்ந்த குடிமக்கள்",
            "incomeLimit": "ஓபிசி கிரீமிலேயர் அல்லாதோர் மற்றும் இ.டபிள்யூ.எஸ் உச்சவரம்பு: ₹8 லட்சம்",
            "residenceRequirement": "மாநிலத்தில் பூர்வீகத் தொடர்பு கொண்ட நிரந்தரக் குடியிருப்பு",
            "questions": [
                {"id": "category", "question": "அங்கீகரிக்கப்பட்ட சமூகப் பிரிவைச் (SC, ST, OBC, அல்லது EWS) சேர்ந்தவரா?", "explanation": "அரசு நலத்துறை பட்டியலின்படி உறுதிப்படுத்தப்படுகிறது."},
                {"id": "paternal_record", "question": "தந்தை, தாத்தா அல்லது தந்தை வழி உறவினரின் சாதிச் சான்று ஆவணம் உள்ளதா?", "explanation": "தந்தை வழி இரத்த உறவு ஆவணம் சட்டப்பூர்வ சான்றாகும்."},
                {"id": "school_tc", "question": "சாதி குறிப்பிடப்பட்ட பள்ளி மாற்றுச் சான்றிதழ் (TC) அல்லது பிறப்புச் சான்றிதழ் உள்ளதா?", "explanation": "பள்ளிப் பதிவேடுகளில் உள்ள சமூகம் பற்றிய பதிவு முக்கியமானது."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "குடும்ப சாதிச் சான்றுகளை சேகரிக்கவும்", "instruction": "தந்தையின் பள்ளி டிசி, பழைய சாதிச் சான்றிதழ் ஆகியவற்றை தயார் செய்யவும்.", "tip": "தந்தை வழி உறவினர் ஆவணங்கள் கட்டாயம்."},
                {"stepNumber": 2, "title": "இ-சேவை மையம் மூலம் விண்ணப்பிக்கவும்", "instruction": "ஆன்லைன் போர்டல் அல்லது இ-சேவை மையத்தில் விண்ணப்பம் அளிக்கவும்.", "tip": "சரிபார்க்கப்பட்ட நகல்களை மட்டும் இணைக்கவும்."},
                {"stepNumber": 3, "title": "கிராம நிர்வாக அலுவலர் (VAO) கள ஆய்வு", "instruction": "விஏஓ மற்றும் வருவாய் ஆய்வாளர் பூர்வீக சமூக நிலையை ஆய்வு செய்வர்.", "tip": "சாட்சிகளின் வாக்குமூலம் பெறப்படலாம்."},
                {"stepNumber": 4, "title": "சாதிச் சான்றிதழைப் பதிவிறக்கவும்", "instruction": "டிஜிட்டல் கையொப்பமிட்ட சான்றிதழை இணையதளத்தில் பதிவிறக்கவும்.", "tip": "கியூஆர் குறியீட்டை சரிபார்க்கவும்."}
            ],
            "requiredDocuments": [
                "தந்தை அல்லது இரத்த உறவினரின் சாதிச் சான்றிதழ்",
                "சாதி குறிப்பிடப்பட்ட பள்ளி மாற்றுச் சான்றிதழ் (TC)",
                "விண்ணப்பதாரரின் ஆதார் அட்டை",
                "சாதி உறுதிமொழிப் பத்திரம்"
            ]
        },
        "ml": {
            "title": "ജാതി സർട്ടിഫിക്കറ്റ് (Caste Certificate)",
            "shortDescription": "സംവരണ ആനുകൂല്യങ്ങൾ, വിദ്യാഭ്യാസ സ്കോളർഷിപ്പുകൾ, സർക്കാർ ജോലികൾ എന്നിവയ്ക്കായി ജാതി വിഭാഗം തെളിയിക്കുന്ന രേഖ.",
            "processingTime": "10 മുതൽ 14 പ്രവൃത്തിദിനങ്ങൾ",
            "officialFee": "₹15 (ഔദ്യോഗിക നിരക്ക്)",
            "benefitAmount": "സംവരണാവകാശങ്ങളും വിവിധ സർക്കാർ സബ്സിഡികളും ഉറപ്പാക്കുന്നു",
            "spokenSummary": "ജാതി സർട്ടിഫിക്കറ്റ് നിങ്ങളുടെ സംവരണ വിഭാഗം തെളിയിക്കുന്നു. സ്കൂൾ പ്രവേശനം, മത്സര പരീക്ഷകൾ, സർക്കാർ ജോലികൾ എന്നിവയ്ക്ക് ഇത് ആവശ്യമാണ്. ഫീസ് പതിനഞ്ച് രൂപയാണ്. പിതാവിന്റെ ജാതി രേഖ, സ്കൂൾ ടി.സി, ആധാർ കാർഡ് എന്നിവ കരുതുക.",
            "targetGroup": "അംഗീകൃത SC, ST, OBC, അല്ലെങ്കിൽ EWS വിഭാഗത്തിൽപ്പെട്ട പൗരന്മാർ",
            "incomeLimit": "ഒ.ബി.സി നോൺ-ക്രീമിലെയർ / ഇ.ഡബ്ല്യു.എസ് പരിധി: ₹8 ലക്ഷം",
            "residenceRequirement": "സംസ്ഥാനത്ത് പാരമ്പര്യമായി സ്ഥിരതാമസമുള്ളവർ",
            "questions": [
                {"id": "category", "question": "നിങ്ങൾ അംഗീകൃത സംവരണ വിഭാഗത്തിൽപ്പെട്ട ആളാണോ (SC, ST, OBC, അല്ലെങ്കിൽ EWS)?", "explanation": "സർക്കാർ പട്ടികയിൽ ഉൾപ്പെട്ട വിഭാഗമാണെന്ന് ഉറപ്പാക്കുക."},
                {"id": "paternal_record", "question": "പിതാവിന്റെയോ പിതൃവഴിയിലെ ബന്ധുക്കളുടെയോ ജാതി സർട്ടിഫിക്കറ്റ് ലഭ്യമാണോ?", "explanation": "പിതാവിന്റെ രേഖകൾ നിയമപരമായ പ്രധാന തെളിവാണ്."},
                {"id": "school_tc", "question": "ജാതി രേഖപ്പെടുത്തിയ സ്കൂൾ ടി.സി (TC) അല്ലെങ്കിൽ ജനന സർട്ടിഫിക്കറ്റ് ഉണ്ടോ?", "explanation": "സ്കൂൾ രേഖയിലെ ജാതി വിവരങ്ങൾ പരിഗണിക്കും."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "കുടുംബ രേഖകൾ ശേഖരിക്കുക", "instruction": "പിതാവിന്റെ സ്കൂൾ ടിസി അല്ലെങ്കിൽ പഴയ സർട്ടിഫിക്കറ്റ് കണ്ടെത്തുക.", "tip": "പിതാവിന്റെ രേഖകൾ അത്യന്താപേക്ഷിതം."},
                {"stepNumber": 2, "title": "അക്ഷയ കേന്ദ്രം വഴി അപേക്ഷിക്കുക", "instruction": "ഇ-ഡിസ്ട്രിക്റ്റ് പോർട്ടൽ വഴിയോ അക്ഷയ വഴിയോ ഫോം സമർപ്പിക്കുക.", "tip": "സാക്ഷ്യപ്പെടുത്തിയ പകർപ്പുകൾ മാത്രം നൽകുക."},
                {"stepNumber": 3, "title": "റവന്യൂ ഉദ്യോഗസ്ഥരുടെ പരിശോധന", "instruction": "വില്ലേജ് ഓഫീസർ നേരിട്ട് അന്വേഷണം നടത്തി റിപ്പോർട്ട് നൽകുന്നു.", "tip": "നാട്ടുകാരുടെ മൊഴി രേഖപ്പെടുത്താം."},
                {"stepNumber": 4, "title": "ഡിജിറ്റൽ സർട്ടിഫിക്കറ്റ് ഡൗൺലോഡ് ചെയ്യുക", "instruction": "അംഗീകാരം ലഭിച്ച സർട്ടിഫിക്കറ്റ് ഓൺലൈനായി ഡൗൺലോഡ് ചെയ്യാം.", "tip": "ഡിജിറ്റൽ ക്യുആർ കോഡ് പരിശോധിക്കുക."}
            ],
            "requiredDocuments": [
                "പിതാവിന്റെയോ അടുത്ത ബന്ധുവിന്റെയോ ജാതി സർട്ടിഫിക്കറ്റ്",
                "ജാതി രേഖപ്പെടുത്തിയ സ്കൂൾ ടി.സി (TC)",
                "അപേക്ഷകന്റെ ആധാർ കാർഡ്",
                "ജാതി സത്യവാങ്മൂലം"
            ]
        }
    },

    # 3. RESIDENCE CERTIFICATE
    "residence-certificate": {
        "en": {
            "title": "Residence / Domicile Certificate",
            "shortDescription": "Official proof of continuous residence within the state required for state job quotas, local admissions, and housing schemes.",
            "processingTime": "7 to 10 Working Days",
            "officialFee": "₹15 (Fixed Regulated Fee)",
            "benefitAmount": "Mandatory for state government jobs and state college quota seats",
            "spokenSummary": "The Residence or Domicile Certificate proves you live in this state. It is needed for state college quotas, local job preferences, and government housing. The official fee is fifteen rupees. You need your electricity bill or rental deed, voter ID, and school study certificates.",
            "targetGroup": "Permanent residents needing local domicile quota proof",
            "incomeLimit": "No income ceiling applies for domicile determination",
            "residenceRequirement": "Continuous residency of at least 3 to 7 years in the state",
            "questions": [
                {"id": "tenure", "question": "Have you lived in this state continuously for at least 3 years?", "explanation": "Standard statutory requirement for state domicile quota."},
                {"id": "local_id", "question": "Do you hold a local Voter ID, Aadhaar, or state ration card with current address?", "explanation": "Validates physical territorial presence."},
                {"id": "education_proof", "question": "Do you have local school study certificates or utility bills in your family name?", "explanation": "Consecutive proof of residency."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "Collect Address Records", "instruction": "Gather electricity bills, rent agreement, or school study certificates.", "tip": "Ensure continuous year records."},
                {"stepNumber": 2, "title": "Submit Domicile Application", "instruction": "File online on e-District portal or at citizen service counter.", "tip": "Keep original utility bills for verification."},
                {"stepNumber": 3, "title": "Local Village Officer Report", "instruction": "Talathi or VAO verifies continuous stay at given address.", "tip": "Neighbor confirmation may be sought."},
                {"stepNumber": 4, "title": "Download Domicile Certificate", "instruction": "Get digitally authenticated residence certificate.", "tip": "Valid for all state quota applications."}
            ],
            "requiredDocuments": [
                "Continuous electricity bills or water tax receipts",
                "Aadhaar Card or Voter Identity Card with current address",
                "School study certificates for consecutive years",
                "Registered rent deed or property registry"
            ]
        },
        "te": {
            "title": "నివాస ధ్రువీకరణ పత్రం (Residence / Domicile Certificate)",
            "shortDescription": "రాష్ట్ర ప్రభుత్వ ఉద్యోగ కోటా, స్థానిక కళాశాల ప్రవేశాలు మరియు సంక్షేమ పథకాల కోసం నివాసాన్ని ధ్రువీకరించే అధికారిక పత్రం.",
            "processingTime": "7 నుండి 10 పనిదినాలు",
            "officialFee": "₹15 (నిర్ణీత ప్రభుత్వ రుసుము)",
            "benefitAmount": "స్థానిక రిజర్వేషన్ కోటా మరియు విద్యా ప్రవేశాలకు తప్పనిసరి",
            "spokenSummary": "నివాస ధ్రువీకరణ పత్రం మీరు ఈ రాష్ట్రంలో శాశ్వతంగా నివసిస్తున్నారని రుజువు చేస్తుంది. స్థానిక విద్యా కోటాలు, ప్రభుత్వ ఉద్యోగాలు మరియు గృహ నిర్మాణ పథకాలకు ఇది అవసరం. అధికారిక రుసుము కేవలం పదిహేను రూపాయలు. మీ కరెంట్ బిల్లు, ఆధార్ లేదా ఓటరు కార్డు, పాఠశాల స్టడీ సర్టిఫికెట్లు అవసరం.",
            "targetGroup": "స్థానిక కోటా లేదా రిజర్వేషన్ ప్రయోజనాలు కోరే శాశ్వత నివాసితులు",
            "incomeLimit": "నివాస ధ్రువీకరణకు ఎలాంటి ఆదాయ పరిమితి ఉండదు",
            "residenceRequirement": "రాష్ట్రంలో కనీసం 3 నుండి 7 సంవత్సరాల నిరంతర నివాసం",
            "questions": [
                {"id": "tenure", "question": "మీరు ఈ రాష్ట్రంలో కనీసం 3 సంవత్సరాలుగా నిరంతరంగా నివసిస్తున్నారా?", "explanation": "స్థానిక నివాస కోటా కోసం ప్రామాణిక చట్టబద్ధమైన నిబంధన."},
                {"id": "local_id", "question": "ప్రస్తుత చిరునామాతో స్థానిక ఓటరు కార్డు, ఆధార్ లేదా రేషన్ కార్డు ఉందా?", "explanation": "భౌతిక నివాస ఉనికిని ధ్రువీకరిస్తుంది."},
                {"id": "education_proof", "question": "స్థానిక పాఠశాల స్టడీ సర్టిఫికెట్లు లేదా మీ కుటుంబం పేరుపై యుటిలిటీ బిల్లులు ఉన్నాయా?", "explanation": "వరుస సంవత్సరాల నివాస రుజువుగా ఉపయోగపడుతుంది."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "చిరునామా రికార్డులు సేకరించండి", "instruction": "కరెంట్ బిల్లులు, ఇంటి పన్ను రసీదులు లేదా స్కూల్ స్టడీ సర్టిఫికెట్లు ఒకచోట చేర్చండి.", "tip": "వరుస సంవత్సరాల బిల్లులు భద్రపరచండి."},
                {"stepNumber": 2, "title": "దరఖాస్తు సమర్పించండి", "instruction": "మీ-సేవా కేంద్రం లేదా ఇ-డిస్ట్రిక్ట్ పోర్టల్ ద్వారా దరఖాస్తు చేయండి.", "tip": "అసలు పత్రాలను పరిశీలన కోసం సిద్ధంగా ఉంచండి."},
                {"stepNumber": 3, "title": "గ్రామ రెవెన్యూ అధికారి నివేదిక", "instruction": "వీఆర్వో లేదా రెవెన్యూ ఇన్‌స్పెక్టర్ మీ నివాసాన్ని పరిశీలించి ఆమోదిస్తారు.", "tip": "స్థానికుల వాంగ్మూలం తీసుకోవచ్చు."},
                {"stepNumber": 4, "title": "నివాస పత్రాన్ని పొందండి", "instruction": "డిజిటల్ సంతకం చేసిన సర్టిఫికెట్‌ను డౌన్‌లోడ్ చేసుకోండి.", "tip": "అన్ని స్థానిక కోటా దరఖాస్తులకు చెల్లుబాటు అవుతుంది."}
            ],
            "requiredDocuments": [
                "నిరంతర కరెంట్ బిల్లులు లేదా ఇంటి పన్ను రసీదులు",
                "ప్రస్తుత చిరునామాతో ఆధార్ లేదా ఓటరు కార్డు",
                "వరుస సంవత్సరాల పాఠశాల స్టడీ సర్టిఫికెట్లు",
                "రిజిస్టర్డ్ అద్దె ఒప్పందం లేదా ఆస్తి పత్రాలు"
            ]
        },
        "kn": {
            "title": "ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರ (Residence / Domicile Certificate)",
            "shortDescription": "ಸ್ಥಳೀಯ ಕೋಟಾ, ರಾಜ್ಯ ಸರ್ಕಾರಿ ಉದ್ಯೋಗಗಳು ಮತ್ತು ಶಾಲಾ ಕಾಲೇಜು ಪ್ರವೇಶಕ್ಕಾಗಿ ನಿರಂತರ ನಿವಾಸವನ್ನು ಸಾಬೀತುಪಡಿಸುವ ಅಧಿಕೃತ ದಾಖಲೆ.",
            "processingTime": "7 ರಿಂದ 10 ಕೆಲಸದ ದಿನಗಳು",
            "officialFee": "₹15 (ನಿಗದಿತ ಪೋರ್ಟಲ್ ಶುಲ್ಕ)",
            "benefitAmount": "ಸ್ಥಳೀಯ ಮೀಸಲಾತಿ ಮತ್ತು ಶಿಕ್ಷಣ ಸೀಟುಗಳಿಗೆ ಅನಿವಾರ್ಯ",
            "spokenSummary": "ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರವು ನೀವು ಈ ರಾಜ್ಯದ ಖಾಯಂ ನಿವಾಸಿ ಎಂಬುದನ್ನು ಸಾಬೀತುಪಡಿಸುತ್ತದೆ. ಸ್ಥಳೀಯ ಮೀಸಲಾತಿ, ಸರ್ಕಾರಿ ಮನೆ ಹಂಚಿಕೆ ಮತ್ತು ಶಿಕ್ಷಣ ಸೀಟುಗಳಿಗೆ ಇದು ಅಗತ್ಯ. ಶುಲ್ಕ ಹದಿನೈದು ರೂಪಾಯಿಗಳು. ವಿದ್ಯುತ್ ಬಿಲ್, ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಶಾಲಾ ಸ್ಟಡಿ ಸರ್ಟಿಫಿಕೇಟ್ ಸಿದ್ಧವಾಗಿರಲಿ.",
            "targetGroup": "ಸ್ಥಳೀಯ ಮೀಸಲಾತಿ ಬಯಸುವ ರಾಜ್ಯದ ಖಾಯಂ ನಿವಾಸಿಗಳು",
            "incomeLimit": "ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ಯಾವುದೇ ಆದಾಯದ ಮಿತಿಯಿಲ್ಲ",
            "residenceRequirement": "ರಾಜ್ಯದಲ್ಲಿ ಕನಿಷ್ಠ 3 ರಿಂದ 7 ವರ್ಷಗಳ ನಿರಂತರ ವಾಸ್ತವ್ಯ",
            "questions": [
                {"id": "tenure", "question": "ನೀವು ಈ ರಾಜ್ಯದಲ್ಲಿ ಕನಿಷ್ಠ 3 ವರ್ಷಗಳಿಂದ ನಿರಂತರವಾಗಿ ವಾಸಿಸುತ್ತಿದ್ದೀರಾ?", "explanation": "ಸ್ಥಳೀಯ ನಿವಾಸಿ ಕೋಟಾ ಪಡೆಯಲು ಶಾಸನಬದ್ಧ ಅಗತ್ಯ ನಿಯಮ."},
                {"id": "local_id", "question": "ಪ್ರಸ್ತುತ ವಿಳಾಸ ಹೊಂದಿರುವ ಸ್ಥಳೀಯ ವೋಟರ್ ಐಡಿ, ಆಧಾರ್ ಅಥವಾ ರೇಷನ್ ಕಾರ್ಡ್ ಇದೆಯೇ?", "explanation": "ಭೌತಿಕ ವಾಸ್ತವ್ಯವನ್ನು ದೃಢೀಕರಿಸುತ್ತದೆ."},
                {"id": "education_proof", "question": "ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಸ್ಥಳೀಯ ಶಾಲಾ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣಪತ್ರ (Study Certificate) ಅಥವಾ ಯುಟಿಲಿಟಿ ಬಿಲ್ ಇದೆಯೇ?", "explanation": "ಸತತ ವಾಸ್ತವ್ಯದ ದಾಖಲೆಯಾಗಿದೆ."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ವಿಳಾಸ ದಾಖಲೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ", "instruction": "ವಿದ್ಯುತ್ ಬಿಲ್, ಮನೆ ಬಾಡಿಗೆ ಕರಾರು ಅಥವಾ ಶಾಲಾ ಸ್ಟಡಿ ಸರ್ಟಿಫಿಕೇಟ್‌ಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸಿ.", "tip": "ಸತತ ವರ್ಷಗಳ ಬಿಲ್‌ಗಳನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ."},
                {"stepNumber": 2, "title": "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ", "instruction": "ನಾಡಕಚೇರಿ ಅಥವಾ ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.", "tip": "ಮೂಲ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲನೆಗೆ ಇಟ್ಟುಕೊಳ್ಳಿ."},
                {"stepNumber": 3, "title": "ಗ್ರಾಮ ಲೆಕ್ಕಿಗರ ಸ್ಥಳ ಪರಿಶೀಲನೆ", "instruction": "ಗ್ರಾಮ ಲೆಕ್ಕಿಗರು ನಿಮ್ಮ ವಾಸ್ತವ್ಯವನ್ನು ಸ್ಥಳದಲ್ಲೇ ಪರಿಶೀಲಿಸಿ ವರದಿ ನೀಡುತ್ತಾರೆ.", "tip": "ನೆರೆಹೊರೆಯವರ ಸಾಕ್ಷ್ಯ ಪಡೆಯಬಹುದು."},
                {"stepNumber": 4, "title": "ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ", "instruction": "ಡಿಜಿಟಲ್ ಸಹಿ ಹೊಂದಿರುವ ಪ್ರಮಾಣಪತ್ರವನ್ನು ನೇರವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.", "tip": "ಎಲ್ಲಾ ಸ್ಥಳೀಯ ಕೋಟಾಗಳಿಗೆ ಮಾನ್ಯವಾಗಿದೆ."}
            ],
            "requiredDocuments": [
                "ನಿರಂತರ ವಿದ್ಯುತ್ ಬಿಲ್ ಅಥವಾ ಆಸ್ತಿ ತೆರಿಗೆ ರಸೀದಿ",
                "ಪ್ರಸ್ತುತ ವಿಳಾಸವಿರುವ ಆಧಾರ್ ಕಾರ್ಡ್ ಅಥವಾ ವೋಟರ್ ಐಡಿ",
                "ಸತತ ವರ್ಷಗಳ ಶಾಲಾ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣಪತ್ರ (Study Certificate)",
                "ನೋಂದಾಯಿತ ಬಾಡಿಗೆ ಒಪ್ಪಂದ ಅಥವಾ ಸ್ವಂತ ಮನೆ ದಾಖಲೆ"
            ]
        },
        "hi": {
            "title": "निवास / मूल निवास प्रमाण पत्र (Residence Certificate)",
            "shortDescription": "राज्य के भीतर निरंतर निवास का आधिकारिक प्रमाण जो स्थानीय नौकरी कोटे, स्कूल प्रवेश और सरकारी योजनाओं के लिए आवश्यक है।",
            "processingTime": "7 से 10 कार्य दिवस",
            "officialFee": "₹15 (निर्धारित सरकारी शुल्क)",
            "benefitAmount": "राज्य स्तरीय नौकरियों और कॉलेज आरक्षण के लिए अनिवार्य",
            "spokenSummary": "मूल निवास प्रमाण पत्र यह प्रमाणित करता है कि आप इस राज्य के स्थायी निवासी हैं। यह सरकारी नौकरियों, स्थानीय प्रवेश कोटे और आवास योजनाओं के लिए आवश्यक है। शुल्क मात्र पंद्रह रुपये है। बिजली बिल, आधार या वोटर कार्ड और स्कूल अध्ययन प्रमाण पत्र साथ रखें।",
            "targetGroup": "स्थानीय अधिवास और कोटे के लिए पात्र स्थायी निवासी",
            "incomeLimit": "निवास प्रमाण पत्र के लिए कोई आय सीमा लागू नहीं होती",
            "residenceRequirement": "राज्य में कम से कम 3 से 7 वर्षों का निरंतर निवास",
            "questions": [
                {"id": "tenure", "question": "क्या आप इस राज्य में लगातार कम से कम 3 वर्षों से रह रहे हैं?", "explanation": "राज्य अधिवास कोटे के लिए वैधानिक आवश्यकता।"},
                {"id": "local_id", "question": "क्या आपके पास वर्तमान पते का वोटर आईडी, आधार या राशन कार्ड है?", "explanation": "भौतिक क्षेत्रीय उपस्थिति को मान्य करता है।"},
                {"id": "education_proof", "question": "क्या आपके पास स्थानीय स्कूल अध्ययन प्रमाण पत्र या परिवार के नाम बिजली बिल है?", "explanation": "लगातार निवास का पुख्ता प्रमाण।"}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "पते के प्रमाण एकत्र करें", "instruction": "बिजली बिल, किराया समझौता या स्कूल प्रमाण पत्र एकत्र करें।", "tip": "लगातार वर्षों के रिकॉर्ड रखें।"},
                {"stepNumber": 2, "title": "पोर्टल पर आवेदन करें", "instruction": "ई-डिस्ट्रिक्ट पोर्टल या नजदीकी जन सेवा केंद्र पर आवेदन करें।", "tip": "सत्यापन हेतु मूल प्रतियां तैयार रखें।"},
                {"stepNumber": 3, "title": "पटवारी / लेखपाल रिपोर्ट", "instruction": "क्षेत्रीय अधिकारी मौके पर जाकर निरंतर निवास का सत्यापन करते हैं।", "tip": "पड़ोसियों से गवाही ली जा सकती है।"},
                {"stepNumber": 4, "title": "मूल निवास प्रमाण पत्र प्राप्त करें", "instruction": "सत्यापन पश्चात डिजिटल हस्ताक्षरित प्रमाण पत्र डाउनलोड करें।", "tip": "सभी राज्य स्तरीय भर्तियों के लिए मान्य।"}
            ],
            "requiredDocuments": [
                "लगातार बिजली बिल या हाउस टैक्स रसीद",
                "वर्तमान पते वाला आधार कार्ड या वोटर आईडी",
                "स्कूल का अध्ययन प्रमाण पत्र (Study Certificate)",
                "रजिस्टर्ड रेंट एग्रीमेंट या मकान की रजिस्ट्री"
            ]
        },
        "ta": {
            "title": "இருப்பிடச் சான்றிதழ் (Residence / Domicile Certificate)",
            "shortDescription": "மாநில அரசு வேலைகள், கல்லூரிகளில் உள்ளூர் ஒதுக்கீடு மற்றும் வீட்டு வசதித் திட்டங்களுக்குத் தேவையான இருப்பிடச் சான்று.",
            "processingTime": "7 முதல் 10 வேலை நாட்கள்",
            "officialFee": "₹15 (அரசு போர்டல் கட்டணம்)",
            "benefitAmount": "உள்ளூர் வேலைவாய்ப்பு மற்றும் கல்வி இடஒதுக்கீட்டிற்கு கட்டாயம் தேவை",
            "spokenSummary": "இருப்பிடச் சான்றிதழ் நீங்கள் இந்த மாநிலத்தில் வசிக்கிறீர்கள் என்பதை நிரூபிக்கிறது. மாநில அரசுப் பணிகள், கல்லூரிகளில் உள்ளூர் இடஒதுக்கீடு மற்றும் அரசு வீடுகளுக்கு இது தேவை. கட்டணம் பதினைந்து ரூபாய் மட்டுமே. மின் கட்டண ரசீது, ஆதார் மற்றும் பள்ளிப் படிப்பு சான்றிதழ் தேவைப்படும்.",
            "targetGroup": "உள்ளூர் ஒதுக்கீடு மற்றும் உரிமைகளைப் பெற விரும்பும் நிரந்தர வாசிகள்",
            "incomeLimit": "இருப்பிடச் சான்றிதழுக்கு வருமான வரம்பு இல்லை",
            "residenceRequirement": "மாநிலத்தில் குறைந்தபட்சம் 3 முதல் 7 ஆண்டுகள் தொடர் குடியிருப்பு",
            "questions": [
                {"id": "tenure", "question": "இந்த மாநிலத்தில் குறைந்தது 3 ஆண்டுகள் தொடர்ந்து வசித்து வருகிறீர்களா?", "explanation": "உள்ளூர் ஒதுக்கீட்டைப் பெற தேவையான சட்டபூர்வ விதிமுறை."},
                {"id": "local_id", "question": "தற்போதைய முகவரியுடன் வாக்காளர் அட்டை, ஆதார் அல்லது குடும்ப அட்டை உள்ளதா?", "explanation": "இருப்பிடத்தை உறுதிப்படுத்தும் அடையாள ஆவணம்."},
                {"id": "education_proof", "question": "பள்ளி படிப்புச் சான்றிதழ்கள் (Study Certificate) அல்லது பயன்பாட்டு கட்டண ரசீதுகள் உள்ளதா?", "explanation": "தொடர் குடியிருப்பை நிரூபிக்கும் சான்று."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "இருப்பிட ஆவணங்களை திரட்டவும்", "instruction": "மின் கட்டண ரசீதுகள், வாடகை ஒப்பந்தம் அல்லது பள்ளி படிப்புச் சான்றிதழை சேகரிக்கவும்.", "tip": "தொடர்ச்சியான ஆண்டுகளின் ரசீதுகளை வைக்கவும்."},
                {"stepNumber": 2, "title": "விண்ணப்பம் சமர்ப்பிக்கவும்", "instruction": "இ-சேவை போர்டல் அல்லது இ-சேவை மையத்தில் விண்ணப்பிக்கவும்.", "tip": "அசல் ஆவணங்களை தயார் நிலையில் வைத்திருக்கவும்."},
                {"stepNumber": 3, "title": "கிராம நிர்வாக அலுவலர் (VAO) அறிக்கை", "instruction": "விஏஓ மற்றும் வருவாய் ஆய்வாளர் உங்கள் தொடர் குடியிருப்பினை கள ஆய்வு செய்வர்.", "tip": "அக்கம்பக்கத்தினர் சாட்சியம் பெறப்படலாம்."},
                {"stepNumber": 4, "title": "இருப்பிடச் சான்றிதழைப் பெறவும்", "instruction": "டிஜிட்டல் கையொப்பமிட்ட சான்றிதழை போர்ட்டலில் இருந்து பதிவிறக்கவும்.", "tip": "அனைத்து அரசு ஒதுக்கீடுகளுக்கும் செல்லுபடியாகும்."}
            ],
            "requiredDocuments": [
                "மின்சாரக் கட்டண ரசீதுகள் அல்லது குடிநீர் வரி ரசீதுகள்",
                "தற்போதைய முகவரியுடன் கூடிய ஆதார் அல்லது வாக்காளர் அட்டை",
                "பள்ளியில் பெற்ற படிப்புச் சான்றிதழ் (Study Certificate)",
                "பதிவு செய்யப்பட்ட வாடகை ஒப்பந்தம் அல்லது வீட்டுப் பத்திரம்"
            ]
        },
        "ml": {
            "title": "താമസ സർട്ടിഫിക്കറ്റ് (Residence / Domicile Certificate)",
            "shortDescription": "സംസ്ഥാനത്തെ സർക്കാർ ജോലികൾ, വിദ്യാഭ്യാസ സംവരണം, മറ്റ് ആനുകൂല്യങ്ങൾ എന്നിവയ്ക്കായി സ്ഥിരതാമസം തെളിയിക്കുന്ന രേഖ.",
            "processingTime": "7 മുതൽ 10 പ്രവൃത്തിദിനങ്ങൾ",
            "officialFee": "₹15 (ഔദ്യോഗിക നിരക്ക്)",
            "benefitAmount": "സംസ്ഥാന സർവീസ് ജോലികൾക്കും അഡ്മിഷൻ സംവരണത്തിനും നിർബന്ധം",
            "spokenSummary": "റെസിഡൻസ് സർട്ടിഫിക്കറ്റ് നിങ്ങൾ ഇവിടെ സ്ഥിരതാമസമാണെന്ന് തെളിയിക്കുന്നു. കോളേജ് പ്രവേശനം, പ്രാദേശിക സംവരണം എന്നിവയ്ക്ക് ഇത് അത്യാവശ്യമാണ്. ഫീസ് പതിനഞ്ച് രൂപയാണ്. വൈദ്യുതി ബിൽ, ആധാർ, സ്കൂൾ സർട്ടിഫിക്കറ്റ് എന്നിവ തയ്യാറാക്കി വയ്ക്കുക.",
            "targetGroup": "പ്രാദേശിക സംവരണം ആവശ്യമുള്ള സ്ഥിരതാമസക്കാർ",
            "incomeLimit": "താമസ സർട്ടിഫിക്കറ്റിന് വരുമാന പരിധി ബാധകമല്ല",
            "residenceRequirement": "സംസ്ഥാനത്ത് കുറഞ്ഞത് 3 മുതൽ 7 വർഷം വരെയുള്ള സ്ഥിരതാമസം",
            "questions": [
                {"id": "tenure", "question": "നിങ്ങൾ ഈ സംസ്ഥാനത്ത് കുറഞ്ഞത് 3 വർഷമായി സ്ഥിരമായി താമസിക്കുന്നുണ്ടോ?", "explanation": "പ്രാദേശിക സംവരണത്തിന് ആവശ്യമായ വ്യവസ്ഥ."},
                {"id": "local_id", "question": "നിലവിലെ വിലാസമുള്ള വോട്ടർ ഐഡി, ആധാർ അല്ലെങ്കിൽ റേഷൻ കാർഡ് ഉണ്ടോ?", "explanation": "സ്ഥിരതാമസം തെളിയിക്കുന്ന പ്രധാന രേഖ."},
                {"id": "education_proof", "question": "സ്കൂൾ പഠന സർട്ടിഫിക്കറ്റുകളോ കുടുംബത്തിന്റെ പേരിലുള്ള വൈദ്യുതി ബില്ലോ ലഭ്യമാണോ?", "explanation": "തുടർച്ചയായ താമസത്തിന്റെ തെളിവ്."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "രേഖകൾ ശേഖരിക്കുക", "instruction": "വൈദ്യുതി ബിൽ, വാടക കരാർ അല്ലെങ്കിൽ സ്കൂൾ സർട്ടിഫിക്കറ്റുകൾ ശേഖരിക്കുക.", "tip": "തുടർച്ചയായ വർഷങ്ങളിലെ രേഖകൾ കരുതുക."},
                {"stepNumber": 2, "title": "അപേക്ഷ സമർപ്പിക്കുക", "instruction": "ഇ-ഡിസ്ട്രിക്റ്റ് പോർട്ടൽ വഴിയോ അക്ഷയ കേന്ദ്രം വഴിയോ അപേക്ഷിക്കുക.", "tip": "അസൽ രേഖകൾ കയ്യിൽ കരുതുക."},
                {"stepNumber": 3, "title": "വില്ലേജ് ഓഫീസർ പരിശോധന", "instruction": "വില്ലേജ് ഓഫീസർ സ്ഥലപരിശോധന നടത്തി റിപ്പോർട്ട് സമർപ്പിക്കുന്നു.", "tip": "അയൽവാസികളിൽ നിന്ന് മൊഴി ശേഖരിക്കാം."},
                {"stepNumber": 4, "title": "സർട്ടിഫിക്കറ്റ് ഡൗൺലോഡ് ചെയ്യുക", "instruction": "ഡിജിറ്റൽ ഒപ്പുള്ള സർട്ടിഫിക്കറ്റ് ഓൺലൈനായി ഡൗൺലോഡ് ചെയ്യുക.", "tip": "എല്ലാ ഔദ്യോഗിക ആവശ്യങ്ങൾക്കും സാധുതയുണ്ട്."}
            ],
            "requiredDocuments": [
                "തുടർച്ചയായ വൈദ്യുതി ബില്ലുകൾ അല്ലെങ്കിൽ നികുതി രസീത്",
                "നിലവിലെ വിലാസമുള്ള ആധാർ കാർഡ് അല്ലെങ്കിൽ വോട്ടർ ഐഡി",
                "സ്കൂൾ പഠന സർട്ടിഫിക്കറ്റ് (Study Certificate)",
                "രജിസ്റ്റർ ചെയ്ത വാടകക്കരാർ അല്ലെങ്കിൽ ഉടമസ്ഥാവകാശ രേഖ"
            ]
        }
    },

    # 4. SCHOLARSHIP GUIDANCE
    "scholarship-guidance": {
        "en": {
            "title": "Scholarship Guidance",
            "shortDescription": "Application pathway for pre-matric, post-matric, and merit-cum-means educational financial assistance schemes.",
            "processingTime": "30 to 45 Working Days",
            "officialFee": "₹0 (Completely Free of Cost)",
            "benefitAmount": "Direct fee reimbursement up to ₹50,000 + monthly maintenance allowance",
            "spokenSummary": "Government scholarships provide tuition fee waivers and monthly living allowance for eligible students. The service is completely free with zero government fee. You need your admission fee receipt, marks card, caste and income certificate, and Aadhaar seeded bank account.",
            "targetGroup": "Pre-matric, post-matric, and higher education students from eligible categories",
            "incomeLimit": "Gross family annual income ceiling usually up to ₹2.5 Lakhs (varies by scheme)",
            "residenceRequirement": "State resident enrolled in recognized educational institution",
            "questions": [
                {"id": "student_enrolled", "question": "Are you currently enrolled in a recognized school, college, or university course?", "explanation": "Course must be recognized by state or UGC/AICTE."},
                {"id": "income_criteria", "question": "Does your family annual gross income fall below the scheme ceiling (usually ₹2.5L)?", "explanation": "Requires an active Income Certificate."},
                {"id": "bank_aadhaar", "question": "Do you have an active savings bank account linked with Aadhaar NPCI seeding?", "explanation": "Direct Benefit Transfer goes straight to student account."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "Obtain Income & Caste Certificates", "instruction": "Keep updated digital certificates ready before portal closes.", "tip": "Certificates must be valid for current academic year."},
                {"stepNumber": 2, "title": "Register on National/State Scholarship Portal", "instruction": "Create student login on NSP or state portal (e.g. SSP).", "tip": "Save your Student Application ID."},
                {"stepNumber": 3, "title": "College Nodal Officer Verification", "instruction": "College administration verifies admission and marks records.", "tip": "Submit physical copies to college office."},
                {"stepNumber": 4, "title": "Direct Benefit Transfer to Bank", "instruction": "Scholarship amount credited directly to Aadhaar-seeded bank account.", "tip": "Check Aadhaar DBT bank linking status."}
            ],
            "requiredDocuments": [
                "Current academic year college fee receipt",
                "Previous year mark sheet / Grade card",
                "Digitally signed Income & Caste Certificates",
                "Aadhaar seeded bank passbook copy"
            ]
        },
        "te": {
            "title": "స్కాలర్‌షిప్ మార్గదర్శకం (Scholarship Guidance)",
            "shortDescription": "ప్రీ-మెట్రిక్, పోస్ట్-మెట్రిక్ మరియు మెరిట్ ఆధారిత విద్యా ఉపకార వేతనాల దరఖాస్తు మార్గదర్శి.",
            "processingTime": "30 నుండి 45 పనిదినాలు",
            "officialFee": "₹0 (పూర్తిగా ఉచితం)",
            "benefitAmount": "పూర్తి ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ + ప్రతి నెలా భత్యం",
            "spokenSummary": "ప్రభుత్వ స్కాలర్‌షిప్‌లు ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ మరియు నెలవారీ ఉపకార వేతనాన్ని అందిస్తాయి. దీనికి ఎలాంటి ప్రభుత్వ రుసుము లేదు. మీ కళాశాల ఫీజు రసీదు, మార్కుల జాబితా, కుల ఆదాయ సర్టిఫికెట్లు మరియు ఆధార్ లింక్ అయిన బ్యాంకు ఖాతా అవసరం.",
            "targetGroup": "గుర్తింపు పొందిన విద్యాసంస్థల్లో చదువుతున్న అర్హులైన విద్యార్థులు",
            "incomeLimit": "వార్షిక కుటుంబ ఆదాయం ₹2.5 లక్షల లోపు ఉండాలి (పథకాన్ని బట్టి మారుతుంది)",
            "residenceRequirement": "రాష్ట్రంలో నివసిస్తూ గుర్తింపు పొందిన కోర్సులో చదువుతున్న విద్యార్థి",
            "questions": [
                {"id": "student_enrolled", "question": "మీరు గుర్తింపు పొందిన పాఠశాల లేదా కళాశాలలో ప్రస్తుత కోర్సులో చేరారా?", "explanation": "కోర్సు ప్రభుత్వం లేదా యూజీసీ/ఏఐసీటీఈ గుర్తింపు పొంది ఉండాలి."},
                {"id": "income_criteria", "question": "మీ కుటుంబ వార్షిక ఆదాయం నిర్దేశిత పరిమితి (సాధారణంగా ₹2.5 లక్షలు) లోపు ఉందా?", "explanation": "చెల్లుబాటు అయ్యే ఆదాయ ధ్రువీకరణ పత్రం అవసరం."},
                {"id": "bank_aadhaar", "question": "మీ వద్ద ఆధార్ ఎన్‌పీసీఐతో లింక్ చేయబడిన బ్యాంక్ సేవింగ్స్ ఖాతా ఉందా?", "explanation": "స్కాలర్‌షిప్ మొత్తం నేరుగా డీబీటీ ద్వారా బ్యాంకు ఖాతాకు చేరుతుంది."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ఆదాయ, కుల పత్రాలు సిద్ధం చేయండి", "instruction": "పోర్టల్ గడువు ముగిసేలోపు తాజా డిజిటల్ సర్టిఫికెట్లు పొందండి.", "tip": "సర్టిఫికెట్లు ప్రస్తుత విద్యా సంవత్సరానికి చెల్లుబాటు కావాలి."},
                {"stepNumber": 2, "title": "స్కాలర్‌షిప్ పోర్టల్‌లో నమోదు చేసుకోండి", "instruction": "జాతీయ (NSP) లేదా రాష్ట్ర జ్ఞానభూమి పోర్టల్‌లో లాగిన్ సృష్టించండి.", "tip": "మీ విద్యార్థి అప్లికేషన్ ఐడీని భద్రపరుచుకోండి."},
                {"stepNumber": 3, "title": "కళాశాల నోడల్ అధికారి ధ్రువీకరణ", "instruction": "కళాశాల యాజమాన్యం మీ ప్రవేశ వివరాలు మరియు మార్కులను ఆమోదిస్తుంది.", "tip": "ధ్రువీకరణ పత్రాల కాపీలను కళాశాలలో సమర్పించండి."},
                {"stepNumber": 4, "title": "నేరుగా బ్యాంకు ఖాతాకు జమ (DBT)", "instruction": "స్కాలర్‌షిప్ మొత్తం నేరుగా ఆధార్ లింక్ అయిన ఖాతాలో జమ అవుతుంది.", "tip": "డీబీటీ స్టేటస్ బ్యాంక్ లో చెక్ చేసుకోండి."}
            ],
            "requiredDocuments": [
                "ప్రస్తుత విద్యాసంవత్సరం కళాశాల ఫీజు రసీదు",
                "గత సంవత్సరం మార్కుల జాబితా (Marks Sheet)",
                "డిజిటల్ సంతకం చేసిన కుల, ఆదాయ పత్రాలు",
                "ఆధార్ లింక్ అయిన బ్యాంకు పాస్‌బుక్ కాపీ"
            ]
        },
        "kn": {
            "title": "ವಿದ್ಯಾರ್ಥಿವೇತನ ಮಾರ್ಗದರ್ಶಿ (Scholarship Guidance)",
            "shortDescription": "ಮೆಟ್ರಿಕ್ ಪೂರ್ವ, ಮೆಟ್ರಿಕ್ ನಂತರದ ಮತ್ತು ಮೆರಿಟ್ ಆಧಾರಿತ ಶೈಕ್ಷಣಿಕ ಆರ್ಥಿಕ ನೆರವು ಯೋಜನೆಗಳ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ.",
            "processingTime": "30 ರಿಂದ 45 ಕೆಲಸದ ದಿನಗಳು",
            "officialFee": "₹0 (ಸಂಪೂರ್ಣ ಉಚಿತ ಸೇವೆ)",
            "benefitAmount": "ಶುಲ್ಕ ಮರುಪಾವತಿ ಮತ್ತು ಮಾಸಿಕ ನಿರ್ವಹಣಾ ಭತ್ಯೆ",
            "spokenSummary": "ಸರ್ಕಾರಿ ವಿದ್ಯಾರ್ಥಿವೇತನವು ಶುಲ್ಕ ವಿನಾಯಿತಿ ಮತ್ತು ಮಾಸಿಕ ಭತ್ಯೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ. ಯಾವುದೇ ಸರ್ಕಾರಿ ಶುಲ್ಕವಿಲ್ಲ, ಉಚಿತ ಅರ್ಜಿ. ಕಾಲೇಜು ಪ್ರವೇಶ ರಸೀದಿ, ಅಂಕಪಟ್ಟಿ, ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಹಾಗೂ ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರುವ ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಗತ್ಯವಿದೆ.",
            "targetGroup": "ಅರ್ಹ ವರ್ಗಗಳ ಶಾಲಾ, ಕಾಲೇಜು ಮತ್ತು ಉನ್ನತ ಶಿಕ್ಷಣ ವಿದ್ಯಾರ್ಥಿಗಳು",
            "incomeLimit": "ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ಮಿತಿ ₹2.5 ಲಕ್ಷದ ಒಳಗಿರಬೇಕು (ಯೋಜನೆಗೆ ಅನುಗುಣವಾಗಿ)",
            "residenceRequirement": "ರಾಜ್ಯದ ಖಾಯಂ ನಿವಾಸಿ ವಿದ್ಯಾರ್ಥಿಯಾಗಿರಬೇಕು",
            "questions": [
                {"id": "student_enrolled", "question": "ನೀವು ಪ್ರಸ್ತುತ ಮಾನ್ಯತೆ ಪಡೆದ ಶಾಲೆ, ಕಾಲೇಜು ಅಥವಾ ವಿಶ್ವವಿದ್ಯಾಲಯದಲ್ಲಿ ಓದುತ್ತಿದ್ದೀರಾ?", "explanation": "ಕೋರ್ಸ್ ಸರ್ಕಾರ ಅಥವಾ ಯುಜಿಸಿ/ಎಐಸಿಟಿಇ ಮಾನ್ಯತೆ ಹೊಂದಿರಬೇಕು."},
                {"id": "income_criteria", "question": "ನಿಮ್ಮ ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯವು ನಿಗದಿತ ಮಿತಿಯೊಳಗೆ (ಸಾಮಾನ್ಯವಾಗಿ ₹2.5 ಲಕ್ಷ) ಇದೆಯೇ?", "explanation": "ಸಕ್ರಿಯ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅನಿವಾರ್ಯ."},
                {"id": "bank_aadhaar", "question": "ನಿಮ್ಮ ಬಳಿ ಆಧಾರ್ ಎನ್‌ಪಿಸಿಐ (NPCI) ಸೀಡಿಂಗ್ ಆಗಿರುವ ಬ್ಯಾಂಕ್ ಉಳಿತಾಯ ಖಾತೆ ಇದೆಯೇ?", "explanation": "ನೇರ ನಗದು ವರ್ಗಾವಣೆ (DBT) ನೇರವಾಗಿ ವಿದ್ಯಾರ್ಥಿ ಖಾತೆಗೆ ಜಮೆಯಾಗುತ್ತದೆ."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ", "instruction": "ಪೋರ್ಟಲ್ ಕೊನೆಯ ದಿನಾಂಕಕ್ಕೆ ಮುಂಚಿತವಾಗಿ ಡಿಜಿಟಲ್ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ.", "tip": "ಪ್ರಮಾಣಪತ್ರ ಪ್ರಸ್ತುತ ಶೈಕ್ಷಣಿಕ ವರ್ಷಕ್ಕೆ ಮಾನ್ಯವಾಗಿರಬೇಕು."},
                {"stepNumber": 2, "title": "ಸ್ಟೇಟ್ ಸ್ಕಾಲರ್‌ಶಿಪ್ ಪೋರ್ಟಲ್ (SSP) ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ", "instruction": "SSP ಅಥವಾ NSP ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ಖಾತೆ ರಚಿಸಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.", "tip": "ಅರ್ಜಿ ಸಂಖ್ಯೆಯನ್ನು (Student ID) ಬರೆದಿಟ್ಟುಕೊಳ್ಳಿ."},
                {"stepNumber": 3, "title": "ಕಾಲೇಜು ಇ-ದೃಢೀಕರಣ (e-Attestation)", "instruction": "ಕಾಲೇಜು ಆಡಳಿತ ಮಂಡಳಿಯು ಪ್ರವೇಶ ಮತ್ತು ಅಂಕಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.", "tip": "ದಾಖಲೆಗಳ ಪ್ರತಿಗಳನ್ನು ಕಾಲೇಜು ಕಚೇರಿಗೆ ಸಲ್ಲಿಸಿ."},
                {"stepNumber": 4, "title": "ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರ ಹಣ ಜಮೆ", "instruction": "ವಿದ್ಯಾರ್ಥಿವೇತನದ ಮೊತ್ತವು ನೇರವಾಗಿ ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆಯಾಗುತ್ತದೆ.", "tip": "ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ಆಧಾರ್ ಡಿಬಿಟಿ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ."}
            ],
            "requiredDocuments": [
                "ಪ್ರಸಕ್ತ ಸಾಲಿನ ಕಾಲೇಜು ಪ್ರವೇಶ ಶುಲ್ಕ ರಸೀದಿ",
                "ಹಿಂದಿನ ವರ್ಷದ ಅಂಕಪಟ್ಟಿ (Marks Card)",
                "ಡಿಜಿಟಲ್ ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರಗಳು",
                "ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರುವ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಜೆರಾಕ್ಸ್"
            ]
        },
        "hi": {
            "title": "छात्रवृत्ति मार्गदर्शन (Scholarship Guidance)",
            "shortDescription": "प्री-मैट्रिक, पोस्ट-मैट्रिक और मेधावी छात्रों के लिए वित्तीय सहायता और छात्रवृत्ति आवेदन प्रक्रिया।",
            "processingTime": "30 से 45 कार्य दिवस",
            "officialFee": "₹0 (पूर्णतः निःशुल्क)",
            "benefitAmount": "फीस प्रतिपूर्ति और मासिक गुजारा भत्ता",
            "spokenSummary": "सरकारी छात्रवृत्ति शिक्षण शुल्क माफी और मासिक भत्ता प्रदान करती है। यह सेवा पूरी तरह निःशुल्क है। आपको कॉलेज फीस रसीद, अंकतालिका, जाति और आय प्रमाण पत्र तथा आधार लिंक बैंक खाते की आवश्यकता होगी।",
            "targetGroup": "मान्यता प्राप्त संस्थानों में अध्ययनरत पात्र श्रेणियों के छात्र",
            "incomeLimit": "पारिवारिक वार्षिक आय सीमा सामान्यतः ₹2.5 लाख तक (योजना अनुसार)",
            "residenceRequirement": "राज्य का स्थायी निवासी छात्र होना आवश्यक",
            "questions": [
                {"id": "student_enrolled", "question": "क्या आप वर्तमान में किसी मान्यता प्राप्त स्कूल, कॉलेज या विश्वविद्यालय में नामांकित हैं?", "explanation": "पाठ्यक्रम यूजीसी/एआईसीटीई या राज्य सरकार द्वारा मान्यता प्राप्त होना चाहिए।"},
                {"id": "income_criteria", "question": "क्या आपके परिवार की वार्षिक आय योजना सीमा (सामान्यतः ₹2.5 लाख) के भीतर है?", "explanation": "वैध डिजिटल आय प्रमाण पत्र आवश्यक है।"},
                {"id": "bank_aadhaar", "question": "क्या आपके पास आधार एनपीसीआई (NPCI) से जुड़ा बैंक बचत खाता है?", "explanation": "डीबीटी के माध्यम से राशि सीधे छात्र के खाते में भेजी जाती है।"}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "आय व जाति प्रमाण पत्र तैयार रखें", "instruction": "अंतिम तिथि से पूर्व डिजिटल रूप से हस्ताक्षरित प्रमाण पत्र बनवाएं।", "tip": "प्रमाण पत्र चालू शैक्षणिक सत्र के लिए मान्य होना चाहिए।"},
                {"stepNumber": 2, "title": "राष्ट्रीय/राज्य छात्रवृत्ति पोर्टल पर पंजीकरण करें", "instruction": "एनएसपी (NSP) या राज्य पोर्टल पर छात्र आईडी बनाकर फॉर्म भरें।", "tip": "आवेदन क्रमांक (Application ID) सुरक्षित रखें।"},
                {"stepNumber": 3, "title": "संस्थान नोडल अधिकारी द्वारा सत्यापन", "instruction": "कॉलेज प्रशासन प्रवेश और अंकतालिका का सत्यापन करता है।", "tip": "संस्थान में आवश्यक प्रतियों का सेट जमा करें।"},
                {"stepNumber": 4, "title": "बैंक खाते में सीधे छात्रवृत्ति अंतरण", "instruction": "छात्रवृत्ति राशि आधार लिंक बैंक खाते में सीधे क्रेडिट होती है।", "tip": "बैंक में आधार डीबीटी सक्रियता जांचें।"}
            ],
            "requiredDocuments": [
                "चालू शैक्षणिक सत्र की कॉलेज फीस रसीद",
                "गत वर्ष की अंकतालिका / ग्रेड कार्ड",
                "डिजिटल हस्ताक्षरित आय एवं जाति प्रमाण पत्र",
                "आधार लिंक बैंक पासबुक की प्रति"
            ]
        },
        "ta": {
            "title": "கல்வி உதவித்தொகை வழிகாட்டுதல் (Scholarship Guidance)",
            "shortDescription": "பள்ளி மற்றும் கல்லூரி மாணவர்களுக்கான கல்வி உதவித்தொகை மற்றும் கட்டண விலக்குத் திட்டங்களின் வழிகாட்டி.",
            "processingTime": "30 முதல் 45 வேலை நாட்கள்",
            "officialFee": "₹0 (முற்றிலும் இலவசம்)",
            "benefitAmount": "முழுக் கல்விக் கட்டண விலக்கு மற்றும் மாதாந்திர உதவித்தொகை",
            "spokenSummary": "அரசு கல்வி உதவித்தொகை கல்விக் கட்டண விலக்கு மற்றும் மாதாந்திர பராமரிப்புத் தொகையை வழங்குகிறது. இதற்கு எந்த அரசு கட்டணமும் இல்லை. கல்லூரி கட்டண ரசீது, மதிப்பெண் பட்டியல், சாதி மற்றும் வருமானச் சான்றிதழ், ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கு தேவை.",
            "targetGroup": "அங்கீகரிக்கப்பட்ட கல்வி நிறுவனங்களில் பயிலும் தகுதியுள்ள மாணவர்கள்",
            "incomeLimit": "குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குள் இருக்க வேண்டும்",
            "residenceRequirement": "மாநிலத்தில் வசிக்கும் அங்கீகரிக்கப்பட்ட கல்லூரி மாணவர்",
            "questions": [
                {"id": "student_enrolled", "question": "அங்கீகரிக்கப்பட்ட பள்ளி அல்லது கல்லூரியில் தற்போது படித்து வருகிறீர்களா?", "explanation": "படிப்பு யுஜிசி/ஏஐசிடிஇ அல்லது அரசு அங்கீகாரம் பெற்றிருக்க வேண்டும்."},
                {"id": "income_criteria", "question": "குடும்ப ஆண்டு வருமானம் திட்ட வரம்பிற்குள் (பொதுவாக ₹2.5 லட்சம்) உள்ளதா?", "explanation": "செல்லுபடியாகும் வருமானச் சான்றிதழ் தேவை."},
                {"id": "bank_aadhaar", "question": "ஆதார் என்பிசிஐ (NPCI) இணைக்கப்பட்ட வங்கிக் கணக்கு உங்களிடம் உள்ளதா?", "explanation": "உதவித்தொகை நேரடியாக மாணவரின் வங்கிக் கணக்கில் வரவு வைக்கப்படும்."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "வருமானம் மற்றும் சாதிச் சான்றுகளைப் பெறவும்", "instruction": "காலக்கெடு முடிவதற்குள் புதிய டிஜிட்டல் சான்றிதழ்களைப் பெறவும்.", "tip": "நடப்புக் கல்வி ஆண்டிற்கு சான்றிதழ் செல்லுபடியாக வேண்டும்."},
                {"stepNumber": 2, "title": "உதவித்தொகை போர்ட்டலில் பதிவு செய்யவும்", "instruction": "தேசிய (NSP) அல்லது மாநில போர்ட்டலில் உள்நுழைந்து விண்ணப்பிக்கவும்.", "tip": "விண்ணப்ப எண்ணைப் பாதுகாப்பாக வைக்கவும்."},
                {"stepNumber": 3, "title": "கல்லூரி அலுவலர் சரிபார்ப்பு", "instruction": "கல்லூரி நிர்வாகம் சேர்க்கை மற்றும் மதிப்பெண்களை சரிபார்க்கும்.", "tip": "விண்ணப்ப நகலை கல்லூரியில் சமர்ப்பிக்கவும்."},
                {"stepNumber": 4, "title": "வங்கிக் கணக்கில் நேரடி வரவு (DBT)", "instruction": "உதவித்தொகைத் தொகை நேரடியாக வங்கிக் கணக்கில் வரவு வைக்கப்படுகிறது.", "tip": "ஆதார் டிபிடி இணைப்பை வங்கியில் உறுதிப்படுத்தவும்."}
            ],
            "requiredDocuments": [
                "நடப்பு கல்வி ஆண்டின் கல்லூரி கட்டண ரசீது",
                "முந்தைய ஆண்டு மதிப்பெண் பட்டியல்",
                "டிஜிட்டல் கையொப்பமிட்ட வருமானம் மற்றும் சாதிச் சான்றிதழ்",
                "ஆதார் இணைக்கப்பட்ட வங்கி கணக்குப் புத்தக நகல்"
            ]
        },
        "ml": {
            "title": "സ്കോളർഷിപ്പ് മാർഗ്ഗനിർദ്ദേശം (Scholarship Guidance)",
            "shortDescription": "പ്രീ-മെട്രിക്, പോസ്റ്റ്-മെട്രിക്, മെറിറ്റ് സ്കോളർഷിപ്പുകൾ എന്നിവയ്ക്കുള്ള അപേക്ഷാ വിവരങ്ങൾ.",
            "processingTime": "30 മുതൽ 45 പ്രവൃത്തിദിനങ്ങൾ",
            "officialFee": "₹0 (പൂർണ്ണമായും സൗജന്യം)",
            "benefitAmount": "ട്യൂഷൻ ഫീസ് ഇളവും പ്രതിമാസ സ്റ്റൈപ്പൻഡും",
            "spokenSummary": "സർക്കാർ സ്കോളർഷിപ്പുകൾ ഫീസ് ഇളവും പ്രതിമാസ അലവൻസും നൽകുന്നു. അപേക്ഷിക്കാൻ സർക്കാർ ഫീസില്ല. ഫീസ് രസീത്, മാർക്ക് ലിസ്റ്റ്, ജാതി-വരുമാന സർട്ടിഫിക്കറ്റുകൾ, ആധാർ ലിങ്ക് ചെയ്ത ബാങ്ക് അക്കൗണ്ട് എന്നിവ കരുതുക.",
            "targetGroup": "അംഗീകൃത സ്ഥാപനങ്ങളിൽ പഠിക്കുന്ന അർഹരായ വിദ്യാർത്ഥികൾ",
            "incomeLimit": "കുടുംബ വാർഷിക വരുമാനം ₹2.5 ലക്ഷത്തിൽ കവിയരുത്",
            "residenceRequirement": "സംസ്ഥാനത്തെ സ്ഥിരതാമസക്കാരനായ വിദ്യാർത്ഥി",
            "questions": [
                {"id": "student_enrolled", "question": "നിങ്ങൾ അംഗീകൃത സ്കൂളിലോ കോളേജിലോ നിലവിൽ പഠിക്കുന്നുണ്ടോ?", "explanation": "കോഴ്സ് അംഗീകൃത സ്ഥാപനത്തിന്റേതായിരിക്കണം."},
                {"id": "income_criteria", "question": "കുടുംബത്തിന്റെ വാർഷിക വരുമാനം നിശ്ചിത പരിധിയിലാണോ (സാധാരണ ₹2.5 ലക്ഷം)?", "explanation": "സാധുവായ വരുമാന സർട്ടിഫിക്കറ്റ് വേണം."},
                {"id": "bank_aadhaar", "question": "ആധാർ എൻ.പി.സി.ഐ (NPCI) ലിങ്ക് ചെയ്ത ബാങ്ക് സേവിംഗ്സ് അക്കൗണ്ട് ഉണ്ടോ?", "explanation": "ഡിബിറ്റി വഴി പണം നേരിട്ട് അക്കൗണ്ടിലെത്തും."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "സർട്ടിഫിക്കറ്റുകൾ തയ്യാറാക്കുക", "instruction": "തീയതി കഴിയുന്നതിന് മുൻപ് ജാതി-വരുമാന രേഖകൾ ലഭ്യമാക്കുക.", "tip": "നടപ്പ് അധ്യയന വർഷത്തെ രേഖകളായിരിക്കണം."},
                {"stepNumber": 2, "title": "പോർട്ടലിൽ രജിസ്റ്റർ ചെയ്യുക", "instruction": "നാഷണൽ സ്കോളർഷിപ്പ് പോർട്ടലിൽ അക്കൗണ്ട് തുറക്കുക.", "tip": "അപേക്ഷാ ഐഡി സൂക്ഷിക്കുക."},
                {"stepNumber": 3, "title": "കോളേജ് തലത്തിൽ പരിശോധന", "instruction": "കോളേജ് അധികൃതർ മാർക്കുകളും അഡ്മിഷനും സാക്ഷ്യപ്പെടുത്തുന്നു.", "tip": "പകർപ്പുകൾ ഓഫീസിൽ നൽകുക."},
                {"stepNumber": 4, "title": "ബാങ്കിലേക്ക് തുക എത്തുന്നു", "instruction": "തുക നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിലേക്ക് ക്രഡിറ്റ് ആകും.", "tip": "ഡിബിറ്റി ലിങ്കിങ് ബാങ്കിൽ പരിശോധിക്കുക."}
            ],
            "requiredDocuments": [
                "കോളേജ് ഫീസ് രസീത്",
                "കഴിഞ്ഞ വർഷത്തെ മാർക്ക് ലിസ്റ്റ്",
                "ജാതി, വരുമാന സർട്ടിഫിക്കറ്റുകൾ",
                "ബാങ്ക് പാസ്സ്ബുക്ക് പകർപ്പ്"
            ]
        }
    },

    # 5. PENSION GUIDANCE
    "pension-guidance": {
        "en": {
            "title": "Social Security Pension",
            "shortDescription": "Monthly financial pension assistance for senior citizens (60+), destitute widows, and persons with disabilities.",
            "processingTime": "20 to 30 Working Days",
            "officialFee": "₹0 (Completely Free of Cost)",
            "benefitAmount": "Direct monthly pension from ₹1,000 to ₹3,000 directly into bank passbook",
            "spokenSummary": "Social Security Pensions provide monthly financial support for senior citizens, widows, and persons with disabilities. The application is completely free of cost. You need your age proof or disability certificate, BPL ration card, bank passbook, and Aadhaar card.",
            "targetGroup": "Senior citizens (60+), destitute widows, and persons with benchmark disability (40%+)",
            "incomeLimit": "BPL household status or family annual income under ₹32,000 to ₹1 Lakh",
            "residenceRequirement": "Permanent resident of the state for minimum 3 years",
            "questions": [
                {"id": "age_category", "question": "Do you meet the age threshold (60+ for old age) or disability/widow criteria?", "explanation": "Verified through voter ID, birth certificate, or medical board."},
                {"id": "bpl_status", "question": "Is your family classified under BPL (Below Poverty Line) or low income limit?", "explanation": "Requires BPL ration card or income certificate."},
                {"id": "no_gov_pension", "question": "Confirm that applicant does not receive any regular government service pension.", "explanation": "Self-declaration of receiving no other state or central pension."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "Obtain Medical/Age Proof", "instruction": "Keep age certificate, disability medical certificate, or death certificate (for widow pension) ready.", "tip": "Disability certificate must show 40%+ benchmark."},
                {"stepNumber": 2, "title": "Submit Application at Block/Taluk Office", "instruction": "Apply through Social Welfare Department or local Gram Panchayat.", "tip": "Collect application receipt with tracking code."},
                {"stepNumber": 3, "title": "Social Welfare Officer Approval", "instruction": "Verification of eligibility and BPL status.", "tip": "Gram Sabha may verify local residence."},
                {"stepNumber": 4, "title": "Monthly Pension Credit to Bank", "instruction": "Pension credited every month directly to your bank account.", "tip": "Submit annual digital life certificate (Jeevan Pramaan)."}
            ],
            "requiredDocuments": [
                "Age proof (Aadhaar, Voter ID, or Medical Board certificate)",
                "BPL Ration Card or certified Income Certificate",
                "Disability Certificate (for disability pension) or Husband's Death Certificate (for widow pension)",
                "Single-holder Bank Passbook copy"
            ]
        },
        "te": {
            "title": "సామాజిక భద్రతా పెన్షన్ (Social Security Pension)",
            "shortDescription": "వృద్ధులు (60+), నిరాశ్రయులైన వితంతువులు మరియు దివ్యాంగులకు ప్రతి నెలా అందించే ప్రభుత్వ ఆర్థిక పెన్షన్.",
            "processingTime": "20 నుండి 30 పనిదినాలు",
            "officialFee": "₹0 (పూర్తిగా ఉచిత సేవ)",
            "benefitAmount": "ప్రతి నెలా ₹1,000 నుండి ₹3,000 నేరుగా బ్యాంకు ఖాతా లేదా ఇంటి వద్దకే పంపిణీ",
            "spokenSummary": "సామాజిక భద్రతా పెన్షన్ వృద్ధులు, వితంతువులు మరియు దివ్యాంగులకు ప్రతి నెలా ఆర్థిక సహాయం అందిస్తుంది. దరఖాస్తు పూర్తిగా ఉచితం. మీ వయస్సు రుజువు లేదా దివ్యాంగ సర్టిఫికెట్, బిపిఎల్ రేషన్ కార్డు, బ్యాంకు పాస్‌బుక్ మరియు ఆధార్ కార్డు అవసరం.",
            "targetGroup": "వృద్ధులు (60 ఏళ్లు పైబడినవారు), వితంతువులు మరియు 40% పైగా వైకల్యం ఉన్న దివ్యాంగులు",
            "incomeLimit": "బిపిఎల్ కుటుంబ వర్గం లేదా తక్కువ వార్షిక ఆదాయ పరిమితి",
            "residenceRequirement": "రాష్ట్రంలో కనీసం 3 సంవత్సరాల శాశ్వత నివాసం",
            "questions": [
                {"id": "age_category", "question": "మీరు వయోపరిమితి (వృద్ధాప్యానికి 60+) లేదా వైకల్యం/వితంతు అర్హతలను కలిగి ఉన్నారా?", "explanation": "ఓటరు కార్డు, ఆధార్ లేదా మెడికల్ బోర్డు సర్టిఫికెట్ ద్వారా నిర్ధారించబడుతుంది."},
                {"id": "bpl_status", "question": "మీ కుటుంబం బిపిఎల్ (దారిద్య్రరేఖకు దిగువన) లేదా పరిమిత ఆదాయ పరిధిలో ఉందా?", "explanation": "తెల్ల రేషన్ కార్డు లేదా ఆదాయ ధ్రువీకరణ పత్రం అవసరం."},
                {"id": "no_gov_pension", "question": "దరఖాస్తుదారునికి ఎలాంటి ఇతర ప్రభుత్వ ఉద్యోగ పెన్షన్ రావడం లేదని నిర్ధారించండి.", "explanation": "ఎలాంటి ప్రభుత్వ సర్వీస్ పెన్షన్ పొందడం లేదని స్వయం-ధ్రువీకరణ."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "వయస్సు / వైద్య ధ్రువీకరణ పత్రాలు సిద్ధం చేయండి", "instruction": "ఆధార్, సదరం సర్టిఫికెట్ (దివ్యాంగులకు) లేదా భర్త మరణ ధ్రువీకరణ పత్రం (వితంతువులకు) ఉంచండి.", "tip": "వైకల్యం 40% కంటే ఎక్కువ ఉండాలి."},
                {"stepNumber": 2, "title": "గ్రామ/వార్డు సచివాలయంలో దరఖాస్తు చేయండి", "instruction": "స్థానిక సచివాలయం లేదా ఎంపీడీవో కార్యాలయంలో దరఖాస్తు సమర్పించండి.", "tip": "దరఖాస్తు రశీదు నంబర్ తీసుకోండి."},
                {"stepNumber": 3, "title": "సంక్షేమ అధికారి పరిశీలన", "instruction": "అధికారులు మీ నివాసం మరియు అర్హతలను పరిశీలించి ఆమోదిస్తారు.", "tip": "గ్రామసభలో ఆమోదం పొందవచ్చు."},
                {"stepNumber": 4, "title": "ప్రతి నెలా పెన్షన్ పొందండి", "instruction": "పెన్షన్ మొత్తం నేరుగా మీ బ్యాంకు ఖాతాలో లేదా ఇంటి వద్ద అందుతుంది.", "tip": "ప్రతి సంవత్సరం లైఫ్ సర్టిఫికెట్ సమర్పించండి."}
            ],
            "requiredDocuments": [
                "వయస్సు ధ్రువీకరణ పత్రం (ఆధార్ లేదా ఓటరు కార్డు)",
                "బిపిఎల్ తెల్ల రేషన్ కార్డు",
                "సదరం (SADAREM) సర్టిఫికెట్ లేదా భర్త మరణ ధ్రువీకరణ పత్రం",
                "వ్యక్తిగత బ్యాంకు పాస్‌బుక్ కాపీ"
            ]
        },
        "kn": {
            "title": "ಸಾಮಾಜಿಕ ಭದ್ರತಾ ಪಿಂಚಣಿ (Social Security Pension)",
            "shortDescription": "ಹಿರಿಯ ನಾಗರಿಕರು (60+), ವಿಧವೆಯರು ಮತ್ತು ವಿಕಲಚೇತನರಿಗೆ ಸರ್ಕಾರದ ಮಾಸಿಕ ಆರ್ಥಿಕ ಪಿಂಚಣಿ ಯೋಜನೆ.",
            "processingTime": "20 ರಿಂದ 30 ಕೆಲಸದ ದಿನಗಳು",
            "officialFee": "₹0 (ಸಂಪೂರ್ಣ ಉಚಿತ)",
            "benefitAmount": "ಪ್ರತಿ ತಿಂಗಳು ₹1,000 ರಿಂದ ₹2,000 ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ",
            "spokenSummary": "ಸಾಮಾಜಿಕ ಭದ್ರತಾ ಪಿಂಚಣಿಯು ಹಿರಿಯ ನಾಗರಿಕರು, ವಿಧವೆಯರು ಮತ್ತು ಅಂಗವಿಕಲರಿಗೆ ಮಾಸಿಕ ನೆರವು ನೀಡುತ್ತದೆ. ಅರ್ಜಿ ಶುಲ್ಕ ಸಂಪೂರ್ಣ ಉಚಿತ. ವಯಸ್ಸಿನ ಪುರಾವೆ ಅಥವಾ ಅಂಗವಿಕಲತಾ ಪ್ರಮಾಣಪತ್ರ, ಬಿಪಿಎಲ್ ರೇಷನ್ ಕಾರ್ಡ್, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಮತ್ತು ಆಧಾರ್ ಇರಬೇಕು.",
            "targetGroup": "ಹಿರಿಯ ನಾಗರಿಕರು (60+), ವಿಧವೆಯರು ಮತ್ತು ಶೇ. 40 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಅಂಗವೈಕಲ್ಯ ಹೊಂದಿರುವವರು",
            "incomeLimit": "ಬಿಪಿಎಲ್ ಕುಟುಂಬ ಅಥವಾ ಗ್ರಾಮೀಣ ಆದಾಯ ₹32,000 / ನಗರ ಆದಾಯ ₹50,000 ಒಳಗೆ",
            "residenceRequirement": "ರಾಜ್ಯದಲ್ಲಿ ಕನಿಷ್ಠ 3 ವರ್ಷಗಳ ಖಾಯಂ ವಾಸ್ತವ್ಯ",
            "questions": [
                {"id": "age_category", "question": "ನಿಮ್ಮ ವಯಸ್ಸು (ಹಿರಿಯರಿಗೆ 60+) ಅಥವಾ ಅಂಗವಿಕಲತೆ/ವಿಧವೆ ಅರ್ಹತೆ ಹೊಂದಿದ್ದೀರಾ?", "explanation": "ಆಧಾರ್, ವೋಟರ್ ಐಡಿ ಅಥವಾ ವೈದ್ಯಕೀಯ ಮಂಡಳಿಯ ಪ್ರಮಾಣಪತ್ರದಿಂದ ದೃಢೀಕರಿಸಲಾಗುತ್ತದೆ."},
                {"id": "bpl_status", "question": "ನಿಮ್ಮ ಕುಟುಂಬವು ಬಿಪಿಎಲ್ ಪಡಿತರ ಚೀಟಿ ಅಥವಾ ಕಡಿಮೆ ಆದಾಯ ಮಿತಿಯೊಳಗೆ ಬರುತ್ತದೆಯೇ?", "explanation": "ಬಿಪಿಎಲ್ ಕಾರ್ಡ್ ಅಥವಾ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅಗತ್ಯ."},
                {"id": "no_gov_pension", "question": "ಅರ್ಜಿದಾರರಿಗೆ ಯಾವುದೇ ಸರ್ಕಾರಿ ನೌಕರಿಯ ಪಿಂಚಣಿ ಬರುತ್ತಿಲ್ಲ ಎಂಬುದನ್ನು ದೃಢೀಕರಿಸಿ.", "explanation": "ಬೇರೆ ಯಾವುದೇ ಸರ್ಕಾರಿ ಪಿಂಚಣಿ ಪಡೆಯುತ್ತಿಲ್ಲ ಎಂಬ ಸ್ವಯಂ ಘೋಷಣೆ."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ವೈದ್ಯಕೀಯ / ವಯಸ್ಸಿನ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಿರಿ", "instruction": "ಆಧಾರ್ ಕಾರ್ಡ್, ವೈದ್ಯಕೀಯ ಅಂಗವಿಕಲತಾ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಮರಣ ಪ್ರಮಾಣಪತ್ರ ಸಿದ್ಧಪಡಿಸಿ.", "tip": "ಅಂಗವೈಕಲ್ಯ ಶೇ. 40 ಕ್ಕಿಂತ ಹೆಚ್ಚಿರಬೇಕು."},
                {"stepNumber": 2, "title": "ನಾಡಕಚೇರಿ ಅಥವಾ ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರದಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ", "instruction": "ಸಮಾಜ ಕಲ್ಯಾಣ ಇಲಾಖೆಯ ಪಿಂಚಣಿ ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.", "tip": "ಅರ್ಜಿ ಸ್ವೀಕೃತಿ ರಸೀದಿಯನ್ನು ತಪ್ಪದೆ ಪಡೆಯಿರಿ."},
                {"stepNumber": 3, "title": "ಕಂದಾಯ ಅಧಿಕಾರಿಗಳಿಂದ ಅನುಮೋದನೆ", "instruction": "ಗ್ರಾಮ ಲೆಕ್ಕಿಗರು ಮತ್ತು ತಹಶೀಲ್ದಾರ್ ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.", "tip": "ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯಲ್ಲಿ ಪರಿಶೀಲನೆ ನಡೆಯಬಹುದು."},
                {"stepNumber": 4, "title": "ಮಾಸಿಕ ಪಿಂಚಣಿ ಜಮೆ", "instruction": "ಪ್ರತಿ ತಿಂಗಳು ಪಿಂಚಣಿ ಹಣ ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಅಥವಾ ಪೋಸ್ಟ್ ಆಫೀಸ್ ಖಾತೆಗೆ ಬರುತ್ತದೆ.", "tip": "ವರ್ಷಕ್ಕೊಮ್ಮೆ ಜೀವನ್ ಪ್ರಮಾಣಪತ್ರ ನೀಡಿ."}
            ],
            "requiredDocuments": [
                "ವಯಸ್ಸಿನ ಪುರಾವೆ (ಆಧಾರ್ ಕಾರ್ಡ್ ಅಥವಾ ವೋಟರ್ ಐಡಿ)",
                "ಬಿಪಿಎಲ್ ಪಡಿತರ ಚೀಟಿ",
                "ಅಂಗವಿಕಲತಾ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಗಂಡನ ಮರಣ ಪ್ರಮಾಣಪತ್ರ",
                "ವೈಯಕ್ತಿಕ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಜೆರಾಕ್ಸ್"
            ]
        },
        "hi": {
            "title": "सामाजिक सुरक्षा पेंशन (Social Security Pension)",
            "shortDescription": "वृद्धजनों (60+), निराश्रित विधवाओं और दिव्यांगजनों के लिए मासिक सरकारी वित्तीय पेंशन सहायता।",
            "processingTime": "20 से 30 कार्य दिवस",
            "officialFee": "₹0 (पूर्णतः निःशुल्क सेवा)",
            "benefitAmount": "₹1,000 से ₹3,000 प्रति माह सीधे बैंक खाते में",
            "spokenSummary": "सामाजिक सुरक्षा पेंशन बुजुर्गों, विधवाओं और दिव्यांगों को नियमित मासिक वित्तीय सहायता प्रदान करती है। यह सेवा पूर्णतः निःशुल्क है। आपको आयु प्रमाण, बीपीएल राशन कार्ड, बैंक पासबुक और आधार कार्ड की आवश्यकता होगी।",
            "targetGroup": "वरिष्ठ नागरिक (60+), विधवा महिलाएं और 40% से अधिक दिव्यांगता वाले नागरिक",
            "incomeLimit": "बीपीएल श्रेणी या निर्धारित गरीबी रेखा के अंतर्गत वार्षिक आय",
            "residenceRequirement": "राज्य का कम से कम 3 वर्षों का स्थायी निवास",
            "questions": [
                {"id": "age_category", "question": "क्या आप आयु सीमा (वृद्धावस्था हेतु 60+) अथवा दिव्यांग/विधवा पात्रता पूर्ण करते हैं?", "explanation": "आधार, वोटर आईडी अथवा मेडिकल बोर्ड प्रमाण पत्र द्वारा सत्यापित।"},
                {"id": "bpl_status", "question": "क्या आपका परिवार बीपीएल (गरीबी रेखा से नीचे) अथवा अल्प आय वर्ग में आता है?", "explanation": "बीपीएल राशन कार्ड या आय प्रमाण पत्र आवश्यक है।"},
                {"id": "no_gov_pension", "question": "पुष्टि करें कि आवेदक को कोई अन्य सरकारी सेवा पेंशन नहीं मिल रही है।", "explanation": "अन्य कोई सरकारी पेंशन न मिलने की स्व-घोषणा।"}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "आयु / चिकित्सा प्रमाण पत्र तैयार रखें", "instruction": "आधार कार्ड, दिव्यांगता प्रमाण पत्र या पति का मृत्यु प्रमाण पत्र एकत्र करें।", "tip": "दिव्यांगता 40% से अधिक होनी चाहिए।"},
                {"stepNumber": 2, "title": "ब्लॉक/तहसील अथवा सीएससी पर आवेदन करें", "instruction": "समाज कल्याण विभाग के पोर्टल पर फॉर्म जमा करें।", "tip": "आवेदन पावती क्रमांक संभाल कर रखें।"},
                {"stepNumber": 3, "title": "समाज कल्याण अधिकारी द्वारा स्वीकृति", "instruction": "पात्रता और बीपीएल स्थिति का स्थलीय सत्यापन।", "tip": "ग्राम सभा द्वारा अनुमोदन किया जा सकता है।"},
                {"stepNumber": 4, "title": "मासिक पेंशन सीधे खाते में प्राप्त करें", "instruction": "पेंशन राशि हर महीने सीधे आपके बैंक खाते में क्रेडिट होती है।", "tip": "वर्ष में एक बार डिजिटल जीवन प्रमाण पत्र दें।"}
            ],
            "requiredDocuments": [
                "आयु प्रमाण पत्र (आधार, वोटर कार्ड)",
                "बीपीएल राशन कार्ड",
                "दिव्यांगता प्रमाण पत्र अथवा पति का मृत्यु प्रमाण पत्र",
                "एकल बैंक खाते की पासबुक प्रति"
            ]
        },
        "ta": {
            "title": "சமூகப் பாதுகாப்பு ஓய்வூதியம் (Social Security Pension)",
            "shortDescription": "முதியோர் (60+), ஆதரவற்ற விதவைகள் மற்றும் மாற்றுத்திறனாளிகளுக்கான மாதாந்திர அரசு நிதியுதவி.",
            "processingTime": "20 முதல் 30 வேலை நாட்கள்",
            "officialFee": "₹0 (முற்றிலும் இலவசம்)",
            "benefitAmount": "மாதந்தோறும் ₹1,000 முதல் ₹1,500 நேரடியாக வங்கிக் கணக்கில் வரவு",
            "spokenSummary": "சமூகப் பாதுகாப்பு ஓய்வூதியம் முதியவர்கள், விதவைகள் மற்றும் மாற்றுத்திறனாளிகளுக்கு மாதாந்திர உதவித்தொகை வழங்குகிறது. இதற்கு எந்தக் கட்டணமும் இல்லை. வயதுச் சான்று அல்லது மாற்றுத்திறனாளி சான்றிதழ், பிபிஎல் குடும்ப அட்டை மற்றும் வங்கி பாஸ்புக் தேவை.",
            "targetGroup": "முதியவர்கள் (60+), விதவைகள் மற்றும் 40% மேல் மாற்றுத்திறன் கொண்டோர்",
            "incomeLimit": "வறுமைக் கோட்டிற்கு கீழ் உள்ள குடும்பங்கள்",
            "residenceRequirement": "மாநிலத்தில் குறைந்தபட்சம் 3 ஆண்டுகள் நிரந்தரக் குடியிருப்பு",
            "questions": [
                {"id": "age_category", "question": "வயது வரம்பு (முதியோருக்கு 60+) அல்லது மாற்றுத்திறன்/விதவை தகுதி உள்ளதா?", "explanation": "ஆதார், வாக்காளர் அட்டை அல்லது மருத்துவச் சான்று மூலம் சரிபார்க்கப்படுகிறது."},
                {"id": "bpl_status", "question": "குடும்பம் பிபிஎல் (வறுமைக் கோட்டிற்கு கீழ்) வரம்பிற்குள் உள்ளதா?", "explanation": "பிபிஎல் குடும்ப அட்டை அல்லது வருமானச் சான்று தேவை."},
                {"id": "no_gov_pension", "question": "விண்ணப்பதாரர் வேறு எந்த அரசு ஓய்வூதியமும் பெறவில்லை என்பதை உறுதிப்படுத்தவும்.", "explanation": "வேறு ஓய்வூதியம் பெறவில்லை என்ற சுய உறுதிமொழி."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "மருத்துவ / வயதுச் சான்றுகளைப் பெறவும்", "instruction": "ஆதார், மாற்றுத்திறனாளி சான்றிதழ் அல்லது கணவரின் இறப்புச் சான்றிதழை தயார் செய்யவும்.", "tip": "மாற்றுத்திறன் 40%க்கு மேல் இருக்க வேண்டும்."},
                {"stepNumber": 2, "title": "இ-சேவை மையம் மூலம் விண்ணப்பிக்கவும்", "instruction": "சமூக நலத்துறை போர்ட்டலில் விண்ணப்பம் சமர்ப்பிக்கவும்.", "tip": "விண்ணப்ப ஒப்புகைச் சீட்டைப் பெறவும்."},
                {"stepNumber": 3, "title": "வருவாய் அலுவலர் ஒப்புதல்", "instruction": "தகுதி மற்றும் குடும்ப நிலையை அதிகாரிகள் கள ஆய்வு செய்வர்.", "tip": "கிராம நிர்வாக அலுவலர் அறிக்கை அளிப்பார்."},
                {"stepNumber": 4, "title": "மாதாந்திர ஓய்வூதியம் வங்கிக் கணக்கில்", "instruction": "ஒவ்வொரு மாதமும் ஓய்வூதியம் நேரடியாக வங்கிக் கணக்கில் வரவு வைக்கப்படும்.", "tip": "வருடத்திற்கு ஒருமுறை வாழ்நாள் சான்றிதழ் அளிக்கவும்."}
            ],
            "requiredDocuments": [
                "வயதுச் சான்று (ஆதார் அல்லது வாக்காளர் அட்டை)",
                "பிபிஎல் குடும்ப அட்டை (Ration Card)",
                "மாற்றுத்திறனாளி சான்றிதழ் அல்லது கணவர் இறப்புச் சான்றிதழ்",
                "தனிநபர் வங்கி கணக்குப் புத்தக நகல்"
            ]
        },
        "ml": {
            "title": "സാമൂഹ്യ സുരക്ഷാ പെൻഷൻ (Social Security Pension)",
            "shortDescription": "മുതിർന്ന പൗരന്മാർ (60+), വിധവകൾ, ഭിന്നശേഷിക്കാർ എന്നിവർക്കുള്ള പ്രതിമാസ ക്ഷേമ പെൻഷൻ പദ്ധതി.",
            "processingTime": "20 മുതൽ 30 പ്രവൃത്തിദിനങ്ങൾ",
            "officialFee": "₹0 (പൂർണ്ണമായും സൗജന്യം)",
            "benefitAmount": "പ്രതിമാസം ₹1,600 നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിൽ അല്ലെങ്കിൽ വീട്ടിൽ ലഭിക്കുന്നു",
            "spokenSummary": "സാമൂഹ്യ സുരക്ഷാ പെൻഷൻ വയോധികർക്കും വിധവകൾക്കും ഭിന്നശേഷിക്കാർക്കും പ്രതിമാസ വരുമാനം ഉറപ്പാക്കുന്നു. അപേക്ഷ സൗജന്യമാണ്. പ്രായരേഖ, ബിപിഎൽ റേഷൻ കാർഡ്, ബാങ്ക് പാസ്സ്ബുക്ക്, ആധാർ എന്നിവ വേണം.",
            "targetGroup": "മുതിർന്ന പൗരന്മാർ (60+), വിധവകൾ, 40% മുകളിൽ ഭിന്നശേഷിയുള്ളവർ",
            "incomeLimit": "ബിപിഎൽ കുടുംബങ്ങൾ അല്ലെങ്കിൽ വാർഷിക വരുമാന പരിധി ₹1 ലക്ഷം",
            "residenceRequirement": "സംസ്ഥാനത്ത് കുറഞ്ഞത് 3 വർഷത്തെ സ്ഥിരതാമസം",
            "questions": [
                {"id": "age_category", "question": "പ്രായപരിധിയോ (60+) ഭിന്നശേഷി/വിധവ യോഗ്യതയോ ഉണ്ടോ?", "explanation": "ആധാർ അല്ലെങ്കിൽ മെഡിക്കൽ സർട്ടിഫിക്കറ്റ് വഴി പരിശോധിക്കുന്നു."},
                {"id": "bpl_status", "question": "കുടുംബം ബിപിഎൽ വിഭാഗത്തിലോ കുറഞ്ഞ വരുമാന പരിധിയിലോ ആണോ?", "explanation": "ബിപിഎൽ റേഷൻ കാർഡ് അല്ലെങ്കിൽ വരുമാന സർട്ടിഫിക്കറ്റ് വേണം."},
                {"id": "no_gov_pension", "question": "മറ്റ് സർവീസ് പെൻഷനുകളോ സർക്കാർ ആനുകൂല്യങ്ങളോ വാങ്ങുന്നില്ലെന്ന് ഉറപ്പാക്കുക.", "explanation": "മറ്റ് പെൻഷനുകൾ ഇല്ലെന്ന സത്യവാങ്മൂലം."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "രേഖകൾ തയ്യാറാക്കുക", "instruction": "ആധാർ, ഭിന്നശേഷി സർട്ടിഫിക്കറ്റ് അല്ലെങ്കിൽ മരണ സർട്ടിഫിക്കറ്റ് കരുതുക.", "tip": "ഭിന്നശേഷി 40% മുകളിലായിരിക്കണം."},
                {"stepNumber": 2, "title": "പഞ്ചായത്ത് / നഗരസഭയിൽ അപേക്ഷിക്കുക", "instruction": "തദ്ദേശ സ്വയംഭരണ സ്ഥാപനത്തിൽ അപേക്ഷ നൽകുക.", "tip": "അപേക്ഷാ രസീത് വാങ്ങുക."},
                {"stepNumber": 3, "title": "അന്വേഷണവും അംഗീകാരവും", "instruction": "ഉദ്യോഗസ്ഥർ വിവരങ്ങൾ പരിശോധിച്ച് അംഗീകാരം നൽകുന്നു.", "tip": "പഞ്ചായത്ത് സമിതി പരിശോധിക്കും."},
                {"stepNumber": 4, "title": "പ്രതിമാസ പെൻഷൻ ലഭിക്കുന്നു", "instruction": "തുക എല്ലാ മാസവും അക്കൗണ്ടിൽ അല്ലെങ്കിൽ വീട്ടിൽ എത്തും.", "tip": "വർഷത്തിൽ ഒരിക്കൽ മസ്റ്ററിംഗ് നടത്തുക."}
            ],
            "requiredDocuments": [
                "പ്രായരേഖ (ആധാർ അല്ലെങ്കിൽ വോട്ടർ ഐഡി)",
                "ബിപിഎൽ റേഷൻ കാർഡ്",
                "മെഡിക്കൽ ബോർഡ് സർട്ടിഫിക്കറ്റ് / മരണ സർട്ടിഫിക്കറ്റ്",
                "ബാങ്ക് പാസ്സ്ബുക്ക് പകർപ്പ്"
            ]
        }
    },

    # 6. RATION CARD
    "ration-card": {
        "en": {
            "title": "Ration Card (NFSA Food Security)",
            "shortDescription": "Official food security card ensuring monthly subsidized foodgrains and serving as legal household registry proof.",
            "processingTime": "15 to 20 Working Days",
            "officialFee": "₹15 (Nominal Registration Fee)",
            "benefitAmount": "Subsidized foodgrains (rice/wheat) + state welfare entitlement linkage",
            "spokenSummary": "The Ration Card guarantees monthly subsidized foodgrains under the Food Security Act. It is also your primary family document. The fee is fifteen rupees. You need Aadhaar cards of all family members, gas connection details, and residence proof.",
            "targetGroup": "Eligible households applying for NFSA Priority Household (PHH) or Antyodaya (AAY) cards",
            "incomeLimit": "Rural cutoff under ₹1.5 Lakhs / Urban cutoff under ₹2 Lakhs per year",
            "residenceRequirement": "Permanent resident of the state with no duplicate card",
            "questions": [
                {"id": "head_female", "question": "Do you have details of the eldest adult woman to nominate as head of household?", "explanation": "NFSA law mandates women empowerment in ration cards."},
                {"id": "all_aadhaar", "question": "Do all family members to be included have individual Aadhaar numbers?", "explanation": "Required to prevent duplicate ghost cards and enable biometric PDS."},
                {"id": "no_duplicate", "question": "Confirm that no member listed is currently active on another state ration card.", "explanation": "Must surrender previous card if moving household."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "Prepare Family Aadhaar Copies", "instruction": "Collect Aadhaar numbers of all family members and child birth certificates.", "tip": "Keep LPG gas connection consumer number ready."},
                {"stepNumber": 2, "title": "Apply on State Food & Civil Supplies Portal", "instruction": "Submit online application or visit local Fair Price Shop / CSC.", "tip": "Designate senior-most woman as head."},
                {"stepNumber": 3, "title": "Food Inspector Verification", "instruction": "Verification of residence and family member details.", "tip": "Inspection of LPG status and income."},
                {"stepNumber": 4, "title": "Collect Digital Ration Card", "instruction": "Collect printed card or download digital e-Ration card for subsidized foodgrains.", "tip": "Bio-metric e-POS authentication enabled."}
            ],
            "requiredDocuments": [
                "Aadhaar cards of all family members to be listed",
                "Local electricity bill or residence address proof",
                "LPG Gas Connection passbook / consumer slip",
                "Income Certificate or employer earnings slip"
            ]
        },
        "te": {
            "title": "రేషన్ కార్డు (NFSA ఆహార భద్రత)",
            "shortDescription": "ప్రతి నెలా సబ్సిడీ ఆహార ధాన్యాలను పొందేందుకు మరియు చట్టబద్ధ కుటుంబ పత్రంగా ఉపయోగపడే అధికారిక కార్డు.",
            "processingTime": "15 నుండి 20 పనిదినాలు",
            "officialFee": "₹15 (నామమాత్రపు నమోదు రుసుము)",
            "benefitAmount": "ఉచిత/సబ్సిడీ ఆహార ధాన్యాలు మరియు ప్రభుత్వ సంక్షేమ పథకాల అర్హత",
            "spokenSummary": "రేషన్ కార్డు ఆహార భద్రత చట్టం కింద ప్రతి నెలా సబ్సిడీ బియ్యం మరియు ఆహార ధాన్యాలను అందిస్తుంది. ఇది మీ ప్రధాన కుటుంబ గుర్తింపు పత్రం. అధికారిక రుసుము కేవలం పదిహేను రూపాయలు. కుటుంబ సభ్యులందరి ఆధార్ కార్డులు, గ్యాస్ కనెక్షన్ వివరాలు మరియు నివాస రుజువు సిద్ధం చేసుకోండి.",
            "targetGroup": "ఆహార భద్రతా కార్డులు (PHH లేదా అంత్యోదయ) కోరే అర్హులైన కుటుంబాలు",
            "incomeLimit": "గ్రామీణ వార్షిక ఆదాయం ₹1.5 లక్షలు / పట్టణ ఆదాయం ₹2 లక్షల లోపు",
            "residenceRequirement": "రాష్ట్రంలో శాశ్వత నివాసి అయి ఉండాలి, వేరే కార్డులో పేరు ఉండకూడదు",
            "questions": [
                {"id": "head_female", "question": "కుటుంబ పెద్దగా నామినేట్ చేయడానికి ఇంట్లోని పెద్ద మహిళ వివరాలు ఉన్నాయా?", "explanation": "ఆహార భద్రతా చట్టం ప్రకారం కుటుంబ పెద్దగా మహిళను గుర్తించడం తప్పనిసరి."},
                {"id": "all_aadhaar", "question": "కార్డులో చేర్చవలసిన కుటుంబ సభ్యులందరికీ వ్యక్తిగత ఆధార్ కార్డులు ఉన్నాయా?", "explanation": "బయోమెట్రిక్ రేషన్ పంపిణీకి మరియు డూప్లికేట్ కార్డుల నివారణకు ఆధార్ అవసరం."},
                {"id": "no_duplicate", "question": "చేర్చిన సభ్యులెవరూ ఇతర రేషన్ కార్డులో చురుగ్గా లేరని నిర్ధారించండి.", "explanation": "వేరే ప్రాంతం నుంచి మారినట్లయితే పాత కార్డులో పేరు తొలగించాలి."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "కుటుంబ సభ్యుల ఆధార్ కార్డులు సిద్ధం చేయండి", "instruction": "అందరి ఆధార్ కాపీలు మరియు పిల్లల జనన ధ్రువీకరణ పత్రాలు ఒకచోట చేర్చండి.", "tip": "గ్యాస్ కనెక్షన్ నంబర్ సిద్ధంగా ఉంచుకోండి."},
                {"stepNumber": 2, "title": "పౌర సరఫరాల పోర్టల్‌లో దరఖాస్తు చేయండి", "instruction": "ఆన్‌లైన్ లేదా గ్రామ సచివాలయం / మీ-సేవా కేంద్రంలో దరఖాస్తు సమర్పించండి.", "tip": "కుటుంబ పెద్దగా పెద్ద మహిళ పేరు నమోదు చేయండి."},
                {"stepNumber": 3, "title": "ఫుడ్ ఇన్‌స్పెక్టర్ పరిశీలన", "instruction": "అధికారులు మీ నివాసం మరియు కుటుంబ వివరాలను పరిశీలిస్తారు.", "tip": "గ్యాస్ కనెక్షన్ మరియు ఆదాయ వివరాలు తనిఖీ చేస్తారు."},
                {"stepNumber": 4, "title": "డిజిటల్ రేషన్ కార్డు పొందండి", "instruction": "ఆమోదం పొందిన తర్వాత ఇ-రేషన్ కార్డును డౌన్‌లోడ్ చేసుకోండి.", "tip": "రేషన్ దుకాణంలో వేలిముద్రతో సరుకులు పొందవచ్చు."}
            ],
            "requiredDocuments": [
                "కార్డులో చేర్చే కుటుంబ సభ్యులందరి ఆధార్ కార్డులు",
                "స్థానిక కరెంట్ బిల్లు లేదా నివాస చిరునామా రుజువు",
                "ఎల్పీజీ గ్యాస్ కనెక్షన్ బుక్ / రసీదు",
                "ఆదాయ ధ్రువీకరణ పత్రం"
            ]
        },
        "kn": {
            "title": "ಪಡಿತರ ಚೀಟಿ (NFSA ರೇಷನ್ ಕಾರ್ಡ್)",
            "shortDescription": "ಪ್ರತಿ ತಿಂಗಳು ಸಬ್ಸಿಡಿ ಆಹಾರ ಧಾನ್ಯಗಳನ್ನು ಪಡೆಯಲು ಮತ್ತು ಕುಟುಂಬದ ಕಾನೂನುಬದ್ಧ ದಾಖಲೆಯಾಗಿ ಬಳಸುವ ಅಧಿಕೃತ ಪತ್ರ.",
            "processingTime": "15 ರಿಂದ 20 ಕೆಲಸದ ದಿನಗಳು",
            "officialFee": "₹15 (ನಿಗದಿತ ಪೋರ್ಟಲ್ ಶುಲ್ಕ)",
            "benefitAmount": "ಉಚಿತ/ಸಬ್ಸಿಡಿ ಆಹಾರ ಧಾನ್ಯಗಳು ಮತ್ತು ಗ್ಯಾರಂಟಿ ಯೋಜನೆಗಳ ಸೌಲಭ್ಯ",
            "spokenSummary": "ರೇಷನ್ ಕಾರ್ಡ್ ಆಹಾರ ಭದ್ರತಾ ಕಾಯ್ದೆಯಡಿ ಪ್ರತಿ ತಿಂಗಳು ಸಬ್ಸಿಡಿ ಆಹಾರ ಧಾನ್ಯಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ. ಇದು ಪ್ರಮುಖ ಕುಟುಂಬ ದಾಖಲೆಯಾಗಿದೆ. ಅಧಿಕೃತ ಶುಲ್ಕ ಹದಿನೈದು ರೂಪಾಯಿಗಳು. ಕುಟುಂಬದ ಎಲ್ಲರ ಆಧಾರ್ ಕಾರ್ಡ್, ಗ್ಯಾಸ್ ಕನೆಕ್ಷನ್ ವಿವರ ಮತ್ತು ವಿಳಾಸ ಪುರಾವೆ ಅಗತ್ಯವಿದೆ.",
            "targetGroup": "ಆದ್ಯತಾ ಕುಟುಂಬ (PHH) ಅಥವಾ ಅಂತ್ಯೋದಯ (AAY) ಕಾರ್ಡ್ ಬಯಸುವ ಅರ್ಹ ಕುಟುಂಬಗಳು",
            "incomeLimit": "ಗ್ರಾಮೀಣ ವಾರ್ಷಿಕ ಆದಾಯ ₹1.5 ಲಕ್ಷ / ನಗರ ಆದಾಯ ₹2 ಲಕ್ಷದ ಒಳಗೆ",
            "residenceRequirement": "ರಾಜ್ಯದ ಖಾಯಂ ನಿವಾಸಿಯಾಗಿರಬೇಕು ಮತ್ತು ಬೇರೆ ಯಾವುದೇ ಕಾರ್ಡ್ ಹೊಂದಿರಬಾರದು",
            "questions": [
                {"id": "head_female", "question": "ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥೆಯಾಗಿ ಹೆಸರಿಸಲು ಮನೆಯ ಹಿರಿಯ ಮಹಿಳೆಯ ವಿವರಗಳು ಲಭ್ಯವಿದೆಯೇ?", "explanation": "ಆಹಾರ ಕಾಯ್ದೆಯ ನಿಯಮಾವಳಿಯಂತೆ ಹಿರಿಯ ಮಹಿಳೆಯನ್ನು ಮುಖ್ಯಸ್ಥೆಯನ್ನಾಗಿ ಮಾಡಲಾಗುತ್ತದೆ."},
                {"id": "all_aadhaar", "question": "ಸೇರಿಸಲಾಗುವ ಎಲ್ಲಾ ಕುಟುಂಬ ಸದಸ್ಯರ ಪ್ರತ್ಯೇಕ ಆಧಾರ್ ಸಂಖ್ಯೆಗಳು ಲಭ್ಯವಿದೆಯೇ?", "explanation": "ಬಯೋಮೆಟ್ರಿಕ್ ಪಡಿತರ ವಿತರಣೆಗೆ ಮತ್ತು ನಕಲಿ ಕಾರ್ಡ್ ತಡೆಯಲು ಆಧಾರ್ ಕಡ್ಡಾಯ."},
                {"id": "no_duplicate", "question": "ಪಟ್ಟಿ ಮಾಡಲಾದ ಯಾವುದೇ ಸದಸ್ಯರು ಬೇರೆ ರೇಷನ್ ಕಾರ್ಡ್‌ನಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿಲ್ಲ ಎಂದು ಖಚಿತಪಡಿಸಿ.", "explanation": "ಸ್ಥಳ ಬದಲಾಯಿಸಿದ್ದರೆ ಹಳೆಯ ಕಾರ್ಡ್‌ನಿಂದ ಹೆಸರು ತೆಗೆದಿರಬೇಕು."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ಕುಟುಂಬದ ಆಧಾರ್ ಪ್ರತಿಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ", "instruction": "ಎಲ್ಲಾ ಸದಸ್ಯರ ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಮಕ್ಕಳ ಜನನ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸಿ.", "tip": "ಗ್ಯಾಸ್ ಕನೆಕ್ಷನ್ ಸಂಖ್ಯೆಯನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ."},
                {"stepNumber": 2, "title": "ಆಹಾರ ಇಲಾಖೆಯ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ", "instruction": "ಆನ್‌ಲೈನ್ ಅಥವಾ ಗ್ರಾಮ ಒನ್ / ಕರ್ನಾಟಕ ಒನ್ ಕೇಂದ್ರದಲ್ಲಿ ಅರ್ಜಿ ಹಾಕಿ.", "tip": "ಮನೆಯ ಹಿರಿಯ ಮಹಿಳೆಯನ್ನು ಮುಖ್ಯಸ್ಥೆಯನ್ನಾಗಿ ಆಯ್ಕೆ ಮಾಡಿ."},
                {"stepNumber": 3, "title": "ಆಹಾರ ನಿರೀಕ್ಷಕರ ಪರಿಶೀಲನೆ", "instruction": "ಆಹಾರ ನಿರೀಕ್ಷಕರು ನಿಮ್ಮ ಮನೆಗೆ ಭೇಟಿ ನೀಡಿ ಕುಟುಂಬ ಸದಸ್ಯರನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.", "tip": "ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ಮತ್ತು ಆದಾಯ ಪರಿಶೀಲಿಸುತ್ತಾರೆ."},
                {"stepNumber": 4, "title": "ಡಿಜಿಟಲ್ ರೇಷನ್ ಕಾರ್ಡ್ ಪಡೆಯಿರಿ", "instruction": "ಅರ್ಜಿ ಅನುಮೋದನೆಯಾದ ನಂತರ ಇ-ರೇಷನ್ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.", "tip": "ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ಹೆಬ್ಬೆರಳು ಕೊಟ್ಟು ಪಡಿತರ ಪಡೆಯಿರಿ."}
            ],
            "requiredDocuments": [
                "ಸೇರಿಸಬೇಕಾದ ಎಲ್ಲಾ ಕುಟುಂಬ ಸದಸ್ಯರ ಆಧಾರ್ ಕಾರ್ಡ್",
                "ಸ್ಥಳೀಯ ವಿದ್ಯುತ್ ಬಿಲ್ ಅಥವಾ ವಿಳಾಸ ಪುರಾವೆ",
                "ಎಲ್‌ಪಿಜಿ ಗ್ಯಾಸ್ ಸಂಪರ್ಕದ ಪಾಸ್‌ಬುಕ್",
                "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ"
            ]
        },
        "hi": {
            "title": "राशन कार्ड (खाद्य सुरक्षा NFSA)",
            "shortDescription": "मासिक रियायती खाद्यान्न प्राप्त करने और परिवार की कानूनी पहचान के लिए आधिकारिक खाद्य सुरक्षा कार्ड।",
            "processingTime": "15 से 20 कार्य दिवस",
            "officialFee": "₹15 (सामान्य पंजीकरण शुल्क)",
            "benefitAmount": "मुफ्त/सब्सिडी राशन (चावल/गेहूं) और सभी सरकारी कल्याण योजनाओं की पात्रता",
            "spokenSummary": "राशन कार्ड राष्ट्रीय खाद्य सुरक्षा अधिनियम के तहत प्रतिमाह रियायती राशन सुनिश्चित करता है। यह आपका पारिवारिक पहचान पत्र भी है। सरकारी शुल्क मात्र पंद्रह रुपये है। परिवार के सभी सदस्यों के आधार, गैस कनेक्शन और पते के प्रमाण की आवश्यकता होगी।",
            "targetGroup": "पात्र गृहस्थी (PHH) या अंत्योदय (AAY) कार्ड के लिए पात्र परिवार",
            "incomeLimit": "ग्रामीण आय ₹1.5 लाख / शहरी आय ₹2 लाख से कम",
            "residenceRequirement": "राज्य का स्थायी निवासी और किसी अन्य कार्ड में नाम दर्ज न हो",
            "questions": [
                {"id": "head_female", "question": "क्या परिवार की मुखिया के रूप में नामित करने के लिए वरिष्ठ महिला का विवरण है?", "explanation": "खाद्य सुरक्षा कानून के तहत महिला सशक्तिकरण हेतु मुखिया महिला होती है।"},
                {"id": "all_aadhaar", "question": "क्या शामिल किए जाने वाले सभी पारिवारिक सदस्यों के अलग-अलग आधार कार्ड हैं?", "explanation": "बायोमेट्रिक वितरण और फर्जी कार्ड रोकने के लिए आधार अनिवार्य है।"},
                {"id": "no_duplicate", "question": "पुष्टि करें कि किसी भी सदस्य का नाम किसी अन्य राशन कार्ड में सक्रिय नहीं है।", "explanation": "दूसरे राज्य या जिले से आने पर पुराना नाम कटवाना अनिवार्य है।"}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "परिवार के आधार दस्तावेज तैयार करें", "instruction": "सभी सदस्यों के आधार कार्ड और बच्चों के जन्म प्रमाण पत्र एकत्र करें।", "tip": "गैस कनेक्शन की उपभोक्ता संख्या रखें।"},
                {"stepNumber": 2, "title": "खाद्य एवं रसद विभाग पोर्टल पर आवेदन करें", "instruction": "पोर्टल पर ऑनलाइन या सीएससी जन सेवा केंद्र पर फॉर्म जमा करें।", "tip": "वरिष्ठ महिला को परिवार का मुखिया बनाएं।"},
                {"stepNumber": 3, "title": "सप्लाई इंस्पेक्टर द्वारा सत्यापन", "instruction": "खाद्य निरीक्षक द्वारा परिवार के सदस्यों और आवास का सत्यापन।", "tip": "गैस और आय की स्थिति की जांच।"},
                {"stepNumber": 4, "title": "डिजिटल राशन कार्ड डाउनलोड करें", "instruction": "स्वीकृति मिलने पर अपना ई-राशन कार्ड डाउनलोड करें।", "tip": "कोटेदार से अंगूठा लगाकर राशन प्राप्त करें।"}
            ],
            "requiredDocuments": [
                "परिवार के सभी सदस्यों के आधार कार्ड",
                "स्थानीय बिजली बिल या पते का प्रमाण",
                "गैस कनेक्शन की पासबुक / रसीद",
                "सक्षम अधिकारी द्वारा जारी आय प्रमाण पत्र"
            ]
        },
        "ta": {
            "title": "குடும்ப அட்டை (Ration Card)",
            "shortDescription": "மாதாந்திர மானிய விலை உணவு தானியங்களைப் பெறவும், அதிகாரப்பூர்வ குடும்ப ஆவணமாகவும் பயன்படும் அட்டை.",
            "processingTime": "15 முதல் 20 வேலை நாட்கள்",
            "officialFee": "₹15 (அரசு போர்டல் கட்டணம்)",
            "benefitAmount": "இலவச அரிசி, மானியப் பொருட்கள் மற்றும் அரசு நலத்திட்டங்களின் இணைப்பு",
            "spokenSummary": "ரேஷன் அட்டை மாதாந்திர உணவுப் பொருட்களைப் பெறவும், முக்கிய குடும்ப ஆவணமாகவும் விளங்குகிறது. கட்டணம் பதினைந்து ரூபாய் மட்டுமே. குடும்ப உறுப்பினர்கள் அனைவரின் ஆதார் அட்டை, சமையல் எரிவாயு விவரம் மற்றும் இருப்பிடச் சான்று தேவை.",
            "targetGroup": "முன்னுரிமை குடும்ப அட்டை (PHH) அல்லது அந்தியோதயா (AAY) கோரும் குடும்பங்கள்",
            "incomeLimit": "கிராமப்புற வருமானம் ₹1.5 லட்சம் / நகர்ப்புற வருமானம் ₹2 லட்சத்திற்குள்",
            "residenceRequirement": "மாநிலத்தில் வசிக்கும் குடும்பம்; வேறு அட்டையில் பெயர் இருக்கக்கூடாது",
            "questions": [
                {"id": "head_female", "question": "குடும்பத் தலைவராக குறிப்பிட மூத்த பெண்மணியின் விவரங்கள் உள்ளதா?", "explanation": "உணவுப் பாதுகாப்பு சட்டத்தின்படி குடும்பத் தலைவராக பெண் நியமிக்கப்படுகிறார்."},
                {"id": "all_aadhaar", "question": "சேர்க்கப்பட வேண்டிய அனைத்து குடும்ப உறுப்பினர்களின் ஆதார் அட்டைகள் உள்ளதா?", "explanation": "பயோமெட்ரிக் ரேஷன் விநியோகத்திற்கு ஆதார் அவசியம்."},
                {"id": "no_duplicate", "question": "பட்டியலிடப்பட்ட உறுப்பினர்கள் வேறு எந்த ரேஷன் அட்டையிலும் இல்லை என்பதை உறுதிப்படுத்தவும்.", "explanation": "முந்தைய அட்டையிலிருந்து பெயர் நீக்கப்பட்டிருக்க வேண்டும்."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ஆதார் நகல்களை தயார் செய்யவும்", "instruction": "அனைத்து உறுப்பினர்களின் ஆதார் அட்டை மற்றும் குழந்தைகளின் பிறப்புச் சான்றிதழை சேகரிக்கவும்.", "tip": "எரிவாயு இணைப்பு எண்ணை வைத்திருக்கவும்."},
                {"stepNumber": 2, "title": "பொது விநியோக போர்ட்டலில் விண்ணப்பிக்கவும்", "instruction": "இணையதளம் அல்லது இ-சேவை மையம் மூலம் விண்ணப்பம் அளிக்கவும்.", "tip": "குடும்பத் தலைவியாக மூத்த பெண்ணை நியமிக்கவும்."},
                {"stepNumber": 3, "title": "வட்ட வழங்கல் அலுவலர் சரிபார்ப்பு", "instruction": "அதிகாரிகள் முகவரி மற்றும் குடும்ப உறுப்பினர்களை கள ஆய்வு செய்வர்.", "tip": "எரிவாயு இணைப்பு விவரங்கள் சரிபார்க்கப்படும்."},
                {"stepNumber": 4, "title": "ஸ்மார்ட் ரேஷன் கார்டு பெறவும்", "instruction": "அனுமதி கிடைத்தவுடன் டிஜிட்டல் குடும்ப அட்டையைப் பதிவிறக்கவும்.", "tip": "நியாயவிலைக் கடையில் கைரேகை வைத்து பொருட்கள் பெறலாம்."}
            ],
            "requiredDocuments": [
                "குடும்பத்தில் உள்ள அனைவரின் ஆதார் அட்டை நகல்கள்",
                "மின் கட்டண ரசீது அல்லது வீட்டு வரி ரசீது",
                "சமையல் எரிவாயு இணைப்பு புத்தக நகல்",
                "வருமானச் சான்றிதழ்"
            ]
        },
        "ml": {
            "title": "റേഷൻ കാർഡ് (NFSA Ration Card)",
            "shortDescription": "പ്രതിമാസ ഭക്ഷ്യധാന്യങ്ങൾ ലഭിക്കുന്നതിനും നിയമപരമായ കുടുംബ രേഖയായും ഉപയോഗിക്കുന്ന കാർഡ്.",
            "processingTime": "15 മുതൽ 20 പ്രവൃത്തിദിനങ്ങൾ",
            "officialFee": "₹15 (രജിസ്ട്രേഷൻ ഫീസ്)",
            "benefitAmount": "സൗജന്യ/സബ്സിഡി ഭക്ഷ്യധാന്യങ്ങളും മറ്റ് ആനുകൂല്യങ്ങളും",
            "spokenSummary": "ഭക്ഷ്യസുരക്ഷാ നിയമപ്രകാരം എല്ലാ മാസവും സബ്സിഡി ഭക്ഷ്യധാന്യങ്ങൾ ലഭിക്കാൻ റേഷൻ കാർഡ് ആവശ്യമാണ്. ഫീസ് പതിനഞ്ച് രൂപയാണ്. കുടുംബത്തിലെ എല്ലാവരുടെയും ആധാർ, ഗ്യാസ് കണക്ഷൻ രേഖ, വിലാസ തെളിവ് എന്നിവ കരുതുക.",
            "targetGroup": "മുൻഗണനാ കാർഡിനോ (PHH) അന്ത്യോദയ കാർഡിനോ അർഹരായ കുടുംബങ്ങൾ",
            "incomeLimit": "ഗ്രാമീണ വരുമാനം ₹1.5 ലക്ഷം / നഗര വരുമാനം ₹2 ലക്ഷത്തിൽ താഴെ",
            "residenceRequirement": "സംസ്ഥാനത്തെ സ്ഥിരതാമസക്കാർ; മറ്റൊരു കാർഡിൽ പേരുണ്ടാകരുത്",
            "questions": [
                {"id": "head_female", "question": "കുടുംബനാഥയായി ഉൾപ്പെടുത്താൻ മുതിർന്ന സ്ത്രീയുടെ വിവരങ്ങൾ ലഭ്യമാണോ?", "explanation": "ഭക്ഷ്യസുരക്ഷാ നിയമപ്രകാരം മുതിർന്ന സ്ത്രീയാണ് കുടുംബനാഥ."},
                {"id": "all_aadhaar", "question": "ഉൾപ്പെടുത്തേണ്ട എല്ലാ അംഗങ്ങൾക്കും വ്യക്തിഗത ആധാർ കാർഡുകൾ ഉണ്ടോ?", "explanation": "ബയോമെട്രിക് റേഷൻ വിതരണത്തിന് ആധാർ നിർബന്ധമാണ്."},
                {"id": "no_duplicate", "question": "ഒരംഗത്തിനും മറ്റ് റേഷൻ കാർഡുകളിൽ സജീവ പേരില്ലെന്ന് ഉറപ്പുവരുത്തുക.", "explanation": "പഴയ കാർഡിൽ നിന്ന് പേര് ഒഴിവാക്കിയിരിക്കണം."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ആധാർ പകർപ്പുകൾ തയ്യാറാക്കുക", "instruction": "എല്ലാ അംഗങ്ങളുടെയും ആധാർ, കുട്ടികളുടെ ജനന സർട്ടിഫിക്കറ്റ് എന്നിവ ശേഖരിക്കുക.", "tip": "പാചകവാതക കണക്ഷൻ നമ്പർ കരുതുക."},
                {"stepNumber": 2, "title": "സിവിൽ സപ്ലൈസ് പോർട്ടലിൽ അപേക്ഷിക്കുക", "instruction": "പോർട്ടൽ വഴിയോ അക്ഷയ കേന്ദ്രം വഴിയോ ഫോം സമർപ്പിക്കുക.", "tip": "മുതിർന്ന സ്ത്രീയെ കുടുംബനാഥയാക്കുക."},
                {"stepNumber": 3, "title": "റേഷനിംഗ് ഇൻസ്പെക്ടറുടെ പരിശോധന", "instruction": "ഉദ്യോഗസ്ഥർ നിങ്ങളുടെ വീടും അംഗങ്ങളെയും പരിശോധിക്കുന്നു.", "tip": "വരുമാനവും ഗ്യാസ് വിവരങ്ങളും പരിശോധിക്കും."},
                {"stepNumber": 4, "title": "ഡിജിറ്റൽ റേഷൻ കാർഡ് നേടുക", "instruction": "അംഗീകാരം ലഭിച്ച ശേഷം ഇ-റേഷൻ കാർഡ് ഡൗൺലോഡ് ചെയ്യാം.", "tip": "റേഷൻ കടയിൽ വിരലടയാളം നൽകി സാധനങ്ങൾ വാങ്ങാം."}
            ],
            "requiredDocuments": [
                "എല്ലാ കുടുംബാംഗങ്ങളുടെയും ആധാർ കാർഡുകൾ",
                "വൈദ്യുതി ബിൽ അല്ലെങ്കിൽ വിലാസ രേഖ",
                "പാചകവാതക പാസ്സ്ബുക്ക് പകർപ്പ്",
                "വരുമാന സർട്ടിഫിക്കറ്റ്"
            ]
        }
    },

    # 7. AYUSHMAN CARD
    "ayushman-card": {
        "en": {
            "title": "Ayushman Bharat Health Card (PM-JAY)",
            "shortDescription": "National health protection scheme providing ₹5 Lakhs annual cashless hospitalization cover per family.",
            "processingTime": "Same Day (Instant Issuance)",
            "officialFee": "₹0 (Completely Free of Cost)",
            "benefitAmount": "₹5,00,000 per family per year for secondary and tertiary hospital care",
            "spokenSummary": "Ayushman Bharat PM-JAY gives up to five lakh rupees free hospital treatment every year for your family across thousands of hospitals. The card is issued completely free with zero fee. You only need your Aadhaar card and your family ration card.",
            "targetGroup": "Eligible families under SECC 2011 database or state health entitlement lists",
            "incomeLimit": "Covered under rural deprivations or urban occupational categories",
            "residenceRequirement": "Indian citizen eligible under government health registry",
            "questions": [
                {"id": "secc_or_ration", "question": "Does your family hold a Priority Household (PHH) or Antyodaya ration card?", "explanation": "Eligible categories get ₹5 Lakhs free hospital treatment per year."},
                {"id": "aadhaar_biometric", "question": "Can you provide Aadhaar fingerprint or face authentication at any hospital kiosk?", "explanation": "Instant paperless e-card generation."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "Check Name in Beneficiary List", "instruction": "Verify eligibility on beneficiary.nha.gov.in using Aadhaar or ration card.", "tip": "Enter active mobile number to receive OTP."},
                {"stepNumber": 2, "title": "Visit Empanelled Hospital or CSC", "instruction": "Go to Ayushman Mitra kiosk at any government or private network hospital.", "tip": "Ayushman Mitra assistance is free."},
                {"stepNumber": 3, "title": "Biometric e-KYC", "instruction": "Authenticate using thumb impression or face scan.", "tip": "Instant matching with Aadhaar records."},
                {"stepNumber": 4, "title": "Instant Golden Card Issuance", "instruction": "Receive printed Ayushman PVC card for cashless medical treatment.", "tip": "Valid nationwide at all network hospitals."}
            ],
            "requiredDocuments": [
                "Aadhaar Card of each beneficiary family member",
                "Ration Card (PHH or Antyodaya) or PMJAY letter",
                "Active mobile number for OTP verification"
            ]
        },
        "te": {
            "title": "ఆయుష్మాన్ భారత్ హెల్త్ కార్డు (PM-JAY)",
            "shortDescription": "ప్రతి కుటుంబానికి ఏడాదికి ₹5 లక్షల వరకు ఉచిత నగదు రహిత ఆసుపత్రి చికిత్సను అందించే జాతీయ ఆరోగ్య పథకం.",
            "processingTime": "అదే రోజు (తక్షణ జారీ)",
            "officialFee": "₹0 (పూర్తిగా ఉచిత సేవ)",
            "benefitAmount": "కుటుంబానికి ఏడాదికి ₹5,00,000 వరకు ఉచిత ఆసుపత్రి వైద్య చికిత్స",
            "spokenSummary": "ఆయుష్మాన్ భారత్ పథకం మీ కుటుంబానికి దేశవ్యాప్తంగా వేలాది నెట్‌వర్క్ ఆసుపత్రులలో ఏడాదికి ఐదు లక్షల రూపాయల వరకు ఉచిత చికిత్సను అందిస్తుంది. ఈ కార్డు పూర్తిగా ఉచితంగా ఇవ్వబడుతుంది. మీ ఆధార్ కార్డు మరియు రేషన్ కార్డు మాత్రమే అవసరం.",
            "targetGroup": "ఆహార భద్రత కార్డు లేదా ప్రభుత్వ ఆరోగ్య పథకాల పరిధిలో ఉన్న అర్హులైన కుటుంబాలు",
            "incomeLimit": "ఆరోగ్య అర్హత జాబితా లేదా తెల్ల రేషన్ కార్డు పరిధిలోకి రావాలి",
            "residenceRequirement": "ప్రభుత్వ ఆరోగ్య గుర్తింపు జాబితాలో పేరు ఉన్న భారతీయ పౌరులు",
            "questions": [
                {"id": "secc_or_ration", "question": "మీ కుటుంబం వద్ద తెల్ల రేషన్ కార్డు (PHH లేదా అంత్యోదయ) ఉందా?", "explanation": "అర్హత కలిగిన కుటుంబాలు ఏడాదికి ₹5 లక్షల ఉచిత వైద్యం పొందుతాయి."},
                {"id": "aadhaar_biometric", "question": "ఆసుపత్రి కియోస్క్ వద్ద ఆధార్ వేలిముద్ర లేదా ముఖ ధ్రువీకరణ ఇవ్వగలరా?", "explanation": "కాగిత రహిత తక్షణ కార్డు జారీ కోసం ఉపయోగించబడుతుంది."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "లబ్ధిదారుల జాబితాలో పేరు తనిఖీ చేయండి", "instruction": "ఆధార్ లేదా రేషన్ కార్డు ద్వారా beneficiary.nha.gov.in లో అర్హతను పరిశీలించండి.", "tip": "ఓటీపీ కోసం మొబైల్ నంబర్ అందుబాటులో ఉంచండి."},
                {"stepNumber": 2, "title": "ఆసుపత్రి లేదా సిఎస్‌సి కేంద్రానికి వెళ్లండి", "instruction": "ప్రభుత్వ లేదా నెట్‌వర్క్ ప్రైవేట్ ఆసుపత్రిలోని ఆయుష్మాన్ మిత్ర కియోస్క్‌ను సంప్రదించండి.", "tip": "ఆయుష్మాన్ మిత్ర సేవ పూర్తిగా ఉచితం."},
                {"stepNumber": 3, "title": "బయోమెట్రిక్ ఇ-కేవైసీ (e-KYC)", "instruction": "వేలిముద్ర లేదా ముఖ స్కానింగ్ ద్వారా ధ్రువీకరించండి.", "tip": "ఆధార్ రికార్డులతో తక్షణ పోలిక."},
                {"stepNumber": 4, "title": "తక్షణ ఆయుష్మాన్ కార్డు పొందండి", "instruction": "ఉచిత చికిత్స కోసం కార్డు ప్రింట్ లేదా డిజిటల్ కార్డును తీసుకోండి.", "tip": "దేశవ్యాప్తంగా అన్ని నెట్‌వర్క్ ఆసుపత్రులలో చెల్లుతుంది."}
            ],
            "requiredDocuments": [
                "కుటుంబ సభ్యులందరి ఆధార్ కార్డులు",
                "తెల్ల రేషన్ కార్డు లేదా PMJAY ఆహ్వాన లేఖ",
                "ఓటీపీ ధ్రువీకరణ కోసం క్రియాశీల మొబైల్ నంబర్"
            ]
        },
        "kn": {
            "title": "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಆರೋಗ್ಯ ಕಾರ್ಡ್ (PM-JAY)",
            "shortDescription": "ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ವಾರ್ಷಿಕ ₹5 ಲಕ್ಷದವರೆಗೆ ನಗದು ರಹಿತ ಉಚಿತ ಆಸ್ಪತ್ರೆ ಚಿಕಿತ್ಸೆ ನೀಡುವ ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ರಕ್ಷಾ ಯೋಜನೆ.",
            "processingTime": "ಅದೇ ದಿನ (ತಕ್ಷಣ ವಿತರಣೆ)",
            "officialFee": "₹0 (ಸಂಪೂರ್ಣ ಉಚಿತ)",
            "benefitAmount": "ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ವರ್ಷಕ್ಕೆ ₹5,00,000 ವರೆಗೆ ಉಚಿತ ಆಸ್ಪತ್ರೆ ಚಿಕಿತ್ಸೆ",
            "spokenSummary": "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಯೋಜನೆಯು ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ವಾರ್ಷಿಕ ಐದು ಲಕ್ಷ ರೂಪಾಯಿಗಳವರೆಗೆ ಉಚಿತ ಆಸ್ಪತ್ರೆ ಚಿಕಿತ್ಸೆಯನ್ನು ನೀಡುತ್ತದೆ. ಕಾರ್ಡ್ ವಿತರಣೆಗೆ ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲ, ಸಂಪೂರ್ಣ ಉಚಿತ. ನಿಮ್ಮ ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ರೇಷನ್ ಕಾರ್ಡ್ ಇದ್ದರೆ ಸಾಕು.",
            "targetGroup": "ಪಡಿತರ ಚೀಟಿ ಹೊಂದಿರುವ ಅಥವಾ ಆರೋಗ್ಯ ಯೋಜನೆಗೆ ಅರ್ಹವಾದ ಕುಟುಂಬಗಳು",
            "incomeLimit": "ಆಹಾರ ಭದ್ರತಾ ಪಡಿತರ ಚೀಟಿ ವ್ಯಾಪ್ತಿಗೆ ಒಳಪಟ್ಟಿರಬೇಕು",
            "residenceRequirement": "ಸರ್ಕಾರಿ ಆರೋಗ್ಯ ಪಟ್ಟಿಯಲ್ಲಿ ಅರ್ಹತೆ ಹೊಂದಿರುವ ನಾಗರಿಕರು",
            "questions": [
                {"id": "secc_or_ration", "question": "ನಿಮ್ಮ ಕುಟುಂಬವು ಆದ್ಯತಾ ಪಡಿತರ ಚೀಟಿ (PHH/BPL) ಅಥವಾ ಅಂತ್ಯೋದಯ ಕಾರ್ಡ್ ಹೊಂದಿದೆಯೇ?", "explanation": "ಅರ್ಹ ಕುಟುಂಬಗಳಿಗೆ ₹5 ಲಕ್ಷದವರೆಗೆ ಉಚಿತ ಆಸ್ಪತ್ರೆ ಚಿಕಿತ್ಸೆ ದೊರೆಯುತ್ತದೆ."},
                {"id": "aadhaar_biometric", "question": "ಆಸ್ಪತ್ರೆಯ ಕಿಯೋಸ್ಕ್‌ನಲ್ಲಿ ಆಧಾರ್ ಹೆಬ್ಬೆರಳು ಅಥವಾ ಮುಖದ ದೃಢೀಕರಣ ನೀಡಬಹುದೇ?", "explanation": "ಕಾಗದ ರಹಿತ ತಕ್ಷಣದ ಇ-ಕಾರ್ಡ್ ರಚನೆಗಾಗಿ."},
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ಫಲಾನುಭವಿ ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರು ಪರಿಶೀಲಿಸಿ", "instruction": "ಆಧಾರ್ ಅಥವಾ ರೇಷನ್ ಕಾರ್ಡ್ ಬಳಸಿ beneficiary.nha.gov.in ನಲ್ಲಿ ಅರ್ಹತೆ ನೋಡಿ.", "tip": "OTP ಗಾಗಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಸಿದ್ಧವಾಗಿರಲಿ."},
                {"stepNumber": 2, "title": "ಆಸ್ಪತ್ರೆ ಅಥವಾ ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ", "instruction": "ನೆಟ್‌ವರ್ಕ್ ಆಸ್ಪತ್ರೆಯಲ್ಲಿರುವ ಆಯುಷ್ಮಾನ್ ಮಿತ್ರ ಕಿಯೋಸ್ಕ್ ಬಳಿ ಹೋಗಿ.", "tip": "ಆಯುಷ್ಮಾನ್ ಮಿತ್ರ ಸೇವೆ ಸಂಪೂರ್ಣ ಉಚಿತ."},
                {"stepNumber": 3, "title": "ಬಯೋಮೆಟ್ರಿಕ್ ಇ-ಕೆವೈಸಿ (e-KYC)", "instruction": "ಹೆಬ್ಬೆರಳಿನ ಗುರುತು ಅಥವಾ ಮುಖದ ಸ್ಕ್ಯಾನ್ ಮೂಲಕ ದೃಢೀಕರಿಸಿ.", "tip": "ಆಧಾರ್ ಮೂಲಕ ತಕ್ಷಣದ ದೃಢೀಕರಣ."},
                {"stepNumber": 4, "title": "ತಕ್ಷಣದ ಆಯುಷ್ಮಾನ್ ಕಾರ್ಡ್ ಪಡೆಯಿರಿ", "instruction": "ಉಚಿತ ಚಿಕಿತ್ಸೆಗಾಗಿ ಆಯುಷ್ಮಾನ್ ಕಾರ್ಡ್ ಪ್ರಿಂಟ್ ಪಡೆಯಿರಿ.", "tip": "ದೇಶದ ಎಲ್ಲಾ ನೋಂದಾಯಿತ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಮಾನ್ಯವಾಗಿದೆ."}
            ],
            "requiredDocuments": [
                "ಕುಟುಂಬದ ಪ್ರತಿಯೊಬ್ಬ ಸದಸ್ಯರ ಆಧಾರ್ ಕಾರ್ಡ್",
                "ಬಿಪಿಎಲ್ ರೇಷನ್ ಕಾರ್ಡ್ ಅಥವಾ ಪಿಎಂಜೆಎವೈ ಪತ್ರ",
                "ಒಟಿಪಿ ಪಡೆಯಲು ಸಕ್ರಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
            ]
        },
        "hi": {
            "title": "आयुष्मान भारत हेल्थ कार्ड (PM-JAY)",
            "shortDescription": "प्रति परिवार प्रति वर्ष ₹5 लाख तक का मुफ्त कैशलेस अस्पताल उपचार प्रदान करने वाली राष्ट्रीय स्वास्थ्य योजना।",
            "processingTime": "उसी दिन (तत्काल जारी)",
            "officialFee": "₹0 (पूर्णतः निःशुल्क)",
            "benefitAmount": "प्रति परिवार प्रति वर्ष ₹5,00,000 तक का मुफ्त अस्पताल इलाज",
            "spokenSummary": "आयुष्मान भारत योजना के तहत आपके परिवार को देश भर के हजारों अस्पतालों में प्रति वर्ष पांच लाख रुपये तक का मुफ्त इलाज मिलता है। यह कार्ड पूरी तरह मुफ्त बनता है। आपको केवल अपना आधार कार्ड और राशन कार्ड लेकर जाना होगा।",
            "targetGroup": "खाद्य सुरक्षा राशन कार्ड या सामाजिक-आर्थिक स्वास्थ्य सूची में पात्र परिवार",
            "incomeLimit": "बीपीएल श्रेणी या खाद्य सुरक्षा पात्रता के अंतर्गत आना आवश्यक",
            "residenceRequirement": "पात्र भारतीय नागरिक",
            "questions": [
                {"id": "secc_or_ration", "question": "क्या आपके परिवार के पास पात्र गृहस्थी (PHH) या अंत्योदय राशन कार्ड है?", "explanation": "पात्र परिवारों को सालाना ₹5 लाख तक मुफ्त अस्पताल इलाज मिलता है।"},
                {"id": "aadhaar_biometric", "question": "क्या आप अस्पताल कियोस्क पर आधार फिंगरप्रिंट या फेस प्रमाणीकरण दे सकते हैं?", "explanation": "तत्काल पेपरलेस कार्ड बनाने के लिए आवश्यक है।"}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "पात्रता सूची में नाम जांचें", "instruction": "beneficiary.nha.gov.in पर आधार या राशन कार्ड से नाम देखें।", "tip": "ओटीपी के लिए चालू मोबाइल नंबर रखें।"},
                {"stepNumber": 2, "title": "सूचीबद्ध अस्पताल या सीएससी जाएं", "instruction": "सरकारी या निजी अस्पताल में आयुष्मान मित्र से संपर्क करें।", "tip": "आयुष्मान मित्र की सेवा पूरी तरह मुफ्त है।"},
                {"stepNumber": 3, "title": "बायोमेट्रिक ई-केवाईसी (e-KYC)", "instruction": "अंगूठा लगाकर या चेहरा स्कैन करवाकर सत्यापन करें।", "tip": "आधार रिकॉर्ड से तुरंत मिलान होता है।"},
                {"stepNumber": 4, "title": "तत्काल आयुष्मान गोल्डन कार्ड प्राप्त करें", "instruction": "निशुल्क इलाज के लिए अपना आयुष्मान कार्ड प्राप्त करें।", "tip": "देश भर के सभी संबद्ध अस्पतालों में मान्य।"}
            ],
            "requiredDocuments": [
                "परिवार के सभी सदस्यों के आधार कार्ड",
                "राशन कार्ड (पात्र गृहस्थी या अंत्योदय)",
                "ओटीपी सत्यापन हेतु सक्रिय मोबाइल नंबर"
            ]
        },
        "ta": {
            "title": "ஆயுஷ்மான் பாரத் மருத்துவ அட்டை (PM-JAY)",
            "shortDescription": "ஒவ்வொரு குடும்பத்திற்கும் ஆண்டுக்கு ₹5 லட்சம் வரை இலவச பணமில்லா மருத்துவமனை சிகிச்சையை வழங்கும் தேசியத் திட்டம்.",
            "processingTime": "அன்றைய தினமே (உடனடி வழங்கல்)",
            "officialFee": "₹0 (முற்றிலும் இலவசம்)",
            "benefitAmount": "குடும்பத்திற்கு ஆண்டுதோறும் ₹5,00,000 வரை இலவச மருத்துவமனை சிகிச்சை",
            "spokenSummary": "ஆயுஷ்மான் பாரத் திட்டம் உங்கள் குடும்பத்திற்கு ஆண்டுக்கு ஐந்து லட்சம் ரூபாய் வரை இலவச மருத்துவமனை சிகிச்சையை வழங்குகிறது. இந்த அட்டை முற்றிலும் இலவசமாக வழங்கப்படுகிறது. உங்கள் ஆதார் அட்டை மற்றும் குடும்ப அட்டை இருந்தால் போதுமானது.",
            "targetGroup": "அரசு சுகாதார நலப் பட்டியலில் உள்ள தகுதியான குடும்பங்கள்",
            "incomeLimit": "முன்னுரிமை குடும்ப அட்டை வரம்பிற்குள் இருக்க வேண்டும்",
            "residenceRequirement": "அரசு சுகாதாரப் பதிவேட்டில் உள்ள இந்தியக் குடிமக்கள்",
            "questions": [
                {"id": "secc_or_ration", "question": "குடும்பத்தில் முன்னுரிமை குடும்ப அட்டை (PHH) அல்லது அந்தியோதயா அட்டை உள்ளதா?", "explanation": "தகுதியான குடும்பங்களுக்கு ₹5 லட்சம் வரை இலவச சிகிச்சை கிடைக்கும்."},
                {"id": "aadhaar_biometric", "question": "மருத்துவமனையில் ஆதார் கைரேகை அல்லது முக அங்கீகாரம் வழங்க முடியுமா?", "explanation": "காகிதமில்லா உடனடி அட்டை உருவாக்கத்திற்கு இது தேவை."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "பயனாளிகள் பட்டியலில் பெயரை சரிபார்க்கவும்", "instruction": "beneficiary.nha.gov.in இணையதளத்தில் ஆதார் மூலம் தகுதியை சோதிக்கவும்.", "tip": "ஓடிபி பெற மொபைல் எண்ணை தயாராக வைக்கவும்."},
                {"stepNumber": 2, "title": "மருத்துவமனை அல்லது இ-சேவை மையம் செல்லவும்", "instruction": "அங்கீகரிக்கப்பட்ட மருத்துவமனையில் உள்ள ஆயுஷ்மான் மித்ராவை அணுகவும்.", "tip": "ஆயுஷ்மான் மித்ரா உதவி முற்றிலும் இலவசம்."},
                {"stepNumber": 3, "title": "பயோமெட்ரிக் இ-கேஒய்சி (e-KYC)", "instruction": "கைரேகை அல்லது முக ஸ்கேன் மூலம் சரிபார்க்கவும்.", "tip": "ஆதார் பதிவுகளுடன் உடனுக்குடன் பொருந்தும்."},
                {"stepNumber": 4, "title": "உடனடி ஆயுஷ்மான் அட்டை பெறவும்", "instruction": "இலவச சிகிச்சையைப் பெற ஆயுஷ்மான் அட்டையைப் பெற்றுக்கொள்ளவும்.", "tip": "நாடெங்கிலும் உள்ள அனைத்து நெட்வொர்க் மருத்துவமனைகளிலும் செல்லும்."}
            ],
            "requiredDocuments": [
                "குடும்பத்தில் உள்ள ஒவ்வொருவரின் ஆதார் அட்டை",
                "குடும்ப அட்டை (Ration Card)",
                "ஓடிபி சரிபார்ப்பிற்கான மொபைல் எண்"
            ]
        },
        "ml": {
            "title": "ആയുഷ്മാൻ ഭാരത് ആരോഗ്യ കാർഡ് (PM-JAY)",
            "shortDescription": "പ്രതിവർഷം കുടുംബത്തിന് ₹5 ലക്ഷം രൂപ വരെ സൗജന്യ കിടത്തിച്ചികിത്സ നൽകുന്ന ദേശീയ ആരോഗ്യ ഇൻഷുറൻസ് പദ്ധതി.",
            "processingTime": "അന്നേ ദിവസം തന്നെ (ഉടൻ ലഭിക്കുന്നു)",
            "officialFee": "₹0 (പൂർണ്ണമായും സൗജന്യം)",
            "benefitAmount": "പ്രതിവർഷം ₹5,00,000 വരെയുള്ള സൗജന്യ ആശുപത്രി ചികിത്സ",
            "spokenSummary": "ആയുഷ്മാൻ ഭാരത് പദ്ധതി വഴി നിങ്ങളുടെ കുടുംബത്തിന് വർഷത്തിൽ അഞ്ച് ലക്ഷം രൂപ വരെ സൗജന്യ ആശുപത്രി ചികിത്സ ലഭിക്കും. കാർഡ് പൂർണ്ണമായും സൗജന്യമായി ലഭിക്കും. ആധാർ കാർഡും റേഷൻ കാർഡും മാത്രം കരുതുക.",
            "targetGroup": "സർക്കാർ ആരോഗ്യ പട്ടികയിലുള്ള മുൻഗണനാ കുടുംബങ്ങൾ",
            "incomeLimit": "റേഷൻ കാർഡ് മുൻഗണനാ മാനദണ്ഡങ്ങൾക്ക് വിധേയം",
            "residenceRequirement": "ആരോഗ്യ സുരക്ഷാ പദ്ധതിയിൽ ഉൾപ്പെട്ട പൗരന്മാർ",
            "questions": [
                {"id": "secc_or_ration", "question": "കുടുംബത്തിന് മുൻഗണനാ റേഷൻ കാർഡോ (PHH) അന്ത്യോദയ കാർഡോ ഉണ്ടോ?", "explanation": "അർഹരായ കുടുംബങ്ങൾക്ക് ₹5 ലക്ഷം വരെ സൗജന്യ ചികിത്സ ലഭിക്കും."},
                {"id": "aadhaar_biometric", "question": "ആശുപത്രി കിയോസ്കിൽ ആധാർ വിരലടയാളം നൽകാൻ സാധിക്കുമോ?", "explanation": "തൽക്ഷണ കാർഡ് ലഭിക്കാൻ ബയോമെട്രിക് ആവശ്യമാണ്."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "പട്ടികയിൽ പേരുണ്ടോ എന്ന് പരിശോധിക്കുക", "instruction": "beneficiary.nha.gov.in എന്ന വെബ്സൈറ്റിൽ പേര് പരിശോധിക്കുക.", "tip": "ഒടിപി ലഭിക്കാൻ മൊബൈൽ കരുതുക."},
                {"stepNumber": 2, "title": "ആശുപത്രിയിലോ അക്ഷയയിലോ പോകുക", "instruction": "എംപാനൽ ചെയ്ത ആശുപത്രിയിലെ ആയുഷ്മാൻ മിത്രയെ കാണുക.", "tip": "ആയുഷ്മാൻ മിത്ര സേവനം സൗജന്യമാണ്."},
                {"stepNumber": 3, "title": "ബയോമെട്രിക് ഇ-കെവൈസി (e-KYC)", "instruction": "വിരലടയാളം അല്ലെങ്കിൽ ഫേസ് സ്കാൻ വഴി സാക്ഷ്യപ്പെടുത്തുക.", "tip": "ആധാറുമായി ഉടൻ ഒത്തുനോക്കുന്നു."},
                {"stepNumber": 4, "title": "ആയുഷ്മാൻ കാർഡ് കൈപ്പറ്റുക", "instruction": "സൗജന്യ ചികിത്സക്കായി കാർഡ് പ്രിന്റ് ചെയ്യുക.", "tip": "രാജ്യത്തെ എല്ലാ നെറ്റ്‌വർക്ക് ആശുപത്രികളിലും ഉപയോഗിക്കാം."}
            ],
            "requiredDocuments": [
                "എല്ലാ കുടുംബാംഗങ്ങളുടെയും ആധാർ കാർഡുകൾ",
                "റേഷൻ കാർഡ് (PHH അല്ലെങ്കിൽ അന്ത്യോദയ)",
                "ഒടിപിക്കായുള്ള മൊബൈൽ നമ്പർ"
            ]
        }
    },

    # 8. PM KISAN
    "pm-kisan": {
        "en": {
            "title": "PM Kisan Samman Nidhi",
            "shortDescription": "Direct income support of ₹6,000 per year transferred in 3 equal installments to landholding farmer families.",
            "processingTime": "15 to 25 Working Days",
            "officialFee": "₹0 (Completely Free of Cost)",
            "benefitAmount": "₹6,000 per year directly deposited into farmer bank account (₹2,000 every 4 months)",
            "spokenSummary": "PM Kisan Samman Nidhi gives six thousand rupees every year directly to eligible farmer families in three installments of two thousand rupees. The application is completely free of cost. You need your land registration document (Pahani or Khatauni), Aadhaar card, and bank passbook.",
            "targetGroup": "Small and marginal farmer families holding cultivable land",
            "incomeLimit": "Institutional landholders, income tax payees, and professionals excluded",
            "residenceRequirement": "Farmer with registered agricultural land records",
            "questions": [
                {"id": "land_records", "question": "Do you hold cultivable agricultural land registered in your own name (Khasra/Khatauni)?", "explanation": "Land ownership records are matched with state revenue registry."},
                {"id": "no_tax_filer", "question": "Confirm that no member of your immediate family files income tax or holds high public office.", "explanation": "Institutional landowners and high income professionals excluded."},
                {"id": "aadhaar_dbt", "question": "Is your bank account linked to your Aadhaar card for Direct Benefit Transfer?", "explanation": "Installment money cannot be sent to unlinked bank accounts."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "Check Land Records (RTC/Pahani/Khatauni)", "instruction": "Keep updated land ownership documents ready.", "tip": "Land records must be in applicant's name."},
                {"stepNumber": 2, "title": "Self-Register on pmkisan.gov.in", "instruction": "Submit Aadhaar, land details, and mobile number on PM-Kisan portal.", "tip": "Complete Aadhaar e-KYC online."},
                {"stepNumber": 3, "title": "State Revenue Officer Verification", "instruction": "Nodal revenue officers verify land ownership.", "tip": "Agriculture department approves record."},
                {"stepNumber": 4, "title": "Receive ₹6,000 Annual Financial Benefit", "instruction": "Transferred directly in 3 equal installments of ₹2,000 every 4 months.", "tip": "Check payment status online via Aadhaar."}
            ],
            "requiredDocuments": [
                "Agricultural land record (Pahani / Khasra / RTC / 7/12 extract)",
                "Farmer's Aadhaar Card",
                "Aadhaar-seeded bank account passbook copy",
                "Self-declaration certificate of land ownership"
            ]
        },
        "te": {
            "title": "పీఎం కిసాన్ సమ్మాన్ నిధి (PM-KISAN)",
            "shortDescription": "వ్యవసాయ భూమి కలిగిన రైతు కుటుంబాలకు ఏటా ₹6,000 ప్రత్యక్ష ఆదాయ సహాయాన్ని 3 విడతల్లో అందించే పథకం.",
            "processingTime": "15 నుండి 25 పనిదినాలు",
            "officialFee": "₹0 (పూర్తిగా ఉచిత సేవ)",
            "benefitAmount": "ఏడాదికి ₹6,000 నేరుగా రైతు బ్యాంకు ఖాతాలో జమ (ప్రతి 4 నెలలకు ₹2,000)",
            "spokenSummary": "పీఎం కిసాన్ సమ్మాన్ నిధి పథకం కింద రైతులకు ప్రతి సంవత్సరం ఆరు వేల రూపాయలను రెండు వేల రూపాయల చొప్పున మూడు విడతల్లో నేరుగా బ్యాంకు ఖాతాలో జమ చేస్తారు. దీనికి ఎలాంటి ప్రభుత్వ రుసుము లేదు. మీ పట్టాదారు పాస్‌బుక్, ఆధార్ కార్డు మరియు బ్యాంకు పాస్‌బుక్ అవసరం.",
            "targetGroup": "సాగుభూమి కలిగి ఉన్న చిన్న మరియు సన్నకారు రైతు కుటుంబాలు",
            "incomeLimit": "ఆదాయపు పన్ను చెల్లించేవారు మరియు రాజ్యాంగ పదవుల్లో ఉన్నవారు మినహాయింపు",
            "residenceRequirement": "రిజిస్టర్డ్ వ్యవసాయ భూమి రికార్డులు కలిగిన రైతులు",
            "questions": [
                {"id": "land_records", "question": "మీ స్వంత పేరుపై సాగు చేయదగిన వ్యవసాయ భూమి రికార్డు (పట్టాదారు పాస్‌బుక్/1B) ఉందా?", "explanation": "భూమి యాజమాన్య వివరాలు రాష్ట్ర రెవెన్యూ రికార్డులతో సరిపోల్చబడతాయి."},
                {"id": "no_tax_filer", "question": "మీ కుటుంబంలో ఎవరూ ఆదాయపు పన్ను చెల్లించరని లేదా ఉన్నత పదవుల్లో లేరని ధ్రువీకరించండి.", "explanation": "సంస్థాగత భూ యజమానులు మరియు అధిక ఆదాయ వర్గాలకు వర్తించదు."},
                {"id": "aadhaar_dbt", "question": "మీ బ్యాంకు ఖాతాకు ఆధార్ డీబీటీ (DBT) లింక్ చేయబడి ఉందా?", "explanation": "పీఎం కిసాన్ వాయిదా నగదు నేరుగా ఆధార్ లింక్ అయిన ఖాతాకే చేరుతుంది."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "భూమి రికార్డులను సిద్ధం చేయండి", "instruction": "పట్టాదారు పాస్‌బుక్ లేదా 1బి అడంగల్ కాపీని సిద్ధంగా ఉంచుకోండి.", "tip": "భూమి రికార్డులలో పేరు సరిగ్గా ఉండాలి."},
                {"stepNumber": 2, "title": "pmkisan.gov.in లో నమోదు చేసుకోండి", "instruction": "రైతు పోర్టల్ లేదా రైతు భరోసా కేంద్రంలో వివరాలు సమర్పించండి.", "tip": "ఆధార్ ఇ-కేవైసీ తప్పక పూర్తి చేయండి."},
                {"stepNumber": 3, "title": "వ్యవసాయ శాఖ అధికారుల పరిశీలన", "instruction": "స్థానిక రెవెన్యూ మరియు వ్యవసాయ అధికారులు భూమి వివరాలు పరిశీలిస్తారు.", "tip": "భూ రికార్డులను ఆన్‌లైన్‌లో సరిచూస్తారు."},
                {"stepNumber": 4, "title": "ఏడాదికి ₹6,000 ఖాతాలో పొందండి", "instruction": "ప్రతి నాలుగు నెలలకు ఒకసారి ₹2,000 నేరుగా బ్యాంకులో జమ అవుతుంది.", "tip": "ఆధార్ నంబర్‌తో స్టేటస్ చెక్ చేసుకోవచ్చు."}
            ],
            "requiredDocuments": [
                "పట్టాదారు పాస్‌బుక్ / అడంగల్ / 1B భూ రికార్డు",
                "రైతు ఆధార్ కార్డు",
                "ఆధార్ లింక్ అయిన బ్యాంకు పాస్‌బుక్ కాపీ",
                "వ్యవసాయ భూ యాజమాన్య స్వయం-ధ్రువీకరణ పత్రం"
            ]
        },
        "kn": {
            "title": "ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-KISAN)",
            "shortDescription": "ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ವರ್ಷಕ್ಕೆ ₹6,000 ನೇರ ಆರ್ಥಿಕ ನೆರವು ನೀಡುವ ಪ್ರಧಾನ ಮಂತ್ರಿ ಯೋಜನೆ.",
            "processingTime": "15 ರಿಂದ 25 ಕೆಲಸದ ದಿನಗಳು",
            "officialFee": "₹0 (ಸಂಪೂರ್ಣ ಉಚಿತ)",
            "benefitAmount": "ವರ್ಷಕ್ಕೆ ₹6,000 ನೇರವಾಗಿ ರೈತರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ (ಪ್ರತಿ 4 ತಿಂಗಳಿಗೆ ₹2,000)",
            "spokenSummary": "ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ ಯೋಜನೆಯು ಅರ್ಹ ರೈತರಿಗೆ ಪ್ರತಿ ವರ್ಷ ಆರು ಸಾವಿರ ರೂಪಾಯಿಗಳನ್ನು ತಲಾ ಎರಡು ಸಾವಿರ ರೂಪಾಯಿಗಳಂತೆ ಮೂರು ಕಂತುಗಳಲ್ಲಿ ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೀಡುತ್ತದೆ. ಅರ್ಜಿ ಶುಲ್ಕ ಉಚಿತ. ನಿಮ್ಮ ಪಹಣಿ (RTC), ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಸಿದ್ಧವಾಗಿರಲಿ.",
            "targetGroup": "ಕೃಷಿಯೋಗ್ಯ ಜಮೀನು ಹೊಂದಿರುವ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತ ಕುಟುಂಬಗಳು",
            "incomeLimit": "ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರು ಮತ್ತು ಸಾಂವಿಧಾನಿಕ ಹುದ್ದೆ ಹೊಂದಿರುವವರಿಗೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ",
            "residenceRequirement": "ಕೃಷಿ ಭೂಮಿ ದಾಖಲೆ ಹೊಂದಿರುವ ರೈತರು",
            "questions": [
                {"id": "land_records", "question": "ನಿಮ್ಮ ಸ್ವಂತ ಹೆಸರಿನಲ್ಲಿ ಕೃಷಿಯೋಗ್ಯ ಜಮೀನಿನ ಪಹಣಿ (RTC/ಖಾತಾ) ದಾಖಲೆ ಇದೆಯೇ?", "explanation": "ಭೂ ಮಾಲೀಕತ್ವದ ದಾಖಲೆಗಳನ್ನು ರಾಜ್ಯದ ಕಂದಾಯ ಭೂಮಿ ಪೋರ್ಟಲ್‌ನೊಂದಿಗೆ ತಾಳೆ ಮಾಡಲಾಗುತ್ತದೆ."},
                {"id": "no_tax_filer", "question": "ಕುಟುಂಬದ ಯಾವುದೇ ಸದಸ್ಯರು ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರಲ್ಲ ಎಂದು ದೃಢೀಕರಿಸಿ.", "explanation": "ಸಂಸ್ಥಾಗತ ಭೂಮಾಲೀಕರು ಮತ್ತು ವೃತ್ತಿಪರರಿಗೆ ಈ ಯೋಜನೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ."},
                {"id": "aadhaar_dbt", "question": "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ ಡಿಬಿಟಿ (DBT) ಲಿಂಕ್ ಆಗಿದೆಯೇ?", "explanation": "ಕಂತಿನ ಹಣವು ನೇರವಾಗಿ ಆಧಾರ್ ಜೋಡಿತ ಖಾತೆಗೆ ಮಾತ್ರ ಜಮೆಯಾಗುತ್ತದೆ."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ಭೂ ದಾಖಲೆಗಳನ್ನು (RTC/ಪಹಣಿ) ಸಿದ್ಧಪಡಿಸಿ", "instruction": "ಪ್ರಸ್ತುತ ಸಾಲಿನ ಪಹಣಿ ಮತ್ತು ಖಾತಾ ವಿವರಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸಿ.", "tip": "ಭೂಮಿ ಅರ್ಜಿದಾರರ ಹೆಸರಲ್ಲೇ ಇರಬೇಕು."},
                {"stepNumber": 2, "title": "pmkisan.gov.in ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ", "instruction": "ರೈತ ಕೇಂದ್ರ ಅಥವಾ ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರದಲ್ಲಿ ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ.", "tip": "ಮೊಬೈಲ್ ಮೂಲಕ ಇ-ಕೆವೈಸಿ ಪೂರ್ಣಗೊಳಿಸಿ."},
                {"stepNumber": 3, "title": "ಕೃಷಿ ಅಧಿಕಾರಿಗಳಿಂದ ಪರಿಶೀಲನೆ", "instruction": "ಗ್ರಾಮ ಮಟ್ಟದ ಕೃಷಿ ಮತ್ತು ಕಂದಾಯ ಅಧಿಕಾರಿಗಳು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.", "tip": "ಭೂ ದಾಖಲೆಗಳ ನೈಜತೆಯನ್ನು ತಪಾಸಣೆ ಮಾಡಲಾಗುತ್ತದೆ."},
                {"stepNumber": 4, "title": "ವಾರ್ಷಿಕ ₹6,000 ಹಣ ಪಡೆಯಿರಿ", "instruction": "ಪ್ರತಿ 4 ತಿಂಗಳಿಗೊಮ್ಮೆ ₹2,000 ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಬರುತ್ತದೆ.", "tip": "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಕಂತಿನ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ."}
            ],
            "requiredDocuments": [
                "ಕೃಷಿ ಭೂಮಿ ಪಹಣಿ (RTC / ಪಹಣಿ ಪ್ರತಿ)",
                "ರೈತರ ಆಧಾರ್ ಕಾರ್ಡ್",
                "ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಜೆರಾಕ್ಸ್",
                "ಭೂ ಹಿಡುವಳಿ ಸ್ವಯಂ ಘೋಷಣಾ ಪತ್ರ"
            ]
        },
        "hi": {
            "title": "पीएम किसान सम्मान निधि (PM-KISAN)",
            "shortDescription": "भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता 3 समान किस्तों में प्रदान करने की योजना।",
            "processingTime": "15 से 25 कार्य दिवस",
            "officialFee": "₹0 (पूर्णतः निःशुल्क)",
            "benefitAmount": "₹6,000 प्रति वर्ष सीधे किसान के बैंक खाते में (₹2,000 प्रत्येक 4 माह में)",
            "spokenSummary": "पीएम किसान सम्मान निधि योजना के तहत किसानों को हर साल छह हजार रुपये की आर्थिक सहायता दो-दो हजार की तीन किस्तों में सीधे बैंक खाते में दी जाती है। आवेदन पूर्णतः निःशुल्क है। आपको अपनी खतौनी, आधार कार्ड और बैंक पासबुक की आवश्यकता होगी।",
            "targetGroup": "कृषि योग्य भूमि रखने वाले लघु एवं सीमांत किसान परिवार",
            "incomeLimit": "आयकर दाता, संस्थागत भूमिधारक एवं उच्च पदस्थ अधिकारी अपात्र हैं",
            "residenceRequirement": "पंजीकृत कृषि भूमि अभिलेख धारक किसान",
            "questions": [
                {"id": "land_records", "question": "क्या आपके नाम पर पंजीकृत कृषि योग्य भूमि का अभिलेख (खसरा/खतौनी) है?", "explanation": "भूमि स्वामित्व का मिलान राज्य राजस्व रिकॉर्ड से किया जाता है।"},
                {"id": "no_tax_filer", "question": "पुष्टि करें कि आपके परिवार का कोई सदस्य आयकर नहीं देता और न ही उच्च सरकारी पद पर है।", "explanation": "संस्थागत भूस्वामी एवं आयकर दाता योजना से बाहर हैं।"},
                {"id": "aadhaar_dbt", "question": "क्या आपका बैंक खाता प्रत्यक्ष लाभ अंतरण (DBT) हेतु आधार से जुड़ा है?", "explanation": "किस्त की राशि केवल आधार लिंक खाते में ही अंतरित होती है।"}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "जमीन के कागजात (खतौनी) तैयार रखें", "instruction": "नवीनतम भू-अभिलेख खतौनी और नकल पास रखें।", "tip": "जमीन आवेदक के नाम ही होनी चाहिए।"},
                {"stepNumber": 2, "title": "pmkisan.gov.in पर पंजीकरण करें", "instruction": "पोर्टल या नजदीकी सीएससी केंद्र पर किसान पंजीकरण कराएं।", "tip": "आधार ई-केवाईसी अनिवार्य रूप से पूरी करें।"},
                {"stepNumber": 3, "title": "राजस्व व कृषि विभाग द्वारा सत्यापन", "instruction": "स्थानीय कृषि अधिकारी भूमि रिकॉर्ड का सत्यापन करते हैं।", "tip": "राजस्व रिकॉर्ड से ऑनलाइन सत्यापन।"},
                {"stepNumber": 4, "title": "सालाना ₹6,000 सीधे खाते में पाएं", "instruction": "प्रत्येक 4 माह में ₹2,000 की किस्त सीधे खाते में आती है।", "tip": "पोर्टल पर आधार से किस्त स्थिति जांचें।"}
            ],
            "requiredDocuments": [
                "कृषि भूमि की खतौनी / जमाबंदी की नकल",
                "किसान का आधार कार्ड",
                "आधार लिंक बैंक पासबुक की प्रति",
                "भूमि स्वामित्व स्व-घोषणा पत्र"
            ]
        },
        "ta": {
            "title": "பிஎம் கிசான் சம்மான் நிதி (PM-KISAN)",
            "shortDescription": "விவசாய நிலம் வைத்துள்ள விவசாய குடும்பங்களுக்கு ஆண்டுதோறும் ₹6,000 நேரடி உதவித்தொகை வழங்கும் திட்டம்.",
            "processingTime": "15 முதல் 25 வேலை நாட்கள்",
            "officialFee": "₹0 (முற்றிலும் இலவசம்)",
            "benefitAmount": "ஆண்டுக்கு ₹6,000 நேரடியாக விவசாயியின் வங்கிக் கணக்கில் (4 மாதங்களுக்கு ஒருமுறை ₹2,000)",
            "spokenSummary": "பிஎம் கிசான் திட்டம் விவசாயிகளுக்கு ஆண்டுதோறும் ஆறாயிரம் ரூபாயை தலா இரண்டாயிரம் வீதம் மூன்று தவணைகளாக நேரடியாக வங்கிக் கணக்கில் வழங்குகிறது. விண்ணப்பிக்க கட்டணம் இல்லை. உங்கள் பட்டா சிட்டா, ஆதார் அட்டை மற்றும் வங்கி பாஸ்புக் தேவை.",
            "targetGroup": "விவசாய நிலம் வைத்துள்ள சிறு மற்றும் குறு விவசாய குடும்பங்கள்",
            "incomeLimit": "வருமான வரி செலுத்துவோர் மற்றும் நிறுவன நில உரிமையாளர்களுக்கு பொருந்தாது",
            "residenceRequirement": "விவசாய நில ஆவணங்கள் உள்ள விவசாயிகள்",
            "questions": [
                {"id": "land_records", "question": "உங்கள் பெயரில் விவசாய நில ஆவணங்கள் (பட்டா/சிட்டா) உள்ளதா?", "explanation": "நில உரிமை ஆவணங்கள் வருவாய்த்துறை பதிவுகளுடன் சரிபார்க்கப்படும்."},
                {"id": "no_tax_filer", "question": "குடும்பத்தில் யாரும் வருமான வரி செலுத்துபவராக இல்லை என்பதை உறுதிப்படுத்தவும்.", "explanation": "நிறுவன நில உரிமையாளர்கள் மற்றும் அதிக வருமானம் கொண்டோர் தகுதியற்றவர்கள்."},
                {"id": "aadhaar_dbt", "question": "நேரடிப் பணப் பரிமாற்றத்திற்கு (DBT) உங்கள் வங்கிக் கணக்கு ஆதாருடன் இணைக்கப்பட்டுள்ளதா?", "explanation": "தவணைத் தொகை ஆதாருடன் இணைக்கப்பட்ட வங்கிக் கணக்கில் மட்டுமே செலுத்தப்படும்."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "பட்டா சிட்டா ஆவணங்களைத் தயார் செய்யவும்", "instruction": "நில உரிமைக்கான பட்டா அல்லது சிட்டா நகலை எடுக்கவும்.", "tip": "நிலம் விண்ணப்பதாரர் பெயரிலேயே இருக்க வேண்டும்."},
                {"stepNumber": 2, "title": "pmkisan.gov.in போர்ட்டலில் பதிவு செய்யவும்", "instruction": "இ-சேவை மையம் அல்லது போர்ட்டலில் விண்ணப்பிக்கவும்.", "tip": "ஆதார் இ-கேஒய்சி முடிக்கப்பட வேண்டும்."},
                {"stepNumber": 3, "title": "வேளாண் துறை அலுவலர் சரிபார்ப்பு", "instruction": "வருவாய் மற்றும் வேளாண் அதிகாரிகள் நில ஆவணங்களை சரிபார்ப்பர்.", "tip": "நில விவரங்கள் இணையத்தில் சரிபார்க்கப்படும்."},
                {"stepNumber": 4, "title": "ஆண்டுக்கு ₹6,000 வங்கிக் கணக்கில் வரவு", "instruction": "4 மாதங்களுக்கு ஒருமுறை ₹2,000 நேரடியாக வங்கியில் வரவு வைக்கப்படும்.", "tip": "ஆதார் எண் மூலம் தவணை நிலையை அறியலாம்."}
            ],
            "requiredDocuments": [
                "விவசாய நில பட்டா / சிட்டா நகல்",
                "விவசாயியின் ஆதார் அட்டை",
                "ஆதார் இணைக்கப்பட்ட வங்கி கணக்குப் புத்தக நகல்",
                "நில உரிமை உறுதிமொழிப் பத்திரம்"
            ]
        },
        "ml": {
            "title": "പിഎം കിസാൻ സമ്മാൻ നിധി (PM-KISAN)",
            "shortDescription": "കൃഷിഭൂമിയുള്ള കർഷക കുടുംബങ്ങൾക്ക് പ്രതിവർഷം ₹6,000 നേരിട്ട് അക്കൗണ്ടിൽ ലഭ്യമാക്കുന്ന വരുമാന സഹായ പദ്ധതി.",
            "processingTime": "15 മുതൽ 25 പ്രവൃത്തിദിനങ്ങൾ",
            "officialFee": "₹0 (പൂർണ്ണമായും സൗജന്യം)",
            "benefitAmount": "പ്രതിവർഷം ₹6,000 നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിൽ (4 മാസം കൂടുമ്പോൾ ₹2,000)",
            "spokenSummary": "പിഎം കിസാൻ പദ്ധതി വഴി കർഷകർക്ക് പ്രതിവർഷം ആറായിരം രൂപ രണ്ടായിരം രൂപയുടെ മൂന്ന് ഗഡുക്കളായി നേരിട്ട് അക്കൗണ്ടിൽ ലഭിക്കുന്നു. അപേക്ഷ പൂർണ്ണമായും സൗജന്യമാണ്. കരമടച്ച രസീത്, തണ്ടപ്പേര്, ആധാർ കാർഡ്, ബാങ്ക് പാസ്സ്ബുക്ക് എന്നിവ കരുതുക.",
            "targetGroup": "കൃഷിഭൂമിയുള്ള ചെറുകിട നാമമാത്ര കർഷക കുടുംബങ്ങൾ",
            "incomeLimit": "ആദായനികുതി നൽകുന്നവരും ഉയർന്ന പദവികൾ വഹിക്കുന്നവരും ഉൾപ്പെടില്ല",
            "residenceRequirement": "രജിസ്റ്റർ ചെയ്ത കൃഷിഭൂമിയുള്ള കർഷകർ",
            "questions": [
                {"id": "land_records", "question": "നിങ്ങളുടെ സ്വന്തം പേരിലുള്ള കൃഷിഭൂമിയുടെ രേഖകൾ (കരം അടച്ച രസീത്/തണ്ടപ്പേര്) ഉണ്ടോ?", "explanation": "ഭൂമിയുടെ ഉടമസ്ഥാവകാശം റവന്യൂ രേഖകളുമായി ഒത്തുനോക്കുന്നു."},
                {"id": "no_tax_filer", "question": "കുടുംബത്തിൽ ആരും ആദായനികുതി നൽകുന്നില്ലെന്ന് ഉറപ്പാക്കുക.", "explanation": "സ്ഥാപന ഉടമസ്ഥതയിലുള്ള ഭൂമിയോ ഉയർന്ന വരുമാനക്കാരോ അർഹരല്ല."},
                {"id": "aadhaar_dbt", "question": "ബാങ്ക് അക്കൗണ്ട് ആധാർ ഡിബിറ്റി (DBT) വഴി ലിങ്ക് ചെയ്തിട്ടുണ്ടോ?", "explanation": "തുക ആധാർ ലിങ്ക് ചെയ്ത അക്കൗണ്ടിലേക്ക് മാത്രമേ വരൂ."}
            ],
            "simpleSteps": [
                {"stepNumber": 1, "title": "ഭൂമി രേഖകൾ തയ്യാറാക്കുക", "instruction": "കരം അടച്ച രസീതും തണ്ടപ്പേരും കരുതുക.", "tip": "ഭൂമി അപേക്ഷകന്റെ സ്വന്തം പേരിലായിരിക്കണം."},
                {"stepNumber": 2, "title": "pmkisan.gov.in ൽ രജിസ്റ്റർ ചെയ്യുക", "instruction": "പോർട്ടൽ വഴിയോ അക്ഷയ വഴിയോ വിവരങ്ങൾ നൽകുക.", "tip": "ആധാർ ഇ-കെവൈസി പൂർത്തിയാക്കുക."},
                {"stepNumber": 3, "title": "കൃഷി ഓഫീസറുടെ പരിശോധന", "instruction": "കൃഷി ഭവൻ അധികൃതർ രേഖകൾ പരിശോധിക്കുന്നു.", "tip": "ഓൺലൈൻ പരിശോധന നടത്തും."},
                {"stepNumber": 4, "title": "പ്രതിവർഷം ₹6,000 അക്കൗണ്ടിലേക്ക്", "instruction": "4 മാസം കൂടുമ്പോൾ ₹2,000 വീതം അക്കൗണ്ടിലെത്തുന്നു.", "tip": "പോർട്ടലിൽ സ്റ്റാറ്റസ് പരിശോധിക്കുക."}
            ],
            "requiredDocuments": [
                "കരം അടച്ച രസീത് / തണ്ടപ്പേര് പകർപ്പ്",
                "കർഷകന്റെ ആധാർ കാർഡ്",
                "ആധാർ ലിങ്ക് ചെയ്ത ബാങ്ക് പാസ്സ്ബുക്ക് പകർപ്പ്",
                "ഭൂവുടമസ്ഥത സംബന്ധിച്ച സത്യവാങ്മൂലം"
            ]
        }
    }
}

# 1. Output JavaScript module for React Frontend
js_dest = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "citizen-services-portal", "src", "data", "serviceFullTranslations.js")
)
with open(js_dest, "w", encoding="utf-8") as f:
    f.write("/**\n * Complete Multilingual Service Translations Dataset (All 8 services, 6 languages)\n * Includes title, description, officialFee, processingTime, benefitAmount, spokenSummary,\n * targetGroup, incomeLimit, residenceRequirement, eligibility questions, and simpleSteps.\n */\n\n")
    f.write("export const serviceFullTranslations = ")
    json.dump(SERVICES_DATA, f, ensure_ascii=False, indent=2)
    f.write(";\n\nexport default serviceFullTranslations;\n")

print(f"Generated {js_dest} with {len(SERVICES_DATA)} services across 6 languages.")

# 2. Update backend/normalized_seed_data.json
seed_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "normalized_seed_data.json")
)
with open(seed_path, "r", encoding="utf-8") as f:
    seed_data = json.load(f)

# Rebuild eligibility in seed_data
new_eligibility = []
new_steps = []

for svc_id, langs in SERVICES_DATA.items():
    for lang_code, svc in langs.items():
        # Questions
        for idx, q in enumerate(svc["questions"]):
            new_eligibility.append({
                "service_id": svc_id,
                "language_code": lang_code,
                "target_group": svc.get("targetGroup", "Open to all permanent residents"),
                "income_limit": svc.get("incomeLimit", "Standard statutory guidelines apply"),
                "residence_requirement": svc.get("residenceRequirement", "Resident citizen"),
                "question_id": q["id"],
                "question_text": q["question"],
                "simplified_explanation": q["explanation"],
                "is_mandatory": 1,
                "display_order": idx + 1,
                "is_demo": 0
            })
        
        # Steps
        for idx, s in enumerate(svc["simpleSteps"]):
            new_steps.append({
                "service_id": svc_id,
                "language_code": lang_code,
                "step_number": s["stepNumber"],
                "step_title": s["title"],
                "instruction_text": s["instruction"],
                "location_or_portal": "Official Government Portal / Seva Kendra",
                "tip_or_warning": s.get("tip", "Keep acknowledgement receipt safe."),
                "is_demo": 0
            })

seed_data["eligibility"] = new_eligibility
seed_data["steps"] = new_steps

with open(seed_path, "w", encoding="utf-8") as f:
    json.dump(seed_data, f, ensure_ascii=False, indent=2)

print(f"Updated {seed_path} with {len(new_eligibility)} eligibility items and {len(new_steps)} steps.")

# 3. Reset and re-seed SQLite database
db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "citizen_services.db"))
from database import init_db
init_db(reset=True)
print(f"Re-initialized SQLite database at {db_path} with 100% regional translations.")
