import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Clock,
  CheckCircle,
  Volume2,
  ArrowLeft,
  ArrowRight,
  FileText,
  Headphones,
  Printer,
  ShieldCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import {
  PageContainer,
  Breadcrumbs,
  Button,
  DocumentChecklist,
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
import { getServiceById } from '../services/api';
import { useStateContext } from '../context/StateContext';
import { ExternalLinkModal } from '../components/common/ExternalLinkModal';
import { getOfficialPortal } from '../utilities/portalLinks';
import { Bookmark, MapPin, ExternalLink, Building2 } from 'lucide-react';

export function ServiceDetailPage({ onSpeak }) {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const currentLang = (i18n?.language || 'en').slice(0, 2).toLowerCase();
  const [service, setService] = useState(() => servicesData.find((s) => s.id === id));

  const {
    selectedState,
    selectedDistrict,
    addRecentService,
    toggleFavourite,
    isFavourite,
    getStateServicePortal
  } = useStateContext();

  const [modalLink, setModalLink] = useState(null);

  const statePortalInfo = (selectedState && service && typeof getStateServicePortal === 'function')
    ? getStateServicePortal(service.id)
    : null;

  const nationalPortal = service ? getOfficialPortal(service.id) : null;

  useEffect(() => {
    let isMounted = true;
    getServiceById(id, currentLang).then((res) => {
      if (isMounted && res) {
        setService(res);
      }
    });
    return () => { isMounted = false; };
  }, [id, currentLang]);

  useEffect(() => {
    if (service) {
      addRecentService(service);
    }
  }, [service, addRecentService]);

  if (!service) {
    return (
      <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-12">
        <PageContainer className="text-center space-y-4">
          <Heading1>{t('errors.pageNotFoundTitle', 'Service Not Found')}</Heading1>
          <BodySecondary>{t('errors.pageNotFoundDesc', 'The requested public service does not exist or has been relocated.')}</BodySecondary>
          <div className="pt-2">
            <Link to="/services">
              <Button variant="primary" size="md">
                {t('errors.browseServices', 'Return to All Services')}
              </Button>
            </Link>
          </div>
        </PageContainer>
      </div>
    );
  }

  const translated = getServiceTranslation(service, t);
  const spokenText = `${translated.title}. ${t('common.officialFee', 'Official government fee')}: ${translated.officialFee}. ${t('common.processingTime', 'Estimated processing time')}: ${translated.processingTime}. ${translated.spokenSummary}`;

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-8">
      <PageContainer className="space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('nav.services', 'Services'), to: '/services' },
            { label: translated.title || service.title },
          ]}
        />

        {/* Hero Card for Service */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 md:p-8 space-y-6 shadow-2xs">
          {/* Metadata Badges & Audio Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5EAF0] pb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#168C83] bg-[#F0FAF9] border border-teal-200/80 px-3 py-1.5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-[#168C83] stroke-[2]" />
                <span>{t('common.officialFee', 'Official Fee')}: {translated.officialFee || service.officialFee}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-[#667085] font-medium bg-[#F7F9FC] border border-[#E5EAF0] px-3 py-1.5 rounded-lg">
                <Clock className="w-4 h-4 text-[#667085] stroke-[1.75]" />
                <span>{t('common.processingTime', 'Timeline')}: {translated.processingTime || service.processingTime}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleFavourite(service.id)}
                className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${isFavourite(service.id)
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-[#F7F9FC] text-[#667085] border-[#E5EAF0] hover:text-[#202938]'
                  }`}
                title={isFavourite(service.id) ? 'Remove from Saved' : 'Save / Bookmark Service'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isFavourite(service.id) ? 'fill-amber-500 text-amber-600' : ''}`} />
                <span>{isFavourite(service.id) ? 'Bookmarked' : 'Bookmark'}</span>
              </button>

              <AudioGuideButton
                id={`service-summary-${service.id}`}
                title={`${translated.title || service.title}: ${t('popular.listenGuide', 'Summary')}`}
                text={spokenText}
                label={t('voice.listenServiceDesc', 'Listen to Summary')}
              />
            </div>
          </div>

          {/* Service Title & Detailed Description */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2457A6]">
              {t('common.officialInitiative', 'Verified Public Scheme')}
            </span>
            <Heading1>{translated.title || service.title}</Heading1>
            <BodyText className="max-w-3xl leading-relaxed text-sm sm:text-base">
              {translated.shortDescription || service.shortDescription}
            </BodyText>
          </div>

          {/* Entitlement Banner if Available */}
          {(translated.benefitAmount || service.benefitAmount) && (
            <div className="bg-[#F7F9FC] border border-[#E5EAF0] rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#2457A6] flex-shrink-0 stroke-[2]" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6] block">
                  {t('common.entitlement', 'Official Citizen Entitlement')}
                </span>
                <span className="text-sm font-semibold text-[#202938]">
                  {translated.benefitAmount || service.benefitAmount}
                </span>
              </div>
            </div>
          )}

          {/* Official Government Gateways (National and State) */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2457A6] block">
              Official Government Application Websites
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* National Government Portal Gateway */}
              {nationalPortal && (
                <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200/90 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2457A6] bg-white px-2 py-0.5 rounded border border-blue-200">
                        Central / National Portal
                      </span>
                      <span className="text-[10px] text-[#168C83] font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified .gov.in
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#202938]">
                      {nationalPortal.name}
                    </h4>
                    <p className="text-xs text-[#667085]">
                      {nationalPortal.department}
                    </p>
                    <p className="text-[11px] font-mono text-[#2457A6]">
                      {nationalPortal.domain}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={nationalPortal.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-[#2457A6] hover:bg-[#1A4280] text-white text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-2xs"
                    >
                      <span>Open National Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2]" />
                    </a>
                  </div>
                </div>
              )}

              {/* State-Specific Official Portal Action Box */}
              {selectedState ? (
                <div className="p-5 rounded-xl bg-teal-50/70 border border-teal-200/80 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E5853] bg-white px-2 py-0.5 rounded border border-teal-200">
                        {selectedState.name} State Gateway
                      </span>
                      <span className="text-[10px] text-[#168C83] font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Official
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#202938]">
                      {statePortalInfo ? statePortalInfo.portalName : selectedState.servicePortal}
                    </h4>
                    <p className="text-xs text-[#667085]">
                      {statePortalInfo ? statePortalInfo.department : `Government of ${selectedState.name}`} • Offline: {statePortalInfo?.offlineCenter || 'Nearest Grama One / CSC / Revenue Desk'}
                    </p>
                    <p className="text-[11px] font-mono text-[#168C83]">
                      {(statePortalInfo?.portalUrl || selectedState.servicePortalUrl || '').replace(/^https?:\/\//, '')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={statePortalInfo ? statePortalInfo.portalUrl : selectedState.servicePortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-[#168C83] hover:bg-[#0E5853] text-white text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-2xs"
                    >
                      <span>Apply on {selectedState.code} Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2]" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085] bg-white px-2 py-0.5 rounded border border-[#E5EAF0]">
                      State Specific Gateway
                    </span>
                    <h4 className="text-sm font-bold text-[#202938]">
                      Regional E-Governance Portal
                    </h4>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Select your state to discover your state e-governance application portal (e.g. Seva Sindhu, e-Sevai, MeeSeva, Aaple Sarkar, e-District).
                    </p>
                  </div>

                  <div className="pt-1">
                    <Link
                      to="/select-state"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#2457A6] text-[#2457A6] hover:bg-blue-50/50 text-xs font-bold transition-all"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Choose Your State →</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3 Step Action Pathways */}
        <div className="space-y-3">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
              {t('howItWorks.title', 'Application Workflow')}
            </span>
            <Heading2 className="text-xl text-[#202938]">{t('howItWorks.title', '3 Steps to Complete Your Application')}</Heading2>
            <BodySecondary>
              {t('howItWorks.subtitle', 'We recommend completing all three stages in order:')}
            </BodySecondary>
          </div>

          {/* Interactive Guidance Assistant Shortcut Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#F0FAF9] border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#168C83] text-white flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-[#0E5853]">
                  Interactive Citizen Guidance Assistant Available
                </h4>
                <p className="text-xs text-[#168C83]">
                  Walk through all 6 steps with audio assistance, verified checklists, and official portal access.
                </p>
              </div>
            </div>
            <Link to={`/assistant/${service.id}`} className="w-full sm:w-auto">
              <Button variant="primary" size="sm" className="w-full sm:w-auto">
                Launch Assistant for this Service →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* Step 1: Eligibility */}
            <Link
              to={`/services/${service.id}/eligibility`}
              className="p-5 rounded-xl border border-[#E5EAF0] bg-white hover:border-[#2457A6] hover:shadow-xs transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-[#2457A6] text-white flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#667085] group-hover:text-[#2457A6] group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202938]">{t('howItWorks.step2Title', 'Check Eligibility')}</h3>
                  <p className="text-xs text-[#667085] mt-1">
                    {t('howItWorks.step2Desc', 'Answer quick questions on residency, age, or income criteria.')}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2457A6] group-hover:underline inline-flex items-center gap-1">
                <span>{t('eligibility.badge', 'Start Assessment')}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </span>
            </Link>

            {/* Step 2: Documents */}
            <Link
              to={`/services/${service.id}/documents`}
              className="p-5 rounded-xl border border-[#E5EAF0] bg-white hover:border-[#168C83] hover:shadow-xs transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-[#168C83] text-white flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#667085] group-hover:text-[#168C83] group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202938]">{t('howItWorks.step3Title', 'Required Documents')}</h3>
                  <p className="text-xs text-[#667085] mt-1">
                    {t('howItWorks.step3Desc', 'Check off required photocopies before visiting.')}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#168C83] group-hover:underline inline-flex items-center gap-1">
                <span>{t('documents.badge', 'View Checklist')}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </span>
            </Link>

            {/* Step 3: Instructions */}
            <Link
              to={`/services/${service.id}/guidance`}
              className="p-5 rounded-xl border border-[#E5EAF0] bg-white hover:border-[#2457A6] hover:shadow-xs transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-[#2457A6] text-white flex items-center justify-center font-bold text-sm">
                    3
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#667085] group-hover:text-[#2457A6] group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202938]">{t('howItWorks.step4Title', 'Step-by-Step Guidance')}</h3>
                  <p className="text-xs text-[#667085] mt-1">
                    {t('howItWorks.step4Desc', 'Follow sequential instructions for submission.')}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2457A6] group-hover:underline inline-flex items-center gap-1">
                <span>{t('guidance.badge', 'Read Guidance')}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </span>
            </Link>
          </div>
        </div>

        {/* Two-Column Grid: Documents Summary & Process Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          {/* Left Column: Required Documents */}
          <div className="lg:col-span-5 space-y-6">
            <DocumentChecklist
              title={t('popular.docsRequired', 'Documents At a Glance')}
              subtitle={t('documents.subtitle', 'Keep these photocopies ready before visiting the center')}
              documents={translated.requiredDocuments || service.requiredDocuments}
              interactive={true}
            />

            {/* Assistance Helpline */}
            <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-[#168C83]">
                <Headphones className="w-5 h-5 stroke-[2]" />
                <Heading3 className="text-sm text-[#202938]">{t('help.badge', 'Need In-Person Support?')}</Heading3>
              </div>
              <BodySecondary>
                {t('help.panchayatDesc', 'Visit your nearest Gram Panchayat office or Call the free Citizen Helpline at 1800-111-222.')}
              </BodySecondary>
            </div>

            {/* Plain Language Terminology Helper */}
            <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-[#2457A6]">
                <BookOpen className="w-5 h-5 stroke-[2]" />
                <Heading3 className="text-sm text-[#202938]">
                  {t('terminology.title', 'Confused by Legal Words?')}
                </Heading3>
              </div>
              <BodySecondary>
                {t('terminology.subtitle', 'Understand complex bureaucratic clauses like "prescribed documents", "attestation", and "statutory affidavit" with plain language explanations.')}
              </BodySecondary>
              <div className="pt-1">
                <Link
                  to="/glossary"
                  className="text-xs font-bold text-[#2457A6] hover:underline inline-flex items-center gap-1"
                >
                  <span>{t('terminology.title', 'Open Plain Language Dictionary')}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Instructions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
              <div className="border-b border-[#E5EAF0] pb-3 space-y-1">
                <Heading3 className="text-base text-[#202938]">{t('guidance.title', 'Overview of Application Steps')}</Heading3>
                <BodySecondary>
                  {t('guidance.subtitle', 'Standard process for citizen applications:')}
                </BodySecondary>
              </div>

              <VerticalStepGuide steps={translated.simpleSteps || service.simpleSteps} />
            </div>

            {/* Anti-Corruption Protection Notice */}
            <AntiCorruptionBanner />
          </div>
        </div>

        {/* Back and Next Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5EAF0]">
          <Link to="/services">
            <Button variant="tertiary" size="md">
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
              <span>{t('errors.browseServices', 'Back to All Services')}</span>
            </Button>
          </Link>

          <Link to={`/services/${service.id}/eligibility`}>
            <Button variant="primary" size="md">
              <span>{t('eligibility.btnToDocuments', 'Start With Eligibility Check')}</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </Button>
          </Link>
        </div>

        {/* Official Government External Link Modal */}
        {modalLink && (
          <ExternalLinkModal
            isOpen={Boolean(modalLink)}
            onClose={() => setModalLink(null)}
            portalName={modalLink.name}
            portalUrl={modalLink.url}
            department={modalLink.department}
            verificationStatus="verified"
            lastVerified={selectedState?.lastVerified || '2026-11-18'}
          />
        )}
      </PageContainer>
    </div>
  );
}

export default ServiceDetailPage;
