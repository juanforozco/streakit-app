import type { Badge } from '@/types';

export const BADGES: Badge[] = [
  { days: 3, label: '3 días' },
  { days: 7, label: '7 días' },
  { days: 14, label: '14 días' },
  { days: 30, label: '30 días' },
  { days: 100, label: '100 días' },
];

export function isBadgeUnlocked(badge: Badge, bestStreak: number): boolean {
  return bestStreak >= badge.days;
}
