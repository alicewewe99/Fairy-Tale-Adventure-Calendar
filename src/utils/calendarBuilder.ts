import { CalendarDay, DayMarkerStore } from '../types';
import { getLunarInfo, getLunarFestival, getWesternHoliday, SOLAR_TERM_DATES } from '../data/lunarSolarData';
import { getTaiwanHolidayInfo } from '../data/taiwanHolidays';

const WEEKDAY_NAMES = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

export function formatDayToCopyString(day: CalendarDay): string {
  // Format: 年月日農曆日期星期, e.g. "2026年9月13日 農曆八月初三 星期日"
  return `${day.year}年${day.month}月${day.day}日 ${day.lunarFullText} ${day.dayOfWeekName}`;
}

export function buildMonthCalendarGrid(
  year: number,
  month: number, // 1 - 12
  markerStore: DayMarkerStore
): CalendarDay[] {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();

  // First day of current target month
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday

  // Days in current month
  const daysInCurrentMonth = new Date(year, month, 0).getDate();
  // Days in previous month
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  const gridDays: CalendarDay[] = [];
  const TOTAL_GRID_CELLS = 42; // Fixed 6 rows x 7 days

  // 1. Previous month trailing days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDay = daysInPrevMonth - i;
    const prevMonthNum = month === 1 ? 12 : month - 1;
    const prevYearNum = month === 1 ? year - 1 : year;
    const dateObj = new Date(prevYearNum, prevMonthNum - 1, prevDay);
    gridDays.push(createDayObject(dateObj, false, todayYear, todayMonth, todayDate, markerStore));
  }

  // 2. Current month days
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dateObj = new Date(year, month - 1, d);
    gridDays.push(createDayObject(dateObj, true, todayYear, todayMonth, todayDate, markerStore));
  }

  // 3. Next month leading days to fill up to exactly 42 cells (fixed layout)
  const remainingCells = TOTAL_GRID_CELLS - gridDays.length;
  for (let n = 1; n <= remainingCells; n++) {
    const nextMonthNum = month === 12 ? 1 : month + 1;
    const nextYearNum = month === 12 ? year + 1 : year;
    const dateObj = new Date(nextYearNum, nextMonthNum - 1, n);
    gridDays.push(createDayObject(dateObj, false, todayYear, todayMonth, todayDate, markerStore));
  }

  return gridDays;
}

function createDayObject(
  date: Date,
  isCurrentMonth: boolean,
  todayYear: number,
  todayMonth: number,
  todayDate: number,
  markerStore: DayMarkerStore
): CalendarDay {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const dow = date.getDay();
  const dateString = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const isToday = y === todayYear && m === todayMonth && d === todayDate;
  const isWeekend = dow === 0 || dow === 6;

  // Lunar information
  const lunar = getLunarInfo(date);
  const lunarFestival = getLunarFestival(lunar.lunarMonth, lunar.lunarDay, lunar.isLeapMonth, false, dateString);
  const solarTerm = SOLAR_TERM_DATES[dateString];
  const westernHoliday = getWesternHoliday(m, d, dow);

  // Taiwan Statutory Holidays & Memorial days
  const twHoliday = getTaiwanHolidayInfo(dateString, y, m, d, dow, lunar.lunarMonth, lunar.lunarDay, lunar.isLeapMonth);

  // Determine holiday status
  let isHoliday = false;
  let isNationalHoliday = false;
  let holidayName: string | undefined = undefined;
  let commemorativeName: string | undefined = undefined;

  if (twHoliday) {
    isHoliday = twHoliday.isHoliday || isWeekend;
    isNationalHoliday = twHoliday.isNationalHoliday;
    holidayName = twHoliday.name;
    if (!twHoliday.isHoliday) {
      commemorativeName = twHoliday.name;
    }
  } else if (lunarFestival) {
    holidayName = lunarFestival;
    if (lunarFestival === '春節' || lunarFestival === '除夕' || lunarFestival === '端午節' || lunarFestival === '中秋節') {
      isHoliday = true;
      isNationalHoliday = true;
    } else {
      isHoliday = isWeekend;
    }
  } else if (westernHoliday) {
    if (westernHoliday === '元旦') {
      isHoliday = true;
      isNationalHoliday = true;
      holidayName = '元旦';
    } else {
      commemorativeName = westernHoliday;
      isHoliday = isWeekend;
    }
  } else {
    isHoliday = isWeekend;
  }

  // User markers
  const stored = markerStore[dateString];
  const emojiMarkers = stored?.emojis || [];
  const notes = stored?.notes || '';
  const hasSchedule = emojiMarkers.length > 0 || notes.trim().length > 0;

  return {
    date,
    dateString,
    year: y,
    month: m,
    day: d,
    dayOfWeek: dow,
    dayOfWeekName: WEEKDAY_NAMES[dow],
    lunarYear: lunar.lunarYear,
    lunarMonth: lunar.lunarMonth,
    lunarMonthName: lunar.lunarMonthName,
    lunarDay: lunar.lunarDay,
    lunarDayName: lunar.lunarDayName,
    lunarFullText: lunar.lunarFullText,
    isLeapMonth: lunar.isLeapMonth,
    ganzhiYear: lunar.ganzhiYear,
    zodiac: lunar.zodiac,
    solarTerm,
    isHoliday,
    isNationalHoliday,
    holidayName,
    commemorativeName,
    westernHoliday,
    isCurrentMonth,
    isToday,
    isWeekend,
    emojiMarkers,
    notes,
    hasSchedule,
  };
}
