import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Building2,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Phone,
  Bookmark,
  Clock,
  CheckCircle,
  HelpCircle,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  Landmark,
  FileText
} from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { DistrictSelector } from '../state/DistrictSelector';
import { ServiceCard } from '../../design-system/ServiceCard';
import { ExternalLinkModal } from '../common/ExternalLinkModal';
import { servicesData } from '../../data/servicesData';
import { AudioGuideButton } from '../voice/AudioGuideButton';
import { cn } from '../../utilities/classNames';

export function StatePersonalizedDashboard({ onSpeak }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = (i18n.language ? i18n.language.slice(0, 2) : 'en').toLowerCase();

  const {
    selectedState,
    selectedDistrict,
    filterMode,
    setFilterMode,
    recentServices,
    favouriteIds,
    getStateServicePortal,
  } = useStateContext();

  const [externalModalLink, setExternalModalLink] = useState(null);

  // Authority categorization of services
  // Central Schemes: PM-Kisan, Ayushman Bharat, Scholarship Guidance (National Portal)
  // State Schemes: Income Certificate, Caste Certificate, Residence Certificate, Ration Card, Pension Guidance
  const CENTRAL_SERVICE_IDS = new Set(['pm-kisan', 'ayushman-card', 'scholarship-guidance']);

  // Filtered services based on Central vs State tab
  const displayedServices = useMemo(() => {
    if (filterMode === 'central') {
      return servicesData.filter((s) => CENTRAL_SERVICE_IDS.has(s.id));
    }
    if (filterMode === 'state') {
      return servicesData.filter((s) => !CENTRAL_SERVICE_IDS.has(s.id));
    }
    return servicesData;
  }, [filterMode]);

  // Favorite services list
  const favouriteServicesList = useMemo(() => {
    return servicesData.filter((s) => favouriteIds.includes(s.id));
  }, [favouriteIds]);

  if (!selectedState) return null;

  const nativeName = selectedState.nativeNames?.[currentLang] || selectedState.nativeNames?.hi || '';

  const handleOpenExternal = (name, url, dept) => {
    setExternalModalLink({
      name,
      url,
      department: dept || `${selectedState.name} Government Portal`,
      verified: 'verified',
    });
  };

  const spokenDashboardGreeting = `${t('dashboard.welcomeTo', 'Welcome to')} ${selectedState.name} ${t('common.portalTitle', 'Citizen Services')}. ${selectedState.portalDescription || ''}`;

  return (
    <div className="space-y-12">
      {/* =========================================================================
          1. STATE BANNER & REGION IDENTITY
      ========================================================================== */}
      <section className="bg-white border border-[#E5EAF0] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E5EAF0] pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-[#0E5853]">
                <MapPin className="w-3.5 h-3.5 text-[#168C83]" />
                <span>{selectedState.regionType === 'state' ? 'State Government' : 'Union Territory'}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-[#667085] bg-[#F7F9FC] border border-[#E5EAF0] px-2.5 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-[#168C83]" />
                <span>{t('externalLink.verifiedGovt', 'Official State Portal Verified')}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#202938]">
              {t('dashboard.welcomeTo', 'Welcome to')} <span className="text-[#2457A6]">{selectedState.name}</span> {t('common.portalTitle', 'Citizen Services')}
            </h1>

            {nativeName && (
              <p className="text-base font-semibold text-[#168C83]">
                {nativeName} {t('common.portalTitle', 'Citizen Services')}
              </p>
            )}

            <p className="text-xs sm:text-sm text-[#667085] max-w-2xl leading-relaxed">
              {selectedState.portalDescription}
            </p>
          </div>

          {/* Audio narration and Change State Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <AudioGuideButton
              id={`state-dashboard-${selectedState.code}`}
              title={`${selectedState.name} Citizen Services`}
              text={spokenDashboardGreeting}
              label={t('popular.listenGuide', 'Listen')}
              size="md"
            />

            <Link
              to="/select-state"
              className="px-4 py-2 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC] hover:bg-[#EEF3FA] text-xs font-bold text-[#2457A6] transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#2457A6]" />
              <span>{t('state.changeStateBtn', 'Change State / UT')}</span>
            </Link>
          </div>
        </div>

        {/* State Quick Facts & District Selector Strip */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Capital & Portal Info */}
          <div className="md:col-span-4 flex items-center gap-3 p-3.5 bg-[#F7F9FC] rounded-xl border border-[#E5EAF0]">
            <Building2 className="w-5 h-5 text-[#2457A6] flex-shrink-0" />
            <div className="text-xs truncate">
              <span className="font-bold text-[#202938] block">{selectedState.capital} (Capital)</span>
              <span className="text-[#667085] truncate block">{selectedState.servicePortal}</span>
            </div>
          </div>

          {/* Helpline */}
          <div className="md:col-span-4 flex items-center gap-3 p-3.5 bg-[#F7F9FC] rounded-xl border border-[#E5EAF0]">
            <Phone className="w-5 h-5 text-[#168C83] flex-shrink-0" />
            <div className="text-xs truncate">
              <span className="font-bold text-[#202938] block">{selectedState.helpline}</span>
              <span className="text-[#667085]">{t('state.helplineLabel', 'Citizen Support Helpline')}</span>
            </div>
          </div>

          {/* District Selector Dropdown */}
          <div className="md:col-span-4">
            <DistrictSelector compact={false} />
          </div>
        </div>

        {/* Highlighted Official State Apex Portal Card */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-blue-50/80 to-teal-50/60 border border-[#2457A6]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
                Apex e-Governance Gateway
              </span>
              <span className="text-[10px] text-[#168C83] font-semibold bg-white px-2 py-0.5 rounded border border-teal-200">
                Audited: {selectedState.lastVerified}
              </span>
            </div>
            <h3 className="text-base font-bold text-[#202938]">{selectedState.servicePortal}</h3>
            <p className="text-xs text-[#667085] max-w-xl">
              Official portal for government certificates, land records, welfare pensions, and civil services.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={selectedState.servicePortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-[#2457A6] hover:bg-[#1D4788] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>{t('state.openPortalBtn', 'Open Official Portal')}</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2]" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CENTRAL VS STATE GOVERNMENT FILTER (Requirement 6)
      ========================================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF0] pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#202938]">
              {filterMode === 'central'
                ? t('dashboard.centralSchemesTitle', 'Central Government Schemes & Portals')
                : filterMode === 'state'
                ? `${selectedState.name} ${t('dashboard.stateSchemesTitle', 'State Government Schemes')}`
                : `${selectedState.name} & ${t('dashboard.allSchemesTitle', 'National Citizen Services')}`}
            </h2>
            <p className="text-xs text-[#667085] mt-0.5">
              {t(
                'dashboard.filterSubtitle',
                'Clearly separated central and state services to ensure accurate authority identification and paperwork.'
              )}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-[#F7F9FC] p-1 rounded-xl border border-[#E5EAF0] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                filterMode === 'all'
                  ? 'bg-[#2457A6] text-white shadow-2xs'
                  : 'text-[#667085] hover:text-[#202938]'
              )}
            >
              {t('categories.all', 'All Schemes')} ({servicesData.length})
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('state')}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5',
                filterMode === 'state'
                  ? 'bg-[#168C83] text-white shadow-2xs'
                  : 'text-[#667085] hover:text-[#202938]'
              )}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{selectedState.code} State Schemes</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('central')}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5',
                filterMode === 'central'
                  ? 'bg-[#2457A6] text-white shadow-2xs'
                  : 'text-[#667085] hover:text-[#202938]'
              )}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Central Govt</span>
            </button>
          </div>
        </div>

        {/* Services Grid with Authority Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service) => {
            const isCentral = CENTRAL_SERVICE_IDS.has(service.id);
            const statePortalOverride = getStateServicePortal(service.id);

            return (
              <div key={service.id} className="relative group">
                <ServiceCard service={service} onSpeak={onSpeak} />

                {/* State/Central Authority Tag overlay */}
                <div className="absolute top-3 right-3 pointer-events-none">
                  <span
                    className={cn(
                      'text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shadow-2xs',
                      isCentral
                        ? 'bg-blue-50 text-[#2457A6] border-blue-200'
                        : 'bg-teal-50 text-[#0E5853] border-teal-200'
                    )}
                  >
                    {isCentral ? 'Central Scheme' : `${selectedState.code} State Scheme`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. KEY STATE DEPARTMENTS DIRECTORY (Requirement 3 & 4)
      ========================================================================== */}
      {selectedState.keyDepartments && selectedState.keyDepartments.length > 0 && (
        <section className="bg-white border border-[#E5EAF0] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="border-b border-[#E5EAF0] pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#202938]">
                {selectedState.name} Departmental Service Portals
              </h3>
              <p className="text-xs text-[#667085]">
                Direct links to verified state ministries and online citizen service desks.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#168C83] bg-teal-50 px-2.5 py-1 rounded border border-teal-100">
              Verified Directory
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedState.keyDepartments.map((dept, idx) => (
              <a
                key={idx}
                href={dept.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC] hover:border-[#2457A6] hover:bg-white transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-0.5 truncate pr-2">
                  <h4 className="text-xs font-bold text-[#202938] group-hover:text-[#2457A6] transition-colors truncate">
                    {dept.name}
                  </h4>
                  <span className="text-[11px] text-[#667085] truncate block">{dept.url}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#667085] group-hover:text-[#2457A6] flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          4. RECENTLY VIEWED & BOOKMARKED SERVICES (Requirement 11)
      ========================================================================== */}
      {(recentServices.length > 0 || favouriteServicesList.length > 0) && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recently Viewed */}
          {recentServices.length > 0 && (
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 border-b border-[#E5EAF0] pb-3">
                <Clock className="w-4 h-4 text-[#2457A6]" />
                <h3 className="text-sm font-bold text-[#202938]">
                  {t('dashboard.recentlyViewed', 'Recently Viewed Services')}
                </h3>
              </div>
              <div className="space-y-2">
                {recentServices.map((svc) => (
                  <Link
                    key={svc.id}
                    to={`/services/${svc.id}`}
                    className="p-2.5 rounded-lg bg-[#F7F9FC] hover:bg-[#EEF3FA] flex items-center justify-between text-xs text-[#202938] transition-colors group"
                  >
                    <div className="truncate">
                      <span className="font-semibold block truncate group-hover:text-[#2457A6]">
                        {svc.title}
                      </span>
                      <span className="text-[11px] text-[#667085]">{svc.officialFee}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#667085] group-hover:text-[#2457A6] flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bookmarks / Favourites */}
          {favouriteServicesList.length > 0 && (
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 border-b border-[#E5EAF0] pb-3">
                <Bookmark className="w-4 h-4 text-[#168C83]" />
                <h3 className="text-sm font-bold text-[#202938]">
                  {t('dashboard.savedSchemes', 'Bookmarked Entitlements')} ({favouriteServicesList.length})
                </h3>
              </div>
              <div className="space-y-2">
                {favouriteServicesList.map((svc) => (
                  <Link
                    key={svc.id}
                    to={`/services/${svc.id}`}
                    className="p-2.5 rounded-lg bg-[#F7F9FC] hover:bg-[#EEF3FA] flex items-center justify-between text-xs text-[#202938] transition-colors group"
                  >
                    <div className="truncate">
                      <span className="font-semibold block truncate group-hover:text-[#2457A6]">
                        {svc.title}
                      </span>
                      <span className="text-[11px] text-[#168C83]">{svc.benefitAmount || svc.officialFee}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#667085] group-hover:text-[#2457A6] flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* =========================================================================
          5. CITIZEN RIGHTS & STATUTORY GUARANTEES (Right to Public Services Act)
      ========================================================================== */}
      <section className="p-6 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#168C83]" />
          <h3 className="text-sm font-bold text-[#202938]">
            {selectedState.name} Public Services Guarantee Act (Sakala / RTPS)
          </h3>
        </div>
        <p className="text-xs text-[#667085] leading-relaxed">
          Under the Right to Public Services Act applicable in {selectedState.name}, every citizen is legally entitled to receive standard revenue certificates (Income, Caste, Residence) within the designated timeline (7 to 21 working days). No extra middleman fees or expedited counter charges are permitted by law.
        </p>
      </section>

      {/* External Link Notice Modal */}
      {externalModalLink && (
        <ExternalLinkModal
          isOpen={Boolean(externalModalLink)}
          onClose={() => setExternalModalLink(null)}
          portalName={externalModalLink.name}
          portalUrl={externalModalLink.url}
          department={externalModalLink.department}
          verificationStatus="verified"
          lastVerified={selectedState.lastVerified}
        />
      )}
    </div>
  );
}

export default StatePersonalizedDashboard;
