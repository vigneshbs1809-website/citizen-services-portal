import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, CheckCircle, Lightbulb, Languages, Volume2, ArrowRight } from 'lucide-react';
import { getTerminologyTranslation } from '../../utilities/terminologyTranslation';
import { AudioGuideButton } from '../voice/AudioGuideButton';
import { cn } from '../../utilities/classNames';

export function PlainLanguageCard({ term, className }) {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language ? i18n.language.slice(0, 2) : 'en').toLowerCase();

  // Allow citizen to preview this specific term in another regional language
  const [previewLang, setPreviewLang] = useState(null);
  const activeLangCode = previewLang || currentLang;

  const supportedLanguages = [
    { code: 'en', native: 'English', label: 'English' },
    { code: 'kn', native: 'ಕನ್ನಡ', label: 'Kannada' },
    { code: 'hi', native: 'हिन्दी', label: 'Hindi' },
    { code: 'te', native: 'తెలుగు', label: 'Telugu' },
    { code: 'ta', native: 'தமிழ்', label: 'Tamil' },
    { code: 'ml', native: 'മലയാളം', label: 'Malayalam' },
  ];

  // Helper to fetch translated text for active/preview language
  const getLangTranslation = (langCode) => {
    // Access translation bundle via i18next resource store
    const bundle = i18n.getResourceBundle(langCode, 'translation');
    const termBundle = bundle?.terminology?.terms?.[term.id];

    if (termBundle) {
      return {
        official: termBundle.official || term.officialEn,
        simplified: termBundle.simplified || term.simplifiedEn,
        example: termBundle.example || term.exampleEn,
      };
    }

    return getTerminologyTranslation(term, t);
  };

  const trans = getLangTranslation(activeLangCode);

  const spokenText = `${trans.official}. ${t('terminology.simplifiedExplanationLabel', 'Simple Explanation')}: ${trans.simplified}. ${t('terminology.practicalExampleLabel', 'Real-Life Example')}: ${trans.example}`;

  return (
    <article
      className={cn(
        'bg-white border border-[#E5EAF0] rounded-2xl p-6 shadow-2xs hover:border-[#2457A6]/40 hover:shadow-xs transition-all duration-200 flex flex-col justify-between space-y-5',
        className
      )}
    >
      {/* 1. Header: Category badge + Audio Listen Action */}
      <div className="flex items-center justify-between gap-3 border-b border-[#E5EAF0] pb-3 flex-wrap">
        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#F7F9FC] text-[#2457A6] border border-[#E5EAF0]">
          {t(`terminology.category${term.category.charAt(0).toUpperCase() + term.category.slice(1)}`, term.category)}
        </span>

        {/* 4. Listen Button */}
        <AudioGuideButton
          id={`plain-lang-${term.id}`}
          title={`${trans.simplified}`}
          text={spokenText}
          label={t('terminology.listenExplanation', 'Listen to Explanation')}
          size="sm"
          variant="pill"
        />
      </div>

      {/* 1. Original Official Term */}
      <div className="space-y-1.5 p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0]">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#667085] uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5 text-[#667085] stroke-[2]" />
          <span>{t('terminology.officialTermLabel', 'Original Official Term')}</span>
        </div>
        <blockquote className="text-sm font-semibold text-[#202938] leading-relaxed italic border-l-2 border-[#2457A6] pl-3">
          "{trans.official}"
        </blockquote>
      </div>

      {/* 2. Simple Explanation */}
      <div className="space-y-1.5 p-4 rounded-xl bg-[#F0FAF9] border border-teal-200/90">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#168C83] uppercase tracking-wider">
          <CheckCircle className="w-3.5 h-3.5 text-[#168C83] stroke-[2]" />
          <span>{t('terminology.simplifiedExplanationLabel', 'Simple Explanation')}</span>
        </div>
        <p className="text-base font-bold text-[#202938] leading-snug">
          {trans.simplified}
        </p>
      </div>

      {/* 3. Practical Example */}
      <div className="space-y-1.5 p-4 rounded-xl bg-white border border-[#E5EAF0]">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#2457A6] uppercase tracking-wider">
          <Lightbulb className="w-3.5 h-3.5 text-[#2457A6] stroke-[2]" />
          <span>{t('terminology.practicalExampleLabel', 'Real-Life Example')}</span>
        </div>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
          {trans.example}
        </p>
      </div>

      {/* 5. Available Translations Language Pills */}
      <div className="pt-3 border-t border-[#E5EAF0] space-y-2">
        <div className="flex items-center justify-between text-[11px] text-[#667085] font-semibold">
          <span className="flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-[#2457A6]" />
            <span>{t('terminology.availableTranslations', 'Available Translations')}:</span>
          </span>
          {previewLang && (
            <button
              type="button"
              onClick={() => setPreviewLang(null)}
              className="text-[#2457A6] hover:underline cursor-pointer text-[10px]"
            >
              Reset to active language
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {supportedLanguages.map((lang) => {
            const isSelected = activeLangCode === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setPreviewLang(lang.code)}
                className={cn(
                  'px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border',
                  isSelected
                    ? 'bg-[#2457A6] text-white border-[#2457A6] shadow-2xs'
                    : 'bg-[#F7F9FC] text-[#202938] border-[#E5EAF0] hover:bg-white hover:border-[#2457A6]/50'
                )}
                title={`Preview in ${lang.label}`}
              >
                {lang.native}
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default PlainLanguageCard;
