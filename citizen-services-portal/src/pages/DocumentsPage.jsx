import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Printer,
  Headphones,
  ShieldCheck
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
import { AudioGuideButton } from '../components/voice/AudioGuideButton';
import { DocumentPreparationChecklist } from '../components/documents/DocumentPreparationChecklist';

export function DocumentsPage({ onSpeak }) {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const currentLang = (i18n?.language || t('common.langCode', 'en')).slice(0, 2).toLowerCase();
  const currentService = servicesData.find((s) => s.id === id) || servicesData[0];
  const serviceId = currentService.id;
  const translated = getServiceTranslation(currentService, t, currentLang);

  const [progressState, setProgressState] = useState({
    total: currentService.documentDetails?.length || 4,
    prepared: 0,
    remaining: currentService.documentDetails?.length || 4,
    percent: 0,
    allReady: false,
  });

  const spokenDocs = `${t('documents.title', 'Documents required for')} ${translated.title || currentService.title}: ${(currentService.documentDetails || []).map((d) => d.name).join(', ')}`;

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-8">
      <PageContainer className="space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('nav.services', 'Services'), to: '/services' },
            { label: translated.title || currentService.title, to: `/services/${serviceId}` },
            { label: t('documents.title', 'Required Documents') },
          ]}
        />

        {/* Header and Service Switcher */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EAF0] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#168C83] bg-[#F0FAF9] border border-teal-200/80 px-2.5 py-1 rounded">
                {t('documents.badge', 'Official Paperwork Checklist')}
              </span>
              <span className="text-xs text-[#667085] flex items-center gap-1">
                <Printer className="w-3.5 h-3.5" />
                <span>{t('documents.subtitle', 'Keep photocopies ready')}</span>
              </span>
            </div>

            <AudioGuideButton
              id={`docs-all-${serviceId}`}
              title={`${translated.title || currentService.title}: ${t('documents.title', 'Documents')}`}
              text={spokenDocs}
              label={t('voice.listenDocuments', 'Listen to Document Checklist')}
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2457A6]">
              {t('popular.docsRequired', 'Documents Needed for:')}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Heading1 className="text-2xl text-[#202938]">
                {translated.title || currentService.title}
              </Heading1>

              {/* Service Switcher Dropdown */}
              <div className="w-full sm:w-72">
                <select
                  value={serviceId}
                  onChange={(e) => navigate(`/services/${e.target.value}/documents`)}
                  className="w-full text-xs font-semibold bg-[#F7F9FC] border border-[#E5EAF0] rounded-lg px-3 py-2 text-[#202938] focus:border-[#2457A6] focus:outline-none cursor-pointer"
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
              {t(
                'documents.subtitle',
                'Tap each item below as you photocopy or prepare it. Having complete paperwork avoids repeat trips to the government office.'
              )}
            </BodySecondary>
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
              <span className="text-xs font-bold text-[#667085] block">
                {t('common.step', 'Step')} 1: {t('howItWorks.step2Title', 'Eligibility')}
              </span>
              <span className="text-[11px] text-[#667085]">{t('eligibility.badge', 'Verified parameters')}</span>
            </div>
          </Link>

          <div className="p-3.5 rounded-lg border border-[#2457A6] bg-white shadow-2xs flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-md bg-[#2457A6] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              2
            </span>
            <div>
              <span className="text-xs font-bold text-[#202938] block">
                {t('common.step', 'Step')} 2: {t('howItWorks.step3Title', 'Documents')}
              </span>
              <span className="text-[11px] text-[#2457A6] font-semibold">
                {progressState.prepared} of {progressState.total} Prepared ({progressState.percent}%)
              </span>
            </div>
          </div>

          <Link
            to={`/services/${serviceId}/guidance`}
            className="p-3.5 rounded-lg border border-[#E5EAF0] bg-white hover:border-[#2457A6]/40 transition-colors flex items-center gap-2.5"
          >
            <span className="w-7 h-7 rounded-md bg-[#F7F9FC] border border-[#E5EAF0] text-[#667085] flex items-center justify-center font-bold text-xs flex-shrink-0">
              3
            </span>
            <div>
              <span className="text-xs font-bold text-[#667085] block">
                {t('common.step', 'Step')} 3: {t('howItWorks.step4Title', 'Instructions')}
              </span>
              <span className="text-[11px] text-[#667085]">{t('guidance.badge', 'Submission steps')}</span>
            </div>
          </Link>
        </div>

        {/* =========================================================================
            PROFESSIONAL DOCUMENT PREPARATION CHECKLIST COMPONENT
        ========================================================================== */}
        <DocumentPreparationChecklist
          service={currentService}
          onProgressChange={setProgressState}
        />

        {/* Navigation Buttons: Back and Continue */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5EAF0]">
          <Link to={`/services/${serviceId}/eligibility`}>
            <Button variant="tertiary" size="md">
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
              <span>{t('documents.btnBackToEligibility', 'Back to Eligibility Checker')}</span>
            </Button>
          </Link>

          <Link to={`/services/${serviceId}/guidance`}>
            <Button variant="primary" size="md">
              <span>{t('documents.btnToGuidance', 'Continue to Step-by-Step Guidance')}</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </Button>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}

export default DocumentsPage;
