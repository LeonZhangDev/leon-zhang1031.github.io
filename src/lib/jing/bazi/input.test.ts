import { describe, expect, it } from 'vitest';
import { resolveLunarInput, validateFourPillars } from './input';

describe('Bazi input modes', () => {
  it('converts the documented lunar birth date to its solar date', () => {
    const resolved = resolveLunarInput({
      year: 1986,
      month: 4,
      day: 21,
      hour: 0,
      minute: 0,
      leapMonth: false,
      timeMode: 'legal',
      lateZi: 'next-day',
    });
    expect(resolved.calendarInput).toMatchObject({
      year: 1986,
      month: 5,
      day: 29,
      hour: 0,
      minute: 0,
    });
  });

  it('rejects an impossible leap month without silently falling back', () => {
    expect(() =>
      resolveLunarInput({
        year: 1986,
        month: 4,
        day: 21,
        hour: 0,
        minute: 0,
        leapMonth: true,
        timeMode: 'legal',
        lateZi: 'next-day',
      }),
    ).toThrow(/不存在/);
  });

  it('accepts only members of the sixty Jiazi cycle', () => {
    expect(
      validateFourPillars({
        year: '丙寅',
        month: '癸巳',
        day: '癸酉',
        hour: '壬子',
      }).day,
    ).toBe('癸酉');
    expect(() =>
      validateFourPillars({
        year: '甲丑',
        month: '癸巳',
        day: '癸酉',
        hour: '壬子',
      }),
    ).toThrow(/六十甲子/);
  });
});
