'use client';

import type { SessionConfig } from '@/types';
import { getDifficultyBand } from '@/lib/difficulty';

interface ScenarioSetupProps {
  currentLevel: number;
  onStart: (config: SessionConfig) => void;
}

export default function ScenarioSetup({ currentLevel, onStart }: ScenarioSetupProps) {
  const difficultyBand = getDifficultyBand(currentLevel);
  
  const handleStart = () => {
    onStart({
      clientType: 'busy_public_officer',
      difficulty: 'mid',
    });
  };

  const getDifficultyInfo = () => {
    switch (difficultyBand) {
      case 'easy':
        return {
          label: '조금 여유 있는 첫 통화',
          description: '비교적 부드럽고 예의 있는 반응이 예상됩니다',
          mood: '친근',
        };
      case 'normal':
        return {
          label: '바쁜 와중에 받은 전화',
          description: '시간이 없어서 짧게 끝내고 싶어 합니다',
          mood: '서둘러',
        };
      case 'hard':
        return {
          label: '빨리 끊고 싶은 상대',
          description: '상당히 짜증 나 있고 단호하게 거절할 수 있습니다',
          mood: '단호',
        };
    }
  };

  const info = getDifficultyInfo();

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="title-large mb-2">오늘의 레벨</h2>
        <p className="text-body">어제까지의 연습으로 난이도가 자동 설정됩니다</p>
      </div>

      {/* Level Display */}
      <div className="text-center py-8">
        <div className="text-5xl md:text-6xl font-semibold text-slate-50 mb-2">
          Lv. {currentLevel}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="text-xs text-slate-400 mb-2 uppercase tracking-[0.18em]">난이도</div>
          <div className="text-sm font-medium text-slate-50">{difficultyBand.toUpperCase()}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="text-xs text-slate-400 mb-2 uppercase tracking-[0.18em]">예상 통화 분위기</div>
          <div className="text-sm font-medium text-slate-50">{info.label}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="text-xs text-slate-400 mb-2 uppercase tracking-[0.18em]">목표</div>
          <div className="text-sm font-medium text-slate-50">{info.description}</div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleStart}
        className="btn-primary w-full"
      >
        통화 시작하기
      </button>
    </div>
  );
}
