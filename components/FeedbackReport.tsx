'use client';

import Link from 'next/link';
import type { FeedbackReport } from '@/types';

interface FeedbackReportProps {
  report: FeedbackReport;
  onRetry: () => void;
}

export default function FeedbackReportComponent({ report, onRetry }: FeedbackReportProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'bg-green-100 dark:bg-green-900';
    if (score >= 6) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-red-100 dark:bg-red-900';
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8">피드백 리포트</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`p-6 rounded-lg ${getScoreBg(report.ers)}`}>
          <h3 className="text-lg font-semibold mb-2">ERS</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Emotional Resilience Score</p>
          <div className={`text-4xl font-bold ${getScoreColor(report.ers)}`}>
            {report.ers.toFixed(1)}/10
          </div>
        </div>
        
        <div className={`p-6 rounded-lg ${getScoreBg(report.ls)}`}>
          <h3 className="text-lg font-semibold mb-2">LS</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Logic/Structure Score</p>
          <div className={`text-4xl font-bold ${getScoreColor(report.ls)}`}>
            {report.ls.toFixed(1)}/10
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">피드백</h3>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {report.summary}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">다음 목표</h3>
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border-l-4 border-blue-600 dark:border-blue-400">
          <p className="text-blue-900 dark:text-blue-100 font-medium">
            {report.nextGoal}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/"
          className="flex-1 text-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          돌아가기(홈)
        </Link>
        <button
          onClick={onRetry}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          다시 연습하기
        </button>
      </div>
    </div>
  );
}

