import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Landmark, Phone, ShieldCheck, ExternalLink, Languages, Accessibility, BookOpen } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#F7F9FC] border-t border-[#E5EAF0] text-[#202938] mt-auto">
      {/* Upper Citizen Helpline Bar */}
      <div className="bg-[#2457A6] text-white py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-100 uppercase tracking-wider">
                {t('footer.helplineBarTitle', 'Toll-Free Citizen Assistance Center')}
              </p>
              <p className="text-sm font-bold">
                {t('footer.helplineBarDesc', '1800-111-222 • Available in English, Hindi, Kannada, Telugu, Tamil & Malayalam')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-white/15 px-3 py-1 rounded-md font-medium text-white">
              {t('footer.timing', '8:00 AM – 8:00 PM • Zero Toll Charges')}
            </span>
          </div>
        </div>
      </div>

      {/* Main 5-Column Navigation Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: About Citizen Services Portal */}
          <div className="lg:col-span-2 space-y-3.5 pr-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2457A6] flex items-center justify-center text-white">
                <Landmark className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-[#202938] tracking-tight">
                {t('common.portalTitle', 'Citizen Services Portal')}
              </span>
            </div>
            <p className="text-xs text-[#667085] leading-relaxed">
              {t('footer.portalDesc', 'An official public initiative to make government schemes and citizen services universally understandable and accessible for first-time internet users, seniors, and rural families.')}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#168C83] font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Compliant with Indian Government Web Accessibility Guidelines (GIGW)</span>
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#202938]">
              {t('footer.keyServicesTitle', 'Key Services')}
            </h4>
            <ul className="space-y-2 text-xs text-[#667085]">
              <li>
                <Link to="/services/income-certificate" className="hover:text-[#2457A6] transition-colors">
                  {t('services.incomeCertificate.title', 'Income Certificate')}
                </Link>
              </li>
              <li>
                <Link to="/services/caste-certificate" className="hover:text-[#2457A6] transition-colors">
                  {t('services.casteCertificate.title', 'Caste Certificate')}
                </Link>
              </li>
              <li>
                <Link to="/services/residence-certificate" className="hover:text-[#2457A6] transition-colors">
                  {t('services.residenceCertificate.title', 'Residence Certificate')}
                </Link>
              </li>
              <li>
                <Link to="/services/scholarship-guidance" className="hover:text-[#2457A6] transition-colors">
                  {t('services.scholarshipGuidance.title', 'Scholarship Guidance')}
                </Link>
              </li>
              <li>
                <Link to="/services/pension-guidance" className="hover:text-[#2457A6] transition-colors">
                  {t('services.pensionGuidance.title', 'Pension Guidance')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#2457A6] font-semibold hover:underline">
                  {t('search.title', 'View All Services')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Navigation & Guidance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#202938]">
              {t('footer.navigationTitle', 'Portal Navigation')}
            </h4>
            <ul className="space-y-2 text-xs text-[#667085]">
              <li>
                <Link to="/welcome" className="hover:text-[#2457A6] transition-colors flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-[#168C83]" />
                  <span>{t('nav.language', 'Language Selection')}</span>
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-[#2457A6] transition-colors flex items-center gap-1.5">
                  <Accessibility className="w-3.5 h-3.5 text-[#2457A6]" />
                  <span>{t('nav.accessibility', 'Accessibility Settings')}</span>
                </Link>
              </li>
              <li>
                <Link to="/eligibility" className="hover:text-[#2457A6] transition-colors">
                  {t('eligibility.title', 'Eligibility Checker')}
                </Link>
              </li>
              <li>
                <Link to="/documents" className="hover:text-[#2457A6] transition-colors">
                  {t('documents.title', 'Required Documents')}
                </Link>
              </li>
              <li>
                <Link to="/guidance" className="hover:text-[#2457A6] transition-colors">
                  {t('guidance.title', 'Step-by-Step Guidance')}
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="hover:text-[#2457A6] transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#2457A6]" />
                  <span>{t('terminology.title', 'Plain Language Dictionary')}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#2457A6] transition-colors">
                  {t('nav.about', 'About the Portal')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Help & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#202938]">
              {t('footer.helpTitle', 'Help & Grievance')}
            </h4>
            <ul className="space-y-2 text-xs text-[#667085]">
              <li>
                <Link to="/help" className="hover:text-[#2457A6] transition-colors">
                  {t('help.helplineTitle', 'Toll-Free Helplines')}
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-[#2457A6] transition-colors">
                  {t('help.cscTitle', 'Find Nearest CSC Kendra')}
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-[#2457A6] transition-colors">
                  {t('antiCorruption.helplineLabel', 'Vigilance Helpline (1964)')}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2457A6] transition-colors inline-flex items-center gap-1"
                >
                  <span>india.gov.in Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#667085]" />
                </a>
              </li>
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2457A6] transition-colors inline-flex items-center gap-1"
                >
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#667085]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice Box */}
        <div className="border border-[#E5EAF0] bg-white rounded-xl p-4 mt-8 space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#202938]">
            {t('footer.disclaimerTitle', 'Official Transparency Guarantee')}
          </p>
          <p className="text-xs text-[#667085] leading-relaxed">
            {t('footer.disclaimerText', 'This portal provides free informational guidance. Government welfare applications are 100% free of charge or capped at official statutory fees. No broker or agent is authorized to collect fees.')}
          </p>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="border-t border-[#E5EAF0] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#667085]">
          <p>{t('footer.rights', '© 2026 National Citizen Services Portal. All Public Rights Reserved.')}</p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/about" className="hover:text-[#2457A6]">{t('nav.about', 'About Us')}</Link>
            <span>•</span>
            <Link to="/accessibility" className="hover:text-[#2457A6]">{t('nav.accessibility', 'Accessibility Statement')}</Link>
            <span>•</span>
            <Link to="/help" className="hover:text-[#2457A6]">{t('nav.help', 'Helplines')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
