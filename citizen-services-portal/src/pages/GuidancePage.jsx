import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Volume2,
  Clock,
  Printer,
  Headphones,
  Building2,
  ShieldCheck
} from 'lucide-react';
import {
  PageContainer,
  Breadcrumbs,
  Button,
  VerticalStepGuide,
  AntiCorruptionBanner,
  Heading1,
  Heading2,
  Heading3,
  BodyText,
  BodySecondary
} from '../design-system';
import { servicesData } from '../data/servicesData';
import { getServiceTranslation } from '../utilities/serviceTranslation';
import { AudioGuideButton } from '../components/voice/AudioGuideButton';

export function GuidancePage({ onSpeak }) {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const currentLang = (i18n?.language || t('common.langCode', 'en')).slice(0, 2).toLowerCase();
  const currentService = servicesData.find((s) => s.id === id) || servicesData[0];
  const serviceId = currentService.id;
  const translated = getServiceTranslation(currentService, t, currentLang);
  const steps = translated.simpleSteps || currentService.simpleSteps || [];

  const spokenGuidance = `${t('guidance.title', 'How to apply for')} ${translated.title || currentService.title}: ${steps.map((s) => `${t('common.step', 'Step')} ${s.stepNumber}: ${s.title}. ${s.instruction}`).join('. ')}`;

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-8">
      <PageContainer className="space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('nav.services', 'Services'), to: '/services' },
            { label: translated.title || currentService.title, to: `/services/${serviceId}` },
            { label: t('guidance.title', 'Step-by-Step Guidance') },
          ]}
        />

        {/* Header with Service Switcher */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EAF0] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#168C83] bg-[#F0FAF9] border border-teal-200/80 px-2.5 py-1 rounded">
                {t('guidance.badge', 'Official Application Instructions')}
              </span>
              <span className="text-xs text-[#667085] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{t('common.processingTime', 'Estimated processing')}: {translated.processingTime || currentService.processingTime}</span>
              </span>
            </div>

            <AudioGuideButton
              id={`guidance-all-${serviceId}`}
              title={`${translated.title || currentService.title}: ${t('guidance.title', 'Instructions')}`}
              text={spokenGuidance}
              label={t('voice.listenAllSteps', 'Listen to All Application Steps')}
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2457A6]">
              {t('guidance.badge', 'Application Guidance for:')}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Heading1 className="text-2xl text-[#202938]">
                {translated.title || currentService.title}
              </Heading1>

              {/* Service Switcher Dropdown */}
              <div className="w-full sm:w-72">
                <select
                  value={serviceId}
                  onChange={(e) => navigate(`/services/${e.target.value}/guidance`)}
                  className="w-full text-xs font-semibold bg-[#F7F9FC] border border-[#E5EAF0] rounded-lg px-3 py-2 text-[#202938] focus:border-[#2457A6] focus:outline-none"
                  aria-label="Select public service"
                >
                  {servicesData.map((s) => {
                    const trans = getServiceTranslation(s, t);
                    return (
                      <option key={s.id} value={s.id}>
                        {trans.title || s.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <BodySecondary className="max-w-3xl leading-relaxed">
              {t('guidance.subtitle', 'Follow these simple sequential steps to submit your application at your nearest Gram Panchayat, CSC Seva Kendra, or online portal.')}
            </BodySecondary>
          </div>

          {/* Interactive Assistant Shortcut Banner */}
          <div className="p-4 rounded-xl bg-[#EEF3FA] border border-[#2457A6]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#2457A6] text-white flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-[#2457A6]">
                  {t('assistant.title', 'Step-by-Step Citizen Guidance Assistant')}
                </h4>
                <p className="text-xs text-[#667085]">
                  Need interactive guidance? Follow our 6-step walkthrough with audio instructions and document checks.
                </p>
              </div>
            </div>
            <Link to={`/assistant/${serviceId}`}>
              <Button variant="primary" size="sm" className="whitespace-nowrap">
                Open Guidance Assistant →
              </Button>
            </Link>
          </div>
        </div>

        {/* Step Flow Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to={`/services/${serviceId}/eligibility`}
            className="p-3.5 rounded-lg border border-[#E5EAF0] bg-white hover:border-[#2457A6]/40 transition-colors flex items-center gap-2.5"
          >
            <span className="w-7 h-7 rounded-md bg-[#F7F9FC] border border-[#E5EAF0] text-[#667085] flex items-center justify-center font-bold text-xs flex-shrink-0">
              1
            </span>
            <div>
              <span className="text-xs font-bold text-[#667085] block">{t('common.step', 'Step')} 1: {t('howItWorks.step2Title', 'Eligibility')}</span>
              <span className="text-[11px] text-[#667085]">{t('eligibility.badge', 'Verified parameters')}</span>
            </div>
          </Link>

          <Link
            to={`/services/${serviceId}/documents`}
            className="p-3.5 rounded-lg border border-[#E5EAF0] bg-white hover:border-[#2457A6]/40 transition-colors flex items-center gap-2.5"
          >
            <span className="w-7 h-7 rounded-md bg-[#F7F9FC] border border-[#E5EAF0] text-[#667085] flex items-center justify-center font-bold text-xs flex-shrink-0">
              2
            </span>
            <div>
              <span className="text-xs font-bold text-[#667085] block">{t('common.step', 'Step')} 2: {t('howItWorks.step3Title', 'Documents')}</span>
              <span className="text-[11px] text-[#667085]">{t('documents.badge', 'Prepared photocopies')}</span>
            </div>
          </Link>

          <div className="p-3.5 rounded-lg border border-[#2457A6] bg-white shadow-2xs flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-md bg-[#2457A6] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              3
            </span>
            <div>
              <span className="text-xs font-bold text-[#202938] block">{t('common.step', 'Step')} 3: {t('howItWorks.step4Title', 'Instructions')}</span>
              <span className="text-[11px] text-[#2457A6] font-semibold">{t('guidance.badge', 'Active Application Guide')}</span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Instructions Card */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 md:p-8 shadow-2xs space-y-6">
          <div className="border-b border-[#E5EAF0] pb-4 flex items-center justify-between flex-wrap gap-2">
            <div>
              <Heading3 className="text-base text-[#202938]">{t('guidance.title', 'Sequential Application Instructions')}</Heading3>
              <BodySecondary>{t('guidance.subtitle', 'Carry your verified document photocopies and complete each step in order:')}</BodySecondary>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded bg-[#F0FAF9] border border-teal-200/80 text-[#168C83]">
              {t('common.officialFee', 'Official Fee')}: {translated.officialFee || currentService.officialFee}
            </span>
          </div>

          <VerticalStepGuide steps={steps} serviceId={serviceId} />
        </div>

        {/* Helpful Tips for First-Time Users */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-[#E5EAF0] bg-white shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-[#2457A6]">
              <Printer className="w-4 h-4 stroke-[2]" />
              <h4 className="text-sm font-bold text-[#202938]">{t('guidance.receiptTipTitle', 'Keep Acknowledgement Receipt Safe')}</h4>
            </div>
            <p className="text-xs text-[#667085] leading-relaxed">
              {t('guidance.receiptTipDesc', 'When you submit your application at the counter, the operator must give you a computer-printed receipt with an Application Reference Number.')}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#E5EAF0] bg-white shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-[#168C83]">
              <Building2 className="w-4 h-4 stroke-[2]" />
              <h4 className="text-sm font-bold text-[#202938]">{t('guidance.feeTipTitle', 'No Extra Commissions')}</h4>
            </div>
            <p className="text-xs text-[#667085] leading-relaxed">
              {t('guidance.feeTipDesc', 'The statutory government fee for this service is strictly nominal or free. Operators are forbidden by law from asking for extra fees.')}
            </p>
          </div>
        </div>

        {/* Anti-Corruption Protection Banner */}
        <AntiCorruptionBanner />

        {/* Navigation Buttons: Back and Return to Home / Services */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5EAF0]">
          <Link to={`/services/${serviceId}/documents`}>
            <Button variant="tertiary" size="md">
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
              <span>{t('guidance.btnBackToDocs', 'Back to Required Documents')}</span>
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/services">
              <Button variant="tertiary" size="md">
                <span>{t('guidance.btnBrowseOther', 'Browse Other Services')}</span>
              </Button>
            </Link>
            <Link to="/">
              <Button variant="primary" size="md">
                <span>{t('guidance.btnReturnHome', 'Return to Home Dashboard')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default GuidancePage;
