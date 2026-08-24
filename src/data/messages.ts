export const STREAK_MESSAGES = [
  '¡Vas encendido! 🔥',
  'Imparable 💪',
  '¡Sigue así, campeón! 🌟',
  'Racha en llamas 🔥🔥',
  'Un día más, un paso más cerca 🚀',
  'Eres una máquina 💥',
  '¡Así se hace! 🙌',
  'Tu constancia está pagando 📈',
];

export const MISSED_MESSAGES = [
  '¡No pasa nada! Mañana es un nuevo comienzo 💪',
  'Todos tropezamos, lo importante es levantarse 🌱',
  'Un tropiezo no borra tu progreso. ¡Vamos de nuevo! 🔥',
  'Respira y empieza otra vez, tú puedes 🌤️',
];

export function randomFrom(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}
