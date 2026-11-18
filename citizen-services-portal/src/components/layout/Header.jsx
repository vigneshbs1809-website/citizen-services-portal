import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Landmark,
  Languages,
  Accessibility,
  Menu,
  X,
  Volume2,
  VolumeX,
  Eye,
  Check,
  ChevronRight,
  Phone,
  MapPin
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useStateContext } from '../../context/StateContext';
import { cn } from '../../utilities/classNames';

export function Header({
  isSpeaking,
  onSpeak,
  onStop,
  textSize,
  setTextSize,
  highContrast,
  toggleHighContrast,
}) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { openPanel } = useAccessibility();
  const { selectedState, selectedDistrict } = useStateContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [accessMenuOpen, setAccessMenuOpen] = useState(false);

  const langMenuRef = useRef(null);
  const accessMenuRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  ];

  const currentLang = languages.find((l) => l.code === (i18n.language ? i18n.language.slice(0, 2) : 'en')) || languages[0];

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
      if (accessMenuRef.current && !accessMenuRef.current.contains(event.target)) {
        setAccessMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code) => {
    i18n.changeLanguage(code);
    setLangMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: t('nav.home', 'Home') },
    { to: '/services', label: t('nav.services', 'Services') },
    { to: '/assistant', label: t('nav.assistant', 'Guidance Assistant') },
    { to: '/glossary', label: t('nav.glossary', 'Dictionary') },
    { to: '/help', label: t('nav.help', 'Help') },
    { to: '/about', label: t('nav.about', 'About') },
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (link.isHash) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById('how-it-works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-white border-b border-[#E5EAF0] sticky top-0 z-50">
      {/* Official Government Identification Sub-Bar */}
      <div className="bg-[#F7F9FC] border-b border-[#E5EAF0] text-xs text-[#667085] py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#168C83]" />
            <span className="font-medium text-[#202938]">
              {t('common.officialInitiative', 'Official Public Citizen Services Initiative')}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <a
              href="tel:1800111222"
              className="flex items-center gap-1.5 text-[#2457A6] hover:underline font-semibold"
            >
              <Phone className="w-3 h-3 text-[#168C83]" />
              <span>{t('common.helplineText', 'Toll Free Helpline: 1800-111-222')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Logo & Portal Branding */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#2457A6] rounded-md p-1"
          >
            <div className="w-10 h-10 rounded-lg bg-[#2457A6] flex items-center justify-center text-white shadow-xs">
              <Landmark className="w-5 h-5 text-white stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#202938] tracking-tight group-hover:text-[#2457A6] transition-colors leading-tight">
                {t('common.portalTitle', 'Citizen Services')}
              </span>
              <span className="text-[11px] font-medium text-[#667085] tracking-wide">
                {t('common.publicGateway', 'Public Assistance Gateway')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (>= 1024px) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = !link.isHash && location.pathname === link.to;

              if (link.isHash) {
                return (
                  <button
                    key={link.to}
                    type="button"
                    onClick={() => handleNavClick(link)}
                    className="px-3.5 py-2 text-sm font-medium text-[#667085] hover:text-[#202938] hover:bg-[#F7F9FC] rounded-md transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                );
              }

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'px-3.5 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer',
                    isActive
                      ? 'text-[#2457A6] bg-[#EEF3FA] font-semibold'
                      : 'text-[#667085] hover:text-[#202938] hover:bg-[#F7F9FC]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Utilities: State, Language & Accessibility */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* State & UT Quick Switcher */}
            <Link
              to="/select-state"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 min-h-[44px] text-xs font-semibold text-[#202938] bg-[#F7F9FC] hover:bg-[#EEF3FA] border border-[#E5EAF0] rounded-lg transition-colors cursor-pointer"
              title="Change your state or union territory"
            >
              <MapPin className="w-4 h-4 text-[#168C83] stroke-[2]" />
              <div className="flex flex-col text-left">
                <span className="hidden md:inline text-[10px] text-[#667085] leading-none uppercase tracking-wider font-bold">
                  {t('state.region', 'State / UT')}
                </span>
                <span className="font-bold text-[#202938] truncate max-w-[110px] sm:max-w-[140px]">
                  {selectedState ? selectedState.name : t('state.selectStateBtn', 'All India')}
                </span>
              </div>
            </Link>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 min-h-[44px] text-xs font-semibold text-[#202938] bg-[#F7F9FC] hover:bg-[#EEF3FA] border border-[#E5EAF0] rounded-lg transition-colors cursor-pointer"
                aria-label="Select Language"
              >
                <Languages className="w-4 h-4 text-[#168C83] stroke-[1.75]" />
                <span className="hidden sm:inline font-medium text-[#667085]">{t('nav.language', 'Language')}:</span>
                <span className="font-semibold text-[#202938]">{currentLang.native}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#667085] rotate-90 stroke-[2]" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white border border-[#E5EAF0] rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#667085] border-b border-[#E5EAF0]">
                    Select Preferred Language
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={cn(
                        'w-full min-h-[44px] flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer',
                        currentLang.code === lang.code
                          ? 'bg-[#EEF3FA] text-[#2457A6] font-bold'
                          : 'text-[#202938] hover:bg-[#F7F9FC]'
                      )}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-sm sm:text-xs">{lang.native}</span>
                        <span className="text-[10px] text-[#667085]">{lang.label}</span>
                      </div>
                      {currentLang.code === lang.code && <Check className="w-4 h-4 text-[#2457A6]" />}
                    </button>
                  ))}
                  <div className="border-t border-[#E5EAF0] mt-1 pt-1 px-2">
                    <Link
                      to="/welcome"
                      onClick={() => setLangMenuOpen(false)}
                      className="block text-center py-2 min-h-[40px] flex items-center justify-center text-xs font-semibold text-[#2457A6] hover:bg-[#F7F9FC] rounded transition-colors"
                    >
                      Full Language Selection Screen →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stop Audio Pill when Voice Reader is Active */}
            {isSpeaking && (
              <button
                type="button"
                onClick={onStop}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer animate-pulse"
                title={t('voice.stop', 'Stop speech')}
                aria-label={t('voice.stop', 'Stop speech')}
              >
                <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">{t('voice.stop', 'Stop Audio')}</span>
              </button>
            )}

            {/* Accessibility Settings Dropdown */}
            <div className="relative" ref={accessMenuRef}>
              <button
                type="button"
                onClick={() => setAccessMenuOpen(!accessMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] min-w-[44px] justify-center text-xs font-semibold text-[#202938] bg-[#F7F9FC] hover:bg-[#EEF3FA] border border-[#E5EAF0] rounded-lg transition-colors cursor-pointer"
                title="Accessibility Settings"
              >
                <Accessibility className="w-4 h-4 text-[#2457A6] stroke-[1.75]" />
                <span className="hidden lg:inline">{t('nav.accessibility', 'Accessibility')}</span>
              </button>

              {accessMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white border border-[#E5EAF0] rounded-xl shadow-lg p-4 space-y-4 z-50 animate-in fade-in">
                  <div className="border-b border-[#E5EAF0] pb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#202938]">
                      Accessibility Options
                    </h4>
                    <p className="text-[11px] text-[#667085] mt-0.5">
                      Adjust display parameters for comfortable reading
                    </p>
                  </div>

                  {/* Text Size Scale */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-[#202938] block">Text Size</span>
                    <div className="grid grid-cols-3 gap-1 bg-[#F7F9FC] p-1 rounded-lg border border-[#E5EAF0]">
                      <button
                        type="button"
                        onClick={() => setTextSize('normal')}
                        className={cn(
                          'py-2 rounded text-xs font-semibold transition-colors cursor-pointer min-h-[36px]',
                          textSize === 'normal'
                            ? 'bg-[#2457A6] text-white'
                            : 'text-[#667085] hover:text-[#202938]'
                        )}
                      >
                        Default (A)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTextSize('large')}
                        className={cn(
                          'py-2 rounded text-xs font-bold transition-colors cursor-pointer min-h-[36px]',
                          textSize === 'large'
                            ? 'bg-[#2457A6] text-white'
                            : 'text-[#667085] hover:text-[#202938]'
                        )}
                      >
                        Large (A+)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTextSize('xlarge')}
                        className={cn(
                          'py-2 rounded text-sm font-extrabold transition-colors cursor-pointer min-h-[36px]',
                          textSize === 'xlarge'
                            ? 'bg-[#2457A6] text-white'
                            : 'text-[#667085] hover:text-[#202938]'
                        )}
                      >
                        A++
                      </button>
                    </div>
                  </div>

                  {/* High Contrast Toggle */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#E5EAF0]">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#168C83]" />
                      <span className="text-xs font-semibold text-[#202938]">High Contrast</span>
                    </div>
                    <button
                      type="button"
                      onClick={toggleHighContrast}
                      className={cn(
                        'w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer',
                        highContrast ? 'bg-[#168C83]' : 'bg-[#E5EAF0]'
                      )}
                    >
                      <div
                        className={cn(
                          'bg-white w-4 h-4 rounded-full shadow-xs transition-transform',
                          highContrast ? 'translate-x-5' : 'translate-x-0'
                        )}
                      />
                    </button>
                  </div>

                  {/* Link to Full Accessibility Page & Panel */}
                  <div className="border-t border-[#E5EAF0] pt-2 space-y-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setAccessMenuOpen(false);
                        openPanel && openPanel();
                      }}
                      className="w-full text-center py-2.5 px-2 text-xs font-bold bg-[#2457A6] hover:bg-[#1D4788] text-white rounded-lg transition-colors cursor-pointer min-h-[44px]"
                    >
                      Open Settings Panel (Alt + A)
                    </button>
                    <Link
                      to="/accessibility"
                      onClick={() => setAccessMenuOpen(false)}
                      className="block text-center py-2 text-xs font-bold text-[#2457A6] hover:bg-[#F7F9FC] rounded-lg transition-colors min-h-[38px] flex items-center justify-center"
                    >
                      All Accessibility Settings →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#667085] hover:text-[#202938] hover:bg-[#F7F9FC] rounded-lg lg:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5EAF0] bg-white px-4 py-4 space-y-4 shadow-xl animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          {/* Active State / UT Mobile Banner */}
          <div className="p-3 bg-[#F0FAF9] rounded-xl border border-teal-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#168C83]" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#168C83] block">
                  Active Region
                </span>
                <span className="text-xs font-bold text-[#202938]">
                  {selectedState ? selectedState.name : 'All India (National)'}
                  {selectedDistrict && ` (${selectedDistrict.name})`}
                </span>
              </div>
            </div>
            <Link
              to="/select-state"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-[#2457A6] hover:underline px-2.5 py-1 bg-white rounded-lg border border-teal-100 shadow-2xs"
            >
              Change
            </Link>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              if (link.isHash) {
                return (
                  <button
                    key={link.to}
                    type="button"
                    onClick={() => handleNavClick(link)}
                    className="w-full text-left px-3.5 py-3 min-h-[44px] text-sm font-medium text-[#667085] hover:text-[#202938] hover:bg-[#F7F9FC] rounded-lg transition-colors flex items-center"
                  >
                    {link.label}
                  </button>
                );
              }

              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-3.5 py-3 min-h-[44px] text-sm font-medium rounded-lg transition-colors flex items-center',
                    isActive
                      ? 'text-[#2457A6] bg-[#EEF3FA] font-bold'
                      : 'text-[#667085] hover:text-[#202938] hover:bg-[#F7F9FC]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Mobile Language Grid (6 Languages) */}
          <div className="pt-3 border-t border-[#E5EAF0] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#667085] block">
              {t('nav.language', 'Language')}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={cn(
                    'min-h-[44px] px-3 py-2 rounded-lg border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer',
                    currentLang.code === lang.code
                      ? 'bg-[#EEF3FA] text-[#2457A6] border-[#2457A6] font-bold'
                      : 'bg-[#F7F9FC] text-[#202938] border-[#E5EAF0] hover:bg-white'
                  )}
                >
                  <span>{lang.native}</span>
                  {currentLang.code === lang.code && <Check className="w-3.5 h-3.5 text-[#2457A6]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Accessibility & Toll-Free Links */}
          <div className="pt-3 border-t border-[#E5EAF0] space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openPanel && openPanel();
              }}
              className="w-full min-h-[44px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#2457A6] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Accessibility className="w-4 h-4" />
              <span>{t('accessibility.panelTitle', 'Accessibility Settings (Alt + A)')}</span>
            </button>

            <a
              href="tel:1800111222"
              className="w-full min-h-[44px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#F0FAF9] border border-teal-200 text-[#168C83] text-xs font-bold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{t('common.helplineText', 'Helpline: 1800-111-222')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
