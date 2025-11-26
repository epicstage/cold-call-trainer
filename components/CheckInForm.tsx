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
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Check-in</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">
            지금 콜드콜 생각하면 얼마나 부담스럽나요?
            <span className="ml-2 text-blue-600 dark:text-blue-400">{intensity}/10</span>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>전혀 아님</span>
            <span>매우 부담스러움</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            현재 감정 상태는?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {emotions.map((emo) => (
              <button
                key={emo}
                type="button"
                onClick={() => setEmotion(emo)}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  emotion === emo
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                {emo}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          다음 단계로
        </button>
      </form>
    </div>
  );
}

