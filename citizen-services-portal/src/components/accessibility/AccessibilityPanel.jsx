import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Accessibility,
  Eye,
  Type,
  Maximize2,
  Minimize2,
  RotateCcw,
  Volume2,
  Headphones,
  Check,
  X,
  Gauge,
  Sparkles,
  ZapOff,
  Move,
  Keyboard,
  ShieldCheck,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Button } from '../../design-system/Button';
import { cn } from '../../utilities/classNames';

export function AccessibilityPanel() {
  const { t } = useTranslation();
  const {
    textSize,
    setTextSize,
    increaseTextSize,
    decreaseTextSize,
    highContrast,
    toggleHighContrast,
    enhancedFocus,
    toggleEnhancedFocus,
    reducedMotion,
    toggleReducedMotion,
    readableFont,
    toggleReadableFont,
    resetPreferences,
    isPanelOpen,
    closePanel,
  } = useAccessibility();
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus trap and auto-focus when drawer opens
  useEffect(() => {
    if (isPanelOpen) {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }
  }, [isPanelOpen]);

  if (!isPanelOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-panel-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closePanel}
    >
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E5EAF0] animate-in slide-in-from-right duration-200"
      >
        {/* =========================================================================
            PANEL HEADER
        ========================================================================== */}
        <div className="p-5 border-b border-[#E5EAF0] bg-[#F7F9FC] flex items-start justify-between gap-3 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2457A6] text-white flex items-center justify-center shadow-xs">
              <Accessibility className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#168C83] uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                <span>{t('accessibility.wcagBadge', 'Targeting WCAG 2.2 AA Standard')}</span>
              </div>
              <h2 id="accessibility-panel-title" className="text-base sm:text-lg font-bold text-[#202938]">
                {t('accessibility.panelTitle', 'Accessibility Settings Panel')}
              </h2>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closePanel}
            aria-label="Close accessibility settings"
            className="w-11 h-11 rounded-lg flex items-center justify-center text-[#667085] hover:text-[#202938] hover:bg-white border border-[#E5EAF0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* =========================================================================
            PANEL CONTROLS (9 Core Features)
        ========================================================================== */}
        <div className="p-5 space-y-6 flex-1">
          {/* 1. TEXT SIZE CONTROLS (Increase / Decrease / Stepper) */}
          <section aria-labelledby="heading-text-size" className="space-y-3">
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <h3 id="heading-text-size" className="text-xs font-bold uppercase tracking-wider text-[#2457A6] flex items-center gap-1.5">
                  <Type className="w-4 h-4" />
                  <span>{t('accessibility.textSizeTitle', 'Text & Typography Scaling')}</span>
                </h3>
                <span className="text-xs font-bold text-[#2457A6] bg-[#EEF3FA] px-2 py-0.5 rounded">
                  {textSize === 'normal' ? '100% Standard' : textSize === 'large' ? '115% Large' : '130% Extra Large'}
                </span>
              </div>
              <p className="text-xs text-[#667085]">
                {t('accessibility.textSizeDesc', 'Increase font sizes for enhanced legibility without horizontal scrolling.')}
              </p>
            </div>

            {/* Stepper Buttons (min 44px touch targets) */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={decreaseTextSize}
                disabled={textSize === 'normal'}
                className={cn(
                  'min-h-[44px] rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                  textSize === 'normal'
                    ? 'bg-[#F7F9FC] text-[#CBD5E1] border-[#E5EAF0] cursor-not-allowed'
                    : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-[#2457A6]'
                )}
                aria-label="Decrease text size"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>A- (Smaller)</span>
              </button>

              <button
                type="button"
                onClick={() => setTextSize('normal')}
                className={cn(
                  'min-h-[44px] rounded-lg border text-xs font-bold flex items-center justify-center transition-all cursor-pointer',
                  textSize === 'normal'
                    ? 'bg-[#2457A6] text-white border-[#2457A6] shadow-xs'
                    : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-[#2457A6]'
                )}
                aria-label="Reset text size to standard"
              >
                <span>A (Default)</span>
              </button>

              <button
                type="button"
                onClick={increaseTextSize}
                disabled={textSize === 'xlarge'}
                className={cn(
                  'min-h-[44px] rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                  textSize === 'xlarge'
                    ? 'bg-[#F7F9FC] text-[#CBD5E1] border-[#E5EAF0] cursor-not-allowed'
                    : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-[#2457A6]'
                )}
                aria-label="Increase text size"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>A+ (Larger)</span>
              </button>
            </div>
          </section>

          {/* 2. HIGH CONTRAST MODE */}
          <section aria-labelledby="heading-high-contrast" className="space-y-3 pt-3 border-t border-[#E5EAF0]">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <h3 id="heading-high-contrast" className="text-xs font-bold uppercase tracking-wider text-[#2457A6] flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>{t('accessibility.highContrastTitle', 'High Contrast Mode')}</span>
                </h3>
                <p className="text-xs text-[#667085]">
                  {t('accessibility.highContrastDesc', 'High contrast maximizes color separation between background and text.')}
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={cn(
                  'text-[10px] font-bold px-2 py-0.5 rounded border uppercase',
                  highContrast
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-[#F7F9FC] text-[#667085] border-[#E5EAF0]'
                )}
              >
                {highContrast ? t('accessibility.statusActive', 'Active (ON)') : t('accessibility.statusInactive', 'Inactive (OFF)')}
              </span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={highContrast}
              onClick={toggleHighContrast}
              className={cn(
                'w-full min-h-[48px] rounded-xl border-2 font-bold text-xs flex items-center justify-between px-4 transition-all cursor-pointer',
                highContrast
                  ? 'bg-amber-400 text-black border-amber-500 shadow-xs'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-[#2457A6]'
              )}
            >
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{t('accessibility.highContrastToggle', 'Toggle High Contrast Theme')}</span>
              </span>
              <div
                className={cn(
                  'w-6 h-6 rounded-md flex items-center justify-center border',
                  highContrast ? 'bg-black text-amber-400 border-black' : 'bg-[#F7F9FC] border-[#CBD5E1]'
                )}
              >
                {highContrast && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </button>
          </section>

          {/* 3. VISIBLE FOCUS INDICATORS */}
          <section aria-labelledby="heading-focus" className="space-y-3 pt-3 border-t border-[#E5EAF0]">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <h3 id="heading-focus" className="text-xs font-bold uppercase tracking-wider text-[#2457A6] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>{t('accessibility.enhancedFocusTitle', 'Visible Focus Indicators')}</span>
                </h3>
                <p className="text-xs text-[#667085]">
                  {t('accessibility.enhancedFocusDesc', 'Enlarges outline rings around active buttons and links for clear keyboard navigation.')}
                </p>
              </div>

              <span
                className={cn(
                  'text-[10px] font-bold px-2 py-0.5 rounded border uppercase',
                  enhancedFocus
                    ? 'bg-teal-50 text-[#168C83] border-teal-200'
                    : 'bg-[#F7F9FC] text-[#667085] border-[#E5EAF0]'
                )}
              >
                {enhancedFocus ? t('accessibility.statusActive', 'Active (ON)') : t('accessibility.statusInactive', 'Inactive (OFF)')}
              </span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={enhancedFocus}
              onClick={toggleEnhancedFocus}
              className={cn(
                'w-full min-h-[48px] rounded-xl border-2 font-bold text-xs flex items-center justify-between px-4 transition-all cursor-pointer',
                enhancedFocus
                  ? 'bg-[#F0FAF9] text-[#0E5853] border-teal-400'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-[#2457A6]'
              )}
            >
              <span>Enhanced Focus Ring (4px Teal)</span>
              <div
                className={cn(
                  'w-6 h-6 rounded-md flex items-center justify-center border',
                  enhancedFocus ? 'bg-[#168C83] text-white border-[#168C83]' : 'bg-[#F7F9FC] border-[#CBD5E1]'
                )}
              >
                {enhancedFocus && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </button>
          </section>

          {/* 4. REDUCED MOTION */}
          <section aria-labelledby="heading-motion" className="space-y-3 pt-3 border-t border-[#E5EAF0]">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <h3 id="heading-motion" className="text-xs font-bold uppercase tracking-wider text-[#2457A6] flex items-center gap-1.5">
                  <ZapOff className="w-4 h-4" />
                  <span>{t('accessibility.reducedMotionTitle', 'Reduced Motion')}</span>
                </h3>
                <p className="text-xs text-[#667085]">
                  {t('accessibility.reducedMotionDesc', 'Disables pulsing, sliding, and animated transitions to prevent motion sensitivity or vestibular strain.')}
                </p>
              </div>

              <span
                className={cn(
                  'text-[10px] font-bold px-2 py-0.5 rounded border uppercase',
                  reducedMotion
                    ? 'bg-blue-50 text-[#2457A6] border-blue-200'
                    : 'bg-[#F7F9FC] text-[#667085] border-[#E5EAF0]'
                )}
              >
                {reducedMotion ? t('accessibility.statusActive', 'Active (ON)') : t('accessibility.statusInactive', 'Inactive (OFF)')}
              </span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={reducedMotion}
              onClick={toggleReducedMotion}
              className={cn(
                'w-full min-h-[48px] rounded-xl border-2 font-bold text-xs flex items-center justify-between px-4 transition-all cursor-pointer',
                reducedMotion
                  ? 'bg-[#EEF3FA] text-[#1D4788] border-[#2457A6]'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-[#2457A6]'
              )}
            >
              <span>Stop All Animations & Transitions</span>
              <div
                className={cn(
                  'w-6 h-6 rounded-md flex items-center justify-center border',
                  reducedMotion ? 'bg-[#2457A6] text-white border-[#2457A6]' : 'bg-[#F7F9FC] border-[#CBD5E1]'
                )}
              >
                {reducedMotion && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </button>
          </section>

          {/* 5. READABLE FONTS & DYSLEXIA-FRIENDLY SPACING */}
          <section aria-labelledby="heading-readable" className="space-y-3 pt-3 border-t border-[#E5EAF0]">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <h3 id="heading-readable" className="text-xs font-bold uppercase tracking-wider text-[#2457A6] flex items-center gap-1.5">
                  <Type className="w-4 h-4" />
                  <span>{t('accessibility.readableFontTitle', 'Readable Fonts & Spacing')}</span>
                </h3>
                <p className="text-xs text-[#667085]">
                  {t('accessibility.readableFontDesc', 'Increases letter spacing and line height for citizens with dyslexia or low vision.')}
                </p>
              </div>

              <span
                className={cn(
                  'text-[10px] font-bold px-2 py-0.5 rounded border uppercase',
                  readableFont
                    ? 'bg-teal-50 text-[#168C83] border-teal-200'
                    : 'bg-[#F7F9FC] text-[#667085] border-[#E5EAF0]'
                )}
              >
                {readableFont ? t('accessibility.statusActive', 'Active (ON)') : t('accessibility.statusInactive', 'Inactive (OFF)')}
              </span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={readableFont}
              onClick={toggleReadableFont}
              className={cn(
                'w-full min-h-[48px] rounded-xl border-2 font-bold text-xs flex items-center justify-between px-4 transition-all cursor-pointer',
                readableFont
                  ? 'bg-[#F0FAF9] text-[#0E5853] border-teal-400'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-[#2457A6]'
              )}
            >
              <span>Enhanced Letter & Line Spacing</span>
              <div
                className={cn(
                  'w-6 h-6 rounded-md flex items-center justify-center border',
                  readableFont ? 'bg-[#168C83] text-white border-[#168C83]' : 'bg-[#F7F9FC] border-[#CBD5E1]'
                )}
              >
                {readableFont && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </button>
          </section>


          {/* 7. KEYBOARD SHORTCUTS REFERENCE */}
          <section aria-labelledby="heading-keyboard" className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] space-y-2">
            <h4 id="heading-keyboard" className="text-xs font-bold text-[#202938] flex items-center gap-1.5">
              <Keyboard className="w-4 h-4 text-[#2457A6]" />
              <span>{t('accessibility.keyboardTitle', 'Keyboard Navigation')}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#667085]">
              <div><kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E5EAF0] font-mono font-bold text-[#202938]">Tab</kbd> Next item</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E5EAF0] font-mono font-bold text-[#202938]">Shift+Tab</kbd> Previous</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E5EAF0] font-mono font-bold text-[#202938]">Alt + A</kbd> Open Panel</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E5EAF0] font-mono font-bold text-[#202938]">Escape</kbd> Close</div>
            </div>
          </section>
        </div>

        {/* =========================================================================
            PANEL FOOTER (Reset to Defaults & Full Settings Link)
        ========================================================================== */}
        <div className="p-5 border-t border-[#E5EAF0] bg-[#F7F9FC] space-y-3">
          <div className="flex items-center gap-2">
            <Button
              variant="tertiary"
              size="md"
              onClick={resetPreferences}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs text-[#667085] hover:text-[#202938]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('accessibility.resetSettings', 'Reset to Defaults')}</span>
            </Button>

            <Link
              to="/accessibility"
              onClick={closePanel}
              className="flex-1"
            >
              <Button
                variant="primary"
                size="md"
                className="w-full text-xs flex items-center justify-center gap-1.5"
              >
                <span>Full Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessibilityPanel;
