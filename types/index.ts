// Pre-emotion data
export interface PreEmotionData {
  intensity: number; // 0-10
  emotion: '불안' | '귀찮음' | '짜증' | '기대';
}

// User role types
export type UserRole =
  | 'insurance_agent'
  | 'freelancer_creator'
  | 'startup_founder'
  | 'b2b_sales'
  | 'job_seeker'
  | 'other';

// Client level (1-10)
export type ClientLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// Client persona
export interface ClientPersona {
  shortLabel: string; // e.g. "대기업 인사담당자"
  description: string; // 간단 요약
  typicalExcuses: string[]; // 회피/거절 패턴 리스트
  tone: string; // 말투 설명 (예: "바쁘고 단답형")
  riskSensitivity: 'low' | 'medium' | 'high';
}

// User profile
export interface UserProfile {
  role: UserRole;
  roleDetail?: string;
  persona?: ClientPersona;
}

// EXP state
export interface ExpState {
  level: number; // 게임 레벨, 1+
  exp: number; // 현재 레벨에서의 경험치
  expToNext: number;
  totalExp: number;
  streakDays: number; // 연속 출석일
  lastPlayedDate?: string; // "YYYY-MM-DD"
}

// Session configuration (updated)
export interface SessionConfig {
  clientType: 'busy_public_officer' | 'cold_startup_ceo' | 'defensive_manager';
  difficulty: 'light' | 'mid' | 'hard';
  clientLevel?: ClientLevel; // New field
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
  sessionConfig: SessionConfig;
}

// Feedback report
export interface FeedbackReport {
  ers: number; // Emotional Resilience Score (0-10)
  ls: number; // Logic/Structure Score (0-10)
  summary: string;
  nextGoal: string;
}

// Difficulty band (automatically calculated from level)
export type DifficultyBand = 'easy' | 'normal' | 'hard';

// API request/response types
export interface CallAPIRequest {
  userMessage: string; // 사용자가 방금 한 말 (STT 결과)
  userProfile?: {
    role?: string; // "보험 설계사", "프리랜서" 등
    name?: string;
  };
  userLevel?: number; // 1~99, 현재 사용자 레벨
  difficultyBand?: DifficultyBand; // "easy" | "normal" | "hard"
  persona?: {
    shortLabel?: string;
    description?: string;
    typicalExcuses?: string[];
    tone?: string;
    riskSensitivity?: string;
  };
}

export interface CallAPIResponse {
  reply: string;
  text: string;
  message: string;
}

export interface FeedbackAPIRequest {
  callLog: CallLog;
}

export interface FeedbackAPIResponse {
  report: FeedbackReport;
}

export interface PersonaAPIRequest {
  role: UserRole;
  rawDescription: string;
}

export interface PersonaAPIResponse {
  persona: ClientPersona;
}
