import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Volume2,
  HelpCircle,
  FileText,
  Clock,
  IdCard,
  ChevronRight
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

export function EligibilityPage({ onSpeak }) {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const currentLang = (i18n?.language || t('common.langCode', 'en')).slice(0, 2).toLowerCase();
  const currentService = servicesData.find((s) => s.id === id) || servicesData[0];
  const serviceId = currentService.id;
  const translated = getServiceTranslation(currentService, t, currentLang);

  const [answers, setAnswers] = useState({});

  const questions = translated.questions || currentService.eligibilityCriteria?.questions || [
    {
      id: 'residence',
      question: 'Are you a permanent resident citizen of this state/district?',
      explanation: 'Verified through local voter ID, electricity bill, or state ration card.',
      required: true,
    },
    {
      id: 'documents_ready',
      question: 'Do you hold an active Aadhaar card with updated biometric records?',
      explanation: 'Mandatory for paperless authentication and identity linkage.',
      required: true,
    },
  ];

  const handleAnswer = (qId, val) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const isEligible = questions.every((q) => !q.required || answers[q.id] === true);

  const spokenEligibility = `${translated.title || currentService.title} ${t('eligibility.title', 'eligibility requirements')}: ${questions.map((q) => q.question).join('. ')}`;

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-8">
      <PageContainer className="space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('nav.services', 'Services'), to: '/services' },
            { label: translated.title || currentService.title, to: `/services/${serviceId}` },
            { label: t('eligibility.title', 'Eligibility Checker') },
          ]}
        />

        {/* Header with Service Switcher */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EAF0] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#168C83] bg-[#F0FAF9] border border-teal-200/80 px-2.5 py-1 rounded">
                {t('eligibility.badge', 'Official Scheme Assessment')}
              </span>
              <span className="text-xs text-[#667085] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{t('eligibility.durationEstimate', 'Takes less than 1 minute')}</span>
              </span>
            </div>

            <AudioGuideButton
              id={`eligibility-all-${serviceId}`}
              title={`${translated.title || currentService.title}: ${t('eligibility.title', 'Eligibility')}`}
              text={spokenEligibility}
              label={t('voice.listenEligibility', 'Listen to Criteria')}
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2457A6]">
              {t('eligibility.badge', 'Check Eligibility for:')}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Heading1 className="text-2xl text-[#202938]">
                {translated.title || currentService.title}
              </Heading1>

              {/* Service Switcher Dropdown */}
              <div className="w-full sm:w-72">
                <select
                  value={serviceId}
                  onChange={(e) => navigate(`/services/${e.target.value}/eligibility`)}
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
              {t('eligibility.subtitle', 'Answer the standard questions below to confirm if you or your family member meets the statutory criteria. No personal data is stored.')}
            </BodySecondary>
          </div>
        </div>

        {/* Step Flow Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-lg border border-[#2457A6] bg-white shadow-2xs flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-md bg-[#2457A6] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              1
            </span>
            <div>
              <span className="text-xs font-bold text-[#202938] block">{t('common.step', 'Step')} 1: {t('howItWorks.step2Title', 'Eligibility')}</span>
              <span className="text-[11px] text-[#2457A6] font-semibold">{t('eligibility.badge', 'Active Assessment')}</span>
            </div>
          </div>

          <Link
            to={`/services/${serviceId}/documents`}
            className="p-3.5 rounded-lg border border-[#E5EAF0] bg-white hover:border-[#2457A6]/40 transition-colors flex items-center gap-2.5"
          >
            <span className="w-7 h-7 rounded-md bg-[#F7F9FC] border border-[#E5EAF0] text-[#667085] flex items-center justify-center font-bold text-xs flex-shrink-0">
              2
            </span>
            <div>
              <span className="text-xs font-bold text-[#667085] block">{t('common.step', 'Step')} 2: {t('howItWorks.step3Title', 'Documents')}</span>
              <span className="text-[11px] text-[#667085]">{t('documents.badge', 'Required photocopies')}</span>
            </div>
          </Link>

          <Link
            to={`/services/${serviceId}/guidance`}
            className="p-3.5 rounded-lg border border-[#E5EAF0] bg-white hover:border-[#2457A6]/40 transition-colors flex items-center gap-2.5"
          >
            <span className="w-7 h-7 rounded-md bg-[#F7F9FC] border border-[#E5EAF0] text-[#667085] flex items-center justify-center font-bold text-xs flex-shrink-0">
              3
            </span>
            <div>
              <span className="text-xs font-bold text-[#667085] block">{t('common.step', 'Step')} 3: {t('howItWorks.step4Title', 'Instructions')}</span>
              <span className="text-[11px] text-[#667085]">{t('guidance.badge', 'Submission steps')}</span>
            </div>
          </Link>
        </div>

        {/* Interactive Eligibility Questions */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-6">
          <div className="space-y-1 border-b border-[#E5EAF0] pb-3">
            <Heading3 className="text-base text-[#202938]">{t('eligibility.title', 'Eligibility Criteria Questions')}</Heading3>
            <BodySecondary>
              {t('eligibility.subtitle', 'Tap Yes or No for each requirement:')}
            </BodySecondary>
          </div>

          <div className="space-y-5">
            {questions.map((q, idx) => {
              const currentVal = answers[q.id];

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC] space-y-3 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
                          {t('common.step', 'Criterion')} {idx + 1}
                        </span>
                        <AudioGuideButton
                          id={`eligibility-q-${serviceId}-${q.id}`}
                          title={`${t('common.step', 'Criterion')} ${idx + 1}: ${q.question}`}
                          text={`${q.question}. ${q.explanation || ''}`}
                          label={t('popular.listenGuide', 'Listen')}
                          size="sm"
                          variant="ghost"
                        />
                      </div>
                      <h4 className="text-sm font-bold text-[#202938] leading-snug">
                        {q.question}
                      </h4>
                      {q.explanation && (
                        <p className="text-xs text-[#667085]">{q.explanation}</p>
                      )}
                    </div>

                    {/* Yes / No Pill Toggles */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleAnswer(q.id, true)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer min-h-[40px] min-w-[64px] ${
                          currentVal === true
                            ? 'bg-[#168C83] text-white border-[#168C83] shadow-2xs'
                            : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-slate-50'
                        }`}
                      >
                        {t('eligibility.yes', 'Yes')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAnswer(q.id, false)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer min-h-[40px] min-w-[64px] ${
                          currentVal === false
                            ? 'bg-slate-700 text-white border-slate-700 shadow-2xs'
                            : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-slate-50'
                        }`}
                      >
                        {t('eligibility.no', 'No')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Assessment Result Box */}
          {allAnswered && (
            <div
              className={`p-6 rounded-xl border transition-all animate-in fade-in space-y-3 ${
                isEligible
                  ? 'bg-[#F0FAF9] border-teal-300 text-[#0E5853]'
                  : 'bg-[#F7F9FC] border-[#E5EAF0] text-[#202938]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle className={`w-5 h-5 stroke-[2] flex-shrink-0 ${isEligible ? 'text-[#168C83]' : 'text-[#2457A6]'}`} />
                <span>
                  {isEligible
                    ? t('eligibility.eligibleTitle', 'You Appear Eligible for this Government Service!')
                    : t('eligibility.ineligibleTitle', 'Condition Clarification May Be Required')}
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                {isEligible
                  ? t('eligibility.eligibleDesc', 'Based on your answers, you fulfill the standard legal parameters. Click below to verify required photocopies.')
                  : t('eligibility.ineligibleDesc', 'One or more answers indicate that you might need prerequisite documentation before submitting.')}
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons: Back and Continue */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5EAF0]">
          <Link to={`/services/${serviceId}`}>
            <Button variant="tertiary" size="md">
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
              <span>{t('eligibility.btnBackToService', 'Back to Service Overview')}</span>
            </Button>
          </Link>

          <Link to={`/services/${serviceId}/documents`}>
            <Button variant="primary" size="md">
              <span>{t('eligibility.btnToDocuments', 'Continue to Required Documents')}</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </Button>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}

export default EligibilityPage;
