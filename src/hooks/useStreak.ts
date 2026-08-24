import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getDeviceId } from '@/lib/deviceId';
import { getMondayOfWeek, toISODate } from '@/lib/date';
import type { HabitKey, StreakRow, WeekData } from '@/types';

interface UseStreakResult {
  loading: boolean;
  streak: StreakRow | null;
  selectHabit: (habit: HabitKey) => Promise<void>;
  markDayComplete: (dateISO: string) => Promise<void>;
  simulateMissedDay: (dateISO: string) => Promise<void>;
}

export function useStreak(): UseStreakResult {
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState<StreakRow | null>(null);

  useEffect(() => {
    (async () => {
      const deviceId = getDeviceId();
      const { data, error } = await supabase
        .from('streaks')
        .select('*')
        .eq('device_id', deviceId)
        .maybeSingle();

      if (error) {
        console.error('Error al cargar la racha:', error);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        return;
      }

      const currentMonday = toISODate(getMondayOfWeek(new Date()));
      if (data.week_start !== currentMonday) {
        const { data: updated, error: updateError } = await supabase
          .from('streaks')
          .update({ week_start: currentMonday, week_data: {} })
          .eq('device_id', deviceId)
          .select()
          .maybeSingle();

        if (!updateError && updated) {
          setStreak(updated as StreakRow);
          setLoading(false);
          return;
        }
      }

      setStreak(data as StreakRow);
      setLoading(false);
    })();
  }, []);

  const selectHabit = useCallback(async (habit: HabitKey) => {
    const deviceId = getDeviceId();
    const weekStart = toISODate(getMondayOfWeek(new Date()));

    const { data, error } = await supabase
      .from('streaks')
      .upsert(
        {
          device_id: deviceId,
          habit_key: habit,
          current_streak: 0,
          best_streak: 0,
          week_start: weekStart,
          week_data: {},
        },
        { onConflict: 'device_id' },
      )
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error al elegir hábito:', error);
      return;
    }

    setStreak(data as StreakRow);
  }, []);

  const markDayComplete = useCallback(
    async (dateISO: string) => {
      if (!streak || streak.week_data[dateISO]) return;

      const nextWeekData: WeekData = { ...streak.week_data, [dateISO]: 'completed' };
      const nextCurrentStreak = streak.current_streak + 1;
      const nextBestStreak = Math.max(streak.best_streak, nextCurrentStreak);

      const { data, error } = await supabase
        .from('streaks')
        .update({
          week_data: nextWeekData,
          current_streak: nextCurrentStreak,
          best_streak: nextBestStreak,
        })
        .eq('device_id', streak.device_id)
        .select()
        .maybeSingle();

      if (error) {
        console.error('Error al marcar el día:', error);
        return;
      }

      setStreak(data as StreakRow);
    },
    [streak],
  );

  const simulateMissedDay = useCallback(
    async (dateISO: string) => {
      if (!streak) return;

      const nextWeekData: WeekData = streak.week_data[dateISO]
        ? streak.week_data
        : { ...streak.week_data, [dateISO]: 'missed' };

      const { data, error } = await supabase
        .from('streaks')
        .update({
          week_data: nextWeekData,
          current_streak: 0,
        })
        .eq('device_id', streak.device_id)
        .select()
        .maybeSingle();

      if (error) {
        console.error('Error al simular el día perdido:', error);
        return;
      }

      setStreak(data as StreakRow);
    },
    [streak],
  );

  return { loading, streak, selectHabit, markDayComplete, simulateMissedDay };
}
