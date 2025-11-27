'use client';

import { useState } from 'react';
import type { UserRole, UserProfile, ClientPersona } from '@/types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [role, setRole] = useState<UserRole>('insurance_agent');
  const [roleDetail, setRoleDetail] = useState('');
  const [clientDescription, setClientDescription] = useState('');
  const [persona, setPersona] = useState<ClientPersona | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const roles: { value: UserRole; label: string }[] = [
    { value: 'insurance_agent', label: '보험 설계사' },
    { value: 'freelancer_creator', label: '프리랜서' },
    { value: 'startup_founder', label: '스타트업 대표' },
    { value: 'b2b_sales', label: 'B2B 영업' },
    { value: 'job_seeker', label: '구직 중' },
    { value: 'other', label: '기타' },
  ];

  const handleGeneratePersona = async () => {
    if (!clientDescription.trim()) {
      alert('고객님 유형을 입력해주세요.');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/persona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          rawDescription: clientDescription,
        }),
      });

      if (!response.ok) throw new Error('Persona generation failed');

      const data = await response.json();
      setPersona(data.persona);
    } catch (error) {
      console.error('Error generating persona:', error);
      alert('페르소나 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!persona) {
      alert('AI로 고객님을 먼저 만들어주세요.');
      return;
    }

    const profile: UserProfile = {
      role,
      roleDetail: role === 'other' ? roleDetail : undefined,
      persona,
    };

    onComplete(profile);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="title-large mb-2">당신은 어떤 타입의 발신자인가요?</h2>
        <p className="text-body">역할을 선택하고 오늘 연습할 고객을 설정하세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Role Selection */}
        <div>
          <label className="subtitle-section block mb-4">발신자 역할</label>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`rounded-2xl border px-4 py-3 text-sm text-left transition-all ${
                  role === r.value
                    ? 'bg-slate-50 text-slate-900 border-transparent shadow-sm'
                    : 'border-white/15 bg-white/5 text-slate-100 hover:bg-white/10'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          {role === 'other' && (
            <input
              type="text"
              value={roleDetail}
              onChange={(e) => setRoleDetail(e.target.value)}
              placeholder="역할을 입력하세요"
              className="mt-3 w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-100/40"
            />
          )}
        </div>

        {/* Client Description */}
        <div>
          <label className="subtitle-section block mb-4">어떤 고객에게 전화를 거는지</label>
          <input
            type="text"
            value={clientDescription}
            onChange={(e) => setClientDescription(e.target.value)}
            placeholder="예: 대기업 인사담당자, 프랜차이즈 점주, 스타트업 대표"
            className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-100/40 mb-3"
          />
          <button
            type="button"
            onClick={handleGeneratePersona}
            disabled={isGenerating || !clientDescription.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? '생성 중...' : 'AI로 고객님 만들기'}
          </button>

          {/* Persona Card */}
          {persona && (
            <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
              <div>
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-[0.18em]">고객 유형</div>
                <div className="text-sm font-medium text-slate-50">{persona.shortLabel}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-[0.18em]">설명</div>
                <div className="text-sm text-slate-200">{persona.description}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-[0.18em]">전형적인 멘트</div>
                <div className="space-y-1">
                  {persona.typicalExcuses.slice(0, 3).map((excuse, idx) => (
                    <div key={idx} className="text-sm text-slate-300">• {excuse}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-[0.18em]">말투</div>
                <div className="text-sm text-slate-200">{persona.tone}</div>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!persona}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음 단계로
        </button>
      </form>
    </div>
  );
}
