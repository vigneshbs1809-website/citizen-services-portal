import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Volume2,
  VolumeX,
  Headphones,
  Mic,
  FileText,
  IdCard,
  Wallet,
  GraduationCap,
  Landmark,
  ShieldCheck
} from 'lucide-react';

import {
  Heading1,
  Heading2,
  Heading3,
  Subtitle,
  BodyText,
  BodySecondary,
  Caption,
  SectionLabel
} from '../design-system/Typography';
import { Button } from '../design-system/Button';
import { ServiceCard } from '../design-system/ServiceCard';
import { CategoryCard } from '../design-system/CategoryCard';
import { StepCard } from '../design-system/StepIndicator';
import { PageContainer } from '../design-system/PageContainer';
import { MultilingualSearchBar } from '../components/search/MultilingualSearchBar';
import { AudioGuideButton } from '../components/voice/AudioGuideButton';
import { servicesData } from '../data/servicesData';
import { serviceCategories } from '../data/categoriesData';
import { getServices, getCategories } from '../services/api';
import { useStateContext } from '../context/StateContext';
import { StatePersonalizedDashboard } from '../components/dashboard/StatePersonalizedDashboard';
import { MapPin, Compass } from 'lucide-react';

export function HomePage({ onSpeak }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedState, selectedDistrict } = useStateContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  const [popularServices, setPopularServices] = useState(() => servicesData.filter((s) => s.isPopular));
  const [categories, setCategories] = useState(() => serviceCategories);

  // Fetch popular services and categories from API with local fallback
  useEffect(() => {
    let isMounted = true;
    getServices({ popular: true }).then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setPopularServices(data);
      }
    });
    getCategories().then((cats) => {
      if (isMounted && Array.isArray(cats) && cats.length > 0) {
        setCategories(cats);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/services');
    }
  };

  const handleQuickKeywordClick = (keyword) => {
    setSearchQuery(keyword);
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  const handlePlaySampleVoice = () => {
    if (!onSpeak) return;
    const sampleText = t(
      'voice.description',
      'We believe reading difficulties or visual strain should never prevent you from receiving your government entitlements. Every service on this portal includes human-paced audio narration.'
    );
    setIsPlayingSample(true);
    onSpeak(sampleText);
    setTimeout(() => setIsPlayingSample(false), 8000);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* =========================================================================
          1. HERO SECTION: Clean white background, primary blue accents & abstract visual
      ========================================================================== */}
      <section className="bg-white border-b border-[#E5EAF0] pt-12 pb-16">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, Description, Large Search, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F7F9FC] border border-[#E5EAF0] text-xs font-semibold text-[#2457A6]">
                <CheckCircle className="w-3.5 h-3.5 text-[#168C83] stroke-[2]" />
                <span>Verified Public Services Portal</span>
              </div>

              {/* Heading */}
              <Heading1>
                {t('hero.heading', 'Government Services Made Simple')}
              </Heading1>

              {/* Description */}
              <Subtitle className="max-w-xl">
                {t(
                  'hero.description',
                  'Understand government services, check eligibility, prepare documents and follow simple step-by-step guidance in your preferred language.'
                )}
              </Subtitle>

              {/* Multilingual Search Bar Component with Autocomplete */}
              <div className="space-y-3 pt-2">
                <MultilingualSearchBar
                  className="max-w-2xl"
                  placeholder={t(
                    'hero.searchPlaceholder',
                    'Search for services (e.g., Income Certificate, Caste, Pension, Scholarship)...'
                  )}
                />

                {/* Frequently Searched Quick Chips */}
                <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
                  <span className="font-semibold text-[#667085]">
                    {t('hero.popularTag', 'Frequently Searched:')}
                  </span>
                  {[
                    { label: t('services.incomeCertificate.title', 'Income Certificate'), key: 'income' },
                    { label: t('services.casteCertificate.title', 'Caste Certificate'), key: 'caste' },
                    { label: t('services.pensionGuidance.title', 'Pension Guidance'), key: 'pension' },
                    { label: t('services.scholarshipGuidance.title', 'Scholarship Guidance'), key: 'scholarship' }
                  ].map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={() => handleQuickKeywordClick(chip.label)}
                      className="px-2.5 py-1 rounded bg-[#F7F9FC] hover:bg-[#EEF3FA] text-[#2457A6] hover:text-[#1D4788] border border-[#E5EAF0] transition-colors cursor-pointer"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary CTA Buttons */}
              <div className="pt-2 flex items-center gap-4 flex-wrap">
                <Link to="/services">
                  <Button
                    variant="tertiary"
                    size="md"
                    icon={<ChevronRight className="w-3.5 h-3.5 stroke-[2]" />}
                    iconPosition="right"
                  >
                    {t('hero.browseBtn', 'Browse Services')}
                  </Button>
                </Link>

                <a
                  href="#how-it-works"
                  className="text-xs font-semibold text-[#2457A6] hover:underline"
                >
                  How citizen portal works →
                </a>
              </div>
            </div>

            {/* Right Column: National Public Services Live Trust & Access Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white border border-[#E5EAF0] rounded-2xl p-6 sm:p-7 shadow-2xs space-y-5">
                {/* Header with Landmark Icon & Status */}
                <div className="flex items-center justify-between border-b border-[#E5EAF0] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#2457A6] text-white flex items-center justify-center shadow-xs">
                      <Landmark className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#202938] block leading-tight">
                        Public Services Authority
                      </span>
                      <span className="text-[11px] text-[#667085]">
                        Universal Citizen Assistance
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#168C83] bg-[#F0FAF9] border border-teal-200/80 px-2.5 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#168C83]" />
                    <span>Verified Active</span>
                  </span>
                </div>

                {/* 3 Key Trust Metrics */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#168C83] stroke-[2]" />
                      <span className="text-xs font-semibold text-[#202938]">Statutory Fee Transparency</span>
                    </div>
                    <span className="text-xs font-bold text-[#168C83]">100% Free / Capped</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Volume2 className="w-4 h-4 text-[#2457A6] stroke-[2]" />
                      <span className="text-xs font-semibold text-[#202938]">Regional Voice Assistance</span>
                    </div>
                    <span className="text-xs font-bold text-[#2457A6]">6 Languages</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#2457A6] stroke-[2]" />
                      <span className="text-xs font-semibold text-[#202938]">Accessibility Standards</span>
                    </div>
                    <span className="text-xs font-bold text-[#202938]">WCAG 2.2 AA</span>
                  </div>
                </div>

                {/* Direct Action Link to Guided Assistant */}
                <div className="pt-2 border-t border-[#E5EAF0]">
                  <Link
                    to="/assistant"
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#EEF3FA] hover:bg-[#2457A6] text-[#2457A6] hover:text-white transition-all duration-200 text-xs font-bold group cursor-pointer"
                  >
                    <span>Launch Step-by-Step Guided Assistant</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          STATE-WISE PERSONALIZED DASHBOARD OR STATE DISCOVERY INVITATION
      ========================================================================== */}
      <section className="bg-white">
        <PageContainer>
          {selectedState ? (
            <StatePersonalizedDashboard onSpeak={onSpeak} />
          ) : (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50/70 via-white to-teal-50/50 border border-[#E5EAF0] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-teal-50 border border-teal-200/80 text-xs font-bold text-[#0E5853]">
                  <Compass className="w-3.5 h-3.5 text-[#168C83]" />
                  <span>36 Indian States & Union Territories Supported</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#202938]">
                  Select your State for Verified Local Portals & District Guidance
                </h3>
                <p className="text-xs sm:text-sm text-[#667085] max-w-2xl leading-relaxed">
                  Tailor your dashboard to Karnataka (Seva Sindhu), Tamil Nadu (e-Sevai), Kerala (e-Sevanam), Telangana (MeeSeva), Maharashtra (Aaple Sarkar), Uttar Pradesh (e-District), and all other Indian states.
                </p>
              </div>

              <Link to="/select-state" className="flex-shrink-0">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xs">
                  <MapPin className="w-4 h-4 stroke-[2]" />
                  <span>Select State / UT</span>
                  <ChevronRight className="w-4 h-4 stroke-[2]" />
                </Button>
              </Link>
            </div>
          )}
        </PageContainer>
      </section>

      {/* =========================================================================
          2. SERVICE CATEGORIES: Four professional cards (Certificates, Identity, Pension, Education)
      ========================================================================== */}
      <section className="bg-white">
        <PageContainer className="space-y-8">
          <div className="max-w-2xl space-y-1.5">
            <SectionLabel variant="teal">
              Departmental Organization
            </SectionLabel>
            <Heading2>
              {t('categories.title', 'Service Categories')}
            </Heading2>
            <BodySecondary>
              {t('categories.subtitle', 'Explore government schemes and citizen services organized by department')}
            </BodySecondary>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          3. POPULAR SERVICES: Income, Caste, Residence, Scholarship, Pension
      ========================================================================== */}
      <section className="bg-[#F7F9FC] py-14 border-y border-[#E5EAF0]">
        <PageContainer className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E5EAF0] pb-4">
            <div>
              <SectionLabel variant="primary">
                Frequently Requested
              </SectionLabel>
              <Heading2 className="mt-1">
                {t('popular.title', 'Popular Citizen Services')}
              </Heading2>
              <BodySecondary className="mt-1">
                {t('popular.subtitle', 'Direct access to frequently requested state and national government services')}
              </BodySecondary>
            </div>

            <Link
              to="/services"
              className="text-xs font-bold text-[#2457A6] hover:text-[#1D4788] inline-flex items-center gap-1.5 self-start sm:self-center bg-white px-3.5 py-2 rounded-lg border border-[#E5EAF0] shadow-2xs hover:border-[#2457A6]"
            >
              <span>View All 15+ Services</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSpeak={onSpeak}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          4. HOW IT WORKS: 4 Numbered Steps
          1. Select a service.
          2. Check eligibility.
          3. Prepare documents.
          4. Follow application instructions.
      ========================================================================== */}
      <section id="how-it-works" className="bg-white">
        <PageContainer className="space-y-10">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <SectionLabel variant="primary">
              Simple 4-Step Process
            </SectionLabel>
            <Heading2>
              {t('howItWorks.title', 'How It Works')}
            </Heading2>
            <BodySecondary>
              {t('howItWorks.subtitle', 'Get your government certificate or benefit in four clear, reliable steps')}
            </BodySecondary>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepCard
              number={1}
              title={t('howItWorks.step1Title', 'Select a service')}
              description={t(
                'howItWorks.step1Desc',
                'Search or choose from our categorized directory of citizen services.'
              )}
            />
            <StepCard
              number={2}
              title={t('howItWorks.step2Title', 'Check eligibility')}
              description={t(
                'howItWorks.step2Desc',
                'Review clear qualification requirements explained in simple, everyday language.'
              )}
            />
            <StepCard
              number={3}
              title={t('howItWorks.step3Title', 'Prepare documents')}
              description={t(
                'howItWorks.step3Desc',
                'Gather your paperwork using our verified visual checklist before applying.'
              )}
            />
            <StepCard
              number={4}
              title={t('howItWorks.step4Title', 'Follow application instructions')}
              description={t(
                'howItWorks.step4Desc',
                'Follow step-by-step guidance to submit online or at your nearest Seva Kendra.'
              )}
            />
          </div>

          {/* Interactive Assistant Launch Banner */}
          <div className="mt-8 p-6 rounded-2xl bg-white border-2 border-[#2457A6] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-[#168C83] uppercase tracking-wider">
                Interactive Assistant
              </span>
              <h3 className="text-lg font-bold text-[#202938]">
                {t('assistant.title', 'Step-by-Step Citizen Guidance Assistant')}
              </h3>
              <p className="text-xs sm:text-sm text-[#667085] max-w-xl">
                {t('assistant.subtitle', 'We guide you through 6 simple steps to understand entitlements, verify paperwork, and safely access official portals.')}
              </p>
            </div>
            <Link to="/assistant" className="w-full sm:w-auto flex-shrink-0">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xs">
                Launch Guidance Assistant →
              </Button>
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          5. VOICE ASSISTANCE SECTION: Explaining audio guidance with interactive demo
      ========================================================================== */}
      <section id="voice-assistance" className="bg-[#F7F9FC] border-y border-[#E5EAF0] py-14">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Audio Guidance Rationale */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F0FAF9] border border-teal-200 text-xs font-semibold text-[#168C83]">
                <Headphones className="w-3.5 h-3.5 text-[#168C83] stroke-[1.75]" />
                <span>{t('voice.badge', 'Audio Assistance')}</span>
              </div>

              <Heading2>
                {t('voice.title', 'Listen to Instructions in Your Own Language')}
              </Heading2>

              <BodySecondary className="max-w-xl">
                {t(
                  'voice.description',
                  'We believe reading difficulties or visual strain should never prevent you from receiving your government entitlements. Every service on this portal includes human-paced audio narration.'
                )}
              </BodySecondary>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs text-[#202938] font-medium">
                  <CheckCircle className="w-4 h-4 text-[#168C83] stroke-[2]" />
                  <span>{t('voice.feature1', 'Clear pronunciation in 6 official languages (Hindi, Kannada, Telugu, Tamil, Malayalam, English)')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#202938] font-medium">
                  <CheckCircle className="w-4 h-4 text-[#168C83] stroke-[2]" />
                  <span>{t('voice.feature2', 'Explains documents, fees, and office procedures step-by-step')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#202938] font-medium">
                  <CheckCircle className="w-4 h-4 text-[#168C83] stroke-[2]" />
                  <span>{t('voice.feature3', 'No software download or app installation required')}</span>
                </div>
              </div>

              {/* Interactive Audio Test Button */}
              <div className="pt-2 flex items-center gap-3">
                <AudioGuideButton
                  id="home-sample-guidance"
                  title="Citizen Services Audio Guidance"
                  text={t(
                    'voice.description',
                    'We believe reading difficulties or visual strain should never prevent you from receiving your government entitlements. Every service on this portal includes human-paced audio narration.'
                  )}
                  label={t('voice.testAudioBtn', 'Listen to Sample Audio Guidance')}
                  size="lg"
                  variant="pill"
                />
              </div>
            </div>

            {/* Right Column: Audio Guide Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-white rounded-2xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5EAF0] pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2457A6]">
                    {t('voice.badge', 'Audio Player')}
                  </span>
                  <span className="text-[11px] font-semibold text-[#168C83] bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded">
                    {t('common.ready', 'Audio Ready')}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#168C83] text-white flex items-center justify-center flex-shrink-0">
                      <Volume2 className="w-5 h-5 text-white stroke-[2]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#202938]">{t('voice.cardSampleTitle', 'Income Certificate Audio Guide')}</p>
                      <p className="text-[11px] text-[#667085]">{t('voice.sixLanguages', 'Available in 6 Official Indian Languages')}</p>
                    </div>
                  </div>

                  {/* Sound Wave Graphic Simulation */}
                  <div className="flex items-center gap-1.5 h-6 px-2 justify-center">
                    <span className="w-1 h-3 bg-[#168C83] rounded-full animate-pulse" />
                    <span className="w-1 h-5 bg-[#2457A6] rounded-full animate-pulse" />
                    <span className="w-1 h-2 bg-[#168C83] rounded-full" />
                    <span className="w-1 h-6 bg-[#2457A6] rounded-full animate-pulse" />
                    <span className="w-1 h-4 bg-[#168C83] rounded-full" />
                    <span className="w-1 h-5 bg-[#2457A6] rounded-full animate-pulse" />
                    <span className="w-1 h-3 bg-[#168C83] rounded-full" />
                  </div>
                </div>

                <Caption className="text-center block">
                  {t('voice.listenTip', "Click 'Listen' on any service card to hear spoken explanations anytime.")}
                </Caption>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}

export default HomePage;
