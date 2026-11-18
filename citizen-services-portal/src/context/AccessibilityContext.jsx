import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'citizen_accessibility_preferences';

const DEFAULT_PREFERENCES = {
  textSize: 'normal', // 'normal' | 'large' | 'xlarge'
  highContrast: false,
  enhancedFocus: true, // Default to true for WCAG 2.2 focus visibility
  reducedMotion: false,
  readableFont: false,
};

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  // Load preferences from localStorage or fall back to defaults
  const [preferences, setPreferences] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
      }
      // Check system reduced motion
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Check system high contrast
      const prefersContrast = window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches;
      return {
        ...DEFAULT_PREFERENCES,
        reducedMotion: prefersReducedMotion,
        highContrast: prefersContrast,
      };
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  // Announce messages to screen readers via aria-live
  const announce = useCallback((msg) => {
    setAnnouncement('');
    setTimeout(() => setAnnouncement(msg), 50);
  }, []);

  // Synchronize preferences to DOM and localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Storage unavailable
    }

    const root = document.documentElement;
    const body = document.body;

    // 1. Text Sizing
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    body.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${preferences.textSize}`);
    body.classList.add(`text-size-${preferences.textSize}`);

    // 2. High Contrast
    if (preferences.highContrast) {
      root.classList.add('high-contrast');
      body.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
      body.classList.remove('high-contrast');
    }

    // 3. Enhanced Focus
    if (preferences.enhancedFocus) {
      root.classList.add('enhanced-focus');
      body.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
      body.classList.remove('enhanced-focus');
    }

    // 4. Reduced Motion
    if (preferences.reducedMotion) {
      root.classList.add('reduced-motion');
      body.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
      body.classList.remove('reduced-motion');
    }

    // 5. Readable Font
    if (preferences.readableFont) {
      root.classList.add('readable-font');
      body.classList.add('readable-font');
    } else {
      root.classList.remove('readable-font');
      body.classList.remove('readable-font');
    }
  }, [preferences]);

  // Keyboard shortcut listener (Alt + A to open accessibility panel)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsPanelOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isPanelOpen) {
        setIsPanelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen]);

  // Actions
  const setTextSize = (size) => {
    setPreferences((prev) => ({ ...prev, textSize: size }));
    announce(`Text size set to ${size}`);
  };

  const increaseTextSize = () => {
    setPreferences((prev) => {
      let next = 'large';
      if (prev.textSize === 'normal') next = 'large';
      else if (prev.textSize === 'large') next = 'xlarge';
      else if (prev.textSize === 'xlarge') next = 'xlarge';
      announce(`Text size increased to ${next}`);
      return { ...prev, textSize: next };
    });
  };

  const decreaseTextSize = () => {
    setPreferences((prev) => {
      let next = 'normal';
      if (prev.textSize === 'xlarge') next = 'large';
      else if (prev.textSize === 'large') next = 'normal';
      else if (prev.textSize === 'normal') next = 'normal';
      announce(`Text size decreased to ${next}`);
      return { ...prev, textSize: next };
    });
  };

  const toggleHighContrast = () => {
    setPreferences((prev) => {
      const next = !prev.highContrast;
      announce(next ? 'High contrast theme enabled' : 'High contrast theme disabled');
      return { ...prev, highContrast: next };
    });
  };

  const toggleEnhancedFocus = () => {
    setPreferences((prev) => {
      const next = !prev.enhancedFocus;
      announce(next ? 'Enhanced focus indicators enabled' : 'Enhanced focus indicators disabled');
      return { ...prev, enhancedFocus: next };
    });
  };

  const toggleReducedMotion = () => {
    setPreferences((prev) => {
      const next = !prev.reducedMotion;
      announce(next ? 'Reduced motion enabled' : 'Reduced motion disabled');
      return { ...prev, reducedMotion: next };
    });
  };

  const toggleReadableFont = () => {
    setPreferences((prev) => {
      const next = !prev.readableFont;
      announce(next ? 'Readable font and spacing enabled' : 'Readable font disabled');
      return { ...prev, readableFont: next };
    });
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    announce('Accessibility settings reset to default');
  };

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);
  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  const value = {
    // State
    textSize: preferences.textSize,
    highContrast: preferences.highContrast,
    enhancedFocus: preferences.enhancedFocus,
    reducedMotion: preferences.reducedMotion,
    readableFont: preferences.readableFont,
    isPanelOpen,
    announcement,

    // Actions
    setTextSize,
    increaseTextSize,
    decreaseTextSize,
    toggleHighContrast,
    toggleEnhancedFocus,
    toggleReducedMotion,
    toggleReadableFont,
    resetPreferences,
    openPanel,
    closePanel,
    togglePanel,
    announce,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      {/* Live Region for Screen Reader Announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {announcement}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    // Graceful fallback for non-provider usage
    return {
      textSize: 'normal',
      highContrast: false,
      enhancedFocus: true,
      reducedMotion: false,
      readableFont: false,
      isPanelOpen: false,
      setTextSize: () => {},
      increaseTextSize: () => {},
      decreaseTextSize: () => {},
      toggleHighContrast: () => {},
      toggleEnhancedFocus: () => {},
      toggleReducedMotion: () => {},
      toggleReadableFont: () => {},
      resetPreferences: () => {},
      openPanel: () => {},
      closePanel: () => {},
      togglePanel: () => {},
    };
  }
  return context;
}

export default AccessibilityContext;
