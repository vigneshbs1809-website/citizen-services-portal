import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, MicOff, Square, AlertCircle, X, Check, Volume2 } from 'lucide-react';
import { useVoiceSearch } from '../../hooks/useVoiceSearch';
import { LANGUAGE_DISPLAY_NAMES } from '../../utilities/speechUtils';
import { cn } from '../../utilities/classNames';

export function VoiceSearch({
  onTranscript,
  onFinalResult,
  size = 'md',
  className,
}) {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language ? i18n.language.slice(0, 2) : 'en').toLowerCase();
  const langInfo = LANGUAGE_DISPLAY_NAMES[currentLang] || { native: currentLang, english: currentLang };

  const {
    isListening,
    isSupported,
    errorMessage,
    errorCode,
    startListening,
    stopListening,
    toggleListening,
    clearError,
  } = useVoiceSearch({
    lang: currentLang,
    onTranscriptChange: onTranscript,
    onFinalResult: onFinalResult,
  });

  return (
    <div className={cn('relative inline-flex items-center', className)}>
      {/* Microphone Toggle Button */}
      <button
        type="button"
        onClick={toggleListening}
        aria-label={
          isListening
            ? t('search.stopListening', 'Stop voice listening')
            : t('search.voiceSearchBtn', 'Search by voice')
        }
        title={
          !isSupported
            ? t('search.voiceNotSupported', 'Voice recognition is not supported in this browser')
            : isListening
            ? t('search.stopListening', 'Stop voice listening')
            : `${t('search.voiceSearchBtn', 'Search by voice')} (${langInfo.native})`
        }
        className={cn(
          'relative inline-flex items-center justify-center rounded-lg transition-all cursor-pointer select-none border',
          isListening
            ? 'bg-[#F0FAF9] border-teal-300 text-[#168C83] ring-2 ring-teal-400/30'
            : errorMessage
            ? 'bg-[#F7F9FC] border-[#E5EAF0] text-[#667085]'
            : 'bg-[#F7F9FC] border-[#E5EAF0] text-[#667085] hover:text-[#2457A6] hover:bg-[#EEF3FA] hover:border-[#2457A6]/40',
          size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-11 h-11' : 'w-10 h-10'
        )}
      >
        {isListening ? (
          <div className="relative flex items-center justify-center">
            <span className="absolute -inset-1 rounded-full bg-teal-400/30 animate-ping" />
            <Mic className="w-4 h-4 text-[#168C83] stroke-[2.25]" />
          </div>
        ) : (
          <Mic className="w-4 h-4 stroke-[2]" />
        )}
      </button>

      {/* Floating Listening Indicator Popover */}
      {isListening && (
        <div
          role="status"
          aria-live="polite"
          className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2.5rem)] p-3.5 bg-white border border-[#E5EAF0] rounded-xl shadow-lg z-50 space-y-2 animate-in fade-in slide-in-from-top-1"
        >
          <div className="flex items-center justify-between border-b border-[#E5EAF0] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-bold text-[#202938]">
                {t('search.listening', 'Listening... speak now')}
              </span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#EEF3FA] text-[#2457A6]">
              {langInfo.native}
            </span>
          </div>

          <p className="text-xs text-[#667085] leading-relaxed">
            {t(
              'search.voiceHelpTip',
              'Say the service name or keyword (e.g., "Income Certificate" or "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ"). Your words will appear in the search box.'
            )}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-[#667085]">
              {t('search.editableNote', 'You can edit the text after speaking')}
            </span>
            <button
              type="button"
              onClick={stopListening}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-[#2457A6] hover:bg-[#1D4788] text-white transition-colors cursor-pointer shadow-2xs"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>{t('search.stopListening', 'Done')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Error / Permission Denied Notification Banner */}
      {errorMessage && !isListening && (
        <div
          role="alert"
          className="absolute right-0 top-full mt-2 w-72 sm:w-84 max-w-[calc(100vw-2.5rem)] p-3.5 bg-white border border-[#E5EAF0] rounded-xl shadow-lg z-50 space-y-2 animate-in fade-in slide-in-from-top-1 text-left"
        >
          <div className="flex items-start justify-between gap-2 border-b border-[#E5EAF0] pb-2">
            <div className="flex items-center gap-2 text-[#2457A6]">
              <AlertCircle className="w-4 h-4 flex-shrink-0 stroke-[2]" />
              <span className="text-xs font-bold text-[#202938]">
                {errorCode === 'not-allowed'
                  ? t('search.micPermission', 'Microphone Permission')
                  : t('search.voiceNotice', 'Voice Search Notice')}
              </span>
            </div>
            <button
              type="button"
              onClick={clearError}
              className="text-[#667085] hover:text-[#202938] p-0.5 rounded transition-colors cursor-pointer"
              aria-label={t('common.close', 'Close alert')}
            >
              <X className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>

          <p className="text-xs text-[#202938] leading-relaxed">
            {errorMessage}
          </p>

          <div className="pt-1 flex items-center justify-between text-[11px] text-[#667085]">
            <span>{t('search.textAlternative', 'Normal text search is available below')}</span>
            <button
              type="button"
              onClick={clearError}
              className="text-[#2457A6] font-semibold hover:underline cursor-pointer"
            >
              {t('common.dismiss', 'Dismiss')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VoiceSearch;
