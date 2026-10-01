import { Lunar } from 'lunar-typescript';
import type { FourPillars } from '../calendar/engine';
import type { CalendarInput, DerivationStep } from '../calendar/types';

export type BaziInputMode = 'solar' | 'lunar' | 'pillars';
export type BaziGender = 'male' | 'female';

export interface LunarBirthInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  leapMonth: boolean;
  timeMode: CalendarInput['timeMode'];
  longitude?: number;
  lateZi: CalendarInput['lateZi'];
}

export interface ResolvedLunarInput {
  calendarInput: CalendarInput;
  derivation: DerivationStep[];
  sourceLabel: string;
}

const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const;
const JIA_ZI = new Set(
  Array.from({ length: 60 }, (_, index) => `${GAN[index % 10]}${ZHI[index % 12]}`),
);

export function normalizePillar(value: string): string {
  return value.trim().replaceAll(/\s+/g, '');
}

export function validateFourPillars(input: FourPillars): FourPillars {
  const normalized = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, normalizePillar(value)]),
  ) as unknown as FourPillars;
  for (const [key, value] of Object.entries(normalized)) {
    if (!JIA_ZI.has(value))
      throw new Error(
        `${key === 'year' ? '年' : key === 'month' ? '月' : key === 'day' ? '日' : '时'}柱“${value || '空'}”不是有效六十甲子。`,
      );
  }
  return normalized;
}

export function resolveLunarInput(input: LunarBirthInput): ResolvedLunarInput {
  if (!Number.isInteger(input.year) || input.year < 1900 || input.year > 2100) {
    throw new Error('农历年份仅支持 1900—2100。');
  }
  if (!Number.isInteger(input.month) || input.month < 1 || input.month > 12)
    throw new Error('农历月份应为 1—12。');
  if (!Number.isInteger(input.day) || input.day < 1 || input.day > 30)
    throw new Error('农历日期应为 1—30。');
  if (
    !Number.isInteger(input.hour) ||
    input.hour < 0 ||
    input.hour > 23 ||
    !Number.isInteger(input.minute) ||
    input.minute < 0 ||
    input.minute > 59
  ) {
    throw new Error('时刻无效。');
  }
  try {
    const lunarMonth = input.leapMonth ? -input.month : input.month;
    const solar = Lunar.fromYmdHms(
      input.year,
      lunarMonth,
      input.day,
      input.hour,
      input.minute,
      0,
    ).getSolar();
    const calendarInput: CalendarInput = {
      year: solar.getYear(),
      month: solar.getMonth(),
      day: solar.getDay(),
      hour: solar.getHour(),
      minute: solar.getMinute(),
      timeMode: input.timeMode,
      lateZi: input.lateZi,
      ...(input.timeMode === 'true-solar' ? { longitude: input.longitude } : {}),
    };
    return {
      calendarInput,
      sourceLabel: `农历 ${input.year} 年${input.leapMonth ? '闰' : ''}${input.month}月${input.day}日`,
      derivation: [
        {
          label: '阴历转阳历',
          rule: 'lunar-typescript 农历月表；闰月以独立月份校验',
          value: `${solar.toYmd()} ${String(input.hour).padStart(2, '0')}:${String(input.minute).padStart(2, '0')}`,
        },
      ],
    };
  } catch {
    throw new Error(
      `所选年份不存在该${input.leapMonth ? '闰' : ''}${input.month}月或日期超出该月天数。`,
    );
  }
}
