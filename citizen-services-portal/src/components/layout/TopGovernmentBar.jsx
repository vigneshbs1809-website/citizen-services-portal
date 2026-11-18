import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Volume2, Phone, Globe, Eye, MapPin } from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { cn } from '../../utilities/classNames';

export function TopGovernmentBar({ textSize, setTextSize, highContrast, toggleHighContrast }) {
  const { t, i18n } = useTranslation();
  const { selectedState, selectedDistrict } = useStateContext();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Official Gov Identity & Active State */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-medium tracking-wide">
              {t('common.officialGovtSite', 'An Official Government Public Services Portal')}
            </span>
          </div>

          <div className="h-3 w-[1px] bg-slate-700 hidden md:block" />

          {/* Active State / UT Pill */}
          <Link
            to="/select-state"
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 transition-colors text-[11px] font-semibold"
            title="Change selected state or union territory"
          >
            <MapPin className="w-3 h-3 text-teal-400" />
            <span>
              {selectedState ? (
                <>
                  <span className="text-white font-bold">{selectedState.name}</span>
                  {selectedDistrict && <span className="text-slate-300"> ({selectedDistrict.name})</span>}
                </>
              ) : (
                <span className="text-slate-300">{t('state.allIndia', 'All India (National)')}</span>
              )}
            </span>
            <span className="text-[10px] text-teal-400 underline font-normal ml-0.5">{t('state.change', 'Change')}</span>
          </Link>
        </div>

        {/* Right: Accessibility Controls & Language Selector */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Toll Free Helpline */}
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-semibold text-white">1800-111-222</span>
            <span className="text-[11px] text-slate-400">(Toll-Free)</span>
          </div>

          <div className="h-3 w-[1px] bg-slate-700 hidden sm:block" />

          {/* Text Size Accessibility Controls */}
          <div className="flex items-center gap-1 bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700">
            <span className="text-[11px] text-slate-400 mr-1 hidden md:inline">Text Size:</span>
            <button
              type="button"
              onClick={() => setTextSize('normal')}
              className={cn(
                'px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer',
                textSize === 'normal' ? 'bg-[#1E40AF] text-white' : 'text-slate-300 hover:text-white'
              )}
              title="Standard text size"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setTextSize('large')}
              className={cn(
                'px-1.5 py-0.5 rounded text-[12px] font-semibold transition-colors cursor-pointer',
                textSize === 'large' ? 'bg-[#1E40AF] text-white' : 'text-slate-300 hover:text-white'
              )}
              title="Large text size for easier reading"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setTextSize('xlarge')}
              className={cn(
                'px-1.5 py-0.5 rounded text-[13px] font-bold transition-colors cursor-pointer',
                textSize === 'xlarge' ? 'bg-[#1E40AF] text-white' : 'text-slate-300 hover:text-white'
              )}
              title="Extra large text size for seniors"
            >
              A++
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={toggleHighContrast}
            className={cn(
              'flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border transition-colors cursor-pointer',
              highContrast
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            )}
            title="Toggle high contrast mode"
          >
            <Eye className="w-3 h-3" />
            <span>{highContrast ? t('accessibility.statusInactive', 'Standard Mode') : t('accessibility.highContrastTitle', 'High Contrast')}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <select
              aria-label="Select Portal Language"
              value={i18n.language ? i18n.language.slice(0, 2) : 'en'}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-slate-800 text-white text-xs rounded border border-slate-700 px-2 py-0.5 focus:outline-none focus:border-teal-400 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="ml">മലയാളം (Malayalam)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopGovernmentBar;
