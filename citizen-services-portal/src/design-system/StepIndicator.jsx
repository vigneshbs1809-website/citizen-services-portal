import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utilities/classNames';
import { AudioGuideButton } from '../components/voice/AudioGuideButton';

export function StepCard({ number, title, description, className, active = false, completed = false }) {
  return (
    <div
      className={cn(
        'p-6 rounded-xl border bg-white space-y-3.5 transition-all duration-150 shadow-2xs',
        active ? 'border-[#2457A6] ring-1 ring-[#2457A6]/20' : 'border-[#E5EAF0] hover:border-[#2457A6]/40',
        className
      )}
    >
      {/* Number Badge */}
      <div
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-2xs',
          number % 2 === 1 ? 'bg-[#2457A6] text-white' : 'bg-[#168C83] text-white'
        )}
      >
        {number}
      </div>

      {/* Step Title & Description */}
      <div className="space-y-1">
        <h4 className="text-base font-bold text-[#202938]">{title}</h4>
        <p className="text-xs text-[#667085] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export function VerticalStepGuide({ steps = [], className, serviceId = 'service' }) {
  const { t } = useTranslation();
  if (!steps || steps.length === 0) return null;

  return (
    <div className={cn('space-y-4', className)}>
      {steps.map((step, idx) => {
        const stepNum = step.stepNumber || idx + 1;
        const stepTitle = step.title;
        const stepInstruction = step.instruction || step.description;

        return (
          <div
            key={stepNum}
            className="flex items-start gap-4 p-5 rounded-xl border border-[#E5EAF0] bg-white shadow-2xs hover:border-[#2457A6]/40 transition-colors"
          >
            {/* Step Number Circle */}
            <div
              className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm text-white flex-shrink-0 shadow-2xs',
                stepNum % 2 === 1 ? 'bg-[#2457A6]' : 'bg-[#168C83]'
              )}
            >
              {stepNum}
            </div>

            {/* Instruction Body */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h4 className="text-sm font-bold text-[#202938]">
                  {stepTitle}
                </h4>
                <AudioGuideButton
                  id={`step-${serviceId}-${stepNum}`}
                  title={`${t('common.step', 'Step')} ${stepNum}: ${stepTitle}`}
                  text={`${t('common.step', 'Step')} ${stepNum}. ${stepTitle}. ${stepInstruction}`}
                  label={t('voice.listenStep', { number: stepNum, defaultValue: `Listen to Step ${stepNum}` })}
                  size="sm"
                  variant="secondary"
                />
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                {stepInstruction}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function HorizontalProgressBar({ currentStep = 1, totalSteps = 4, stepLabels = [] }) {
  return (
    <div className="w-full flex items-center justify-between gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                  isCompleted && 'bg-[#168C83] text-white',
                  isCurrent && 'bg-[#2457A6] text-white ring-2 ring-[#2457A6]/20',
                  !isCompleted && !isCurrent && 'bg-[#E5EAF0] text-[#667085]'
                )}
              >
                {step}
              </div>
              {stepLabels[index] && (
                <span
                  className={cn(
                    'text-xs font-semibold hidden sm:inline',
                    isCurrent ? 'text-[#2457A6]' : 'text-[#667085]'
                  )}
                >
                  {stepLabels[index]}
                </span>
              )}
            </div>

            {index < totalSteps - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2',
                  step < currentStep ? 'bg-[#168C83]' : 'bg-[#E5EAF0]'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default StepCard;
