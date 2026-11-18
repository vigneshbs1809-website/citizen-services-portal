import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle,
  HelpCircle,
  ArrowLeft,
  Volume2,
  FileText
} from 'lucide-react';
import {
  PageContainer,
  PageHeader,
  Breadcrumbs,
  Button,
  Heading1,
  Heading2,
  BodyText,
  BodySecondary
} from '../design-system';
import { terminologyData, terminologyCategories } from '../data/terminologyData';
import { getTerminologyTranslation } from '../utilities/terminologyTranslation';
import { PlainLanguageCard } from '../components/plain-language/PlainLanguageCard';
import { AudioGuideButton } from '../components/voice/AudioGuideButton';
import { VoiceSearch } from '../components/voice/VoiceSearch';

export function GlossaryPage({ onSpeak }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter terms by category and search keyword across all languages
  const filteredTerms = useMemo(() => {
    const termQuery = searchTerm.toLowerCase().trim();

    return terminologyData.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      if (!termQuery) return true;

      const trans = getTerminologyTranslation(item, t);
      const official = trans.official.toLowerCase();
      const simplified = trans.simplified.toLowerCase();
      const example = trans.example.toLowerCase();
      const baseOfficial = item.officialEn.toLowerCase();
      const baseSimplified = item.simplifiedEn.toLowerCase();

      return (
        official.includes(termQuery) ||
        simplified.includes(termQuery) ||
        example.includes(termQuery) ||
        baseOfficial.includes(termQuery) ||
        baseSimplified.includes(termQuery)
      );
    });
  }, [searchTerm, selectedCategory, t]);

  const overviewSpokenText = `${t('terminology.title', 'Plain Language Government Dictionary')}. ${t('terminology.subtitle', 'Understand complex bureaucratic words with simple translations and practical examples in all 6 regional languages.')}`;

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-8">
      <PageContainer className="space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: t('nav.home', 'Home'), to: '/' },
            { label: t('terminology.title', 'Plain Language Dictionary') },
          ]}
        />

        {/* Page Header */}
        <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 md:p-8 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EAF0] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#168C83] bg-[#F0FAF9] border border-teal-200/80 px-2.5 py-1 rounded">
                Citizen Plain-Language Scaffolding
              </span>
              <span className="text-xs text-[#667085] hidden sm:inline">
                Verified against official Gazette definitions
              </span>
            </div>

            <AudioGuideButton
              id="glossary-overview-audio"
              title={t('terminology.title', 'Plain Language Dictionary')}
              text={overviewSpokenText}
              label={t('voice.listenServiceDesc', 'Listen to Overview')}
            />
          </div>

          <div className="space-y-2">
            <Heading1 className="text-2xl sm:text-3xl text-[#202938]">
              {t('terminology.title', 'Plain Language Government Dictionary')}
            </Heading1>
            <BodySecondary className="max-w-3xl leading-relaxed text-sm sm:text-base">
              {t(
                'terminology.subtitle',
                'Government schemes often use dense legal clauses that confuse citizens. Below are official terms explained in plain conversational language with real-world examples in English, Kannada, Hindi, Telugu, Tamil, and Malayalam.'
              )}
            </BodySecondary>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 shadow-2xs space-y-5">
          {/* Search Input with Voice Search Mic */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#667085]">
              <Search className="w-5 h-5 stroke-[2]" />
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t(
                'terminology.searchPlaceholder',
                'Search official terms or simplified explanations (e.g. prescribed documents, affidavit, DBT)...'
              )}
              className="w-full pl-11 pr-24 py-3.5 bg-white border border-[#E5EAF0] rounded-xl text-sm text-[#202938] placeholder:text-[#667085]/80 min-h-[48px] focus:outline-none focus:border-[#2457A6] focus:ring-2 focus:ring-[#2457A6]/20 transition-all shadow-2xs"
            />

            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5 z-10">
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="px-2 py-1 text-xs text-[#667085] hover:text-[#202938] font-semibold cursor-pointer"
                >
                  {t('common.clearSearch', 'Clear')}
                </button>
              )}

              <VoiceSearch
                size="sm"
                onTranscript={(text) => setSearchTerm(text)}
                onFinalResult={(text) => setSearchTerm(text)}
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
            {terminologyCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? terminologyData.length
                  : terminologyData.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border min-h-[36px] whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#2457A6] text-white border-[#2457A6] shadow-2xs'
                      : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-[#F7F9FC]'
                  }`}
                >
                  {t(cat.labelKey, cat.defaultLabel)} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#667085] px-1">
          <span>
            Showing <strong>{filteredTerms.length}</strong> of {terminologyData.length} government terms
          </span>
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-[#2457A6] font-semibold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Terminology Cards Grid */}
        {filteredTerms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5EAF0] p-12 text-center space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center mx-auto text-[#667085]">
              <BookOpen className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="space-y-1">
              <Heading2 className="text-lg text-[#202938]">No Matching Terminology Found</Heading2>
              <BodySecondary className="max-w-md mx-auto">
                We couldn't find any government terms matching "{searchTerm}". Try searching for words like "documents", "income", "affidavit", or "subsidy".
              </BodySecondary>
            </div>
            <div className="pt-2">
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Search
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTerms.map((term) => (
              <PlainLanguageCard key={term.id} term={term} />
            ))}
          </div>
        )}

        {/* Bottom Educational Banner */}
        <div className="p-6 rounded-2xl bg-[#F0FAF9] border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0E5853]">
              Need help understanding a specific document requirement?
            </h4>
            <p className="text-xs text-[#168C83] leading-relaxed">
              Explore our step-by-step guides where every condition is broken down into simple, manageable steps with audio guidance.
            </p>
          </div>

          <Link to="/services">
            <Button variant="primary" size="sm" className="whitespace-nowrap">
              Browse All Services
            </Button>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}

export default GlossaryPage;
