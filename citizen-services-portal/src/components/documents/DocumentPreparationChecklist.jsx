import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle,
  Check,
  RotateCcw,
  AlertCircle,
  ShieldCheck,
  FileText,
  Printer,
  Info,
  Layers,
  CheckSquare,
  Square,
  HelpCircle,
  X,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../design-system/Button';
import { AudioGuideButton } from '../voice/AudioGuideButton';
import { getDocumentTranslation } from '../../data/documentTranslations';
import { cn } from '../../utilities/classNames';

export function DocumentPreparationChecklist({
  service,
  onProgressChange,
  className,
  showServiceSelector = false,
  allServices = [],
  onSelectService,
}) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.slice(0, 2) : 'en';

  const serviceId = service?.id || 'income-certificate';
  const storageKey = `citizen_doc_checklist_${serviceId}`;

  // State: checked status map { [docId]: boolean }
  const [checkedDocs, setCheckedDocs] = useState({});
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'remaining' | 'ready'
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Load saved checklist from localStorage on mount or service change
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        setCheckedDocs(JSON.parse(raw));
      } else {
        setCheckedDocs({});
      }
    } catch {
      setCheckedDocs({});
    }
  }, [storageKey]);

  // Persist checked status changes to localStorage
  const handleToggleDoc = (docId) => {
    setCheckedDocs((prev) => {
      const updated = {
        ...prev,
        [docId]: !prev[docId],
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // Safe fallback
      }
      return updated;
    });
  };

  // Reset checklist
  const handleResetChecklist = () => {
    setCheckedDocs({});
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Safe fallback
    }
    setIsResetModalOpen(false);
  };

  // Documents list strictly verified for this service
  const rawDocs = service?.documentDetails || [];

  // Localized document items
  const localizedDocs = useMemo(() => {
    return rawDocs.map((doc, idx) => {
      const docId = doc.id || `doc-${serviceId}-${idx}`;
      const translation = getDocumentTranslation(docId, currentLang) || {};

      return {
        id: docId,
        name: translation.name || doc.name,
        explanation: translation.explanation || doc.explanation || 'Verified government documentation required for processing.',
        example: translation.example || doc.example || 'Official state document with applicant details and authority seal.',
        source: translation.source || doc.source || 'Local Revenue / Panchayat office',
        photocopiesNeeded: doc.photocopiesNeeded || 1,
        isMandatory: doc.isMandatory !== false,
      };
    });
  }, [rawDocs, serviceId, currentLang]);

  // Calculations
  const totalCount = localizedDocs.length;
  const preparedCount = localizedDocs.filter((d) => Boolean(checkedDocs[d.id])).length;
  const remainingCount = totalCount - preparedCount;
  const progressPercent = totalCount > 0 ? Math.round((preparedCount / totalCount) * 100) : 0;
  const allReady = totalCount > 0 && preparedCount === totalCount;

  // Notify parent of progress changes if callback provided
  useEffect(() => {
    if (onProgressChange) {
      onProgressChange({
        total: totalCount,
        prepared: preparedCount,
        remaining: remainingCount,
        percent: progressPercent,
        allReady,
      });
    }
  }, [totalCount, preparedCount, remainingCount, progressPercent, allReady, onProgressChange]);

  // Filtered list
  const displayedDocs = useMemo(() => {
    if (filterMode === 'ready') {
      return localizedDocs.filter((d) => Boolean(checkedDocs[d.id]));
    }
    if (filterMode === 'remaining') {
      return localizedDocs.filter((d) => !checkedDocs[d.id]);
    }
    return localizedDocs;
  }, [localizedDocs, filterMode, checkedDocs]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* =========================================================================
          1. STATUTORY PRIVACY & SENSITIVE DATA PROTECTION NOTICE
      ========================================================================== */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-[#2457A6]/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#2457A6] flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-xs">
          <h4 className="font-bold text-[#2457A6] uppercase tracking-wider">
            Official Citizen Privacy Notice
          </h4>
          <p className="text-[#202938] leading-relaxed">
            {t(
              'documents.noUploadNotice',
              'Official Privacy Policy: Do NOT upload Aadhaar numbers or original document files online. This checklist is for your physical in-hand verification before visiting the counter.'
            )}
          </p>
        </div>
      </div>

      {/* =========================================================================
          2. CHECKLIST METRICS HEADER & PROGRESS BAR
      ========================================================================== */}
      <div className="bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF0] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#168C83] bg-[#F0FAF9] border border-teal-200/80 px-2.5 py-0.5 rounded">
                {t('documents.badge', 'Official Paperwork Checklist')}
              </span>
              <span className="text-xs text-[#667085] flex items-center gap-1">
                <Printer className="w-3.5 h-3.5" />
                <span>Keep photocopies ready</span>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#202938] mt-1.5">
              {t('documents.checklistTitle', 'Document Preparation Checklist')}
            </h2>
          </div>

          {/* Reset Button */}
          <div className="flex items-center gap-2">
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => setIsResetModalOpen(true)}
              className="text-xs text-[#667085] hover:text-red-600 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('documents.resetBtn', 'Reset Checklist')}</span>
            </Button>
          </div>
        </div>

        {/* Metric Cards (Total, Prepared, Remaining) */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#F7F9FC] p-3.5 rounded-xl border border-[#E5EAF0] space-y-1">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block">
              {t('documents.total', 'Total Documents')}
            </span>
            <div className="text-xl font-bold text-[#202938]">{totalCount}</div>
            <span className="text-[11px] text-[#667085]">Verified for scheme</span>
          </div>

          <div className="bg-[#F0FAF9] p-3.5 rounded-xl border border-teal-200/80 space-y-1">
            <span className="text-[11px] font-bold text-[#168C83] uppercase tracking-wider block">
              {t('documents.prepared', 'Prepared')}
            </span>
            <div className="text-xl font-bold text-[#0E5853]">{preparedCount}</div>
            <span className="text-[11px] text-[#168C83]">Ready in hand</span>
          </div>

          <div
            className={cn(
              'p-3.5 rounded-xl border space-y-1 transition-colors',
              remainingCount > 0
                ? 'bg-white border-[#E5EAF0]'
                : 'bg-[#F0FAF9] border-teal-200/80'
            )}
          >
            <span
              className={cn(
                'text-[11px] font-bold uppercase tracking-wider block',
                remainingCount > 0 ? 'text-[#667085]' : 'text-[#168C83]'
              )}
            >
              {t('documents.remaining', 'Remaining')}
            </span>
            <div
              className={cn(
                'text-xl font-bold',
                remainingCount > 0 ? 'text-[#2457A6]' : 'text-[#0E5853]'
              )}
            >
              {remainingCount}
            </div>
            <span
              className={cn(
                'text-[11px]',
                remainingCount > 0 ? 'text-[#667085]' : 'text-[#168C83]'
              )}
            >
              {remainingCount === 0 ? 'All Complete!' : 'Needs photocopy'}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#667085]">{t('documents.progress', 'Preparation Progress')}</span>
            <span className="text-[#2457A6] font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#E5EAF0] h-2.5 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-300',
                allReady ? 'bg-[#168C83]' : 'bg-[#2457A6]'
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#E5EAF0]">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
              filterMode === 'all'
                ? 'bg-[#2457A6] text-white shadow-2xs'
                : 'bg-[#F7F9FC] text-[#667085] hover:bg-[#EEF3FA] hover:text-[#202938]'
            )}
          >
            {t('documents.filterAll', 'All Documents')} ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('remaining')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
              filterMode === 'remaining'
                ? 'bg-[#2457A6] text-white shadow-2xs'
                : 'bg-[#F7F9FC] text-[#667085] hover:bg-[#EEF3FA] hover:text-[#202938]'
            )}
          >
            {t('documents.filterRemaining', 'Remaining')} ({remainingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('ready')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
              filterMode === 'ready'
                ? 'bg-[#2457A6] text-white shadow-2xs'
                : 'bg-[#F7F9FC] text-[#667085] hover:bg-[#EEF3FA] hover:text-[#202938]'
            )}
          >
            {t('documents.filterReady', 'Ready')} ({preparedCount})
          </button>
        </div>
      </div>

      {/* =========================================================================
          3. VERIFIED DOCUMENTS CHECKLIST ITEMS
      ========================================================================== */}
      <div className="space-y-4">
        {displayedDocs.map((doc, idx) => {
          const isReady = Boolean(checkedDocs[doc.id]);

          const spokenItemText = `${doc.name}. ${doc.isMandatory ? 'Mandatory document.' : 'Optional document.'} ${doc.photocopiesNeeded} photocopy required. Why is this required: ${doc.explanation}. Illustrative example: ${doc.example}. Where to obtain: ${doc.source}. Currently ${isReady ? 'marked as ready.' : 'not yet marked ready.'}`;

          return (
            <div
              key={doc.id}
              className={cn(
                'rounded-xl border transition-all bg-white p-5 sm:p-6 shadow-2xs space-y-4',
                isReady
                  ? 'border-teal-300 ring-1 ring-teal-300/40 bg-[#F0FAF9]/25'
                  : 'border-[#E5EAF0] hover:border-[#2457A6]/50'
              )}
            >
              {/* Top Row: Checkbox, Name, Status Badge, Audio Button */}
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-start gap-3.5 flex-1 min-w-[260px]">
                  {/* Interactive Checkbox Button (min 48px tap target) */}
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={isReady}
                    onClick={() => handleToggleDoc(doc.id)}
                    className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all flex-shrink-0 cursor-pointer shadow-2xs',
                      isReady
                        ? 'bg-[#168C83] border-[#168C83] text-white ring-2 ring-teal-200'
                        : 'bg-white border-[#CBD5E1] hover:border-[#2457A6] text-transparent'
                    )}
                    aria-label={`Mark ${doc.name} as ${isReady ? 'not ready' : 'ready'}`}
                  >
                    <Check className={cn('w-6 h-6 stroke-[3]', isReady ? 'opacity-100' : 'opacity-0')} />
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        onClick={() => handleToggleDoc(doc.id)}
                        className={cn(
                          'text-base sm:text-lg font-bold cursor-pointer transition-colors',
                          isReady ? 'text-[#0E5853]' : 'text-[#202938]'
                        )}
                      >
                        {doc.name}
                      </h3>
                      {doc.isMandatory ? (
                        <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                          {t('common.mandatory', 'Mandatory')}
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#667085] bg-[#F7F9FC] border border-[#E5EAF0] px-2 py-0.5 rounded">
                          Optional
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#667085] flex-wrap">
                      <span className="font-semibold text-[#168C83] bg-[#F0FAF9] px-2 py-0.5 rounded border border-teal-200/60">
                        {doc.photocopiesNeeded} {doc.photocopiesNeeded === 1 ? t('common.photocopy', 'Photocopy') : t('common.photocopies', 'Photocopies')} {t('common.required', 'Required')}
                      </span>
                      <span>•</span>
                      <span>Source: <strong className="text-[#202938]">{doc.source}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right Actions: Prepared Toggle Badge & Audio Button */}
                <div className="flex items-center gap-2.5">
                  <AudioGuideButton
                    id={`audio-doc-${doc.id}`}
                    title={doc.name}
                    text={spokenItemText}
                    label={t('common.listen', 'Listen')}
                    size="sm"
                    variant="secondary"
                  />

                  <button
                    type="button"
                    onClick={() => handleToggleDoc(doc.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5',
                      isReady
                        ? 'bg-[#168C83] text-white border-[#168C83]'
                        : 'bg-white text-[#202938] border-[#E5EAF0] hover:border-[#2457A6]'
                    )}
                  >
                    {isReady ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{t('documents.readyStatus', 'Ready')}</span>
                      </>
                    ) : (
                      <span>{t('documents.markReady', 'Mark as Ready')}</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Middle Section: Simple Explanation */}
              <div className="p-3.5 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] space-y-1">
                <span className="text-[11px] font-bold text-[#2457A6] uppercase tracking-wider flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  {t('documents.explanationLabel', 'Why is this required?')}
                </span>
                <p className="text-xs sm:text-sm text-[#202938] leading-relaxed">
                  {doc.explanation}
                </p>
              </div>

              {/* Bottom Section: Illustrative Example of Document */}
              <div className="p-3.5 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] space-y-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-[#2457A6] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#2457A6]" />
                    {t('documents.exampleLabel', 'Illustrative Example:')}
                  </span>
                  <span className="text-[10px] text-[#667085] bg-white px-2 py-0.5 rounded border border-[#E5EAF0]">
                    Sample Representation Only
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#202938] leading-relaxed font-medium">
                  {doc.example}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          4. ALL PREPARED CELEBRATION CARD
      ========================================================================== */}
      {allReady && (
        <div className="p-5 rounded-xl bg-[#F0FAF9] border-2 border-[#168C83] text-[#0E5853] flex items-center gap-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-[#168C83] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <CheckCircle className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-base font-bold text-[#0E5853]">
              {t('documents.allReadyTitle', 'All Required Documents Are Ready!')}
            </h4>
            <p className="text-xs sm:text-sm text-[#168C83] leading-relaxed">
              {t('documents.allReadyDesc', 'You have prepared all required documents for this service. You are ready to proceed with your application.')}
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. STATUTORY DISCLAIMER REGARDING ACCEPTED ALTERNATIVES
      ========================================================================== */}
      <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] flex items-start gap-3 text-xs text-[#667085]">
        <Info className="w-4 h-4 text-[#667085] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t(
            'documents.exampleDisclaimer',
            'Notice: Example documents are illustrative and not universally accepted in every state. Local issuing authorities determine the final accepted list.'
          )}
        </p>
      </div>

      {/* =========================================================================
          6. RESET CHECKLIST CONFIRMATION MODAL
      ========================================================================== */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-[#E5EAF0] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202938]">
                    Reset Document Checklist?
                  </h3>
                  <span className="text-xs text-[#667085]">
                    {service.title}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="p-1 rounded text-[#667085] hover:text-[#202938]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
              {t(
                'documents.resetConfirm',
                'Are you sure you want to reset your checklist progress? All marked checkmarks will be cleared.'
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="tertiary"
                size="md"
                onClick={() => setIsResetModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleResetChecklist}
                className="bg-red-600 hover:bg-red-700 border-red-600 text-white"
              >
                Yes, Reset Checklist
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentPreparationChecklist;
