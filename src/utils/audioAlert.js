/* =========================================================
   GEDİZ TANTUNİ — AUDIO ALERT ENGINE (Web Audio API)
   Autoplay policy resilient audio engine with volume control
   ========================================================= */

let globalAudioCtx = null;

function getAudioContext() {
  if (!globalAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      globalAudioCtx = new AudioCtx();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
}

// Global user interaction listener to unlock Web Audio API policy
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    getAudioContext();
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
  };
  window.addEventListener('click', unlockAudio);
  window.addEventListener('touchstart', unlockAudio);
}

export function playNotificationSound(volume = 80, isMuted = false) {
  if (isMuted || volume <= 0) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Scale volume 0-100 to gain range
    const normalizedVol = (volume / 100) * 0.5;

    // Chime Tone 1: High Bell (E6 ~ 1318.51Hz)
    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(normalizedVol, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    gain1.connect(ctx.destination);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1318.51, ctx.currentTime);
    osc1.connect(gain1);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.6);

    // Chime Tone 2: Warm Bell (B5 ~ 987.77Hz)
    setTimeout(() => {
      try {
        if (!ctx) return;
        const gain2 = ctx.createGain();
        gain2.gain.setValueAtTime(normalizedVol, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        gain2.connect(ctx.destination);

        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(987.77, ctx.currentTime);
        osc2.connect(gain2);
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 0.8);
      } catch (e) {}
    }, 130);

  } catch (e) {
    console.warn('Web Audio Playback Error:', e);
  }
}
