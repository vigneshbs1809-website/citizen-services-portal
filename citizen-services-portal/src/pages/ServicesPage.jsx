import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, CheckCircle, MapPin, Building2, Landmark, Compass } from 'lucide-react';
import { useStateContext } from '../context/StateContext';
import {
  PageContainer,
  PageHeader,
  Breadcrumbs,
  ServiceCard,
  Button,
  Heading2,
  BodyText,
  BodySecondary
} from '../design-system';
import { MultilingualSearchBar } from '../components/search/MultilingualSearchBar';
import { servicesData } from '../data/servicesData';
import { serviceCategories } from '../data/categoriesData';
import { getCategoryTranslation } from '../utilities/serviceTranslation';
import { searchServices } from '../utilities/searchService';
import { searchServicesApi, getCategories } from '../services/api';

export function ServicesPage({ onSpeak }) {
  const { t } = useTranslation();
  const { selectedState, selectedDistrict } = useStateContext();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [authorityFilter, setAuthorityFilter] = useState('all'); // 'all' | 'central' | 'state'
  const [filteredServices, setFilteredServices] = useState(() => searchServices(queryParam, categoryParam, t));
  const [categoriesList, setCategoriesList] = useState(() => serviceCategories);

  const CENTRAL_SERVICE_IDS = new Set(['pm-kisan', 'ayushman-card', 'scholarship-guidance']);

  const displayedServices = useMemo(() => {
    let list = filteredServices;
    if (authorityFilter === 'central') {
      list = list.filter((s) => CENTRAL_SERVICE_IDS.has(s.id));
    } else if (authorityFilter === 'state') {
      list = list.filter((s) => !CENTRAL_SERVICE_IDS.has(s.id));
    }
    return list;
  }, [filteredServices, authorityFilter]);

  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [queryParam]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Fetch categories from API with local fallback
  useEffect(() => {
    let isMounted = true;
    getCategories().then((cats) => {
      if (isMounted && cats && cats.length > 0) {
        setCategoriesList(cats);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Fetch filtered services from API with local fallback
  useEffect(() => {
    let isMounted = true;
    searchServicesApi(searchTerm, selectedCategory, t).then((res) => {
      if (isMounted && Array.isArray(res)) {
        setFilteredServices(res);
      }
    });
    return () => { isMounted = false; };
  }, [searchTerm, selectedCategory, t]);

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-8">
      <PageContainer className="space-y-8">
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('nav.services', 'Services Directory') },
          ]}
        />

        {/* Page Header */}
        <PageHeader
          badge={t('common.officialInitiative', 'Verified Public Schemes')}
          title={t('search.title', 'All Citizen Public Services')}
          description={t('search.subtitle', 'Explore government services, check standard entitlements, verify required documents, and receive audio guidance in your regional language.')}
          backTo="/"
          backLabel={t('common.back', 'Back to Home')}
        />

        {/* Filter and Search Bar */}
        <div className="bg-white p-6 rounded-xl border border-[#E5EAF0] shadow-2xs space-y-4">
          {/* Active State / UT Filter Indicator Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#F7F9FC] rounded-lg border border-[#E5EAF0] text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#168C83]" />
              <span className="text-[#667085]">{t('state.region', 'Region')}:</span>
              <span className="font-bold text-[#202938]">
                {selectedState ? `${selectedState.name} (${selectedState.code})` : t('state.allIndia', 'All India (National Directory)')}
              </span>
              {selectedDistrict && <span className="text-[#168C83] font-semibold">• {selectedDistrict.name}</span>}
            </div>
            <Link
              to="/select-state"
              className="text-[#2457A6] font-bold hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t('state.changeStateBtn', 'Change State / UT')}</span>
            </Link>
          </div>

          <MultilingualSearchBar
            initialQuery={searchTerm}
            onSearch={(val) => setSearchTerm(val)}
            placeholder={t('search.inputPlaceholder', 'Search by service name or document (e.g. Aadhaar, Pension, Income, Ration)...')}
          />

          {/* Authority Filter Tabs: All | Central | State */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] mr-1">
              Authority:
            </span>
            <button
              type="button"
              onClick={() => setAuthorityFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                authorityFilter === 'all'
                  ? 'bg-[#2457A6] text-white border-[#2457A6]'
                  : 'bg-[#F7F9FC] text-[#202938] border-[#E5EAF0] hover:bg-white'
              }`}
            >
              All Government Schemes
            </button>
            <button
              type="button"
              onClick={() => setAuthorityFilter('central')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                authorityFilter === 'central'
                  ? 'bg-[#2457A6] text-white border-[#2457A6]'
                  : 'bg-[#F7F9FC] text-[#202938] border-[#E5EAF0] hover:bg-white'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Central Govt</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthorityFilter('state')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                authorityFilter === 'state'
                  ? 'bg-[#168C83] text-white border-[#168C83]'
                  : 'bg-[#F7F9FC] text-[#202938] border-[#E5EAF0] hover:bg-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{selectedState ? `${selectedState.code} State Schemes` : 'State Schemes'}</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border min-h-[36px] ${
                selectedCategory === 'all'
                  ? 'bg-[#2457A6] text-white border-[#2457A6]'
                  : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-[#F7F9FC]'
              }`}
            >
              {t('categories.all', 'All Services')} ({servicesData.length})
            </button>
            {categoriesList.map((cat) => {
              const translatedCat = getCategoryTranslation(cat, t);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border min-h-[36px] whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#2457A6] text-white border-[#2457A6]'
                      : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-[#F7F9FC]'
                  }`}
                >
                  {translatedCat.title || cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        {displayedServices.length === 0 ? (
          <div className="bg-white border border-[#E5EAF0] rounded-xl p-12 text-center space-y-3 shadow-2xs">
            <Heading2 className="text-[#202938]">{t('search.noResultsTitle', 'No Matching Service Found')}</Heading2>
            <BodySecondary className="max-w-md mx-auto">
              {t('search.noResultsDesc', 'We couldn\'t find any service matching your query. Try common keywords such as Income, Pension, Caste, or Scholarship.')}
            </BodySecondary>
            <div className="pt-2">
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setAuthorityFilter('all');
                }}
              >
                {t('common.clearSearch', 'Reset Search Filters')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((service) => (
              <ServiceCard key={service.id} service={service} onSpeak={onSpeak} />
            ))}
          </div>
        )}
      </PageContainer>
    </div>
  );
}

export default ServicesPage;
