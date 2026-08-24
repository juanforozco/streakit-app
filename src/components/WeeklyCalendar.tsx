import { Check, X } from 'lucide-react';
import { WEEKDAY_LABELS, toISODate } from '@/lib/date';
import type { WeekData } from '@/types';

interface WeeklyCalendarProps {
  weekDates: Date[];
  weekData: WeekData;
  todayIndex: number;
  onDayClick: (dateISO: string) => void;
}

export function WeeklyCalendar({ weekDates, weekData, todayIndex, onDayClick }: WeeklyCalendarProps) {
  return (
    <div className="grid grid-cols-7 gap-2 sm:gap-3">
      {weekDates.map((date, index) => {
        const dateISO = toISODate(date);
        const status = weekData[dateISO];
        const isFuture = index > todayIndex;
        const isToday = index === todayIndex;
        const isClickable = !isFuture && !status;

        return (
          <button
            key={dateISO}
            disabled={!isClickable}
            onClick={() => onDayClick(dateISO)}
            className={`flex flex-col items-center gap-1.5 rounded-2xl py-3 transition-all duration-200 ${
              isClickable ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'
            }`}
          >
            <span
              className={`text-xs font-bold uppercase ${isToday ? 'text-orange-500' : 'text-gray-400'}`}
            >
              {WEEKDAY_LABELS[index]}
            </span>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-display text-sm font-bold transition-colors sm:h-12 sm:w-12 ${
                status === 'completed'
                  ? 'border-green-500 bg-green-500 text-white'
                  : status === 'missed'
                    ? 'border-gray-300 bg-gray-100 text-gray-400'
                    : isToday
                      ? 'border-orange-400 bg-orange-50 text-orange-500'
                      : isFuture
                        ? 'border-gray-100 bg-gray-50 text-gray-300'
                        : 'border-orange-200 bg-white text-gray-500 hover:border-orange-400'
              }`}
            >
              {status === 'completed' ? (
                <Check className="h-5 w-5" strokeWidth={3} />
              ) : status === 'missed' ? (
                <X className="h-5 w-5" strokeWidth={3} />
              ) : (
                date.getDate()
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
