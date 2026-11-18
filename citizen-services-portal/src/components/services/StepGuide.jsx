import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';

export function StepGuide({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-4">
      {steps.map((step, idx) => (
        <div
          key={step.stepNumber || idx}
          className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs hover:border-slate-300 transition-colors"
        >
          {/* Step Number Circle */}
          <div className="w-9 h-9 rounded-full bg-[#1E40AF] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-xs">
            {step.stepNumber || idx + 1}
          </div>

          {/* Step Text Content */}
          <div className="space-y-1 flex-1">
            <h4 className="text-sm font-bold text-slate-900">
              {step.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {step.instruction}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StepGuide;
