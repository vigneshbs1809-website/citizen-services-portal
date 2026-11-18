import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// 12 Required Application Pages
import { WelcomePage } from './pages/WelcomePage';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { GuidancePage } from './pages/GuidancePage';
import { GuidedStepsPage } from './pages/GuidedStepsPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { HelpAssistancePage } from './pages/HelpAssistancePage';
import { AboutPage } from './pages/AboutPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { StateSelectionPage } from './pages/StateSelectionPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Accessibility } from 'lucide-react';

import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { TextToSpeechProvider, useTextToSpeech } from './context/TextToSpeechContext';
import { StateProvider } from './context/StateContext';
import { FloatingSpeechBar } from './components/voice/FloatingSpeechBar';
import { AccessibilityPanel } from './components/accessibility/AccessibilityPanel';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { cn } from './utilities/classNames';

function InitialVisitCheck() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If first-time visitor opens root, direct them smoothly to the Welcome screen
    const welcomed = localStorage.getItem('portal_welcomed');
    if (!welcomed && location.pathname === '/') {
      navigate('/welcome', { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function AppLayout() {
  const { t } = useTranslation();
  const { textSize, setTextSize, highContrast, toggleHighContrast, openPanel } = useAccessibility();
  const { isSpeaking, legacySpeak, stop } = useTextToSpeech();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202938] font-sans selection:bg-[#2457A6] selection:text-white antialiased">
      {/* Keyboard Accessibility: Skip to Main Content Link */}
      <a href="#main-content" className="skip-link">
        {t('accessibility.skipToContent', 'Skip to main content')}
      </a>

      {/* Clean White Navigation Bar with Logo, Nav links, Language & Accessibility */}
      <Header
        isSpeaking={isSpeaking}
        onSpeak={legacySpeak}
        onStop={stop}
        textSize={textSize}
        setTextSize={setTextSize}
        highContrast={highContrast}
        toggleHighContrast={toggleHighContrast}
      />

      {/* Semantic Main Landmark for Screen Readers and Keyboard Users */}
      <main id="main-content" className="flex-1 flex flex-col focus:outline-none" tabIndex={-1}>
        <ErrorBoundary>
          <Routes>
          {/* 1. Welcome / Language Selection */}
          <Route
            path="/welcome"
            element={
              <WelcomePage
                onSpeak={legacySpeak}
                textSize={textSize}
                setTextSize={setTextSize}
                highContrast={highContrast}
                toggleHighContrast={toggleHighContrast}
              />
            }
          />

          {/* 1b. State & Union Territory Selection */}
          <Route path="/select-state" element={<StateSelectionPage onSpeak={legacySpeak} />} />
          <Route path="/states" element={<StateSelectionPage onSpeak={legacySpeak} />} />

          {/* 2. Home Dashboard */}
          <Route path="/" element={<HomePage onSpeak={legacySpeak} />} />

          {/* 3. Services Directory */}
          <Route path="/services" element={<ServicesPage onSpeak={legacySpeak} />} />

          {/* 4. Service Search Results */}
          <Route path="/search" element={<SearchResultsPage onSpeak={legacySpeak} />} />

          {/* 5. Service Details */}
          <Route path="/services/:id" element={<ServiceDetailPage onSpeak={legacySpeak} />} />

          {/* 6. Eligibility Checker */}
          <Route path="/services/:id/eligibility" element={<EligibilityPage onSpeak={legacySpeak} />} />
          <Route path="/eligibility" element={<EligibilityPage onSpeak={legacySpeak} />} />

          {/* 7. Required Documents */}
          <Route path="/services/:id/documents" element={<DocumentsPage onSpeak={legacySpeak} />} />
          <Route path="/documents" element={<DocumentsPage onSpeak={legacySpeak} />} />

          {/* 8. Step-by-Step Guidance */}
          <Route path="/services/:id/guidance" element={<GuidancePage onSpeak={legacySpeak} />} />
          <Route path="/guidance" element={<GuidancePage onSpeak={legacySpeak} />} />
          <Route path="/guide" element={<GuidancePage onSpeak={legacySpeak} />} />

          {/* Interactive Step-by-Step Citizen Guidance Assistant */}
          <Route path="/assistant" element={<GuidedStepsPage onSpeak={legacySpeak} />} />
          <Route path="/assistant/:id" element={<GuidedStepsPage onSpeak={legacySpeak} />} />

          {/* 9. Accessibility Settings */}
          <Route
            path="/accessibility"
            element={
              <AccessibilityPage
                textSize={textSize}
                setTextSize={setTextSize}
                highContrast={highContrast}
                toggleHighContrast={toggleHighContrast}
                onSpeak={legacySpeak}
              />
            }
          />

          {/* 10. Help and Support */}
          <Route path="/help" element={<HelpAssistancePage />} />

          {/* 11. About */}
          <Route path="/about" element={<AboutPage />} />

          {/* Plain Language Explanation Dictionary */}
          <Route path="/glossary" element={<GlossaryPage />} />

          {/* 12. Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </ErrorBoundary>
      </main>

      {/* Slide-over Accessibility Settings Panel */}
      <AccessibilityPanel />

      {/* Floating Accessibility Trigger Button (Alt + A) */}
      <button
        type="button"
        onClick={openPanel}
        className={cn(
          'fixed z-40 bg-white hover:bg-[#EEF3FA] text-[#2457A6] border-2 border-[#2457A6] shadow-md rounded-full px-3.5 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all hover:scale-105 active:scale-95',
          isSpeaking
            ? 'bottom-28 left-4 md:bottom-6 md:left-6'
            : 'bottom-4 left-4 sm:bottom-6 sm:left-6'
        )}
        aria-label="Open Accessibility Settings Panel (Alt + A)"
        title="Open Accessibility Settings Panel (Alt + A)"
      >
        <Accessibility className="w-4 h-4 stroke-[2]" />
        <span className="hidden sm:inline">Accessibility (Alt+A)</span>
      </button>

      {/* Reusable Floating Speech Controls Bar */}
      <FloatingSpeechBar />

      {/* Footer with About, Services, Accessibility, Help, Disclaimer & Useful Links */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <AccessibilityProvider>
      <TextToSpeechProvider>
        <StateProvider>
          <BrowserRouter>
            <InitialVisitCheck />
            <AppLayout />
          </BrowserRouter>
        </StateProvider>
      </TextToSpeechProvider>
    </AccessibilityProvider>
  );
}

export default App;
