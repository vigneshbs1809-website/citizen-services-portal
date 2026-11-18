import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Headphones,
  Clock,
  CheckCircle,
  FileText,
  IdCard,
  Wallet,
  GraduationCap
} from 'lucide-react';
import {
  PageContainer,
  PageHeader,
  Breadcrumbs,
  Button,
  AntiCorruptionBanner,
  Alert,
  Heading2,
  Heading3,
  BodyText,
  BodySecondary
} from '../design-system';

export function HelpAssistancePage() {
  const { t } = useTranslation();

  const helplines = [
    {
      title: t('help.helplineTitle', 'National Citizen Public Services Helpline'),
      number: '1800-111-222',
      timing: '8:00 AM – 8:00 PM (Monday to Sunday)',
      description: 'General public queries, status tracking, certificate issuance inquiries, and portal navigation assistance.',
      category: 'General Public Assistance',
      icon: <Headphones className="w-5 h-5 stroke-[2] text-[#2457A6]" />,
    },
    {
      title: 'Senior Citizen Elderline Support',
      number: '14567',
      timing: '24 Hours Open (Toll-Free)',
      description: 'Dedicated support for elderly citizens, pension release verification, healthcare access, and legal assistance.',
      category: 'Senior Citizen Support',
      icon: <Wallet className="w-5 h-5 stroke-[2] text-[#168C83]" />,
    },
    {
      title: 'Kisan Call Center (Agriculture & Farmer Aid)',
      number: '1551',
      timing: '6:00 AM – 10:00 PM',
      description: 'PM-Kisan installment status, agricultural subsidies, crop insurance claims, and village outreach.',
      category: 'Farmer Support',
      icon: <FileText className="w-5 h-5 stroke-[2] text-[#2457A6]" />,
    },
    {
      title: 'National Health Authority (PM-JAY)',
      number: '14555',
      timing: '24 Hours Open (Toll-Free)',
      description: 'Ayushman card verification, cashless hospital admission inquiries, and network hospital directory.',
      category: 'Healthcare Access',
      icon: <IdCard className="w-5 h-5 stroke-[2] text-[#168C83]" />,
    },
  ];

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-8">
      <PageContainer className="space-y-8">
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('nav.help', 'Help and Support') },
          ]}
        />

        {/* Page Header */}
        <PageHeader
          badge={t('help.badge', 'Official Public Helplines')}
          title={t('help.title', 'Citizen Helpdesks & Physical Assistance Centers')}
          description={t('help.subtitle', 'Access free government telephone assistance, find village seva centers, or report grievances without any service charges.')}
          backTo="/"
          backLabel={t('common.back', 'Back to Home')}
        />

        {/* Toll-Free Helplines Grid */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
              Telephone Assistance
            </span>
            <Heading2>{t('help.helplineTitle', 'Official Toll-Free Helplines')}</Heading2>
            <BodySecondary>
              {t('help.helplineDesc', 'Calls to all numbers listed below are free from any mobile or landline network.')}
            </BodySecondary>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {helplines.map((line, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#2457A6]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center">
                        {line.icon}
                      </div>
                      <span className="text-xs font-semibold text-[#168C83] bg-[#F0FAF9] border border-teal-200/80 px-2.5 py-0.5 rounded">
                        {line.category}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#168C83] uppercase tracking-wide">
                      {t('common.freeOfCost', 'Toll-Free')}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <Heading3 className="text-base text-[#202938]">{line.title}</Heading3>
                    <BodySecondary className="line-clamp-2">{line.description}</BodySecondary>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#667085]">
                    <Clock className="w-3.5 h-3.5 stroke-[1.75]" />
                    <span>{line.timing}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5EAF0] flex items-center justify-between">
                  <span className="text-xl font-extrabold text-[#2457A6] tracking-wide font-mono">
                    {line.number}
                  </span>
                  <a
                    href={`tel:${line.number.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2457A6] text-white text-xs font-semibold hover:bg-[#1d4685] transition-colors min-h-[36px]"
                  >
                    <Headphones className="w-3.5 h-3.5 stroke-[2]" />
                    <span>{t('help.callBtn', 'Call Helpline')}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Physical Assistance Centers */}
        <div className="space-y-4 pt-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C83]">
              In-Person Support
            </span>
            <Heading2>{t('help.inPersonTitle', 'Where to Get In-Person Help')}</Heading2>
            <BodySecondary>
              {t('help.subtitle', 'If you need assistance filling forms, taking passport photos, or scanning fingerprints.')}
            </BodySecondary>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-[#2457A6]">
                <FileText className="w-5 h-5 stroke-[2]" />
                <Heading3 className="text-base text-[#202938]">{t('help.panchayatTitle', 'Gram Panchayat & Block Development Office')}</Heading3>
              </div>
              <BodySecondary className="leading-relaxed">
                {t('help.panchayatDesc', 'Every village Panchayat has a designated Village Level Entrepreneur (VLE) and Panchayat Secretary to assist you with free form submissions.')}
              </BodySecondary>
            </div>

            <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-[#168C83]">
                <IdCard className="w-5 h-5 stroke-[2]" />
                <Heading3 className="text-base text-[#202938]">{t('help.cscTitle', 'Common Service Centers (CSC / Seva Kendra)')}</Heading3>
              </div>
              <BodySecondary className="leading-relaxed">
                {t('help.cscDesc', 'Located across all market centers and postal districts providing biometric fingerprint scanning, photo printing, and online form submissions at fixed nominal rates.')}
              </BodySecondary>
            </div>
          </div>
        </div>

        {/* Anti-Corruption Protection Banner */}
        <AntiCorruptionBanner />
      </PageContainer>
    </div>
  );
}

export default HelpAssistancePage;
