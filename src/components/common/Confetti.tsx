import confetti from 'canvas-confetti';

export function fireSuccessConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#22c55e', '#0ea5e9', '#f59e0b', '#ec4899', '#8b5cf6']
    });
  } catch {}
}

export function fireLevelUpConfetti() {
  try {
    const end = Date.now() + 1500;
    const colors = ['#f59e0b', '#22c55e', '#38bdf8', '#fbbf24'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  } catch {}
}
