const COLORS = ['#fb923c', '#facc15', '#4ade80', '#38bdf8', '#f87171', '#fb7185'];

interface ConfettiProps {
  pieceCount?: number;
}

export function Confetti({ pieceCount = 24 }: ConfettiProps) {
  const pieces = Array.from({ length: pieceCount }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.15,
    color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 6,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute top-0 animate-confetti-fall rounded-sm"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
