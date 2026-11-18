import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, ArrowRight, Volume2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export function ServiceCard({ service, onSpeak }) {
  return (
    <Card hoverable className="flex flex-col justify-between h-full bg-white border border-slate-200/90 rounded-xl p-5">
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant="teal" icon={<ShieldCheck className="w-3 h-3 text-[#0D9488]" />}>
            {service.officialFee}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{service.processingTime}</span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1E40AF] transition-colors leading-snug">
            {service.title}
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* Benefit Highlight Box */}
        {service.benefitAmount && (
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-lg p-2.5 text-xs text-slate-700">
            <span className="font-semibold text-slate-900 block text-[11px] uppercase tracking-wide">
              Official Entitlement:
            </span>
            <span className="text-slate-800 font-medium">{service.benefitAmount}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
        {onSpeak && (
          <button
            type="button"
            onClick={() => onSpeak(service.spokenSummary || `${service.title}. ${service.shortDescription}`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] hover:text-[#0D9488] bg-teal-50 px-2.5 py-1.5 rounded-lg border border-teal-200/70 transition-colors cursor-pointer"
            title="Listen to explanation in your language"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Listen</span>
          </button>
        )}

        <Link
          to={`/services/${service.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E40AF] hover:text-[#1E3A8A] transition-colors ml-auto group"
        >
          <span>View Simple Steps</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </Card>
  );
}

export default ServiceCard;
