import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, FileText, PhoneCall, X } from 'lucide-react';
import { cn } from '../utilities/classNames';

export function Alert({
  children,
  title,
  variant = 'info',
  icon,
  onDismiss,
  className,
}) {
  const variants = {
    // Info: Royal Blue theme #2457A6
    info: 'bg-[#EEF3FA] border-blue-200/90 text-[#202938]',
    
    // Success / Trust: Teal theme #168C83
    success: 'bg-[#F0FAF9] border-teal-200/90 text-[#0E5853]',
    
    // Warning: Official amber banner
    warning: 'bg-amber-50/80 border-amber-200 text-amber-950',
    
    // Critical / Error: Subtle rose
    critical: 'bg-rose-50/80 border-rose-200 text-rose-950',
  };

  const defaultIcons = {
    info: <FileText className="w-4 h-4 text-[#2457A6] flex-shrink-0 mt-0.5 stroke-[2]" />,
    success: <CheckCircle className="w-4 h-4 text-[#168C83] flex-shrink-0 mt-0.5 stroke-[2]" />,
    warning: <CheckCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5 stroke-[2]" />,
    critical: <X className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5 stroke-[2]" />,
  };

  return (
    <div
      role="alert"
      className={cn(
        'rounded-xl border p-4 flex items-start gap-3.5 transition-all text-xs leading-relaxed shadow-2xs',
        variants[variant],
        className
      )}
    >
      {icon ? <span className="flex-shrink-0 mt-0.5">{icon}</span> : defaultIcons[variant]}

      <div className="flex-1 space-y-1">
        {title && <h5 className="font-bold text-sm tracking-tight">{title}</h5>}
        <div>{children}</div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-[#667085] hover:text-[#202938] p-1 rounded-md transition-colors cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function AntiCorruptionBanner({ className }) {
  const { t } = useTranslation();

  return (
    <Alert
      variant="warning"
      title={t('antiCorruption.title', 'Citizen Protection: Zero Tolerance for Unofficial Charges')}
      className={className}
    >
      <p>
        {t('antiCorruption.description', 'Government welfare schemes are free of charge. If anyone demands a bribe, commission, or unofficial fee, report immediately to the Vigilance Helpline.')}{' '}
        <strong className="text-amber-950 font-mono">1964</strong>.
      </p>
    </Alert>
  );
}

export default Alert;
