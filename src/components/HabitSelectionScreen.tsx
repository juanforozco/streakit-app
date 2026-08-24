import { useState } from 'react';
import { ChevronRight, Flame } from 'lucide-react';
import { HABITS } from '@/data/habits';
import type { HabitKey } from '@/types';

interface HabitSelectionScreenProps {
  onSelect: (habit: HabitKey) => void;
  submitting: boolean;
}

export function HabitSelectionScreen({ onSelect, submitting }: HabitSelectionScreenProps) {
  const [selected, setSelected] = useState<HabitKey | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 px-6 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-md shadow-orange-300/50">
            <Flame className="h-7 w-7 fill-yellow-300 text-yellow-300" />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-gray-800 sm:text-3xl">
            ¿Qué hábito quieres construir?
          </h2>
          <p className="mt-2 text-sm font-semibold text-gray-500 sm:text-base">
            Elige uno para empezar tu racha hoy mismo
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {HABITS.map((habit) => {
            const Icon = habit.icon;
            const isSelected = selected === habit.key;
            return (
              <button
                key={habit.key}
                onClick={() => setSelected(habit.key)}
                className={`flex items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left shadow-sm transition-all duration-150 ${
                  isSelected
                    ? 'border-orange-500 shadow-lg shadow-orange-200/70 scale-[1.02]'
                    : 'border-transparent hover:border-orange-200 hover:shadow-md'
                }`}
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${habit.gradient} shadow-inner`}
                >
                  <Icon className="h-7 w-7 text-white" strokeWidth={2.2} />
                </div>
                <div className="flex-1">
                  <p className="font-display text-lg font-bold text-gray-800">{habit.name}</p>
                  <p className="text-sm font-semibold text-gray-400">{habit.description}</p>
                </div>
                <div
                  className={`h-6 w-6 shrink-0 rounded-full border-2 transition-colors ${
                    isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-200'
                  }`}
                >
                  {isSelected && <div className="h-full w-full scale-50 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        <button
          disabled={!selected || submitting}
          onClick={() => selected && onSelect(selected)}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 font-display text-lg font-bold text-white shadow-lg shadow-orange-300/60 transition-all duration-150 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          {submitting ? 'Guardando...' : 'Continuar'}
          {!submitting && <ChevronRight className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
