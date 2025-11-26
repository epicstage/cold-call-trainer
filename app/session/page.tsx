'use client';

import { useState } from 'react';
import CheckInForm from '@/components/CheckInForm';
import ScenarioSetup from '@/components/ScenarioSetup';
import CallConsole from '@/components/CallConsole';
import FeedbackReport from '@/components/FeedbackReport';
import type { PreEmotionData, SessionConfig, CallLog, FeedbackReport as FeedbackReportType } from '@/types';

type SessionStep = 'checkin' | 'scenario' | 'call' | 'feedback';

export default function SessionPage() {
  const [step, setStep] = useState<SessionStep>('checkin');
  const [preEmotion, setPreEmotion] = useState<PreEmotionData | null>(null);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [callLog, setCallLog] = useState<CallLog | null>(null);
  const [feedbackReport, setFeedbackReport] = useState<FeedbackReportType | null>(null);

  const handleCheckInComplete = (preEmotionData: PreEmotionData) => {
    setPreEmotion(preEmotionData);
    setStep('scenario');
  };

  const handleScenarioStart = (config: SessionConfig) => {
    setSessionConfig(config);
    setStep('call');
  };

  const handleCallFinish = async (log: CallLog) => {
    setCallLog(log);
    
    // Get feedback from API
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callLog: log }),
      });

      if (!response.ok) throw new Error('Feedback API failed');

      const data = await response.json();
      setFeedbackReport(data.report);
      setStep('feedback');
    } catch (error) {
      console.error('Error getting feedback:', error);
      // Fallback feedback
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
    setStep('checkin');
    setPreEmotion(null);
    setSessionConfig(null);
    setCallLog(null);
    setFeedbackReport(null);
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {step === 'checkin' && <CheckInForm onComplete={handleCheckInComplete} />}
        {step === 'scenario' && preEmotion && <ScenarioSetup onStart={handleScenarioStart} />}
        {step === 'call' && sessionConfig && preEmotion && (
          <CallConsole
            sessionConfig={sessionConfig}
            preEmotion={preEmotion}
            onFinish={handleCallFinish}
          />
        )}
        {step === 'feedback' && feedbackReport && (
          <FeedbackReport report={feedbackReport} onRetry={handleRetry} />
        )}
      </div>
    </main>
  );
}

