import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Search, ExternalLink, Check, ChevronDown, Building, X } from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { ExternalLinkModal } from '../common/ExternalLinkModal';
import { cn } from '../../utilities/classNames';

export function DistrictSelector({ className, compact = false }) {
  const { t } = useTranslation();
  const { selectedState, selectedDistrict, selectDistrict, clearDistrict, districtsList } = useStateContext();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [modalLink, setModalLink] = useState(null);

  const filteredDistricts = useMemo(() => {
    if (!query.trim()) return districtsList;
    const lower = query.toLowerCase();
    return districtsList.filter((d) => d.name.toLowerCase().includes(lower));
  }, [districtsList, query]);

  if (!selectedState) {
    return null;
  }

  const handleSelect = (dist) => {
    selectDistrict(dist);
    setIsOpen(false);
    setQuery('');
  };

  const handleOpenCollectorate = (e, dist) => {
    e.stopPropagation();
    setModalLink({
      name: `${dist.name} District Administration (Collectorate)`,
      url: dist.officialWebsite,
      department: `${selectedState.name} District Administration / NIC`,
      verified: dist.verified ? 'verified' : 'pending',
    });
  };

  return (
    <div className={cn('relative', className)}>
      {/* Selector Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'flex items-center justify-between gap-3 bg-white border border-[#E5EAF0] rounded-lg px-3 py-2 text-xs font-semibold text-[#202938] hover:border-[#2457A6] transition-all cursor-pointer shadow-2xs',
            compact ? 'w-auto' : 'w-full sm:w-72'
          )}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-4 h-4 text-[#168C83] flex-shrink-0" />
            <span className="truncate">
              {selectedDistrict
                ? selectedDistrict.name
                : t('state.selectDistrictPrompt', 'Select District (Optional)')}
            </span>
          </div>
          <ChevronDown className={cn('w-4 h-4 text-[#667085] transition-transform', isOpen && 'rotate-180')} />
        </button>

        {selectedDistrict && (
          <button
            type="button"
            onClick={clearDistrict}
            className="p-2 text-[#667085] hover:text-[#202938] rounded-lg border border-[#E5EAF0] bg-white hover:bg-slate-50 transition-colors"
            title={t('state.clearDistrict', 'Clear District')}
            aria-label="Clear District"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 z-40 mt-1.5 w-full sm:w-80 bg-white rounded-xl border border-[#E5EAF0] shadow-lg p-3 space-y-2 animate-in fade-in slide-in-from-top-1">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#667085] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('state.searchDistrict', 'Search district...')}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#E5EAF0] focus:border-[#2457A6] focus:outline-none bg-[#F7F9FC]"
              autoFocus
            />
          </div>

          {/* List of Districts */}
          <div className="max-h-60 overflow-y-auto space-y-1 divide-y divide-slate-100 pr-1">
            {filteredDistricts.length === 0 ? (
              <p className="text-xs text-[#667085] text-center py-4">
                {t('state.noDistrictFound', 'No matching district found')}
              </p>
            ) : (
              filteredDistricts.map((d) => {
                const isSelected = selectedDistrict?.id === d.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => handleSelect(d)}
                    className={cn(
                      'pt-1.5 first:pt-0 flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors text-xs',
                      isSelected ? 'bg-teal-50 text-[#0E5853] font-bold' : 'hover:bg-[#F7F9FC] text-[#202938]'
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-[#168C83] flex-shrink-0 stroke-[2.5]" />
                      ) : (
                        <Building className="w-3.5 h-3.5 text-[#667085] flex-shrink-0" />
                      )}
                      <span className="truncate">{d.name}</span>
                    </div>

                    {d.officialWebsite && (
                      <button
                        type="button"
                        onClick={(e) => handleOpenCollectorate(e, d)}
                        className="text-[10px] text-[#2457A6] hover:underline flex items-center gap-1 flex-shrink-0 ml-2"
                        title={`Open official portal for ${d.name}`}
                      >
                        <span>Portal</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* All State View option */}
          <div className="pt-2 border-t border-[#E5EAF0] flex items-center justify-between text-[11px]">
            <span className="text-[#667085]">{districtsList.length} Districts in {selectedState.name}</span>
            <button
              type="button"
              onClick={() => {
                clearDistrict();
                setIsOpen(false);
              }}
              className="text-[#2457A6] font-semibold hover:underline"
            >
              {t('state.allStateDistricts', 'All Districts')}
            </button>
          </div>
        </div>
      )}

      {/* External Link Notice Modal */}
      {modalLink && (
        <ExternalLinkModal
          isOpen={Boolean(modalLink)}
          onClose={() => setModalLink(null)}
          portalName={modalLink.name}
          portalUrl={modalLink.url}
          department={modalLink.department}
          verificationStatus={modalLink.verified}
          lastVerified="2026-11-18"
        />
      )}
    </div>
  );
}
