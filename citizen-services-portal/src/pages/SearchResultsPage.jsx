import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, ArrowLeft, Volume2, CheckCircle, FileText } from 'lucide-react';
import {
  PageContainer,
  Breadcrumbs,
  ServiceCard,
  Button,
  Heading1,
  Heading2,
  BodyText,
  BodySecondary
} from '../design-system';
import { MultilingualSearchBar } from '../components/search/MultilingualSearchBar';
import { servicesData } from '../data/servicesData';
import { serviceCategories } from '../data/categoriesData';
import { getCategoryTranslation } from '../utilities/serviceTranslation';
import { searchServices } from '../utilities/searchService';
import { searchServicesApi } from '../services/api';

export function SearchResultsPage({ onSpeak }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [activeCategory, setActiveCategory] = useState('all');
  const [results, setResults] = useState(() => searchServices(query, 'all', t));

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const handleSearchChange = (newQuery) => {
    setSearchTerm(newQuery);
    setSearchParams(newQuery.trim() ? { q: newQuery.trim() } : {});
  };

  // Perform multilingual search via API with instant local fallback
  useEffect(() => {
    let isMounted = true;
    searchServicesApi(query, activeCategory, t).then((res) => {
      if (isMounted && Array.isArray(res)) {
        setResults(res);
      }
    });
    return () => { isMounted = false; };
  }, [query, activeCategory, t]);

  const popularSuggestions = [
    t('services.incomeCertificate.title', 'Income Certificate'),
    t('services.pensionGuidance.title', 'Pension Guidance'),
    t('services.casteCertificate.title', 'Caste Certificate'),
    t('services.rationCard.title', 'Ration Card'),
    t('services.ayushmanCard.title', 'Ayushman Card'),
    t('services.scholarshipGuidance.title', 'Scholarship')
  ];

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-8">
      <PageContainer className="space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('nav.services', 'Services'), to: '/services' },
            { label: `${t('common.search', 'Search')}: "${query || t('categories.all', 'All')}"` }
          ]}
        />

        {/* Search Header & Multilingual Input */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
          <MultilingualSearchBar
            initialQuery={searchTerm}
            onSearch={handleSearchChange}
            placeholder={t('search.inputPlaceholder', 'Search by scheme name or document (e.g. Aadhaar, Pension, Income)...')}
          />

          {/* Quick Suggestion Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 text-xs">
            <span className="text-[#667085] font-semibold flex-shrink-0">{t('search.popularSuggestions', 'Popular Searches:')}</span>
            {popularSuggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSearchTerm(item);
                  setSearchParams({ q: item });
                }}
                className="px-3 py-1 rounded-md bg-[#F7F9FC] border border-[#E5EAF0] text-[#202938] hover:border-[#2457A6] hover:bg-white transition-colors cursor-pointer flex-shrink-0"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Summary & Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Heading1 className="text-xl sm:text-2xl text-[#202938]">
              {query ? `${t('common.search', 'Search')}: "${query}"` : t('search.title', 'All Available Services')}
            </Heading1>
            <BodySecondary>
              {t('search.resultsFound', { count: results.length, defaultValue: `Found ${results.length} official government services` })}
            </BodySecondary>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#2457A6] text-white border-[#2457A6]'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-slate-50'
              }`}
            >
              {t('categories.all', 'All')} ({servicesData.length})
            </button>
            {serviceCategories.map((cat) => {
              const transCat = getCategoryTranslation(cat, t);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-[#2457A6] text-white border-[#2457A6]'
                      : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-slate-50'
                  }`}
                >
                  {transCat.title || cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {results.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E5EAF0] p-12 text-center space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center mx-auto text-[#667085]">
              <Search className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="space-y-1">
              <Heading2 className="text-lg text-[#202938]">{t('search.noResultsTitle', 'No Matching Public Schemes')}</Heading2>
              <BodySecondary className="max-w-md mx-auto">
                {t('search.noResultsDesc', 'We couldn\'t find any services matching your search.')}
              </BodySecondary>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSearchParams({});
                  setActiveCategory('all');
                }}
              >
                {t('common.clearSearch', 'Clear Search')}
              </Button>
              <Link to="/services">
                <Button variant="primary" size="sm">
                  {t('errors.browseServices', 'View All Services')}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((service) => (
              <ServiceCard key={service.id} service={service} onSpeak={onSpeak} />
            ))}
          </div>
        )}

        {/* Back to Home Button */}
        <div className="pt-4 border-t border-[#E5EAF0]">
          <Link to="/">
            <Button variant="tertiary" size="sm">
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
              <span>{t('errors.returnHome', 'Back to Home Dashboard')}</span>
            </Button>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}

export default SearchResultsPage;
