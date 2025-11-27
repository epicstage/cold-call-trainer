import type { ExpState } from '@/types';

const STORAGE_KEY = 'coldcall_exp_state';

const INITIAL_STATE: ExpState = {
  level: 1,
  exp: 0,
  expToNext: 100,
  totalExp: 0,
  streakDays: 0,
};

export function loadExpState(): ExpState {
  if (typeof window === 'undefined') return INITIAL_STATE;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return INITIAL_STATE;

    const parsed = JSON.parse(stored);
    return {
      ...INITIAL_STATE,
      ...parsed,
    };
  } catch {
    return INITIAL_STATE;
  }
}

export function saveExpState(state: ExpState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save EXP state:', error);
  }
}

export function getTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function updateExpAfterSession(
  state: ExpState,
  params: { ers: number; ls: number; userLevel: number; difficultyBand: 'easy' | 'normal' | 'hard' }
): ExpState {
  const { ers, ls, userLevel, difficultyBand } = params;

  // EXP formula - 난이도 밴드에 따른 보너스
  const base = 20;
  const difficultyBonusMap = { easy: 10, normal: 20, hard: 30 };
  const difficultyBonus = difficultyBonusMap[difficultyBand] || 20;
  const performanceBonus = Math.round((ers + ls) / 2);
  const gain = base + difficultyBonus + performanceBonus;

  let newExp = state.exp + gain;
  let newLevel = state.level;
  let newExpToNext = state.expToNext;
  const newTotalExp = state.totalExp + gain;

  // Level up logic (max level 99)
  while (newExp >= newExpToNext && newLevel < 99) {
    newExp -= newExpToNext;
    newLevel += 1;
    if (newLevel >= 99) {
      // Level 99에 도달하면 EXP는 더 이상 쌓이지 않음
      newExp = newExpToNext - 1;
      break;
    }
    newExpToNext = Math.round(newExpToNext * 1.15); // 15% increase per level
  }
  
  // Ensure level doesn't exceed 99
  if (newLevel > 99) {
    newLevel = 99;
    newExp = Math.min(newExp, newExpToNext - 1);
  }

  // Streak logic
  const today = getTodayDate();
  let newStreakDays = state.streakDays;
  const lastPlayed = state.lastPlayedDate;

  if (!lastPlayed) {
    newStreakDays = 1;
  } else if (lastPlayed === today) {
    // Same day, no change
    newStreakDays = state.streakDays;
  } else {
    // Calculate if yesterday
    const lastDate = new Date(lastPlayed);
    const todayDate = new Date(today);
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      newStreakDays = state.streakDays + 1;
    } else {
      newStreakDays = 1; // Reset streak
    }
  }

  return {
    level: newLevel,
    exp: newExp,
    expToNext: newExpToNext,
    totalExp: newTotalExp,
    streakDays: newStreakDays,
    lastPlayedDate: today,
  };
}

export function calculateExpGain(ers: number, ls: number, difficultyBand: 'easy' | 'normal' | 'hard'): number {
  const base = 20;
  const difficultyBonusMap = { easy: 10, normal: 20, hard: 30 };
  const difficultyBonus = difficultyBonusMap[difficultyBand] || 20;
  const performanceBonus = Math.round((ers + ls) / 2);
  return base + difficultyBonus + performanceBonus;
}

