import { Solar } from 'lunar-typescript';
import { normalizeInput } from '../calendar/engine';
import type { CalendarInput } from '../calendar/types';
import type { BaziGender } from './input';

export interface LiuYueItem {
  index: number;
  name: string;
  ganZhi: string;
}
export interface LiuNianItem {
  year: number;
  age: number;
  ganZhi: string;
  liuYue: LiuYueItem[];
}
export interface DaYunItem {
  index: number;
  ganZhi: string;
  startYear: number;
  endYear: number;
  startAge: number;
  endAge: number;
  liuNian: LiuNianItem[];
}
export interface LuckTimeline {
  direction: '顺排' | '逆排';
  startOffset: string;
  startDate: string;
  sect: 1 | 2;
  cycles: DaYunItem[];
}

export function calculateLuckTimeline(
  input: CalendarInput,
  gender: BaziGender,
  sect: 1 | 2 = 2,
  count = 9,
): LuckTimeline {
  const effective = normalizeInput(input).effective;
  const lunar = Solar.fromYmdHms(
    effective.year,
    effective.month,
    effective.day,
    effective.hour,
    effective.minute,
    0,
  ).getLunar();
  const yun = lunar.getEightChar().getYun(gender === 'male' ? 1 : 0, sect);
  const start = yun.getStartSolar();
  return {
    direction: yun.isForward() ? '顺排' : '逆排',
    startOffset: `${yun.getStartYear()}年${yun.getStartMonth()}月${yun.getStartDay()}日${yun.getStartHour()}时`,
    startDate: start.toYmdHms(),
    sect,
    cycles: yun
      .getDaYun(count)
      .filter((cycle) => cycle.getIndex() > 0)
      .map((cycle) => ({
        index: cycle.getIndex(),
        ganZhi: cycle.getGanZhi(),
        startYear: cycle.getStartYear(),
        endYear: cycle.getEndYear(),
        startAge: cycle.getStartAge(),
        endAge: cycle.getEndAge(),
        liuNian: cycle.getLiuNian().map((year) => ({
          year: year.getYear(),
          age: year.getAge(),
          ganZhi: year.getGanZhi(),
          liuYue: year.getLiuYue().map((month) => ({
            index: month.getIndex(),
            name: month.getMonthInChinese(),
            ganZhi: month.getGanZhi(),
          })),
        })),
      })),
  };
}
