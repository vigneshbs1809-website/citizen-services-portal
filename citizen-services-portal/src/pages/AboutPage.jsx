import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  Volume2,
  Accessibility,
  Eye,
  FileText,
  Building2
} from 'lucide-react';
import {
  PageContainer,
  Breadcrumbs,
  Button,
  AntiCorruptionBanner,
  Heading1,
  Heading2,
  Heading3,
  BodyText,
  BodySecondary
} from '../design-system';

export function AboutPage() {
  const { t } = useTranslation();

  const principles = [
    {
      title: 'Plain-Language Scaffolding',
      desc: 'Government schemes are traditionally written in dense bureaucratic and legal terminology. This portal translates eligibility conditions and guidelines into simple, easy-to-understand conversational language.',
      icon: <FileText className="w-5 h-5 text-[#2457A6] stroke-[2]" />,
    },
    {
      title: 'Multilingual Audio Guidance',
      desc: 'Non-literate citizens and seniors can press the "Listen" button on any scheme to hear instructions read aloud in their native mother tongue (English, Hindi, Kannada, Telugu, Tamil, or Malayalam).',
      icon: <Volume2 className="w-5 h-5 text-[#168C83] stroke-[2]" />,
    },
    {
      title: 'Radical Fee Transparency',
      desc: 'Middlemen frequently deceive vulnerable rural citizens into paying thousands of rupees for welfare schemes that are legally 100% free. Every service card prominently displays the official statutory fee (₹0 or ₹15).',
      icon: <ShieldCheck className="w-5 h-5 text-[#2457A6] stroke-[2]" />,
    },
    {
      title: 'Accessibility & Elderly Ergonomics',
      desc: 'All interactive tap targets exceed 44px for unsteady hands. High contrast mode and scalable font sizes (A, A+, A++) meet WCAG 2.1 Level AA and Indian GIGW standards.',
      icon: <Accessibility className="w-5 h-5 text-[#168C83] stroke-[2]" />,
    },
  ];

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-8">
      <PageContainer className="space-y-8 max-w-4xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('about.title', 'About Citizen Portal') },
          ]}
        />

        {/* Page Header */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 md:p-8 shadow-2xs space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FAF9] border border-teal-200/80 text-xs font-semibold text-[#168C83]">
            <Building2 className="w-4 h-4 stroke-[2]" />
            <span>{t('about.badge', 'Public Digital Infrastructure Initiative')}</span>
          </div>

          <Heading1 className="text-2xl sm:text-3xl text-[#202938]">
            {t('about.title', 'About the Citizen Services Portal')}
          </Heading1>

          <BodySecondary className="max-w-2xl text-sm sm:text-base leading-relaxed">
            {t('about.subtitle', 'A public portal engineered to bridge the digital divide for first-time internet users, elderly citizens, rural families, and people with low literacy.')}
          </BodySecondary>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 md:p-8 shadow-2xs space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
            Our Mission
          </span>
          <Heading2 className="text-xl text-[#202938]">
            {t('about.missionTitle', 'Democratizing Access to Government Welfare')}
          </Heading2>
          <BodyText className="leading-relaxed">
            {t('about.missionDesc', 'Every citizen has a constitutional right to public services—whether it is an old-age pension, food ration security, educational scholarships, or disability allowance.')}
          </BodyText>
          <BodyText className="leading-relaxed">
            This portal serves as an accessible bridge. We break down bureaucratic barriers by providing clear eligibility checks, interactive photocopy checklists, and voice instructions in 6 regional languages.
          </BodyText>
        </div>

        {/* Core HCI Design Principles */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
              Human-Centered Design (HCI)
            </span>
            <Heading2 className="text-xl text-[#202938]">{t('about.principlesTitle', 'Design Principles for Low-Literacy Citizens')}</Heading2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center">
                  {p.icon}
                </div>
                <Heading3 className="text-base text-[#202938]">{p.title}</Heading3>
                <BodySecondary className="leading-relaxed">{p.desc}</BodySecondary>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-Corruption Commitment */}
        <AntiCorruptionBanner />

        {/* Standards & Compliance */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-3">
          <Heading3 className="text-base text-[#202938]">{t('about.standardsTitle', 'Official Standards & Compliance')}</Heading3>
          <ul className="text-xs text-[#667085] space-y-2 list-disc list-inside">
            <li><strong>Guidelines for Indian Government Websites (GIGW):</strong> Level 2 compliance for bilingual layouts and accessible navigation.</li>
            <li><strong>W3C Web Content Accessibility Guidelines (WCAG 2.1 AA):</strong> Color contrast ratio exceeding 4.5:1, keyboard navigable, screen reader compatible.</li>
            <li><strong>Data Privacy & Security:</strong> No tracking cookies, no personal data harvesting, and no unauthorized third-party scripts.</li>
          </ul>
        </div>

        {/* Back to Home Button */}
        <div className="pt-4 border-t border-[#E5EAF0]">
          <Link to="/">
            <Button variant="tertiary" size="md">
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
              <span>{t('errors.returnHome', 'Back to Home Dashboard')}</span>
            </Button>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}

export default AboutPage;
