'use client';

import { useState, useEffect } from 'react';
import Onboarding from '@/components/Onboarding';
import ScenarioSetup from '@/components/ScenarioSetup';
import CallConsole from '@/components/CallConsole';
import FeedbackReport from '@/components/FeedbackReport';
import { loadExpState, saveExpState, updateExpAfterSession, calculateExpGain } from '@/lib/exp';
import { getDifficultyBand } from '@/lib/difficulty';
import type { SessionConfig, CallLog, FeedbackReport as FeedbackReportType, UserProfile, ExpState } from '@/types';

type SessionStep = 'onboarding' | 'scenario' | 'call' | 'feedback';

export default function SessionPage() {
  const [step, setStep] = useState<SessionStep>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [callLog, setCallLog] = useState<CallLog | null>(null);
  const [feedbackReport, setFeedbackReport] = useState<FeedbackReportType | null>(null);
  const [expState, setExpState] = useState<ExpState | null>(null);
  const [expGain, setExpGain] = useState<number>(0);

  // Load EXP state on mount
  useEffect(() => {
    const state = loadExpState();
    setExpState(state);
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setStep('scenario');
  };

  const handleScenarioStart = (config: SessionConfig) => {
    setSessionConfig(config);
    setStep('call');
  };

  const handleCallFinish = async (log: CallLog) => {
    setCallLog(log);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callLog: log }),
      });

      if (!response.ok) throw new Error('Feedback API failed');

      const data = await response.json();
      setFeedbackReport(data.report);

      // Update EXP
      if (expState) {
        const difficultyBand = getDifficultyBand(expState.level);
        const newExpState = updateExpAfterSession(expState, {
          ers: data.report.ers,
          ls: data.report.ls,
          userLevel: expState.level,
          difficultyBand,
        });
        saveExpState(newExpState);
        setExpState(newExpState);

        // Calculate gain for display
        const gain = calculateExpGain(data.report.ers, data.report.ls, difficultyBand);
        setExpGain(gain);
      }

      setStep('feedback');
    } catch (error) {
      console.error('Error getting feedback:', error);
      setFeedbackReport({
        ers: 7.0,
        ls: 7.0,
        summary: '피드백을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.',
        nextGoal: '통화를 다시 연습해보세요.',
      });
      setStep('feedback');
    }
  };

  const handleRetry = () => {
    setStep('onboarding');
    setUserProfile(null);
    setSessionConfig(null);
    setCallLog(null);
    setFeedbackReport(null);
    setExpGain(0);
  };

  const steps = [
    { id: 'onboarding', number: 0, title: '역할 & 고객', active: step === 'onboarding', completed: step !== 'onboarding' },
    { id: 'scenario', number: 1, title: '레벨 확인', active: step === 'scenario', completed: ['call', 'feedback'].includes(step) },
    { id: 'call', number: 2, title: '통화 진행', active: step === 'call', completed: step === 'feedback' },
    { id: 'feedback', number: 3, title: '피드백', active: step === 'feedback', completed: false },
  ];

  const remainingExp = expState ? expState.expToNext - expState.exp : 0;

  return (
    <main className="min-h-screen p-5">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 fade-in-down">
          <div className="text-xs uppercase tracking-[0.18em] text-[#a0a0a0] mb-2">SESSION</div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">오늘의 콜드콜 연습</h1>
        </div>

        {/* Level/EXP Display */}
        {expState && (
          <div className="text-center mb-6 text-sm text-[#a0a0a0]">
            Lv. {expState.level} · EXP {expState.exp}/{expState.expToNext}
            {expState.streakDays > 1 && (
              <span className="ml-4 text-[#F87171] font-semibold">연속 {expState.streakDays}일 연습 중</span>
            )}
          </div>
        )}

        {/* Stepper Navigation - Epic 스타일 */}
        <div className="mb-8 flex items-center justify-between gap-2 border-b-2 border-[#2a2a2a] pb-2">
          {steps.map((stepItem) => (
            <button
              key={stepItem.id}
              className={`flex-1 py-3 text-center text-xs md:text-sm font-semibold transition-all border-b-3 border-transparent ${
                stepItem.active
                  ? 'text-[#DC2626] border-b-[#DC2626]'
                  : stepItem.completed
                  ? 'text-[#ffffff]'
                  : 'text-[#a0a0a0]'
              }`}
              style={stepItem.active ? { borderBottomWidth: '3px' } : {}}
              disabled
            >
              {stepItem.completed && !stepItem.active && <span className="mr-1">✓</span>}
              <span className="hidden md:inline">{stepItem.title}</span>
              <span className="md:hidden">{stepItem.number}</span>
            </button>
          ))}
        </div>

        {/* Current Step Content */}
        <div className="modular-card fade-in-up">
          {step === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}
          {step === 'scenario' && userProfile && expState && (
            <ScenarioSetup 
              currentLevel={expState.level}
              onStart={handleScenarioStart} 
            />
          )}
          {step === 'call' && sessionConfig && expState && (
            <CallConsole
              sessionConfig={sessionConfig}
              userProfile={userProfile || undefined}
              userLevel={expState.level}
              difficultyBand={getDifficultyBand(expState.level)}
              onFinish={handleCallFinish}
            />
          )}
          {step === 'feedback' && feedbackReport && (
            <FeedbackReport
              report={feedbackReport}
              expGain={expGain}
              remainingExp={remainingExp}
              onRetry={handleRetry}
            />
          )}
        </div>
      </div>
    </main>
  );
}
