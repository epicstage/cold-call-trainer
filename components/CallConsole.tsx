'use client';

import { useState, useEffect, useRef } from 'react';
import type { SessionConfig, PreEmotionData, Message, CallLog } from '@/types';

interface CallConsoleProps {
  sessionConfig: SessionConfig;
  preEmotion: PreEmotionData;
  onFinish: (callLog: CallLog) => void;
}

export default function CallConsole({ sessionConfig, preEmotion, onFinish }: CallConsoleProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [fallbackText, setFallbackText] = useState('');

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Speech APIs
  useEffect(() => {
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
    synthesisRef.current = window.speechSynthesis;

    // Start timer
    intervalRef.current = setInterval(() => {
      setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      recognition.stop();
    };
  }, []);

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
      const response = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationHistory: [...messages, userMessage],
          currentUserMessage: userText,
          clientType: sessionConfig.clientType,
          difficulty: sessionConfig.difficulty,
        }),
      });

      if (!response.ok) throw new Error('API call failed');

      const data = await response.json();
      const clientMessage: Message = {
        role: 'client',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, clientMessage]);

      // TTS for client message
      if (synthesisRef.current) {
        const utterance = new SpeechSynthesisUtterance(data.message);
        utterance.lang = 'ko-KR';
        synthesisRef.current.speak(utterance);
      }
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
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const callLog: CallLog = {
      messages,
      duration,
      preEmotion,
      sessionConfig,
    };

    onFinish(callLog);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">통화 중</h2>
        <div className="text-2xl font-mono font-semibold">{formatTime(duration)}</div>
      </div>

      {!speechSupported && (
        <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
            음성 인식이 지원되지 않습니다. 텍스트로 입력해주세요.
          </p>
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
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
        </div>
      )}

      <div className="mb-6 h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
        {messages.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            통화가 시작되었습니다. 마이크 버튼을 눌러 말씀하세요.
          </p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <p className="text-sm font-medium mb-1">
                    {msg.role === 'user' ? '나' : '클라이언트'}
                  </p>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">응답 대기 중...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleMic}
          disabled={isProcessing}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
            isMicOn
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isMicOn ? '🎤 마이크 끄기' : '🎤 Hold to Talk'}
        </button>
        <button
          onClick={handleFinish}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          통화 종료
        </button>
      </div>
    </div>
  );
}

