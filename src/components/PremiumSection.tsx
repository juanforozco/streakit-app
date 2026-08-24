import { useState } from 'react';
import { Bell, BarChart3, Layers, Sparkles, X, PartyPopper } from 'lucide-react';

const FEATURES = [
  { icon: Bell, label: 'Recordatorios push diarios' },
  { icon: BarChart3, label: 'Estadísticas avanzadas de progreso' },
  { icon: Layers, label: 'Sigue múltiples hábitos a la vez' },
];

export function PremiumSection() {
  const [showModal, setShowModal] = useState(false);
  const [upgraded, setUpgraded] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white shadow-xl">
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-yellow-400/20 blur-2xl" />

        <div className="relative z-10 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-400" />
          <h3 className="font-display text-xl font-extrabold">StreakIt Premium</h3>
        </div>

        <ul className="relative z-10 mt-4 flex flex-col gap-3">
          {FEATURES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-sm font-semibold text-gray-200">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Icon className="h-4 w-4 text-yellow-400" />
              </div>
              {label}
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-5 flex items-center justify-between">
          <div>
            <span className="font-display text-2xl font-extrabold">$1.99</span>
            <span className="text-sm font-semibold text-gray-400">/mes</span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-2.5 font-display text-sm font-bold text-gray-900 shadow-md shadow-yellow-500/30 transition-transform hover:scale-105 active:scale-95"
          >
            Mejorar ahora
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
          <div className="relative w-full max-w-sm animate-pop-in rounded-3xl bg-white p-6 text-center shadow-2xl">
            <button
              onClick={() => {
                setShowModal(false);
                setUpgraded(false);
              }}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            {!upgraded ? (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-amber-300/50">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-gray-800">¿Listo para más?</h3>
                <p className="mt-2 text-sm font-semibold text-gray-500">
                  Desbloquea recordatorios, estadísticas avanzadas y hábitos ilimitados por solo $1.99/mes.
                </p>
                <button
                  onClick={() => setUpgraded(true)}
                  className="mt-5 w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 font-display text-base font-bold text-gray-900 shadow-md transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Confirmar por $1.99/mes
                </button>
                <p className="mt-3 text-xs font-semibold text-gray-400">Esto es una simulación, no se realizará ningún cargo.</p>
              </>
            ) : (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-emerald-300/50">
                  <PartyPopper className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-gray-800">¡Ya eres Premium!</h3>
                <p className="mt-2 text-sm font-semibold text-gray-500">
                  (Simulado) Disfruta de tus nuevas funciones para mantener tus rachas al máximo.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-5 w-full rounded-2xl bg-gray-800 px-6 py-3 font-display text-base font-bold text-white transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Genial
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
