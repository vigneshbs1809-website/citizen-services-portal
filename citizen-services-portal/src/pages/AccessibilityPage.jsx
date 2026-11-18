import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Accessibility,
  Eye,
  Type,
  Maximize2,
  Minimize2,
  Volume2,
  CheckCircle,
  Check,
  ArrowLeft,
  Headphones,
  Sliders,
  AlertCircle,
  Gauge,
  Sparkles,
  ZapOff,
  Keyboard,
  ShieldCheck,
  RotateCcw,
  Info
} from 'lucide-react';
import {
  PageContainer,
  Breadcrumbs,
  Button,
  Heading1,
  Heading2,
  Heading3,
  BodyText,
  BodySecondary
} from '../design-system';
import { useAccessibility } from '../context/AccessibilityContext';
import { useTextToSpeech } from '../context/TextToSpeechContext';
import { AudioGuideButton } from '../components/voice/AudioGuideButton';
import { LANGUAGE_DISPLAY_NAMES } from '../utilities/speechUtils';
import { cn } from '../utilities/classNames';

export function AccessibilityPage({ onSpeak }) {
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
  } = useAccessibility();

  const { rate, setSpeechRate, voiceAvailable, currentLang } = useTextToSpeech();
  const langInfo = LANGUAGE_DISPLAY_NAMES[currentLang] || { native: currentLang, english: currentLang };

  const speedOptions = [
    { value: 0.75, label: '0.75x (Slow)', desc: 'Best for low literacy or note taking' },
    { value: 0.9, label: '0.9x (Calm)', desc: 'Calm government assistance cadence' },
    { value: 1.0, label: '1.0x (Normal)', desc: 'Standard reading speed' },
    { value: 1.25, label: '1.25x (Fast)', desc: 'Brisk playback' },
  ];

  const sampleSpeechText = t(
    'voice.description',
    'This is a sample audio test. All government service instructions, eligibility questions, and document checklists can be read aloud in your preferred language.'
  );

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-8">
      <PageContainer className="space-y-6 max-w-4xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('accessibility.title', 'Accessibility Settings') },
          ]}
        />

        {/* Page Header */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5EAF0] pb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FAF9] border border-teal-200/80 text-xs font-semibold text-[#168C83]">
              <Accessibility className="w-4 h-4 stroke-[2]" />
              <span>{t('accessibility.badge', 'Targeting WCAG 2.2 AA Standard')}</span>
            </div>

            <Button
              variant="tertiary"
              size="sm"
              onClick={resetPreferences}
              className="text-xs text-[#667085] hover:text-[#202938] flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('accessibility.resetSettings', 'Reset to Defaults')}</span>
            </Button>
          </div>

          <Heading1 className="text-2xl sm:text-3xl text-[#202938]">
            {t('accessibility.title', 'Accessibility & Display Settings')}
          </Heading1>

          <BodySecondary className="max-w-3xl leading-relaxed">
            {t('accessibility.subtitle', 'Customize how text, colors, motion, and audio guidance are presented across the portal. All settings are automatically saved on your device for future visits.')}
          </BodySecondary>
        </div>

        {/* =========================================================================
            FEATURE 1 & 2: INCREASE / DECREASE TEXT SIZE
        ========================================================================== */}
        <section aria-labelledby="sec-text-scaling" className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-5">
          <div className="border-b border-[#E5EAF0] pb-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
                Feature 1 & 2 • Visual Sizing
              </span>
              <span className="text-xs font-bold text-[#2457A6] bg-[#EEF3FA] px-2.5 py-0.5 rounded">
                Current: {textSize === 'normal' ? '100% Standard' : textSize === 'large' ? '115% Large' : '130% Extra Large'}
              </span>
            </div>
            <Heading2 id="sec-text-scaling" className="text-lg text-[#202938]">
              {t('accessibility.textSizeTitle', 'Text & Typography Scaling')}
            </Heading2>
            <BodySecondary>
              {t('accessibility.textSizeDesc', 'Increase font sizes for enhanced legibility without horizontal scrolling.')}
            </BodySecondary>
          </div>

          {/* Stepper Buttons (Increase / Decrease) */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={decreaseTextSize}
              disabled={textSize === 'normal'}
              className={cn(
                'min-h-[48px] px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer',
                textSize === 'normal'
                  ? 'bg-[#F7F9FC] text-[#CBD5E1] border-[#E5EAF0] cursor-not-allowed'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-[#2457A6]'
              )}
              aria-label="Decrease text size"
            >
              <Minimize2 className="w-4 h-4" />
              <span>{t('accessibility.decreaseText', 'Decrease Text Size (A-)')}</span>
            </button>

            <button
              type="button"
              onClick={increaseTextSize}
              disabled={textSize === 'xlarge'}
              className={cn(
                'min-h-[48px] px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer',
                textSize === 'xlarge'
                  ? 'bg-[#F7F9FC] text-[#CBD5E1] border-[#E5EAF0] cursor-not-allowed'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-[#2457A6]'
              )}
              aria-label="Increase text size"
            >
              <Maximize2 className="w-4 h-4" />
              <span>{t('accessibility.increaseText', 'Increase Text Size (A+)')}</span>
            </button>
          </div>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'normal', title: t('accessibility.sizeNormal', 'Standard (A)'), desc: '100% standard body size' },
              { id: 'large', title: t('accessibility.sizeLarge', 'Large (A+)'), desc: '115% larger typography' },
              { id: 'xlarge', title: t('accessibility.sizeXLarge', 'Extra Large (A++)'), desc: '130% enhanced scale' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTextSize(opt.id)}
                className={cn(
                  'p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 min-h-[48px]',
                  textSize === opt.id
                    ? 'border-[#2457A6] bg-[#EEF3FA] ring-2 ring-[#2457A6]/20'
                    : 'border-[#E5EAF0] bg-white hover:border-[#2457A6]/40'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#202938]">{opt.title}</span>
                  {textSize === opt.id && (
                    <CheckCircle className="w-4 h-4 text-[#2457A6] stroke-[2]" />
                  )}
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">{opt.desc}</p>
              </button>
            ))}
          </div>

          {/* Live Preview Box */}
          <div className="p-4 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] block">
              Live Preview:
            </span>
            <p className="font-semibold text-[#202938]">
              "Government welfare schemes are citizen rights. You do not need agents or middlemen to receive public entitlements."
            </p>
          </div>
        </section>

        {/* =========================================================================
            FEATURE 3: HIGH CONTRAST MODE
        ========================================================================== */}
        <section aria-labelledby="sec-contrast" className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
          <div className="border-b border-[#E5EAF0] pb-3 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
              Feature 3 • Visual Contrast
            </span>
            <Heading2 id="sec-contrast" className="text-lg text-[#202938]">
              {t('accessibility.highContrastTitle', 'High Contrast Mode')}
            </Heading2>
            <BodySecondary>
              {t('accessibility.highContrastDesc', 'High contrast maximizes color separation between background and text for visually strained readers.')}
            </BodySecondary>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC]">
            <div className="space-y-1">
              <span className="text-sm font-bold text-[#202938] flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#2457A6] stroke-[2]" />
                <span>{t('accessibility.highContrastToggle', 'Toggle High Contrast Theme')}</span>
              </span>
              <p className="text-xs text-[#667085]">
                Switches the portal into a high-contrast black-and-yellow palette exceeding 7:1 contrast.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={highContrast}
              onClick={toggleHighContrast}
              className={cn(
                'px-5 py-2.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer min-h-[44px] min-w-[150px] flex items-center justify-center gap-2',
                highContrast
                  ? 'bg-amber-400 text-black border-amber-500 font-extrabold shadow-xs'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-slate-50'
              )}
            >
              <span>{highContrast ? t('accessibility.statusActive', 'Active (ON)') : t('accessibility.highContrastToggle', 'Enable High Contrast')}</span>
            </button>
          </div>
        </section>

        {/* =========================================================================
            FEATURE 4: KEYBOARD NAVIGATION & SKIP LINKS
        ========================================================================== */}
        <section aria-labelledby="sec-keyboard" className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
          <div className="border-b border-[#E5EAF0] pb-3 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
              Feature 4 • Full Keyboard Access
            </span>
            <Heading2 id="sec-keyboard" className="text-lg text-[#202938]">
              {t('accessibility.keyboardTitle', 'Keyboard Navigation')}
            </Heading2>
            <BodySecondary>
              {t('accessibility.keyboardDesc', 'This portal is 100% operable via standard keyboard using Tab, Shift+Tab, Space, and Enter.')}
            </BodySecondary>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] space-y-1">
              <strong className="text-[#202938] block font-bold">Standard Navigation</strong>
              <ul className="space-y-1 text-[#667085]">
                <li><kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">Tab</kbd> Move to next interactive element</li>
                <li><kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">Shift + Tab</kbd> Move to previous element</li>
                <li><kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">Enter</kbd> / <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">Space</kbd> Activate buttons & checkboxes</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] space-y-1">
              <strong className="text-[#202938] block font-bold">Quick Shortcuts</strong>
              <ul className="space-y-1 text-[#667085]">
                <li><kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">Alt + A</kbd> Open Accessibility Panel from anywhere</li>
                <li><kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">Escape</kbd> Close open dialogs or panels</li>
                <li><kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">Tab on top</kbd> Reveals "Skip to main content" link</li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FEATURE 5: VISIBLE FOCUS INDICATORS
        ========================================================================== */}
        <section aria-labelledby="sec-focus" className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
          <div className="border-b border-[#E5EAF0] pb-3 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
              Feature 5 • Focus Appearance
            </span>
            <Heading2 id="sec-focus" className="text-lg text-[#202938]">
              {t('accessibility.enhancedFocusTitle', 'Visible Focus Indicators')}
            </Heading2>
            <BodySecondary>
              {t('accessibility.enhancedFocusDesc', 'Enlarges outline rings around active buttons and links for clear keyboard navigation.')}
            </BodySecondary>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC]">
            <div className="space-y-1">
              <span className="text-sm font-bold text-[#202938] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#168C83]" />
                <span>Thick 4px Focus Ring Indicator</span>
              </span>
              <p className="text-xs text-[#667085]">
                Guarantees high-visibility rings on buttons, inputs, and links when navigating via keyboard.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={enhancedFocus}
              onClick={toggleEnhancedFocus}
              className={cn(
                'px-5 py-2.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer min-h-[44px] min-w-[150px] flex items-center justify-center gap-2',
                enhancedFocus
                  ? 'bg-[#168C83] text-white border-[#168C83] shadow-xs'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-slate-50'
              )}
            >
              <span>{enhancedFocus ? t('accessibility.statusActive', 'Active (ON)') : t('accessibility.statusInactive', 'Inactive (OFF)')}</span>
            </button>
          </div>
        </section>

        {/* =========================================================================
            FEATURE 6: SCREEN-READER-FRIENDLY LABELS & ARIA
        ========================================================================== */}
        <section aria-labelledby="sec-screen-reader" className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
          <div className="border-b border-[#E5EAF0] pb-3 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
              Feature 6 • Semantic Accessibility
            </span>
            <Heading2 id="sec-screen-reader" className="text-lg text-[#202938]">
              Screen-Reader-Friendly Semantics & Live Regions
            </Heading2>
            <BodySecondary>
              The portal is built using semantic HTML5 tags and explicit ARIA landmark regions compatible with NVDA, JAWS, VoiceOver, and TalkBack.
            </BodySecondary>
          </div>

          <div className="p-4 rounded-xl bg-[#F0FAF9] border border-teal-200 text-xs text-[#0E5853] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle className="w-4 h-4 text-[#168C83]" />
              <span>Full Screen Reader Compliance Built-In</span>
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li>Every interactive button and icon has an unambiguous textual label or <code className="font-mono">aria-label</code>.</li>
              <li>State changes announce automatically to screen readers via an unobtrusive <code className="font-mono">aria-live="polite"</code> region.</li>
              <li>Tables and lists use semantic <code className="font-mono">&lt;ul&gt;</code>, <code className="font-mono">&lt;li&gt;</code>, and header associations.</li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            FEATURE 7: REDUCED MOTION
        ========================================================================== */}
        <section aria-labelledby="sec-motion" className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
          <div className="border-b border-[#E5EAF0] pb-3 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
              Feature 7 • Vestibular Motion Control
            </span>
            <Heading2 id="sec-motion" className="text-lg text-[#202938]">
              {t('accessibility.reducedMotionTitle', 'Reduced Motion')}
            </Heading2>
            <BodySecondary>
              {t('accessibility.reducedMotionDesc', 'Disables pulsing, sliding, and animated transitions to prevent motion sensitivity or vestibular strain.')}
            </BodySecondary>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC]">
            <div className="space-y-1">
              <span className="text-sm font-bold text-[#202938] flex items-center gap-2">
                <ZapOff className="w-4 h-4 text-[#2457A6]" />
                <span>Disable All Animated Transitions</span>
              </span>
              <p className="text-xs text-[#667085]">
                Instantly renders all views statically without slide-in, fade, or pulsing animations.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={reducedMotion}
              onClick={toggleReducedMotion}
              className={cn(
                'px-5 py-2.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer min-h-[44px] min-w-[150px] flex items-center justify-center gap-2',
                reducedMotion
                  ? 'bg-[#2457A6] text-white border-[#2457A6] shadow-xs'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-slate-50'
              )}
            >
              <span>{reducedMotion ? t('accessibility.statusActive', 'Active (ON)') : t('accessibility.statusInactive', 'Inactive (OFF)')}</span>
            </button>
          </div>
        </section>

        {/* =========================================================================
            FEATURE 8: READABLE FONTS & DYSLEXIA-FRIENDLY SPACING
        ========================================================================== */}
        <section aria-labelledby="sec-readable-font" className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
          <div className="border-b border-[#E5EAF0] pb-3 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
              Feature 8 • Enhanced Legibility
            </span>
            <Heading2 id="sec-readable-font" className="text-lg text-[#202938]">
              {t('accessibility.readableFontTitle', 'Readable Fonts & Spacing')}
            </Heading2>
            <BodySecondary>
              {t('accessibility.readableFontDesc', 'Increases letter spacing and line height for citizens with dyslexia or low vision.')}
            </BodySecondary>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC]">
            <div className="space-y-1">
              <span className="text-sm font-bold text-[#202938] flex items-center gap-2">
                <Type className="w-4 h-4 text-[#168C83]" />
                <span>Dyslexia-Friendly Letter & Line Spacing</span>
              </span>
              <p className="text-xs text-[#667085]">
                Applies +0.04em letter spacing and 1.85 line-height across English and all 5 regional scripts.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={readableFont}
              onClick={toggleReadableFont}
              className={cn(
                'px-5 py-2.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer min-h-[44px] min-w-[150px] flex items-center justify-center gap-2',
                readableFont
                  ? 'bg-[#168C83] text-white border-[#168C83] shadow-xs'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-slate-50'
              )}
            >
              <span>{readableFont ? t('accessibility.statusActive', 'Active (ON)') : t('accessibility.statusInactive', 'Inactive (OFF)')}</span>
            </button>
          </div>
        </section>

        {/* =========================================================================
            FEATURE 9: VOICE ASSISTANCE CONTROLS
        ========================================================================== */}
        <section aria-labelledby="sec-voice" className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-6">
          <div className="border-b border-[#E5EAF0] pb-3 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C83]">
              Feature 9 • Voice Assistance
            </span>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <Heading2 id="sec-voice" className="text-lg text-[#202938]">
                {t('accessibility.audioTestTitle', 'Text-to-Speech Voice Assistance')}
              </Heading2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-[#F0FAF9] text-[#168C83] border-teal-200">
                <CheckCircle className="w-3.5 h-3.5 stroke-[2]" />
                <span>Voice Audio Ready ({langInfo.native})</span>
              </span>
            </div>
            <BodySecondary>
              {t('accessibility.audioTestDesc', 'Every public service guide includes a free voice reader for low-literacy or elderly citizens.')}
            </BodySecondary>
          </div>

          {/* Speech Speed Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#202938] flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-[#2457A6]" />
                <span>{t('voice.speed', 'Speech Speed')} ({rate}x)</span>
              </span>
              <span className="text-xs text-[#667085]">
                {rate <= 0.8 ? 'Slow Pace' : rate <= 0.95 ? 'Calm Pace' : 'Standard Pace'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {speedOptions.map((opt) => {
                const isSelected = Math.abs(rate - opt.value) < 0.05;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSpeechRate(opt.value)}
                    className={cn(
                      'p-3 rounded-lg border text-left transition-all cursor-pointer min-h-[44px]',
                      isSelected
                        ? 'bg-[#EEF3FA] border-[#2457A6] text-[#2457A6] ring-1 ring-[#2457A6]'
                        : 'bg-[#F7F9FC] border-[#E5EAF0] text-[#202938] hover:bg-white'
                    )}
                  >
                    <span className="text-xs font-bold block">{opt.label}</span>
                    <span className="text-[10px] text-[#667085] block mt-0.5 leading-snug">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test Audio Reader Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC]">
            <div className="space-y-1">
              <span className="text-sm font-bold text-[#202938] flex items-center gap-2">
                <Headphones className="w-4 h-4 text-[#168C83] stroke-[2]" />
                <span>{t('accessibility.testBtn', 'Audio Reader Test')}</span>
              </span>
              <p className="text-xs text-[#667085]">
                {t('accessibility.audioTestDesc', 'Press the button to hear a test sentence using your browser\'s speech synthesizer.')}
              </p>
            </div>

            <AudioGuideButton
              id="accessibility-test-audio"
              title="Accessibility Voice Reader Test"
              text={sampleSpeechText}
              label={t('accessibility.testBtn', 'Test Audio Reader')}
              size="lg"
            />
          </div>
        </section>

        {/* Back to Home Button */}
        <div className="pt-4 border-t border-[#E5EAF0]">
          <Link to="/">
            <Button variant="tertiary" size="md">
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
              <span>{t('errors.returnHome', 'Back to Home Dashboard')}</span>
            </Button>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}

export default AccessibilityPage;
