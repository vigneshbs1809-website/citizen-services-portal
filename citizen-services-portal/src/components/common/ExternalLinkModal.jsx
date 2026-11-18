import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, ShieldCheck, X, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../../design-system/Button';

export function ExternalLinkModal({
  isOpen,
  onClose,
  portalName,
  portalUrl,
  department,
  verificationStatus = 'verified',
  lastVerified,
}) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleProceed = () => {
    window.open(portalUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="external-link-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E5EAF0] shadow-xl overflow-hidden space-y-0 animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#F7F9FC] border-b border-[#E5EAF0] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2457A6]/10 text-[#2457A6] flex items-center justify-center">
              <ExternalLink className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h3 id="external-link-modal-title" className="text-sm font-bold text-[#202938]">
                {t('externalLink.title', 'Leaving Citizen Services Portal')}
              </h3>
              <p className="text-[11px] text-[#667085]">
                {t('externalLink.subtitle', 'Official External Government Infrastructure')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#667085] hover:text-[#202938] p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C83] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#168C83]" />
                {verificationStatus === 'verified' ? t('externalLink.verifiedGovt', 'Verified Government Website') : t('externalLink.unverified', 'Pending Verification')}
              </span>
              {lastVerified && (
                <span className="text-[10px] text-[#0E5853] font-medium">
                  {t('externalLink.lastAudited', 'Audited')}: {lastVerified}
                </span>
              )}
            </div>
            <h4 className="text-sm font-bold text-[#202938]">{portalName}</h4>
            {department && <p className="text-[#667085] text-xs">{department}</p>}
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#2457A6] hover:underline break-all bg-white px-2.5 py-1.5 rounded border border-teal-100 flex items-center justify-between gap-2"
            >
              <span>{portalUrl}</span>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            </a>
          </div>

          <p className="text-[#667085] leading-relaxed">
            {t(
              'externalLink.notice',
              'You are now opening an official central or state government website in a new tab. Our portal provides informational guidance only and never collects your credentials or personal documents.'
            )}
          </p>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              {t(
                'externalLink.securityTip',
                'Verify the browser address bar displays https:// and ends in .gov.in or .nic.in before entering any official application details.'
              )}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#F7F9FC] border-t border-[#E5EAF0] px-6 py-3.5 flex items-center justify-between gap-3">
          <Button variant="tertiary" size="sm" onClick={onClose}>
            {t('common.cancel', 'Return to Portal')}
          </Button>

          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2457A6] hover:bg-[#1A4280] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <span>{t('externalLink.openOfficialSite', 'Proceed to Official Portal')}</span>
            <ExternalLink className="w-4 h-4 stroke-[2]" />
          </a>
        </div>
      </div>
    </div>
  );
}
