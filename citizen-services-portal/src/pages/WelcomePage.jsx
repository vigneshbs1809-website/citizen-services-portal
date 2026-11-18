import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Languages,
  CheckCircle,
  ArrowRight,
  Volume2,
  Info,
  Check
} from 'lucide-react';
import {
  PageContainer,
  Button,
  Heading1,
  BodyText,
  BodySecondary
} from '../design-system';
import { AudioGuideButton } from '../components/voice/AudioGuideButton';

export function WelcomePage({ onSpeak }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  // 6 Specified Official Languages with Native Script & Font Mappings
  const languages = [
    {
      code: 'en',
      native: 'English',
      englishName: 'English',
      fontFamily: "'Inter', sans-serif",
      samplePhrase: 'Welcome to Citizen Services Portal. Get simple guidance for government services in English.',
    },
    {
      code: 'kn',
      native: 'ಕನ್ನಡ',
      englishName: 'Kannada',
      fontFamily: "'Noto Sans Kannada', sans-serif",
      samplePhrase: 'ನಾಗರಿಕ ಸೇವೆಗಳ ಪೋರ್ಟಲ್‌ಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ಸರ್ಕಾರಿ ಸೇವೆಗಳಿಗೆ ಸರಳ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',
    },
    {
      code: 'hi',
      native: 'हिन्दी',
      englishName: 'Hindi',
      fontFamily: "'Noto Sans Devanagari', sans-serif",
      samplePhrase: 'नागरिक सेवा पोर्टल में आपका स्वागत है। अपनी पसंदीदा भाषा में सरकारी सेवाओं के लिए सरल मार्गदर्शन प्राप्त करें।',
    },
    {
      code: 'te',
      native: 'తెలుగు',
      englishName: 'Telugu',
      fontFamily: "'Noto Sans Telugu', sans-serif",
      samplePhrase: 'పౌర సేవల పోర్టల్‌కు స్వాగతం. మీ ప్రాధాన్యత గల భాషలో ప్రభుత్వ సేవలకు సరళమైన మార్గదర్శకత్వం పొందండి.',
    },
    {
      code: 'ta',
      native: 'தமிழ்',
      englishName: 'Tamil',
      fontFamily: "'Noto Sans Tamil', sans-serif",
      samplePhrase: 'குடிமக்கள் சேவை தளத்திற்கு வரவேற்கிறோம். உங்கள் விருப்பமான மொழியில் அரசு சேவைகளுக்கான எளிய வழிகாட்டுதலைப் பெறுங்கள்.',
    },
    {
      code: 'ml',
      native: 'മലയാളം',
      englishName: 'Malayalam',
      fontFamily: "'Noto Sans Malayalam', sans-serif",
      samplePhrase: 'പൗര സേവന പോർട്ടലിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷയിൽ സർക്കാർ സേവനങ്ങൾക്കായി ലളിതമായ മാർഗ്ഗനിർദ്ദേശം നേടുക.',
    },
  ];

  // Retrieve existing stored language or default to current i18n language
  const initialLang = localStorage.getItem('i18nextLng') || (i18n.language ? i18n.language.slice(0, 2) : 'en');
  const [selectedLang, setSelectedLang] = useState(
    languages.some((l) => l.code === initialLang) ? initialLang : 'en'
  );

  const handleSelectLanguage = (code) => {
    setSelectedLang(code);
  };

  const handleContinue = () => {
    // Save selected language in localStorage
    localStorage.setItem('i18nextLng', selectedLang);
    localStorage.setItem('portal_welcomed', 'true');

    // Update i18next runtime language and document lang tag
    i18n.changeLanguage(selectedLang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = selectedLang;
    }

    // Navigate to Step 2: State / UT Selection
    navigate('/select-state');
  };

  const currentLangObj = languages.find((l) => l.code === selectedLang) || languages[0];

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-10 sm:py-16 flex flex-col justify-center">
      <PageContainer className="max-w-4xl space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5EAF0] text-xs font-semibold text-[#168C83] shadow-2xs">
            <Languages className="w-4 h-4 text-[#168C83] stroke-[2]" />
            <span>Multilingual Citizen Assistance</span>
          </div>

          <Heading1 className="text-2xl sm:text-4xl text-[#202938]">
            Welcome to Citizen Services Portal.
          </Heading1>

          <p className="text-sm sm:text-base text-[#667085] max-w-2xl mx-auto leading-relaxed">
            "Get simple guidance for government services in your preferred language."
          </p>
        </div>

        {/* Six Language Options Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2457A6]">
              Choose Your Language / ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ / अपनी भाषा चुनें
            </span>

            <AudioGuideButton
              id={`welcome-sample-${selectedLang}`}
              title={`Sample Voice: ${currentLangObj.native}`}
              text={currentLangObj.samplePhrase}
              label="Hear Sample Audio"
              size="sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {languages.map((lang) => {
              const isSelected = selectedLang === lang.code;

              return (
                <div
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`p-6 rounded-xl bg-white border cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[120px] select-none ${
                    isSelected
                      ? 'border-[#2457A6] ring-2 ring-[#2457A6]/20 shadow-xs'
                      : 'border-[#E5EAF0] hover:border-[#2457A6]/50 hover:shadow-2xs'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelectLanguage(lang.code);
                    }
                  }}
                >
                  {/* Top: Native Script Name with Specific Font Family */}
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="text-2xl font-bold text-[#202938] tracking-normal leading-snug"
                      style={{ fontFamily: lang.fontFamily }}
                    >
                      {lang.native}
                    </span>

                    {/* Blue selected-state indicator */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#2457A6] text-white'
                          : 'border border-[#E5EAF0] bg-[#F7F9FC]'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : null}
                    </div>
                  </div>

                  {/* Bottom: English Pronunciation Label */}
                  <div className="flex items-center justify-between text-xs text-[#667085] pt-3 border-t border-[#E5EAF0]">
                    <span className="font-medium">{lang.englishName}</span>
                    {isSelected && (
                      <span className="text-[11px] font-bold text-[#2457A6] uppercase tracking-wide">
                        Selected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Option to Change Language Later Notification Card */}
        <div className="p-4 rounded-xl border border-[#E5EAF0] bg-white flex items-start gap-3 shadow-2xs">
          <Info className="w-5 h-5 text-[#2457A6] flex-shrink-0 mt-0.5 stroke-[2]" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#202938] block">
              You can change your language anytime later
            </span>
            <p className="text-xs text-[#667085] leading-relaxed">
              Use the language selector button at the top right of any page or in the footer to switch languages whenever needed.
            </p>
          </div>
        </div>

        {/* Action Controls: Continue Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <p className="text-xs text-[#667085]">
              Selected Language: <strong className="text-[#202938]">{currentLangObj.native} ({currentLangObj.englishName})</strong>
            </p>
            <span className="text-[#E5EAF0]">|</span>
            <Link
              to="/"
              className="text-xs font-semibold text-[#667085] hover:text-[#2457A6] underline"
            >
              Skip to National Services
            </Link>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            className="w-full sm:w-auto min-w-[240px]"
          >
            <span>Continue to State Selection</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </Button>
        </div>
      </PageContainer>
    </div>
  );
}

export default WelcomePage;
