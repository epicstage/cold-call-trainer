'use client';

import { useState, useEffect, useRef } from 'react';
import { playDialTone } from '@/lib/dialTone';
import type { SessionConfig, Message, CallLog, UserProfile, DifficultyBand } from '@/types';

interface CallConsoleProps {
  sessionConfig: SessionConfig;
  userProfile?: UserProfile;
  userLevel?: number;
  difficultyBand?: DifficultyBand;
  onFinish: (callLog: CallLog) => void;
}

export default function CallConsole({ sessionConfig, userProfile, userLevel, difficultyBand, onFinish }: CallConsoleProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [fallbackText, setFallbackText] = useState('');

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize call with dial tone on mount
  useEffect(() => {
    const initCall = async () => {
      setIsConnecting(true);
      await playDialTone();
      setIsConnecting(false);
      setIsCallActive(true);
      startTimeRef.current = Date.now(); // Start timer after dial tone
    };
    
    initCall();
  }, []);

  // Initialize Speech APIs (only after dial tone finishes)
  useEffect(() => {
    if (!isCallActive) return; // Wait until dial tone finishes
    
    // Check for Speech Recognition support
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(' ');
      
      if (transcript.trim()) {
        handleUserMessage(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      if (isMicOn && !isProcessing) {
        // Restart recognition if mic is still on
        setTimeout(() => {
          if (isMicOn) {
            recognition.start();
          }
        }, 100);
      }
    };

    recognitionRef.current = recognition;

    // Start timer
    intervalRef.current = setInterval(() => {
      setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      recognition.stop();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isCallActive]);

  const playTTSAudio = async (text: string) => {
    try {
      setIsPlayingAudio(true);

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Call ElevenLabs TTS API
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('TTS API failed');
      }

      // Get audio blob
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create and play audio
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      audio.onerror = () => {
        console.warn('Audio playback failed');
        setIsPlayingAudio(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      audio.playbackRate = 1.3; // Faster playback for more natural feel
      await audio.play();
    } catch (error) {
      console.warn('TTS audio generation or playback failed:', error);
      setIsPlayingAudio(false);
      // Still show the text even if audio fails
    }
  };

  const handleUserMessage = async (userText: string) => {
    if (!userText.trim()) return;

    setIsProcessing(true);
    const userMessage: Message = {
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // API 요청 바디 구성
      const requestBody: any = {
        userMessage: userText,
      };

      // UserProfile 정보 추가
      if (userProfile) {
        const roleNames: Record<string, string> = {
          insurance_agent: '보험 설계사',
          freelancer_creator: '프리랜서',
          startup_founder: '스타트업 대표',
          b2b_sales: 'B2B 영업',
          job_seeker: '구직 중',
          other: userProfile.roleDetail || '일반인',
        };
        requestBody.userProfile = {
          role: roleNames[userProfile.role] || userProfile.role,
          name: userProfile.roleDetail,
        };

        // Persona 정보 추가
        if (userProfile.persona) {
          requestBody.persona = {
            shortLabel: userProfile.persona.shortLabel,
            description: userProfile.persona.description,
            typicalExcuses: userProfile.persona.typicalExcuses,
            tone: userProfile.persona.tone,
            riskSensitivity: userProfile.persona.riskSensitivity,
          };
        }
      }

      // 레벨 및 난이도 정보 추가
      if (userLevel !== undefined) {
        requestBody.userLevel = userLevel;
      }
      if (difficultyBand) {
        requestBody.difficultyBand = difficultyBand;
      }

      const response = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error('API call failed');

      const data = await response.json();
      const clientMessage: Message = {
        role: 'client',
        content: data.reply || data.text || data.message || '응답을 생성할 수 없습니다.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, clientMessage]);

      // TTS for client message using ElevenLabs
      await playTTSAudio(clientMessage.content);
    } catch (error) {
      console.error('Error calling API:', error);
      const errorMessage: Message = {
        role: 'client',
        content: '죄송합니다. 처리 중 오류가 발생했습니다.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleMic = () => {
    if (!speechSupported) {
      // Use text input fallback
      if (fallbackText.trim()) {
        handleUserMessage(fallbackText);
        setFallbackText('');
      }
      return;
    }

    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isMicOn) {
      recognition.stop();
      setIsMicOn(false);
      setIsRecording(false);
    } else {
      recognition.start();
      setIsMicOn(true);
      setIsRecording(true);
    }
  };

  const handleFinish = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const callLog: CallLog = {
      messages,
      duration,
      sessionConfig,
    };

    onFinish(callLog);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    if (isConnecting) return '연결 중…';
    if (isProcessing) return '생각 중…';
    if (isPlayingAudio) return '음성 재생 중…';
    if (isMicOn) return '듣는 중…';
    if (!isCallActive) return '연결 중…';
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xs uppercase tracking-[0.18em] text-[#a0a0a0]">콜 세션</div>
        <div className="bg-[rgba(255,255,255,0.05)] border border-[#2a2a2a] rounded-full px-4 py-1.5 text-sm font-mono text-white">
          {formatTime(duration)}
        </div>
      </div>

      {/* Status Indicator */}
      {getStatusText() && (
        <div className="flex items-center gap-2 text-xs text-[#a0a0a0]">
          <span className="text-[#DC2626] animate-pulse">●</span>
          <span>{getStatusText()}</span>
        </div>
      )}

      {/* Transcript Area - Chat Bubbles */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[#2a2a2a] rounded-xl p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
        <div className="flex flex-col gap-3">
          {isConnecting ? (
            <p className="text-[#a0a0a0] text-center py-12 text-sm">
              전화를 연결하고 있습니다...
            </p>
          ) : messages.length === 0 ? (
            <p className="text-[#a0a0a0] text-center py-12 text-sm">
              통화가 시작되었습니다. 마이크 버튼을 눌러 말씀하세요.
            </p>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#DC2626] text-white rounded-br-sm'
                        : 'bg-[rgba(255,255,255,0.05)] text-[#d4d4d4] rounded-bl-sm border border-[#2a2a2a]'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-[rgba(255,255,255,0.05)] text-[#d4d4d4] rounded-xl rounded-bl-sm px-4 py-2.5 text-sm border border-[#2a2a2a]">
                    <p>생각 중…</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Fallback Text Input */}
      {!speechSupported && (
        <div>
          <input
            type="text"
            value={fallbackText}
            onChange={(e) => setFallbackText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && fallbackText.trim()) {
                handleUserMessage(fallbackText);
                setFallbackText('');
              }
            }}
            placeholder="메시지를 입력하고 Enter를 누르세요"
            className="input-field"
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 pt-4">
        {/* End Call Button */}
        <button
          onClick={handleFinish}
          className="btn-glass"
        >
          통화 종료
        </button>

        {/* Mic Button */}
        <button
          onClick={toggleMic}
          disabled={isProcessing || isConnecting || !isCallActive}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isMicOn
              ? 'bg-[#DC2626] shadow-[0_0_25px_rgba(220,38,38,0.7)] text-white'
              : 'bg-[rgba(255,255,255,0.1)] border border-[#2a2a2a] text-white hover:border-[#DC2626]'
          }`}
        >
          <span className="text-2xl">🎙</span>
        </button>

        {/* Placeholder Button */}
        <button
          disabled
          className="btn-glass opacity-30"
        >
          메모
        </button>
      </div>
    </div>
  );
}
