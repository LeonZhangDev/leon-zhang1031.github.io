import { describe, expect, it } from 'vitest';
import { calculateLuckTimeline } from './luck';

describe('Bazi luck timeline', () => {
  it('builds auditable Dayun and Liunian periods from a dated chart', () => {
    const timeline = calculateLuckTimeline(
      {
        year: 1986,
        month: 5,
        day: 29,
        hour: 0,
        minute: 0,
        timeMode: 'legal',
        lateZi: 'next-day',
      },
      'male',
      2,
    );
    expect(timeline.direction).toBe('顺排');
    expect(timeline.startDate).toBe('1989-03-08 16:00:00');
    expect(timeline.cycles).toHaveLength(8);
    expect(timeline.cycles[0]).toMatchObject({ ganZhi: '甲午', startYear: 1989, endYear: 1998 });
    expect(timeline.cycles[0].liuNian[0]).toMatchObject({ year: 1989, ganZhi: '己巳' });
    expect(timeline.cycles[0].liuNian[0].liuYue).toHaveLength(12);
  });

  it('reverses direction for the same Yang-year female birth and exposes sect differences', () => {
    const input = {
      year: 1986,
      month: 5,
      day: 29,
      hour: 0,
      minute: 0,
      timeMode: 'legal' as const,
      lateZi: 'next-day' as const,
    };
    const female = calculateLuckTimeline(input, 'female', 2);
    expect(female.direction).toBe('逆排');
    expect(female.cycles[0].ganZhi).toBe('壬辰');
    expect(female.startDate).toBe('1994-01-10 12:00:00');
    expect(calculateLuckTimeline(input, 'male', 1).startDate).toBe('1989-03-10 00:00:00');
  });
});
