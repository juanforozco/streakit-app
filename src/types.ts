export type HabitKey = 'agua' | 'ejercicio' | 'leer' | 'meditar' | 'fumar';

export type DayStatus = 'completed' | 'missed';

export type WeekData = Record<string, DayStatus>;

export interface StreakRow {
  id: string;
  device_id: string;
  habit_key: HabitKey;
  current_streak: number;
  best_streak: number;
  week_start: string;
  week_data: WeekData;
}

export interface Badge {
  days: number;
  label: string;
}
