import { Lock, Award } from 'lucide-react';
import { BADGES, isBadgeUnlocked } from '@/data/badges';

interface BadgesRowProps {
  bestStreak: number;
}

export function BadgesRow({ bestStreak }: BadgesRowProps) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3">
      {BADGES.map((badge) => {
        const unlocked = isBadgeUnlocked(badge, bestStreak);
        return (
          <div key={badge.days} className="flex flex-col items-center gap-1.5">
            <div
              className={`relative flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16 ${
                unlocked
                  ? 'bg-gradient-to-br from-amber-300 to-yellow-500 shadow-md shadow-amber-300/60'
                  : 'bg-gray-100'
              }`}
            >
              <Award
                className={unlocked ? 'h-7 w-7 text-white sm:h-8 sm:w-8' : 'h-7 w-7 text-gray-300 sm:h-8 sm:w-8'}
                strokeWidth={2}
              />
              {!unlocked && (
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-300">
                  <Lock className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </div>
              )}
            </div>
            <span className={`text-xs font-bold ${unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
              {badge.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
