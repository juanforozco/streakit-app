import { Flame } from 'lucide-react';

interface StreakCounterProps {
  currentStreak: number;
  bestStreak: number;
  bump: boolean;
}

function getFlameStyle(streak: number) {
  if (streak <= 0) {
    return { size: 72, gradient: 'from-gray-300 to-gray-400', glow: 'shadow-gray-200/0', text: 'text-gray-400' };
  }
  if (streak < 3) {
    return { size: 84, gradient: 'from-orange-300 to-orange-400', glow: 'shadow-orange-200/60', text: 'text-orange-500' };
  }
  if (streak < 7) {
    return { size: 100, gradient: 'from-orange-400 to-red-400', glow: 'shadow-orange-300/70', text: 'text-orange-600' };
  }
  if (streak < 30) {
    return { size: 118, gradient: 'from-orange-500 to-red-500', glow: 'shadow-red-300/70', text: 'text-red-500' };
  }
  return { size: 136, gradient: 'from-red-500 to-rose-600', glow: 'shadow-rose-400/80', text: 'text-rose-600' };
}

export function StreakCounter({ currentStreak, bestStreak, bump }: StreakCounterProps) {
  const style = getFlameStyle(currentStreak);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex items-center justify-center rounded-[2rem] bg-gradient-to-br ${style.gradient} shadow-xl ${style.glow} transition-all duration-500 ${bump ? 'animate-wiggle' : ''}`}
        style={{ width: style.size, height: style.size }}
      >
        <Flame
          className="animate-flame-pulse fill-yellow-200 text-yellow-200"
          strokeWidth={1.5}
          style={{ width: style.size * 0.6, height: style.size * 0.6 }}
        />
      </div>

      <div className={`mt-4 font-display text-6xl font-extrabold transition-transform duration-300 ${style.text} ${bump ? 'scale-110' : 'scale-100'}`}>
        {currentStreak}
      </div>
      <p className="font-display text-lg font-bold text-gray-600">
        {currentStreak === 1 ? 'día seguido' : 'días seguidos'}
      </p>

      {bestStreak > 0 && (
        <p className="mt-1 text-sm font-semibold text-gray-400">Tu mejor racha: {bestStreak} días</p>
      )}
    </div>
  );
}
