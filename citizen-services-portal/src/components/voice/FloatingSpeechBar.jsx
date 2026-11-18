import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  AlertCircle,
  X,
  Gauge,
  Headphones,
} from 'lucide-react';
import { useTextToSpeech } from '../../context/TextToSpeechContext';
import { LANGUAGE_DISPLAY_NAMES } from '../../utilities/speechUtils';
import { cn } from '../../utilities/classNames';

export function FloatingSpeechBar() {
  const { t, i18n } = useTranslation();
  const {
    status,
    isSpeaking,
    isPaused,
    currentTitle,
    rate,
    fallbackMessage,
    currentLang,
    pause,
    resume,
    stop,
    setSpeechRate,
    dismissFallback,
  } = useTextToSpeech();

  // If completely idle with no fallback message, don't show the bar
  if (status === 'idle' && !fallbackMessage) {
    return null;
  }

  const langInfo = LANGUAGE_DISPLAY_NAMES[currentLang] || { native: currentLang, english: currentLang };

  // Speed options tailored for first-time and elderly citizens
  const speedOptions = [
    { value: 0.75, label: '0.75x', desc: 'Slow' },
    { value: 0.9, label: '0.9x', desc: 'Calm' },
    { value: 1.0, label: '1.0x', desc: 'Normal' },
    { value: 1.25, label: '1.25x', desc: 'Fast' },
  ];

  return (
    <aside
      role="region"
      aria-label="Text-to-Speech audio reader controls"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 bg-white border border-[#E5EAF0] rounded-2xl shadow-xl p-4 transition-all duration-200 animate-in slide-in-from-bottom-4"
    >
      {/* 1. Graceful Fallback Message Alert */}
      {fallbackMessage ? (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-[#2457A6] flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="flex-1 space-y-1">
              <span className="text-xs font-bold text-[#202938] block">
                {t('voice.voiceNotice', 'Voice Assistance Notice')} ({langInfo.native})
              </span>
              <p className="text-xs text-[#667085] leading-relaxed">{fallbackMessage}</p>
            </div>
            <button
              type="button"
              onClick={dismissFallback}
              className="text-[#667085] hover:text-[#202938] p-1 rounded-md transition-colors cursor-pointer"
              aria-label={t('voice.dismiss', 'Dismiss notification')}
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#E5EAF0]">
            <button
              type="button"
              onClick={dismissFallback}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-[#202938] hover:bg-[#EEF3FA] transition-colors cursor-pointer"
            >
              {t('voice.continueReading', 'Read on Screen')}
            </button>
          </div>
        </div>
      ) : (
        /* 2. Active Audio Control Bar */
        <div className="space-y-3">
          {/* Header Row: Live wave indicator + Current Section Title + Language badge */}
          <div className="flex items-center justify-between gap-3 border-b border-[#E5EAF0] pb-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Visual Sound Pulse */}
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                  isSpeaking
                    ? 'bg-[#F0FAF9] border border-teal-200 text-[#168C83]'
                    : 'bg-[#F7F9FC] border border-[#E5EAF0] text-[#667085]'
                )}
              >
                {isSpeaking ? (
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-3 bg-[#168C83] rounded-full animate-pulse" />
                    <span className="w-0.5 h-2 bg-[#168C83] rounded-full animate-pulse delay-75" />
                    <span className="w-0.5 h-4 bg-[#168C83] rounded-full animate-pulse delay-150" />
                    <span className="w-0.5 h-2 bg-[#168C83] rounded-full animate-pulse delay-100" />
                  </div>
                ) : (
                  <Headphones className="w-4 h-4 stroke-[1.75]" />
                )}
              </div>

              {/* Title & Status */}
              <div className="min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C83] block">
                  {isSpeaking
                    ? t('voice.nowSpeaking', 'Reading Aloud...')
                    : isPaused
                    ? t('voice.paused', 'Speech Paused')
                    : t('voice.badge', 'Voice Assistance')}
                </span>
                <p className="text-xs font-semibold text-[#202938] truncate max-w-xs md:max-w-sm">
                  {currentTitle || t('common.readAloud', 'Citizen Portal Audio')}
                </p>
              </div>
            </div>

            {/* Language Tag & Close */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#EEF3FA] text-[#2457A6] border border-[#2457A6]/20">
                {langInfo.native}
              </span>
              <button
                type="button"
                onClick={stop}
                className="text-[#667085] hover:text-[#202938] p-1 rounded-md transition-colors cursor-pointer"
                title={t('voice.stop', 'Stop speech')}
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Primary Controls Row: Play/Pause, Stop, Speed Selector */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {/* Playback Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Play / Pause Toggle */}
              {isSpeaking ? (
                <button
                  type="button"
                  onClick={pause}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-[#202938] hover:bg-[#EEF3FA] hover:text-[#2457A6] font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                  aria-label={t('voice.pause', 'Pause speech')}
                >
                  <Pause className="w-3.5 h-3.5 fill-current stroke-[1.5]" />
                  <span>{t('voice.pause', 'Pause')}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resume}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2457A6] text-white hover:bg-[#1D4788] font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                  aria-label={t('voice.resume', 'Resume speech')}
                >
                  <Play className="w-3.5 h-3.5 fill-current stroke-[1.5]" />
                  <span>{t('voice.resume', 'Resume')}</span>
                </button>
              )}

              {/* Stop Button */}
              <button
                type="button"
                onClick={stop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-[#667085] hover:text-rose-700 hover:bg-rose-50 hover:border-rose-200 font-semibold text-xs transition-colors cursor-pointer"
                aria-label={t('voice.stop', 'Stop speech')}
              >
                <Square className="w-3 h-3 fill-current" />
                <span>{t('voice.stop', 'Stop')}</span>
              </button>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-[#F7F9FC] p-1 rounded-lg border border-[#E5EAF0]">
              <span className="text-[10px] font-bold text-[#667085] px-1.5 uppercase hidden sm:inline">
                {t('voice.speed', 'Speed')}:
              </span>
              {speedOptions.map((opt) => {
                const isActive = Math.abs(rate - opt.value) < 0.05;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSpeechRate(opt.value)}
                    className={cn(
                      'px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer',
                      isActive
                        ? 'bg-[#2457A6] text-white shadow-2xs'
                        : 'text-[#667085] hover:text-[#202938]'
                    )}
                    title={`${opt.desc} rate (${opt.label})`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default FloatingSpeechBar;
