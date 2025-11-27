'use client';

import Link from 'next/link';
import type { FeedbackReport } from '@/types';

interface FeedbackReportProps {
  report: FeedbackReport;
  expGain?: number;
  remainingExp?: number;
  onRetry: () => void;
}

export default function FeedbackReportComponent({ report, expGain, remainingExp, onRetry }: FeedbackReportProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-[#10B981]';
    if (score >= 6) return 'text-[#F59E0B]';
    return 'text-[#F87171]';
  };

  const getProgressColor = (score: number) => {
    if (score >= 8) return 'bg-[#10B981]';
    if (score >= 6) return 'bg-[#F59E0B]';
    return 'bg-[#F87171]';
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">오늘의 리포트</h2>
      </div>

      {/* ERS/LS Score Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[#2a2a2a] rounded-xl p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-[#a0a0a0] mb-3">ERS</div>
          <div className={`text-3xl font-bold mb-3 ${getScoreColor(report.ers)}`}>
            {report.ers.toFixed(1)}
          </div>
          <div className="h-2 w-full rounded-full bg-[rgba(255,255,255,0.1)] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${getProgressColor(report.ers)}`}
              style={{ width: `${(report.ers / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-[rgba(255,255,255,0.02)] border border-[#2a2a2a] rounded-xl p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-[#a0a0a0] mb-3">LS</div>
          <div className={`text-3xl font-bold mb-3 ${getScoreColor(report.ls)}`}>
            {report.ls.toFixed(1)}
          </div>
          <div className="h-2 w-full rounded-full bg-[rgba(255,255,255,0.1)] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${getProgressColor(report.ls)}`}
              style={{ width: `${(report.ls / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[#2a2a2a] rounded-xl p-4">
        <div className="text-base text-[#d4d4d4] leading-relaxed">
          <p className="whitespace-pre-line">{report.summary}</p>
        </div>
      </div>

      {/* EXP Gain */}
      {expGain !== undefined && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[#2a2a2a] rounded-xl p-4">
          <div className="text-sm text-[#d4d4d4]">
            이번 세션으로 <span className="text-[#10B981] font-semibold">+{expGain} EXP</span> 획득
          </div>
          {remainingExp !== undefined && remainingExp > 0 && (
            <div className="text-xs text-[#a0a0a0] mt-1">
              다음 레벨까지 {remainingExp} EXP 남음
            </div>
          )}
        </div>
      )}

      {/* Next Goal */}
      <div className="bg-[rgba(220,38,38,0.15)] border border-[#DC2626] rounded-xl p-4">
        <div className="text-xs uppercase tracking-[0.18em] text-[#F87171] mb-2 font-semibold">다음 세션 목표</div>
        <p className="text-sm font-medium text-white">{report.nextGoal}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Link
          href="/"
          className="btn-glass flex-1 text-center"
        >
          돌아가기(홈)
        </Link>
        <button
          onClick={onRetry}
          className="btn-primary flex-1"
        >
          다시 연습하기
        </button>
      </div>
    </div>
  );
}
