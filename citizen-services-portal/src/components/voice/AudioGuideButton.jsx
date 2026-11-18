import React from 'react';
import { useTranslation } from 'react-i18next';
import { Volume2, VolumeX, Pause, Play, Headphones } from 'lucide-react';
import { useTextToSpeech } from '../../context/TextToSpeechContext';
import { cn } from '../../utilities/classNames';

export function AudioGuideButton({
  id,
  title = '',
  text = '',
  label,
  size = 'md',
  variant = 'pill',
  className,
}) {
  const { t } = useTranslation();
  const { isSpeaking, isPaused, activeSpeechId, speak, pause, resume, stop } = useTextToSpeech();

  const isCurrent = activeSpeechId === id;
  const isPlayingThis = isCurrent && isSpeaking;
  const isPausedThis = isCurrent && isPaused;

  const handleClick = (e) => {
    e.stopPropagation(); // Avoid triggering parent card clicks

    if (isPlayingThis) {
      pause();
    } else if (isPausedThis) {
      resume();
    } else {
      speak({ id, title, text });
    }
  };

  // Base styling variants
  const variantStyles = {
    pill: cn(
      'inline-flex items-center gap-1.5 rounded-lg font-semibold transition-all duration-150 border cursor-pointer select-none',
      isPlayingThis
        ? 'bg-[#F0FAF9] border-teal-300 text-[#168C83] ring-1 ring-[#168C83]/30'
        : isPausedThis
        ? 'bg-amber-50 border-amber-300 text-amber-800'
        : 'bg-[#F0FAF9] border-teal-200/80 text-[#168C83] hover:bg-teal-100/70'
    ),
    secondary: cn(
      'inline-flex items-center gap-1.5 rounded-lg font-semibold transition-all duration-150 border cursor-pointer select-none',
      isPlayingThis
        ? 'bg-[#EEF3FA] border-[#2457A6] text-[#2457A6]'
        : isPausedThis
        ? 'bg-amber-50 border-amber-300 text-amber-800'
        : 'bg-[#F7F9FC] border-[#E5EAF0] text-[#202938] hover:bg-[#EEF3FA] hover:text-[#2457A6]'
    ),
    ghost: cn(
      'inline-flex items-center gap-1 rounded-md font-semibold transition-all duration-150 cursor-pointer select-none',
      isPlayingThis ? 'text-[#168C83]' : 'text-[#667085] hover:text-[#202938]'
    ),
    icon: cn(
      'inline-flex items-center justify-center rounded-lg border transition-all duration-150 cursor-pointer select-none',
      isPlayingThis
        ? 'bg-[#F0FAF9] border-teal-300 text-[#168C83]'
        : isPausedThis
        ? 'bg-amber-50 border-amber-300 text-amber-800'
        : 'bg-[#F7F9FC] border-[#E5EAF0] text-[#667085] hover:text-[#168C83] hover:bg-[#F0FAF9] hover:border-teal-200'
    ),
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs min-h-[32px]',
    md: 'px-3 py-1.5 text-xs min-h-[36px]',
    lg: 'px-4 py-2 text-sm min-h-[44px]',
    icon: 'w-8 h-8 p-0',
  };

  const currentVariant = variantStyles[variant] || variantStyles.pill;
  const currentSize = variant === 'icon' ? sizeStyles.icon : sizeStyles[size] || sizeStyles.md;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        isPlayingThis
          ? t('voice.pause', 'Pause voice guidance')
          : isPausedThis
          ? t('voice.resume', 'Resume voice guidance')
          : label || t('popular.listenGuide', 'Listen to audio explanation')
      }
      className={cn(currentVariant, currentSize, className)}
      title={
        isPlayingThis
          ? t('voice.pause', 'Pause Audio')
          : isPausedThis
          ? t('voice.resume', 'Resume Audio')
          : label || t('popular.listenGuide', 'Listen to Audio')
      }
    >
      {isPlayingThis ? (
        <>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-3 bg-[#168C83] rounded-full animate-pulse" />
            <span className="w-0.5 h-2 bg-[#168C83] rounded-full animate-pulse delay-75" />
            <span className="w-0.5 h-3 bg-[#168C83] rounded-full animate-pulse delay-150" />
          </div>
          {variant !== 'icon' && (
            <span>{label ? `${label} (${t('voice.pause', 'Pause')})` : t('voice.pause', 'Pause')}</span>
          )}
        </>
      ) : isPausedThis ? (
        <>
          <Play className="w-3.5 h-3.5 fill-current stroke-[1.5]" />
          {variant !== 'icon' && (
            <span>{label ? `${label} (${t('voice.resume', 'Resume')})` : t('voice.resume', 'Resume')}</span>
          )}
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 stroke-[2]" />
          {variant !== 'icon' && <span>{label || t('popular.listenGuide', 'Listen')}</span>}
        </>
      )}
    </button>
  );
}

export default AudioGuideButton;
