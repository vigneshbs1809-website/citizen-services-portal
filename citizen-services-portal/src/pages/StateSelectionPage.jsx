import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Search,
  CheckCircle2,
  Building2,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Globe,
  SlidersHorizontal,
  Compass,
  Check,
  Landmark,
  Phone
} from 'lucide-react';
import { useStateContext } from '../context/StateContext';
import { STATES_AND_UTS } from '../data/statesData';
import { Button } from '../design-system/Button';
import { Heading1, Heading2, BodyText, BodySecondary } from '../design-system/Typography';
import { PageContainer } from '../design-system/PageContainer';
import { AudioGuideButton } from '../components/voice/AudioGuideButton';
import { cn } from '../utilities/classNames';

export function StateSelectionPage({ onSpeak }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = (i18n.language ? i18n.language.slice(0, 2) : 'en').toLowerCase();

  const { selectedState, selectState, clearState } = useStateContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'state' | 'ut'
  const [sortOrder, setSortOrder] = useState('name-asc'); // 'name-asc' | 'name-desc'
  const [activeZone, setActiveZone] = useState('all'); // 'all' | 'south' | 'north' | 'west' | 'east' | 'central' | 'northeast' | 'ut'
  const [tempSelectedCode, setTempSelectedCode] = useState(selectedState?.code || '');

  // Regional zone classification for helpful grouping
  const ZONE_MAP = {
    south: ['AP', 'KA', 'KL', 'TN', 'TS', 'PY', 'LD', 'AN'],
    north: ['HR', 'HP', 'PB', 'RJ', 'UP', 'UK', 'DL', 'CH', 'JK', 'LA'],
    west: ['GA', 'GJ', 'MH', 'DN'],
    east: ['BR', 'JH', 'OD', 'WB'],
    central: ['CG', 'MP'],
    northeast: ['AR', 'AS', 'MN', 'ML', 'MZ', 'NL', 'SK', 'TR'],
  };

  // Filtered & Sorted list
  const filteredList = useMemo(() => {
    let result = [...STATES_AND_UTS];

    // Filter by Region Type (State vs UT)
    if (filterType === 'state') {
      result = result.filter((s) => s.regionType === 'state');
    } else if (filterType === 'ut') {
      result = result.filter((s) => s.regionType === 'ut');
    }

    // Filter by Geographical Zone
    if (activeZone !== 'all') {
      const allowedCodes = ZONE_MAP[activeZone] || [];
      result = result.filter((s) => allowedCodes.includes(s.code));
    }

    // Search query filter (matches name, code, capital, native names, or portal)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((s) => {
        const nameMatch = s.name.toLowerCase().includes(q);
        const codeMatch = s.code.toLowerCase().includes(q);
        const capMatch = s.capital.toLowerCase().includes(q);
        const portalMatch = s.servicePortal.toLowerCase().includes(q);
        const nativeMatch = Object.values(s.nativeNames || {}).some((n) => n.toLowerCase().includes(q));
        return nameMatch || codeMatch || capMatch || portalMatch || nativeMatch;
      });
    }

    // Sort order
    result.sort((a, b) => {
      if (sortOrder === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [searchQuery, filterType, sortOrder, activeZone]);

  const handleCardClick = (code) => {
    setTempSelectedCode(code);
  };

  const handleConfirmState = () => {
    if (tempSelectedCode) {
      selectState(tempSelectedCode);
    }
    navigate('/');
  };

  const handleSkip = () => {
    clearState();
    navigate('/');
  };

  const activeSelectedObj = STATES_AND_UTS.find((s) => s.code === tempSelectedCode);

  const spokenOverview = t(
    'state.audioOverview',
    'Select your state or union territory from the 36 regions of India to discover your state e-governance portals such as Seva Sindhu, e-Sevai, MeeSeva, or Aaple Sarkar. You may also skip to browse national services.'
  );

  return (
    <div className="bg-[#F7F9FC] min-h-[calc(100vh-64px)] py-8 md:py-12">
      <PageContainer className="space-y-8">
        {/* Top Header & Overview */}
        <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EAF0] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#168C83] bg-[#F0FAF9] border border-teal-200/80 px-2.5 py-1 rounded">
                {t('state.onboardingStep', 'Step 2: Region Selection')}
              </span>
              <span className="text-xs text-[#667085] flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>28 States & 8 Union Territories</span>
              </span>
            </div>

            <AudioGuideButton
              id="state-selection-overview"
              title={t('state.pageTitle', 'Select Your State or Union Territory')}
              text={spokenOverview}
              label={t('popular.listenGuide', 'Listen')}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <Heading1 className="text-2xl sm:text-3xl text-[#202938]">
                {t('state.pageTitle', 'Select Your State or Union Territory')}
              </Heading1>
              <BodySecondary className="max-w-3xl">
                {t(
                  'state.pageSubtitle',
                  'Select your home state to access official state-specific e-governance portals, revenue certificates, local welfare schemes, and district offices.'
                )}
              </BodySecondary>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs font-bold text-[#667085] hover:text-[#2457A6] underline py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {t('state.skipOption', 'Skip to National Services')}
              </button>

              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmState}
                disabled={!tempSelectedCode}
              >
                <span>{t('common.continue', 'Continue to Dashboard')}</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search, Filter Tabs & Controls */}
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(
                  'state.searchPlaceholder',
                  'Search state by name, capital, code or portal (e.g. Karnataka, Seva Sindhu, Tamil Nadu, MeeSeva)...'
                )}
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#E5EAF0] focus:border-[#2457A6] focus:outline-none bg-[#F7F9FC]"
              />
            </div>

            {/* Quick Type Filter Tabs */}
            <div className="md:col-span-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap',
                  filterType === 'all'
                    ? 'bg-[#2457A6] text-white border-[#2457A6]'
                    : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-slate-50'
                )}
              >
                {t('state.all36', 'All (36)')}
              </button>
              <button
                type="button"
                onClick={() => setFilterType('state')}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap',
                  filterType === 'state'
                    ? 'bg-[#2457A6] text-white border-[#2457A6]'
                    : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-slate-50'
                )}
              >
                {t('state.states28', '28 States')}
              </button>
              <button
                type="button"
                onClick={() => setFilterType('ut')}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap',
                  filterType === 'ut'
                    ? 'bg-[#2457A6] text-white border-[#2457A6]'
                    : 'bg-white text-[#202938] border-[#E5EAF0] hover:bg-slate-50'
                )}
              >
                {t('state.uts8', '8 Union Territories')}
              </button>
            </div>

            {/* Sort Order Dropdown */}
            <div className="md:col-span-2">
              <select
                aria-label="Sort states list"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full text-xs font-semibold bg-[#F7F9FC] border border-[#E5EAF0] rounded-xl px-3 py-2.5 text-[#202938] focus:border-[#2457A6] focus:outline-none cursor-pointer"
              >
                <option value="name-asc">{t('state.sortAZ', 'Alphabetical (A - Z)')}</option>
                <option value="name-desc">{t('state.sortZA', 'Alphabetical (Z - A)')}</option>
              </select>
            </div>
          </div>

          {/* Regional Zone Pills */}
          <div className="pt-2 border-t border-[#E5EAF0] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] mr-1 flex-shrink-0">
              {t('state.quickZone', 'Regions')}:
            </span>
            {[
              { id: 'all', label: t('state.allZones', 'All India') },
              { id: 'south', label: t('state.zoneSouth', 'Southern') },
              { id: 'north', label: t('state.zoneNorth', 'Northern') },
              { id: 'west', label: t('state.zoneWest', 'Western') },
              { id: 'east', label: t('state.zoneEast', 'Eastern') },
              { id: 'central', label: t('state.zoneCentral', 'Central') },
              { id: 'northeast', label: t('state.zoneNortheast', 'North-Eastern') },
            ].map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setActiveZone(z.id)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer border flex-shrink-0',
                  activeZone === z.id
                    ? 'bg-teal-50 text-[#0E5853] border-teal-300 font-bold'
                    : 'bg-[#F7F9FC] text-[#667085] border-[#E5EAF0] hover:text-[#202938]'
                )}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected State Spotlight Banner (if active) */}
        {activeSelectedObj && (
          <div className="p-5 rounded-2xl bg-[#F0FAF9] border-2 border-[#168C83] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#168C83] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-2xs">
                {activeSelectedObj.code}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#202938]">
                    {activeSelectedObj.name}
                    {activeSelectedObj.nativeNames?.[currentLang] && (
                      <span className="font-normal text-[#168C83] ml-1.5">
                        ({activeSelectedObj.nativeNames[currentLang]})
                      </span>
                    )}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-[#0E5853]">
                    {activeSelectedObj.regionType === 'state' ? 'State' : 'Union Territory'}
                  </span>
                </div>
                <p className="text-xs text-[#667085] mt-0.5 flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold text-[#202938]">{t('state.capital', 'Capital')}:</span> {activeSelectedObj.capital} |{' '}
                  <span className="font-semibold text-[#202938]">{t('state.portal', 'Portal')}:</span>
                  <a
                    href={activeSelectedObj.servicePortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#168C83] font-bold hover:underline inline-flex items-center gap-1"
                    title={`Open official ${activeSelectedObj.servicePortal}`}
                  >
                    <span>{activeSelectedObj.servicePortal}</span>
                    <ExternalLink className="w-3 h-3 stroke-[2]" />
                  </a>
                </p>
              </div>
            </div>

            <Button variant="primary" size="md" onClick={handleConfirmState}>
              <span>{t('state.confirmAndProceed', 'Confirm & Open Dashboard')}</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </Button>
          </div>
        )}

        {/* Grid of 36 State & UT Cards */}
        {filteredList.length === 0 ? (
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-12 text-center space-y-3 shadow-2xs">
            <h3 className="text-base font-bold text-[#202938]">
              {t('state.noStateFoundTitle', 'No State or UT Matching Your Search')}
            </h3>
            <p className="text-xs text-[#667085] max-w-md mx-auto">
              {t('state.noStateFoundDesc', 'Try clearing your search keyword or selecting a different geographical zone.')}
            </p>
            <div className="pt-2">
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                  setActiveZone('all');
                }}
              >
                {t('common.clearSearch', 'Reset Search & Filters')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredList.map((state) => {
              const isSelected = tempSelectedCode === state.code;
              const nativeInLang = state.nativeNames?.[currentLang] || state.nativeNames?.hi || '';

              return (
                <div
                  key={state.code}
                  onClick={() => handleCardClick(state.code)}
                  className={cn(
                    'bg-white border rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col justify-between group relative select-none',
                    isSelected
                      ? 'border-[#168C83] ring-2 ring-[#168C83]/30 bg-[#F0FAF9]/30'
                      : 'border-[#E5EAF0] hover:border-[#2457A6] hover:-translate-y-0.5'
                  )}
                >
                  <div className="space-y-3">
                    {/* Top Pill & Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-[#2457A6] font-bold text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-[#2457A6] group-hover:text-white transition-colors">
                        {state.code}
                      </span>

                      <span
                        className={cn(
                          'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border',
                          state.regionType === 'state'
                            ? 'bg-blue-50 text-[#2457A6] border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        )}
                      >
                        {state.regionType === 'state' ? 'State' : 'UT'}
                      </span>
                    </div>

                    {/* Name & Native Name */}
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-[#202938] leading-tight group-hover:text-[#2457A6] transition-colors">
                        {state.name}
                      </h3>
                      {nativeInLang && (
                        <p className="text-xs text-[#168C83] font-medium leading-snug">
                          {nativeInLang}
                        </p>
                      )}
                    </div>

                    {/* Capital and Helpline */}
                    <div className="text-[11px] text-[#667085] space-y-1 pt-1 border-t border-slate-100">
                      <p>
                        <span className="text-[#202938] font-semibold">{t('state.capital', 'Capital')}:</span> {state.capital}
                      </p>
                      <p className="truncate" title={state.servicePortal}>
                        <span className="text-[#202938] font-semibold">{t('state.portal', 'Portal')}:</span> {state.servicePortal}
                      </p>
                    </div>

                    {/* Verified Badge and Direct Link */}
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#168C83] bg-[#F0FAF9] px-2 py-1 rounded border border-teal-100">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#168C83] flex-shrink-0" />
                        <span className="truncate">{t('externalLink.verifiedGovt', 'Verified .gov.in Portal')}</span>
                      </div>

                      <a
                        href={state.servicePortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-semibold text-[#2457A6] hover:underline inline-flex items-center gap-1 flex-shrink-0 cursor-pointer"
                        title={`Open official ${state.servicePortal} website`}
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3 stroke-[2]" />
                      </a>
                    </div>
                  </div>

                  {/* Card Bottom Button / Selected Indicator */}
                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#667085] group-hover:text-[#2457A6] transition-colors">
                      {isSelected ? t('state.selectedState', 'Selected') : t('state.chooseState', 'Select State')}
                    </span>

                    <div
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center transition-all',
                        isSelected
                          ? 'bg-[#168C83] text-white'
                          : 'bg-[#F7F9FC] border border-[#E5EAF0] text-[#667085] group-hover:border-[#2457A6] group-hover:text-[#2457A6]'
                      )}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <ArrowRight className="w-3 h-3 stroke-[2]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </PageContainer>
    </div>
  );
}

export default StateSelectionPage;
