import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  Award,
  Home,
  GraduationCap,
  Wallet,
  ShoppingBag,
  HeartPulse,
  Wheat,
  CheckCircle,
  Check,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Clock,
  Building2,
  FileCheck2,
  AlertTriangle,
  X
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
import { servicesData } from '../data/servicesData';
import { getServiceTranslation } from '../utilities/serviceTranslation';
import { getOfficialPortal } from '../utilities/portalLinks';
import { AudioGuideButton } from '../components/voice/AudioGuideButton';
import { DocumentPreparationChecklist } from '../components/documents/DocumentPreparationChecklist';
import { cn } from '../utilities/classNames';

const STORAGE_KEY = 'citizen_guidance_progress';

// Service icon mapping with Lucide outline icons
const SERVICE_ICONS = {
  'income-certificate': FileText,
  'caste-certificate': Award,
  'residence-certificate': Home,
  'scholarship-guidance': GraduationCap,
  'pension-guidance': Wallet,
  'ration-card': ShoppingBag,
  'ayushman-card': HeartPulse,
  'pm-kisan': Wheat,
};

export function GuidedStepsPage({ onSpeak }) {
  const { t, i18n } = useTranslation();
  const { id: paramServiceId } = useParams();
  const navigate = useNavigate();

  const activeLang = (i18n?.language || t('common.langCode', 'en')).slice(0, 2).toLowerCase();

  // Wizard state: 1 to 6
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(paramServiceId || null);
  const [eligibilityAnswers, setEligibilityAnswers] = useState({});
  const [checkedDocs, setCheckedDocs] = useState({});
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const [savedSessionData, setSavedSessionData] = useState(null);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.serviceId) {
          setSavedSessionData(parsed);
          // If no specific service was passed via route params, offer resume
          if (!paramServiceId) {
            setShowResumeBanner(true);
          } else if (paramServiceId === parsed.serviceId) {
            // Restore answers and docs if URL matches saved service
            setSelectedServiceId(parsed.serviceId);
            setEligibilityAnswers(parsed.eligibilityAnswers || {});
            setCheckedDocs(parsed.checkedDocs || {});
            if (parsed.currentStep > 1) {
              setCurrentStep(parsed.currentStep);
            }
          }
        }
      }
    } catch {
      // LocalStorage unavailable or parse error; ignore safely
    }
  }, [paramServiceId]);

  // If paramServiceId changes via URL navigation
  useEffect(() => {
    if (paramServiceId) {
      setSelectedServiceId(paramServiceId);
    }
  }, [paramServiceId]);

  // Persist progress to localStorage (only non-sensitive interaction state)
  useEffect(() => {
    if (!selectedServiceId) return;
    try {
      const payload = {
        serviceId: selectedServiceId,
        currentStep,
        eligibilityAnswers,
        checkedDocs,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage quota or restriction; continue safely
    }
  }, [selectedServiceId, currentStep, eligibilityAnswers, checkedDocs]);

  // Retrieve current active service object
  const activeService = useMemo(() => {
    if (!selectedServiceId) return null;
    return servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];
  }, [selectedServiceId]);

  // Translation helpers
  const serviceTrans = useMemo(() => {
    return activeService ? getServiceTranslation(activeService, t, activeLang) : {};
  }, [activeService, t, activeLang]);

  const officialPortal = useMemo(() => {
    return activeService ? getOfficialPortal(activeService.id) : null;
  }, [activeService]);

  // Step definitions
  const stepsMeta = [
    { number: 1, title: t('assistant.step1Title', 'Select Service') },
    { number: 2, title: t('assistant.step2Title', 'Understand Service') },
    { number: 3, title: t('assistant.step3Title', 'Check Eligibility') },
    { number: 4, title: t('assistant.step4Title', 'Prepare Documents') },
    { number: 5, title: t('assistant.step5Title', 'Application Instructions') },
    { number: 6, title: t('assistant.step6Title', 'Open Official Portal') },
  ];

  // Resume handlers
  const handleResumeSession = () => {
    if (!savedSessionData) return;
    setSelectedServiceId(savedSessionData.serviceId);
    setCurrentStep(savedSessionData.currentStep || 1);
    setEligibilityAnswers(savedSessionData.eligibilityAnswers || {});
    setCheckedDocs(savedSessionData.checkedDocs || {});
    setShowResumeBanner(false);
  };

  const handleStartFresh = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedSessionData(null);
    setShowResumeBanner(false);
    setSelectedServiceId(null);
    setCurrentStep(1);
    setEligibilityAnswers({});
    setCheckedDocs({});
  };

  // Step 1: Select Service
  const handleSelectService = (serviceId) => {
    setSelectedServiceId(serviceId);
    // Reset answers if changing to a different service
    if (selectedServiceId !== serviceId) {
      setEligibilityAnswers({});
      setCheckedDocs({});
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Toggle Eligibility Answer
  const handleToggleEligibility = (questionId, value) => {
    setEligibilityAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Step 4: Toggle Document Check
  const handleToggleDoc = (docIndex) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docIndex]: !prev[docIndex],
    }));
  };

  // Navigation between steps
  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (targetStep) => {
    // Citizens can freely jump back to any previous step, or advance to current reached step
    if (targetStep < currentStep || (targetStep === currentStep + 1 && selectedServiceId)) {
      setCurrentStep(targetStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Eligibility evaluation
  const questions = serviceTrans.questions || activeService?.eligibilityCriteria?.questions || [];
  const simpleSteps = serviceTrans.simpleSteps || activeService?.simpleSteps || [];
  const answeredCount = Object.keys(eligibilityAnswers).length;
  const allAnswered = questions.length > 0 && answeredCount >= questions.length;
  const qualifies = questions.length > 0 && questions.every((q) => eligibilityAnswers[q.id] === true);

  // Documents evaluation
  const documentList = activeService?.documentDetails || (serviceTrans.requiredDocuments || activeService?.requiredDocuments || []).map((doc) => ({
    name: doc,
    photocopiesNeeded: 1,
    source: 'Competent local authority or photo studio',
    isMandatory: true,
  }));
  const totalDocs = documentList.length;
  const checkedDocsCount = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = Math.round((currentStep / 6) * 100);

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-8">
      <PageContainer className="space-y-6 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('nav.services', 'Services'), to: '/services' },
            { label: t('assistant.title', 'Citizen Guidance Assistant') },
          ]}
        />

        {/* =========================================================================
            RESUME SESSION BANNER (Restores user session safely)
        ========================================================================== */}
        {showResumeBanner && savedSessionData && (
          <div className="p-4 sm:p-5 bg-white border-2 border-[#2457A6] rounded-xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-[#2457A6]">
                <RotateCcw className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-[#202938]">
                  {t('assistant.resumeTitle', 'Resume Your Guidance Session')}
                </h4>
                <p className="text-xs text-[#667085]">
                  {t('assistant.resumeDesc', {
                    service: savedSessionData.serviceId.replace('-', ' '),
                    step: savedSessionData.currentStep,
                    defaultValue: `You have saved progress for this service (Step ${savedSessionData.currentStep}). Would you like to resume where you left off or start over?`,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button
                variant="primary"
                size="sm"
                onClick={handleResumeSession}
                className="flex-1 sm:flex-initial"
              >
                {t('assistant.resumeBtn', 'Resume Guidance')}
              </Button>
              <Button
                variant="tertiary"
                size="sm"
                onClick={handleStartFresh}
                className="flex-1 sm:flex-initial"
              >
                {t('assistant.startOverBtn', 'Start Fresh')}
              </Button>
            </div>
          </div>
        )}

        {/* =========================================================================
            WIZARD HEADER & PROGRESS INDICATOR
        ========================================================================== */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-4 sm:p-6 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF0] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0FAF9] border border-teal-200/80 text-[11px] font-bold text-[#168C83] uppercase tracking-wider mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2]" />
                <span>{t('assistant.title', 'Citizen Guidance Assistant')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#202938]">
                {stepsMeta[currentStep - 1]?.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
                {activeService
                  ? `${serviceTrans.title || activeService.title} • ${t('assistant.stepOf', { current: currentStep, total: 6 })}`
                  : t('assistant.subtitle', 'Follow 6 simple steps to understand entitlements, verify paperwork, and safely access official portals.')}
              </p>
            </div>

            {/* Audio Guidance Button for Step Overview */}
            <div className="flex items-center gap-2">
              <AudioGuideButton
                id={`assistant-step-${currentStep}`}
                title={`Step ${currentStep}: ${stepsMeta[currentStep - 1]?.title}`}
                text={
                  currentStep === 1
                    ? 'Step 1: Choose the government service you need guidance with from the options below.'
                    : currentStep === 2
                    ? `Step 2: Understand the ${serviceTrans.title || activeService?.title}. ${serviceTrans.spokenSummary || activeService?.spokenSummary}`
                    : currentStep === 3
                    ? `Step 3: Check your eligibility for ${serviceTrans.title || activeService?.title}. Answer each simple question honestly.`
                    : currentStep === 4
                    ? `Step 4: Prepare your documents. You need ${totalDocs} documents with photocopies ready before visiting any office.`
                    : currentStep === 5
                    ? `Step 5: Application instructions. Submit photocopies and demand an official acknowledgment receipt. Never pay bribes.`
                    : `Step 6: Open official government portal. You are ready to visit the verified official portal at ${officialPortal?.domain}.`
                }
                label={t('common.listen', 'Listen')}
                size="md"
                variant="secondary"
              />
            </div>
          </div>

          {/* Numbered Progress Bar with Step Circles */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#667085] mb-1">
              <span>{t('assistant.stepOf', { current: currentStep, total: 6 })}</span>
              <span className="text-[#2457A6]">{progressPercent}% {t('assistant.completed', 'Completed')}</span>
            </div>

            {/* Horizontal Step Circles */}
            <div className="grid grid-cols-6 gap-1 sm:gap-2">
              {stepsMeta.map((step) => {
                const isCurrent = step.number === currentStep;
                const isPast = step.number < currentStep;
                const isClickable = isPast || (step.number === currentStep + 1 && selectedServiceId);

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => isClickable && handleJumpToStep(step.number)}
                    disabled={!isClickable && !isCurrent}
                    className={cn(
                      'flex flex-col items-center justify-center gap-1.5 p-1 sm:p-2 rounded-lg text-left transition-all min-h-[44px]',
                      isClickable ? 'cursor-pointer hover:bg-[#F7F9FC]' : 'cursor-default',
                      isCurrent ? 'bg-[#EEF3FA]/70 border border-[#2457A6]/30' : ''
                    )}
                  >
                    <div
                      className={cn(
                        'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-2xs',
                        isCurrent && 'bg-[#2457A6] text-white ring-4 ring-[#2457A6]/15',
                        isPast && 'bg-[#168C83] text-white',
                        !isCurrent && !isPast && 'bg-[#E5EAF0] text-[#667085]'
                      )}
                    >
                      {isPast ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" /> : step.number}
                    </div>
                    <span
                      className={cn(
                        'text-[11px] font-medium text-center hidden md:block leading-tight line-clamp-1',
                        isCurrent ? 'text-[#2457A6] font-bold' : isPast ? 'text-[#168C83]' : 'text-[#667085]'
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Thin Progress Track */}
            <div className="w-full bg-[#E5EAF0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#2457A6] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            STEP 1: SELECT SERVICE
        ========================================================================== */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2457A6] uppercase tracking-wider">
                {t('assistant.stepOf', { current: 1, total: 6 })}
              </span>
              <Heading2>{t('assistant.step1Title', 'Select Service')}</Heading2>
              <BodySecondary>
                {t('assistant.step1Desc', 'Choose the government service you need guidance with.')}
              </BodySecondary>
            </div>

            {/* 8 Government Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 pt-2">
              {servicesData.map((service) => {
                const IconComp = SERVICE_ICONS[service.id] || FileText;
                const isSelected = selectedServiceId === service.id;
                const translated = getServiceTranslation(service, t, activeLang);

                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelectService(service.id)}
                    className={cn(
                      'p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group shadow-2xs text-left relative',
                      isSelected
                        ? 'bg-[#EEF3FA]/50 border-[#2457A6] ring-2 ring-[#2457A6]/20'
                        : 'bg-white border-[#E5EAF0] hover:border-[#2457A6] hover:bg-[#F7F9FC]'
                    )}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                            isSelected
                              ? 'bg-[#2457A6] text-white'
                              : 'bg-[#F7F9FC] text-[#2457A6] border border-[#E5EAF0] group-hover:bg-[#2457A6] group-hover:text-white'
                          )}
                        >
                          <IconComp className="w-5 h-5 stroke-[2]" />
                        </div>

                        {/* Selected Indicator or Audio Listen */}
                        <div className="flex items-center gap-2">
                          <AudioGuideButton
                            id={`service-card-${service.id}`}
                            title={translated.title || service.title}
                            text={`${translated.title || service.title}. ${translated.shortDescription || service.shortDescription}. Fee: ${translated.officialFee || service.officialFee}. Timeline: ${translated.processingTime || service.processingTime}.`}
                            size="sm"
                            variant="secondary"
                          />
                          {isSelected && (
                            <span className="flex items-center gap-1 text-xs font-bold text-[#2457A6] bg-white border border-[#2457A6]/30 px-2 py-0.5 rounded">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              {t('common.selected', 'Selected')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-[#202938] group-hover:text-[#2457A6] transition-colors">
                          {translated.title || service.title}
                        </h3>
                        <p className="text-xs text-[#667085] leading-relaxed mt-1 line-clamp-2">
                          {translated.shortDescription || service.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t border-[#E5EAF0] pt-3 mt-4 text-[11px] font-semibold text-[#667085]">
                      <span className="text-[#168C83] bg-[#F0FAF9] px-2 py-0.5 rounded border border-teal-200/60">
                        {translated.officialFee || service.officialFee}
                      </span>
                      <span>{translated.processingTime || service.processingTime}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: UNDERSTAND THE SERVICE
        ========================================================================== */}
        {currentStep === 2 && activeService && (
          <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2457A6] uppercase tracking-wider">
                {t('assistant.stepOf', { current: 2, total: 6 })}
              </span>
              <Heading2>{t('assistant.step2Title', 'Understand the Service')}</Heading2>
              <BodySecondary>
                {t('assistant.step2Desc', 'Learn what this scheme provides, official fees, and processing timeline.')}
              </BodySecondary>
            </div>

            {/* Service Summary Hero Card */}
            <div className="p-6 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#2457A6] text-white flex items-center justify-center shadow-xs">
                    {React.createElement(SERVICE_ICONS[activeService.id] || FileText, {
                      className: 'w-6 h-6 stroke-[2]',
                    })}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#202938]">
                      {serviceTrans.title || activeService.title}
                    </h3>
                    <p className="text-xs text-[#667085]">
                      Category: <span className="font-semibold capitalize text-[#202938]">{activeService.category}</span>
                    </p>
                  </div>
                </div>

                <AudioGuideButton
                  id={`service-summary-${activeService.id}`}
                  title={serviceTrans.title || activeService.title}
                  text={`${serviceTrans.title || activeService.title}: ${serviceTrans.spokenSummary || activeService.spokenSummary}`}
                  label={t('common.listen', 'Listen to Summary')}
                  size="md"
                  variant="primary"
                />
              </div>

              <p className="text-sm text-[#202938] leading-relaxed bg-white p-4 rounded-lg border border-[#E5EAF0]">
                {serviceTrans.spokenSummary || activeService.spokenSummary}
              </p>
            </div>

            {/* Key Information Cards (4-box Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Official Fee Guarantee */}
              <div className="p-4 rounded-xl border border-teal-200 bg-[#F0FAF9] space-y-1.5">
                <div className="flex items-center gap-2 text-[#168C83]">
                  <Wallet className="w-4 h-4 stroke-[2]" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t('common.officialFee', 'Official Fee')}</span>
                </div>
                <div className="text-base font-bold text-[#0E5853]">
                  {serviceTrans.officialFee || activeService.officialFee}
                </div>
                <p className="text-[11px] text-[#168C83] leading-tight">
                  {t('assistant.feeSubtext', 'Statutory regulated rate. Never pay extra cash.')}
                </p>
              </div>

              {/* Processing Timeline */}
              <div className="p-4 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC] space-y-1.5">
                <div className="flex items-center gap-2 text-[#2457A6]">
                  <Clock className="w-4 h-4 stroke-[2]" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t('common.processingTime', 'Processing Time')}</span>
                </div>
                <div className="text-base font-bold text-[#202938]">
                  {serviceTrans.processingTime || activeService.processingTime}
                </div>
                <p className="text-[11px] text-[#667085] leading-tight">
                  {t('assistant.timelineSubtext', 'Statutory citizen charter delivery guarantee.')}
                </p>
              </div>

              {/* Issuing Authority */}
              <div className="p-4 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC] space-y-1.5">
                <div className="flex items-center gap-2 text-[#2457A6]">
                  <Building2 className="w-4 h-4 stroke-[2]" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t('assistant.authorityLabel', 'Authority')}</span>
                </div>
                <div className="text-sm font-bold text-[#202938] line-clamp-1">
                  {officialPortal?.department || 'Revenue & Citizen Affairs'}
                </div>
                <p className="text-[11px] text-[#667085] leading-tight">
                  {t('assistant.authoritySubtext', 'Official state or central government department.')}
                </p>
              </div>

              {/* Citizen Entitlement */}
              <div className="p-4 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC] space-y-1.5">
                <div className="flex items-center gap-2 text-[#168C83]">
                  <ShieldCheck className="w-4 h-4 stroke-[2]" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t('assistant.entitlementLabel', 'Entitlement')}</span>
                </div>
                <div className="text-xs font-bold text-[#202938] line-clamp-2">
                  {serviceTrans.benefitAmount || activeService.benefitAmount}
                </div>
                <p className="text-[11px] text-[#667085] leading-tight">
                  {t('assistant.entitlementSubtext', 'Protected statutory citizen right.')}
                </p>
              </div>
            </div>

            {/* Anti-Middleman Advisory Card */}
            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2457A6] stroke-[2] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-[#202938]">
                  {t('assistant.transparencyTitle', 'Citizen Transparency Guarantee')}
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed">
                  {t('assistant.transparencyBody', 'Government services do not require brokers, middlemen, or touts. Applications submitted directly online or at your local Gram Panchayat / Seva Kendra are processed identically under law.')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: CHECK ELIGIBILITY
        ========================================================================== */}
        {currentStep === 3 && activeService && (
          <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2457A6] uppercase tracking-wider">
                {t('assistant.stepOf', { current: 3, total: 6 })}
              </span>
              <Heading2>{t('assistant.step3Title', 'Check Eligibility')}</Heading2>
              <BodySecondary>
                {t('assistant.step3Desc', 'Answer simple questions to confirm you meet the criteria.')}
              </BodySecondary>
            </div>

            {/* Target Group Description */}
            <div className="p-4 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-[#2457A6] uppercase tracking-wider">
                  {t('eligibility.targetGroupLabel', 'Target Group')}
                </span>
                <p className="text-sm font-semibold text-[#202938]">
                  {serviceTrans.targetGroup || activeService.eligibilityCriteria?.targetGroup || 'Open to all permanent residents'}
                </p>
              </div>
              <span className="text-xs font-semibold text-[#168C83] bg-[#F0FAF9] border border-teal-200/80 px-2.5 py-1 rounded">
                {t('eligibility.zeroDataSaved', 'Zero Personal Data Saved')}
              </span>
            </div>

            {/* Interactive Questions List */}
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const answer = eligibilityAnswers[q.id];

                return (
                  <div
                    key={q.id}
                    className={cn(
                      'p-5 rounded-xl border transition-all space-y-3',
                      answer === true
                        ? 'border-teal-300 bg-[#F0FAF9]/50'
                        : answer === false
                        ? 'border-slate-300 bg-[#F7F9FC]'
                        : 'border-[#E5EAF0] bg-white'
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-[#2457A6] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="space-y-1">
                          <h4 className="text-sm sm:text-base font-bold text-[#202938]">
                            {q.question}
                          </h4>
                          <p className="text-xs text-[#667085] leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      </div>

                      <AudioGuideButton
                        id={`q-${q.id}`}
                        title={`Question ${idx + 1}`}
                        text={`${q.question}. ${q.explanation}`}
                        size="sm"
                        variant="secondary"
                      />
                    </div>

                    {/* Yes / No Selection Buttons (min 48px tap targets) */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => handleToggleEligibility(q.id, true)}
                        className={cn(
                          'h-12 rounded-lg font-bold text-sm flex items-center justify-center gap-2 border-2 transition-all cursor-pointer',
                          answer === true
                            ? 'bg-[#168C83] text-white border-[#168C83] shadow-xs'
                            : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-[#168C83]'
                        )}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        {t('eligibility.yesMeet', 'Yes, I meet this')}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleEligibility(q.id, false)}
                        className={cn(
                          'h-12 rounded-lg font-bold text-sm flex items-center justify-center gap-2 border-2 transition-all cursor-pointer',
                          answer === false
                            ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
                            : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-slate-400'
                        )}
                      >
                        <X className="w-4 h-4 stroke-[3]" />
                        {t('eligibility.noNotYet', 'No / Not yet')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Real-time Status Card */}
            {allAnswered && (
              <div
                className={cn(
                  'p-4 rounded-xl border flex items-start gap-3',
                  qualifies
                    ? 'bg-[#F0FAF9] border-teal-300 text-[#0E5853]'
                    : 'bg-[#F7F9FC] border-[#E5EAF0] text-[#202938]'
                )}
              >
                {qualifies ? (
                  <CheckCircle className="w-5 h-5 text-[#168C83] stroke-[2] flex-shrink-0 mt-0.5" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-[#2457A6] stroke-[2] flex-shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold">
                    {qualifies
                      ? t('eligibility.qualifiedTitle', 'Great! You appear to qualify for this service.')
                      : t('eligibility.notQualifiedTitle', 'Notice: Some requirements were marked "No"')}
                  </h4>
                  <p className="text-xs leading-relaxed">
                    {qualifies
                      ? t('eligibility.qualifiedDesc', 'You meet all the standard eligibility rules. Continue to Step 4 to prepare your documents.')
                      : t('eligibility.notQualifiedDesc', 'You can still prepare your paperwork or visit your local Taluk Tehsildar / Gram Panchayat office for special welfare exemptions or clarification.')}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            STEP 4: PREPARE DOCUMENTS
        ========================================================================== */}
        {currentStep === 4 && activeService && (
          <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2457A6] uppercase tracking-wider">
                {t('assistant.stepOf', { current: 4, total: 6 })}
              </span>
              <Heading2>{t('assistant.step4Title', 'Prepare Documents')}</Heading2>
              <BodySecondary>
                {t('assistant.step4Desc', 'Prepare and verify your photocopies before visiting the office.')}
              </BodySecondary>
            </div>

            <DocumentPreparationChecklist
              service={activeService}
            />
          </div>
        )}

        {/* =========================================================================
            STEP 5: APPLICATION INSTRUCTIONS
        ========================================================================== */}
        {currentStep === 5 && activeService && (
          <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#2457A6] uppercase tracking-wider">
                  {t('assistant.stepOf', { current: 5, total: 6 })}
                </span>
                <Heading2>{t('assistant.step5Title', 'Application Instructions')}</Heading2>
                <BodySecondary>
                  {t('assistant.step5Desc', 'Understand how to submit your paperwork safely without middlemen.')}
                </BodySecondary>
              </div>

              <AudioGuideButton
                id={`step5-all-instructions`}
                title={t('assistant.step5Title', 'Application Instructions')}
                text={`${serviceTrans.title || activeService.title}: ${simpleSteps.map((s) => `${s.stepNumber}. ${s.title}: ${s.instruction}`).join(' ')}`}
                label={t('common.listen', 'Listen to Instructions')}
                size="md"
                variant="primary"
              />
            </div>

            {/* Sequential Steps */}
            <div className="space-y-4">
              {simpleSteps.map((step, idx) => {
                const stepNum = step.stepNumber || idx + 1;

                return (
                  <div
                    key={stepNum}
                    className="p-5 rounded-xl border border-[#E5EAF0] bg-white flex items-start gap-4 hover:border-[#2457A6]/50 transition-colors shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#2457A6] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-2xs">
                      {stepNum}
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-[#202938]">
                          {step.title}
                        </h4>
                        <AudioGuideButton
                          id={`step5-${stepNum}`}
                          title={`Step ${stepNum}: ${step.title}`}
                          text={`Step ${stepNum}: ${step.title}. ${step.instruction || step.description}`}
                          size="sm"
                          variant="secondary"
                        />
                      </div>

                      <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                        {step.instruction || step.description}
                      </p>

                      {step.tip && (
                        <div className="p-2.5 rounded-lg bg-[#F0FAF9] border border-teal-200/80 text-xs text-[#0E5853] flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#168C83] flex-shrink-0 mt-0.5" />
                          <span><strong>{t('common.keyTip', 'Key Tip:')}</strong> {step.tip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Crucial Acknowledgement Receipt Notice */}
            <div className="p-4 rounded-xl bg-[#EEF3FA] border border-[#2457A6]/30 flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-[#2457A6] stroke-[2] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-[#2457A6] uppercase tracking-wider">
                  {t('assistant.receiptNoticeTitle', 'Mandatory Receipt Requirement')}
                </h4>
                <p className="text-xs text-[#202938] leading-relaxed">
                  {t('assistant.receiptNoticeBody', 'Whenever you submit your application (online or offline), always insist on receiving an Official Acknowledgement Slip. It contains your unique Application Number needed to track your file and hold officials accountable under the Citizen Charter.')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 6: OPEN OFFICIAL GOVERNMENT PORTAL
        ========================================================================== */}
        {currentStep === 6 && activeService && (
          <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2457A6] uppercase tracking-wider">
                {t('assistant.stepOf', { current: 6, total: 6 })}
              </span>
              <Heading2>{t('assistant.step6Title', 'Open Official Portal')}</Heading2>
              <BodySecondary>
                {t('assistant.step6Desc', 'Review your readiness and safely proceed to the official government portal.')}
              </BodySecondary>
            </div>

            {/* Citizen Readiness Summary Card */}
            <div className="p-6 rounded-xl bg-[#F0FAF9] border border-teal-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#168C83] text-white flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0E5853]">
                    {t('assistant.readyToProceed', 'You are ready to proceed!')}
                  </h3>
                  <p className="text-xs text-[#168C83]">
                    {t('assistant.readyDesc', 'You have verified eligibility rules, checked off required photocopies, and understand the official fee.')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white p-3 rounded-lg border border-teal-200/80 space-y-0.5">
                  <span className="text-[11px] font-bold text-[#667085] uppercase">{t('assistant.summaryService', 'Service')}</span>
                  <p className="text-xs font-bold text-[#202938] truncate">{serviceTrans.title || activeService.title}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-teal-200/80 space-y-0.5">
                  <span className="text-[11px] font-bold text-[#667085] uppercase">{t('assistant.summaryDocsReady', 'Documents Ready')}</span>
                  <p className="text-xs font-bold text-[#168C83]">{t('assistant.checkedOutOf', { checked: checkedDocsCount, total: totalDocs, defaultValue: `${checkedDocsCount} of ${totalDocs} Checked` })}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-teal-200/80 space-y-0.5">
                  <span className="text-[11px] font-bold text-[#667085] uppercase">{t('assistant.summaryStatutoryFee', 'Statutory Fee')}</span>
                  <p className="text-xs font-bold text-[#202938]">{serviceTrans.officialFee || activeService.officialFee}</p>
                </div>
              </div>
            </div>

            {/* Official Portal Details Card */}
            <div className="p-6 rounded-xl bg-white border-2 border-[#2457A6] space-y-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#EEF3FA] text-[#2457A6] text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 stroke-[2]" />
                    <span>{t('assistant.verifiedPortalBadge', 'Verified Official Public Portal')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#202938]">
                    {officialPortal?.name}
                  </h3>
                  <p className="text-xs text-[#667085]">
                    {t('assistant.operatedBy', 'Operated by:')} <span className="font-semibold text-[#202938]">{officialPortal?.department}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#2457A6] bg-[#F7F9FC] border border-[#E5EAF0] px-2.5 py-1 rounded">
                    {officialPortal?.domain}
                  </span>
                </div>
              </div>

              {/* Physical / Offline Counter Alternative */}
              <div className="p-3 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-xs text-[#667085] space-y-0.5">
                <span className="font-bold text-[#202938]">{t('assistant.inPersonAlternative', 'Prefer applying in person?')}</span>
                <p>{t('assistant.visitYour', 'Visit your:')} <strong className="text-[#202938]">{officialPortal?.offlineAlternative}</strong></p>
              </div>

              {/* Open Official Portal CTA Button */}
              <div className="pt-2">
                <a
                  href={officialPortal?.portalUrl || 'https://www.india.gov.in'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-base py-3.5 px-6 rounded-xl bg-[#2457A6] hover:bg-[#1A4280] text-white font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <ExternalLink className="w-5 h-5 stroke-[2]" />
                  <span>{t('assistant.openPortal', 'Open Official Government Portal')} ({officialPortal?.domain || 'india.gov.in'})</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            BOTTOM NAVIGATION ACTION BAR (Clear Back & Continue Buttons)
        ========================================================================== */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-4 sm:p-5 shadow-2xs flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            {currentStep > 1 ? (
              <Button
                variant="secondary"
                size="md"
                onClick={handlePrevStep}
                className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
                <span>{t('assistant.prevStep', 'Go Back')}</span>
              </Button>
            ) : (
              <Link to="/services" className="block sm:inline-block">
                <Button variant="tertiary" size="md" className="w-full sm:w-auto min-h-[44px]">
                  Browse All Services
                </Button>
              </Link>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {currentStep > 1 && (
              <Button
                variant="tertiary"
                size="md"
                onClick={() => setCurrentStep(1)}
                className="hidden sm:inline-flex text-[#667085] min-h-[44px]"
              >
                {t('assistant.restart', 'Change Service')}
              </Button>
            )}

            {currentStep < 6 && (
              <Button
                variant="primary"
                size="md"
                onClick={handleNextStep}
                disabled={currentStep === 1 && !selectedServiceId}
                className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>{t('assistant.nextStep', 'Continue to Next Step')}</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </Button>
            )}
          </div>
        </div>
      </PageContainer>

      {/* =========================================================================
          EXTERNAL DEPARTURE CONFIRMATION MODAL
      ========================================================================== */}
      {isExitModalOpen && officialPortal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E5EAF0] max-w-lg w-full p-6 sm:p-7 shadow-xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-[#E5EAF0] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2457A6] text-white flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#202938]">
                    {t('assistant.externalWarningTitle', 'You are Leaving for an Official Government Website')}
                  </h3>
                  <span className="text-xs text-[#168C83] font-semibold flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Official Public Domain ({officialPortal.domain})
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExitModalOpen(false)}
                className="p-1 rounded-md text-[#667085] hover:text-[#202938] hover:bg-[#F7F9FC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body & Security Reminders */}
            <div className="space-y-3.5 text-xs sm:text-sm text-[#202938]">
              <p className="leading-relaxed">
                {t('assistant.externalWarningDesc', {
                  domain: officialPortal.domain,
                  defaultValue: `You will now be redirected to the official government portal at ${officialPortal.domain} to submit your application. This is a secure government portal.`,
                })}
              </p>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#168C83] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-[#667085]">
                    {t('assistant.externalWarningTip1', 'Keep your prepared photocopies and original documents ready.')}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#168C83] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-[#667085]">
                    {t('assistant.externalWarningTip2', 'Official government fees are statutory (₹0 or nominal). Never pay cash bribes or broker charges.')}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <Button
                variant="tertiary"
                size="md"
                onClick={() => setIsExitModalOpen(false)}
                className="w-full sm:w-auto"
              >
                {t('assistant.cancelExternal', 'Stay on Guidance Portal')}
              </Button>
              <a
                href={officialPortal?.portalUrl || 'https://www.india.gov.in'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsExitModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#2457A6] hover:bg-[#1A4280] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 stroke-[2]" />
                <span>{t('assistant.proceedToExternal', 'Proceed to Official Portal')}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuidedStepsPage;
