// Pre-emotion data
export interface PreEmotionData {
  intensity: number; // 0-10
  emotion: '불안' | '귀찮음' | '짜증' | '기대';
}

// Session configuration
export interface SessionConfig {
  clientType: 'busy_public_officer' | 'cold_startup_ceo' | 'defensive_manager';
  difficulty: 'light' | 'mid' | 'hard';
}

// Message in transcript
export interface Message {
  role: 'user' | 'client';
  content: string;
  timestamp: Date;
}

// Call log (full conversation)
export interface CallLog {
  messages: Message[];
  duration: number; // in seconds
  preEmotion: PreEmotionData;
  sessionConfig: SessionConfig;
}

// Feedback report
export interface FeedbackReport {
  ers: number; // Emotional Resilience Score (0-10)
  ls: number; // Logic/Structure Score (0-10)
  summary: string;
  nextGoal: string;
}

// API request/response types
export interface CallAPIRequest {
  conversationHistory: Message[];
  currentUserMessage: string;
  clientType: SessionConfig['clientType'];
  difficulty: SessionConfig['difficulty'];
}

export interface CallAPIResponse {
  message: string;
}

export interface FeedbackAPIRequest {
  callLog: CallLog;
}

export interface FeedbackAPIResponse {
  report: FeedbackReport;
}

