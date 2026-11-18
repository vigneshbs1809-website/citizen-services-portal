import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, IdCard, Wallet, GraduationCap, ChevronRight } from 'lucide-react';
import { cn } from '../utilities/classNames';
import { getCategoryTranslation } from '../utilities/serviceTranslation';

export function CategoryCard({ category, className }) {
  const { t } = useTranslation();
  if (!category) return null;

  const translated = getCategoryTranslation(category, t);

  const iconMap = {
    FileText: <FileText className="w-6 h-6 text-[#2457A6] stroke-[1.75]" />,
    IdCard: <IdCard className="w-6 h-6 text-[#168C83] stroke-[1.75]" />,
    Wallet: <Wallet className="w-6 h-6 text-[#2457A6] stroke-[1.75]" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-[#168C83] stroke-[1.75]" />,
  };

  const renderedIcon = iconMap[category.iconName] || <FileText className="w-6 h-6 text-[#2457A6] stroke-[1.75]" />;

  return (
    <Link
      to={`/services?category=${category.id}`}
      className={cn(
        'group p-6 rounded-xl border border-[#E5EAF0] bg-white hover:border-[#2457A6] hover:shadow-xs transition-all duration-200 flex flex-col justify-between',
        className
      )}
    >
      <div className="space-y-4">
        {/* Icon Box */}
        <div className="w-12 h-12 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center group-hover:bg-[#EEF3FA] group-hover:border-[#2457A6]/30 transition-colors">
          {renderedIcon}
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-[#202938] group-hover:text-[#2457A6] transition-colors">
            {translated.title || category.title}
          </h3>
          <p className="text-xs text-[#667085] leading-relaxed">
            {translated.description || category.description}
          </p>
        </div>
      </div>

      {/* Footer Count Badge with Chevron */}
      <div className="pt-4 border-t border-[#E5EAF0] mt-5 flex items-center justify-between text-xs font-semibold text-[#2457A6]">
        <span>{category.serviceCount} {t('common.officialInitiative', 'Verified Schemes')}</span>
        <ChevronRight className="w-4 h-4 text-[#2457A6] group-hover:translate-x-1 transition-transform stroke-[2]" />
      </div>
    </Link>
  );
}

export default CategoryCard;
