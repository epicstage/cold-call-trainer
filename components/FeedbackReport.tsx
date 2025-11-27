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
    if (score >= 8) return 'text-emerald-400';
    if (score >= 6) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getProgressColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-400';
    if (score >= 6) return 'bg-amber-400';
    return 'bg-rose-400';
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="title-large mb-2">오늘의 리포트</h2>
      </div>

      {/* ERS/LS Score Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="subtitle-section mb-3">ERS</div>
          <div className={`text-3xl font-semibold mb-3 ${getScoreColor(report.ers)}`}>
            {report.ers.toFixed(1)}
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${getProgressColor(report.ers)}`}
              style={{ width: `${(report.ers / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="subtitle-section mb-3">LS</div>
          <div className={`text-3xl font-semibold mb-3 ${getScoreColor(report.ls)}`}>
            {report.ls.toFixed(1)}
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${getProgressColor(report.ls)}`}
              style={{ width: `${(report.ls / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <div className="text-body">
          <p className="whitespace-pre-line">{report.summary}</p>
        </div>
      </div>

      {/* EXP Gain */}
      {expGain !== undefined && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="text-sm text-slate-300">
            이번 세션으로 <span className="text-emerald-400 font-semibold">+{expGain} EXP</span> 획득
          </div>
          {remainingExp !== undefined && remainingExp > 0 && (
            <div className="text-xs text-slate-400 mt-1">
              다음 레벨까지 {remainingExp} EXP 남음
            </div>
          )}
        </div>
      )}

      {/* Next Goal */}
      <div className="bg-slate-50 text-slate-900 rounded-2xl p-4">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">다음 세션 목표</div>
        <p className="text-sm font-medium">{report.nextGoal}</p>
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
