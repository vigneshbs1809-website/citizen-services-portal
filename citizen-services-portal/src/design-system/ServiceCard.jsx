import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, CheckCircle, Clock, FileText } from 'lucide-react';
import { cn } from '../utilities/classNames';
import { getServiceTranslation } from '../utilities/serviceTranslation';
import { AudioGuideButton } from '../components/voice/AudioGuideButton';

export function ServiceCard({
  service,
  onSpeak,
  className,
}) {
  const { t, i18n } = useTranslation();
  if (!service) return null;

  const currentLang = (i18n?.language || t('common.langCode', 'en')).slice(0, 2).toLowerCase();
  const translated = getServiceTranslation(service, t, currentLang);

  return (
    <div
      className={cn(
        'bg-white border border-[#E5EAF0] rounded-xl p-6 shadow-2xs hover:border-[#2457A6] hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between h-full group',
        className
      )}
    >
      <div className="space-y-4">
        {/* Top Metadata Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
          <span className="inline-flex items-center gap-1 font-semibold text-[#168C83] bg-[#F0FAF9] border border-teal-200/80 px-2.5 py-1 rounded-md">
            <CheckCircle className="w-3.5 h-3.5 text-[#168C83] stroke-[2]" />
            <span>{translated.officialFee || service.officialFee}</span>
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] text-[#667085] font-medium bg-[#F7F9FC] border border-[#E5EAF0] px-2 py-0.5 rounded">
            <Clock className="w-3.5 h-3.5 text-[#667085] stroke-[1.75]" />
            <span>{translated.processingTime || service.processingTime}</span>
          </span>
        </div>

        {/* Title and Plain-Language Summary */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-[#202938] group-hover:text-[#2457A6] transition-colors leading-snug">
            <Link to={`/services/${service.id}`} className="focus:outline-none">
              {translated.title || service.title}
            </Link>
          </h3>
          <p className="text-xs text-[#667085] leading-relaxed line-clamp-3">
            {translated.shortDescription || service.shortDescription}
          </p>
        </div>

        {/* Papers Checklist Requirement Box */}
        {service.requiredDocuments && (
          <div className="bg-[#F7F9FC] border border-[#E5EAF0] rounded-lg p-3 text-xs text-[#202938]">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#667085] mb-1">
              <FileText className="w-3.5 h-3.5 text-[#2457A6]" />
              <span>{t('popular.docsRequired', 'Required Documents')}:</span>
            </div>
            <span className="text-xs text-[#202938] font-medium">
              {service.requiredDocuments.length} {t('common.photocopies', 'Photocopies')} (Aadhaar & proof)
            </span>
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-[#E5EAF0] mt-6 flex items-center justify-between gap-3">
        <AudioGuideButton
          id={`service-card-${service.id}`}
          title={translated.title || service.title}
          text={translated.spokenSummary || `${translated.title}. ${translated.shortDescription}. ${t('common.officialFee', 'Official Fee')}: ${translated.officialFee}. ${t('common.processingTime', 'Processing Time')}: ${translated.processingTime}`}
          label={t('popular.listenGuide', 'Listen')}
          size="sm"
        />

        <Link
          to={`/services/${service.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#2457A6] group-hover:text-[#1D4788] transition-colors ml-auto group/link min-h-[36px] py-1.5"
        >
          <span>{t('popular.viewDetails', 'View Details')}</span>
          <ChevronRight className="w-4 h-4 text-[#2457A6] group-hover/link:translate-x-0.5 transition-transform stroke-[2]" />
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
