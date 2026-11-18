import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import {
  PageContainer,
  Breadcrumbs,
  Button,
  Heading1,
  BodySecondary
} from '../design-system';
import { MultilingualSearchBar } from '../components/search/MultilingualSearchBar';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-12">
      <PageContainer className="text-center space-y-6 max-w-lg mx-auto">
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('errors.pageNotFoundTitle', 'Page Not Found') },
          ]}
        />

        <div className="bg-white rounded-xl border border-[#E5EAF0] p-8 shadow-2xs space-y-5">
          <div className="w-14 h-14 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] text-[#2457A6] mx-auto flex items-center justify-center shadow-2xs">
            <HelpCircle className="w-7 h-7 stroke-[1.75]" />
          </div>

          <div className="space-y-2">
            <Heading1 className="text-2xl text-[#202938]">{t('errors.pageNotFoundTitle', 'Service Page Not Found')}</Heading1>
            <BodySecondary className="leading-relaxed">
              {t('errors.pageNotFoundDesc', 'The public service link you clicked does not exist or has been relocated to another department.')}
            </BodySecondary>
          </div>

          {/* Quick Multilingual Search */}
          <div className="pt-2 text-left">
            <MultilingualSearchBar
              placeholder={t('search.inputPlaceholder', 'Search for your service (e.g. Pension, Caste, Ration)...')}
            />
          </div>

          {/* Direct Recovery Links */}
          <div className="pt-4 border-t border-[#E5EAF0] flex flex-wrap items-center justify-center gap-3">
            <Link to="/">
              <Button variant="tertiary" size="sm">
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
                <span>{t('errors.returnHome', 'Return to Home Dashboard')}</span>
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="tertiary" size="sm">
                <span>{t('errors.browseServices', 'Browse All Services')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default NotFoundPage;
