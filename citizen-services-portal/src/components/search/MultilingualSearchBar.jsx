import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, X, ChevronRight, FileText } from 'lucide-react';
import { getSearchSuggestions } from '../../utilities/searchService';
import { getServiceTranslation } from '../../utilities/serviceTranslation';
import { VoiceSearch } from '../voice/VoiceSearch';
import { parseVoiceCommand } from '../../utilities/voiceCommandParser';
import { useStateContext } from '../../context/StateContext';
import { cn } from '../../utilities/classNames';

export function MultilingualSearchBar({
  initialQuery = '',
  placeholder,
  onSearch,
  className,
  autoFocus = false,
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { selectedState, selectState } = useStateContext();
  const currentLang = (i18n.language ? i18n.language.slice(0, 2) : 'en').toLowerCase();

  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Update suggestions dynamically as user types
  useEffect(() => {
    if (query && query.trim().length >= 1) {
      const matches = getSearchSuggestions(query, 5, t);
      setSuggestions(matches);
      setIsOpen(matches.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    setActiveIndex(-1);
  }, [query, t]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsOpen(false);

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      navigate(`/services/${suggestions[activeIndex].id}`);
      return;
    }

    const trimmed = query.trim();
    if (onSearch) {
      onSearch(trimmed);
    } else {
      navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/services');
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
    if (onSearch) {
      onSearch('');
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const defaultPlaceholder = t(
    'search.inputPlaceholder',
    'Search by service name or document (e.g. Income Certificate, Pension, Aadhaar)...'
  );

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
        <div className="relative flex-1">
          {/* Left Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#667085]">
            <Search className="w-5 h-5 stroke-[2]" aria-hidden="true" />
          </div>

          {/* Input field supporting all scripts and voice transcript */}
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls="multilingual-search-suggestions"
            aria-activedescendant={activeIndex >= 0 ? `suggestion-item-${activeIndex}` : undefined}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            autoFocus={autoFocus}
            placeholder={placeholder || defaultPlaceholder}
            className="w-full pl-11 pr-24 py-3.5 bg-white border border-[#E5EAF0] rounded-xl text-sm text-[#202938] placeholder:text-[#667085]/80 min-h-[48px] focus:outline-none focus:border-[#2457A6] focus:ring-2 focus:ring-[#2457A6]/20 transition-all shadow-2xs"
          />

          {/* Action Tools: Voice Search Mic & Clear (X) */}
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1 z-10">
            {/* Clear Search Button (X) */}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="w-9 h-9 flex items-center justify-center text-[#667085] hover:text-[#202938] transition-colors cursor-pointer rounded-lg hover:bg-[#F7F9FC]"
                aria-label={t('common.clearSearch', 'Clear search')}
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            )}

            {/* Reusable Voice Search Button with Command Intelligence */}
            <VoiceSearch
              size="sm"
              onTranscript={(spoken) => {
                setQuery(spoken);
                if (onSearch) onSearch(spoken);
              }}
              onFinalResult={(finalText) => {
                setQuery(finalText);
                const cmd = parseVoiceCommand(finalText, currentLang);
                if (cmd) {
                  if (cmd.type === 'CHANGE_STATE') {
                    selectState(cmd.stateCode);
                    navigate('/');
                    return;
                  }
                  if (cmd.type === 'NAVIGATE_SERVICE') {
                    navigate(`/services/${cmd.serviceId}`);
                    return;
                  }
                  if (cmd.type === 'OPEN_PORTAL') {
                    if (selectedState && selectedState.servicePortalUrl) {
                      window.open(selectedState.servicePortalUrl, '_blank', 'noopener,noreferrer');
                    } else {
                      window.open('https://services.india.gov.in', '_blank', 'noopener,noreferrer');
                    }
                    return;
                  }
                }
                if (onSearch) onSearch(finalText);
              }}
            />
          </div>
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2457A6] hover:bg-[#1D4788] text-white text-sm font-semibold transition-all cursor-pointer min-h-[48px] shadow-2xs flex-shrink-0"
        >
          <Search className="w-4 h-4 stroke-[2]" />
          <span>{t('common.search', 'Search')}</span>
        </button>
      </form>

      {/* Autocomplete / Suggested Services Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul
          id="multilingual-search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 mt-2 bg-white border border-[#E5EAF0] rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-[#E5EAF0] animate-in fade-in"
        >
          <li className="px-4 py-2 bg-[#F7F9FC] text-[11px] font-bold uppercase tracking-wider text-[#667085]">
            {t('popular.title', 'Suggested Services')}
          </li>
          {suggestions.map((service, index) => {
            const isSelected = index === activeIndex;
            const trans = getServiceTranslation(service, t);

            return (
              <li
                key={service.id}
                id={`suggestion-item-${index}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  navigate(`/services/${service.id}`);
                  setIsOpen(false);
                }}
                className={cn(
                  'px-4 py-3 flex items-center justify-between gap-3 cursor-pointer transition-colors',
                  isSelected ? 'bg-[#EEF3FA] text-[#2457A6]' : 'hover:bg-[#F7F9FC]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center text-[#2457A6] flex-shrink-0">
                    <FileText className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#202938] block leading-snug">
                      {trans.title || service.title}
                    </span>
                    <span className="text-xs text-[#667085] line-clamp-1">
                      {trans.shortDescription || service.shortDescription}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#F0FAF9] border border-teal-200 text-[#168C83]">
                    {trans.officialFee || service.officialFee}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#667085]" />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MultilingualSearchBar;
