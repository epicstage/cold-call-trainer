export type DifficultyBand = 'easy' | 'normal' | 'hard';

/**
 * 사용자 레벨에 따라 난이도 밴드를 계산합니다.
 * - Lv. 1-30: easy
 * - Lv. 31-60: normal
 * - Lv. 61-99: hard
 */
export function getDifficultyBand(level: number): DifficultyBand {
  if (level <= 30) {
    return 'easy';
  } else if (level <= 60) {
    return 'normal';
  } else {
    return 'hard';
  }
}


