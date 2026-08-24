import { Flame, ChevronRight } from 'lucide-react';

interface HeroScreenProps {
  onStart: () => void;
}

export function HeroScreen({ onStart }: HeroScreenProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-100 px-6 py-16 text-center">
      <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-orange-200/50 blur-3xl" />
      <div className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-yellow-200/60 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-6 flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-orange-400 to-red-500 shadow-xl shadow-orange-300/50">
          <Flame className="h-16 w-16 animate-flame-pulse fill-yellow-300 text-yellow-300" strokeWidth={1.5} />
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-tight text-gray-800 sm:text-5xl">
          StreakIt
        </h1>

        <p className="mt-2 font-display text-2xl font-bold text-orange-500 sm:text-3xl">
          No rompas la racha
        </p>

        <p className="mt-4 max-w-sm text-base font-semibold text-gray-500 sm:text-lg">
          Elige un hábito, márcalo cada día y mira crecer tu racha. Pequeños pasos, grandes resultados.
        </p>

        <button
          onClick={onStart}
          className="group mt-10 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 font-display text-lg font-bold text-white shadow-lg shadow-orange-300/60 transition-transform duration-150 hover:scale-105 hover:shadow-orange-400/70 active:scale-95"
        >
          Empezar mi racha
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="mt-6 text-sm font-semibold text-gray-400">
          Gratis para siempre. Sin tarjeta de crédito.
        </p>
      </div>
    </div>
  );
}
