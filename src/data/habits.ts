import { Droplets, Dumbbell, BookOpen, Brain, CigaretteOff } from 'lucide-react';
import type { HabitKey } from '@/types';

export interface HabitDefinition {
  key: HabitKey;
  name: string;
  description: string;
  icon: typeof Droplets;
  gradient: string;
}

export const HABITS: HabitDefinition[] = [
  {
    key: 'agua',
    name: 'Tomar agua',
    description: 'Mantente hidratado cada día',
    icon: Droplets,
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    key: 'ejercicio',
    name: 'Ejercicio',
    description: 'Mueve el cuerpo un poco cada día',
    icon: Dumbbell,
    gradient: 'from-orange-400 to-red-500',
  },
  {
    key: 'leer',
    name: 'Leer',
    description: 'Alimenta tu mente todos los días',
    icon: BookOpen,
    gradient: 'from-amber-400 to-yellow-500',
  },
  {
    key: 'meditar',
    name: 'Meditar',
    description: 'Encuentra calma y enfoque',
    icon: Brain,
    gradient: 'from-emerald-400 to-green-500',
  },
  {
    key: 'fumar',
    name: 'Dejar de fumar',
    description: 'Un día más libre de humo',
    icon: CigaretteOff,
    gradient: 'from-lime-400 to-green-600',
  },
];

export function getHabitByKey(key: HabitKey): HabitDefinition {
  return HABITS.find((h) => h.key === key) ?? HABITS[0];
}
