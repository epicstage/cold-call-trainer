'use client';

import { useState } from 'react';
import type { PreEmotionData } from '@/types';

interface CheckInFormProps {
  onComplete: (preEmotionData: PreEmotionData) => void;
}

export default function CheckInForm({ onComplete }: CheckInFormProps) {
  const [intensity, setIntensity] = useState<number>(5);
  const [emotion, setEmotion] = useState<PreEmotionData['emotion']>('불안');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ intensity, emotion });
  };

  const emotions: PreEmotionData['emotion'][] = ['불안', '귀찮음', '짜증', '기대'];

  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold mb-2 text-neutral-50">Step 1 · 감정 체크인</h2>
      <p className="text-sm text-neutral-400 mb-6">콜드콜을 시작하기 전 현재 기분을 체크인하세요</p>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-neutral-400">부담감</label>
            <span className="text-sm font-medium text-neutral-50">{intensity}/10</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-4 text-neutral-400">현재 감정 상태</label>
          <div className="flex flex-wrap gap-2 justify-center">
            {emotions.map((emo) => (
              <button
                key={emo}
                type="button"
                onClick={() => setEmotion(emo)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  emotion === emo
                    ? 'bg-white text-neutral-900 border-transparent'
                    : 'border-white/15 bg-white/5 text-neutral-100'
                }`}
              >
                {emo}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-full bg-white text-neutral-900 px-6 py-2.5 md:px-7 md:py-2.5 text-sm font-medium shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:bg-neutral-100 active:scale-[0.99] transition-all"
        >
          다음 단계로
        </button>
      </form>
    </div>
  );
}
