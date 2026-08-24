import { useState } from 'react';
import { Flame } from 'lucide-react';
import { HeroScreen } from '@/components/HeroScreen';
import { HabitSelectionScreen } from '@/components/HabitSelectionScreen';
import { MainAppScreen } from '@/components/MainAppScreen';
import { useStreak } from '@/hooks/useStreak';
import type { HabitKey } from '@/types';

type View = 'hero' | 'selection';

function App() {
  const { loading, streak, selectHabit, markDayComplete, simulateMissedDay } = useStreak();
  const [view, setView] = useState<View>('hero');
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50">
        <Flame className="h-12 w-12 animate-flame-pulse fill-orange-400 text-orange-400" />
      </div>
    );
  }

  if (streak) {
    return (
      <MainAppScreen
        streak={streak}
        onMarkDay={markDayComplete}
        onSimulateMissedDay={simulateMissedDay}
      />
    );
  }

  if (view === 'hero') {
    return <HeroScreen onStart={() => setView('selection')} />;
  }

  const handleSelect = async (habit: HabitKey) => {
    setSubmitting(true);
    await selectHabit(habit);
    setSubmitting(false);
  };

  return <HabitSelectionScreen onSelect={handleSelect} submitting={submitting} />;
}

export default App;
