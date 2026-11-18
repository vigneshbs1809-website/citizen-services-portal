import React from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTextToSpeech } from '../../context/TextToSpeechContext';
import { cn } from '../../utilities/classNames';

export function VoiceAssistantButton({
  isSpeaking: propIsSpeaking,
  onSpeak,
  onStop,
  textToRead,
  title,
  label,
  size = 'md',
  className,
}) {
  const { t } = useTranslation();
  const tts = useTextToSpeech();

  const isSpeaking = propIsSpeaking !== undefined ? propIsSpeaking : tts.isSpeaking;

  const handleClick = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      if (onStop) {
        onStop();
      } else {
        tts.stop();
      }
    } else {
      if (onSpeak) {
        onSpeak(textToRead);
      } else {
        tts.speak({ title: title || label, text: textToRead });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isSpeaking ? t('voice.stop', 'Stop speech') : label || t('popular.listenGuide', 'Listen')}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg font-semibold transition-all duration-150 border cursor-pointer select-none',
        isSpeaking
          ? 'bg-rose-50 border-rose-300 text-rose-800 hover:bg-rose-100'
          : 'bg-[#F0FAF9] border-teal-200/80 text-[#168C83] hover:bg-teal-100/70',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-2 text-sm min-h-[44px]',
        className
      )}
      title={isSpeaking ? t('voice.stop', 'Stop Audio') : t('popular.listenGuide', 'Listen to Audio')}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4 text-rose-600 animate-pulse" />
          <span>{t('voice.stop', 'Stop Audio')}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-[#168C83]" />
          <span>{label || t('popular.listenGuide', 'Listen')}</span>
        </>
      )}
    </button>
  );
}

export default VoiceAssistantButton;
