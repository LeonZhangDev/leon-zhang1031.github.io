import { afterEach, describe, expect, it, vi } from 'vitest';
import { setAmbienceVolume, sliderToGain } from './sound-fx';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('Jingxin sound gain curve', () => {
  it('keeps silence and full volume exact', () => {
    expect(sliderToGain(0)).toBe(0);
    expect(sliderToGain(1)).toBe(1);
  });

  it('maps the linear slider to a monotonic perceptual curve', () => {
    const quarter = sliderToGain(0.25);
    const half = sliderToGain(0.5);
    const threeQuarter = sliderToGain(0.75);

    expect(quarter).toBeGreaterThan(0);
    expect(quarter).toBeLessThan(half);
    expect(half).toBeLessThan(threeQuarter);
    expect(threeQuarter).toBeLessThan(1);
    expect(half).toBeCloseTo(0.251, 2);
  });

  it('clamps values outside the saved setting range', () => {
    expect(sliderToGain(-1)).toBe(0);
    expect(sliderToGain(2)).toBe(1);
  });

  it('keeps a fade bounded when the first RAF timestamp precedes its setup', () => {
    let frame: FrameRequestCallback = () => {};
    vi.stubGlobal('window', { matchMedia: () => ({ matches: false }) });
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      frame = callback;
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.spyOn(performance, 'now').mockReturnValue(1000);
    let volume = 1;
    const audio = {
      get volume() { return volume; },
      set volume(value: number) {
        if (value < 0 || value > 1) throw new RangeError('Invalid media volume');
        volume = value;
      },
    } as HTMLAudioElement;

    setAmbienceVolume(audio, 0.48, 150);
    expect(() => frame(999)).not.toThrow();
    expect(audio.volume).toBe(1);
    frame(1075);
    expect(audio.volume).toBeGreaterThan(0.48);
    expect(audio.volume).toBeLessThan(1);
    frame(1150);
    expect(audio.volume).toBe(0.48);
  });
});
