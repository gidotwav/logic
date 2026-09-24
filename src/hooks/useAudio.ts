import { useCallback } from 'react';

export function useAudio(soundEnabled: boolean = true) {
  const playSound = useCallback((notes: { freq: number; duration: number; type?: OscillatorType; gain?: number }[]) => {
    if (!soundEnabled || typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      let startTime = ctx.currentTime;
      notes.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = note.type || 'sine';
        osc.frequency.setValueAtTime(note.freq, startTime);

        const volume = note.gain || 0.15;
        gain.gain.setValueAtTime(volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + note.duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.duration);

        startTime += note.duration * 0.7; // slight overlap for melodic feel
      });

      // Close context after playback completes
      setTimeout(() => {
        if (ctx.state !== 'closed') ctx.close();
      }, (startTime - ctx.currentTime + 0.5) * 1000);
    } catch (e) {
      // Audio playback blocked or unsupported
    }
  }, [soundEnabled]);

  const playSuccess = useCallback(() => {
    // Joyful major chord arpeggio (C5 - E5 - G5 - C6)
    playSound([
      { freq: 523.25, duration: 0.1, type: 'triangle', gain: 0.12 },
      { freq: 659.25, duration: 0.1, type: 'triangle', gain: 0.12 },
      { freq: 783.99, duration: 0.12, type: 'triangle', gain: 0.14 },
      { freq: 1046.50, duration: 0.25, type: 'sine', gain: 0.16 }
    ]);
  }, [playSound]);

  const playError = useCallback(() => {
    // Subtle double low note
    playSound([
      { freq: 220, duration: 0.12, type: 'sawtooth', gain: 0.08 },
      { freq: 174.61, duration: 0.18, type: 'sawtooth', gain: 0.08 }
    ]);
  }, [playSound]);

  const playLevelUp = useCallback(() => {
    // Grand fanfare
    playSound([
      { freq: 440.00, duration: 0.12, type: 'triangle', gain: 0.15 },
      { freq: 554.37, duration: 0.12, type: 'triangle', gain: 0.15 },
      { freq: 659.25, duration: 0.12, type: 'triangle', gain: 0.15 },
      { freq: 880.00, duration: 0.35, type: 'sine', gain: 0.2 }
    ]);
  }, [playSound]);

  const playClick = useCallback(() => {
    playSound([
      { freq: 800, duration: 0.03, type: 'sine', gain: 0.05 }
    ]);
  }, [playSound]);

  return { playSuccess, playError, playLevelUp, playClick };
}
