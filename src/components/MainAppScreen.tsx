import { useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { StreakCounter } from '@/components/StreakCounter';
import { WeeklyCalendar } from '@/components/WeeklyCalendar';
import { BadgesRow } from '@/components/BadgesRow';
import { PremiumSection } from '@/components/PremiumSection';
import { Confetti } from '@/components/Confetti';
import { getHabitByKey } from '@/data/habits';
import { MISSED_MESSAGES, STREAK_MESSAGES, randomFrom } from '@/data/messages';
import { getMondayOfWeek, getTodayDayIndex, getWeekDates, toISODate } from '@/lib/date';
import type { StreakRow } from '@/types';

interface MainAppScreenProps {
  streak: StreakRow;
  onMarkDay: (dateISO: string) => Promise<void>;
  onSimulateMissedDay: (dateISO: string) => Promise<void>;
}

export function MainAppScreen({ streak, onMarkDay, onSimulateMissedDay }: MainAppScreenProps) {
  const [toast, setToast] = useState<{ text: string; tone: 'success' | 'warning' } | null>(null);
  const [confettiKey, setConfettiKey] = useState<number | null>(null);
  const [bump, setBump] = useState(false);

  const habit = getHabitByKey(streak.habit_key);
  const monday = useMemo(() => getMondayOfWeek(new Date()), []);
  const weekDates = useMemo(() => getWeekDates(monday), [monday]);
  const todayIndex = useMemo(() => getTodayDayIndex(monday), [monday]);
  const todayISO = toISODate(weekDates[todayIndex] ?? new Date());

  const completedThisWeek = Object.values(streak.week_data).filter((s) => s === 'completed').length;
  const weekProgress = Math.round((completedThisWeek / 7) * 100);

  const showToast = (text: string, tone: 'success' | 'warning') => {
    setToast({ text, tone });
    setTimeout(() => setToast(null), 2600);
  };

  const handleDayClick = async (dateISO: string) => {
    await onMarkDay(dateISO);
    showToast(`¡${streak.current_streak + 1} días! ${randomFrom(STREAK_MESSAGES)}`, 'success');
    setConfettiKey(Date.now());
    setBump(true);
    setTimeout(() => setBump(false), 600);
    setTimeout(() => setConfettiKey(null), 1000);
  };

  const handleMissedDay = async () => {
    await onSimulateMissedDay(todayISO);
    showToast(randomFrom(MISSED_MESSAGES), 'warning');
  };

  const Icon = habit.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 px-6 py-8 pb-16">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${habit.gradient} shadow-sm`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-display text-lg font-extrabold text-gray-800">{habit.name}</p>
            <p className="text-xs font-semibold text-gray-400">Tu hábito diario</p>
          </div>
        </div>

        <div className="relative rounded-3xl bg-white p-6 shadow-md">
          {confettiKey && <Confetti key={confettiKey} />}
          <StreakCounter currentStreak={streak.current_streak} bestStreak={streak.best_streak} bump={bump} />
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-gray-700">Esta semana</h3>
            <span className="text-sm font-bold text-orange-500">{completedThisWeek}/7 días</span>
          </div>
          <WeeklyCalendar
            weekDates={weekDates}
            weekData={streak.week_data}
            todayIndex={todayIndex}
            onDayClick={handleDayClick}
          />

          <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-500"
              style={{ width: `${weekProgress}%` }}
            />
          </div>

          <button
            onClick={handleMissedDay}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-100 py-2.5 text-sm font-bold text-gray-400 transition-colors hover:border-gray-200 hover:text-gray-500"
          >
            <AlertTriangle className="h-4 w-4" />
            Simular día perdido
          </button>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-md">
          <h3 className="mb-4 font-display text-base font-bold text-gray-700">Insignias</h3>
          <BadgesRow bestStreak={streak.best_streak} />
        </div>

        <PremiumSection />
      </div>

      {toast && (
        <div
          className={`fixed left-1/2 top-6 z-40 animate-toast-in rounded-2xl px-5 py-3 text-center font-display text-sm font-bold text-white shadow-lg ${
            toast.tone === 'success' ? 'bg-green-500 shadow-green-300/50' : 'bg-gray-700 shadow-gray-400/50'
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}
