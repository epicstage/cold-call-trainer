'use client';

import { useState } from 'react';
import type { SessionConfig } from '@/types';

interface ScenarioSetupProps {
  onStart: (sessionConfig: SessionConfig) => void;
}

export default function ScenarioSetup({ onStart }: ScenarioSetupProps) {
  const [clientType, setClientType] = useState<SessionConfig['clientType']>('busy_public_officer');
  const [difficulty, setDifficulty] = useState<SessionConfig['difficulty']>('light');

  const handleStart = () => {
    onStart({ clientType, difficulty });
  };

  const clientTypes = [
    { value: 'busy_public_officer' as const, label: '바쁜 공공기관 담당자' },
    { value: 'cold_startup_ceo' as const, label: '냉담한 스타트업 CEO' },
    { value: 'defensive_manager' as const, label: '방어적인 관리자' },
  ];

  const difficulties = [
    { value: 'light' as const, label: '쉬움', desc: '친절하고 반응이 좋음' },
    { value: 'mid' as const, label: '보통', desc: '일반적인 반응' },
    { value: 'hard' as const, label: '어려움', desc: '적대적이고 회피적' },
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Scenario Setup</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">
            클라이언트 유형
          </label>
          <select
            value={clientType}
            onChange={(e) => setClientType(e.target.value as SessionConfig['clientType'])}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {clientTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            난이도
          </label>
          <div className="space-y-2">
            {difficulties.map((diff) => (
              <label
                key={diff.value}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  difficulty === diff.value
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900 dark:border-blue-400'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="difficulty"
                  value={diff.value}
                  checked={difficulty === diff.value}
                  onChange={(e) => setDifficulty(e.target.value as SessionConfig['difficulty'])}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">{diff.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{diff.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          통화 시작하기
        </button>
      </div>
    </div>
  );
}

