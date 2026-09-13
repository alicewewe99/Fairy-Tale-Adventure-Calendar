import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Copy,
  Check,
  QrCode,
  Download,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { AlicePandaMascot } from './AlicePandaMascot';
import { CalendarDay } from '../types';
import { formatDayToCopyString } from '../utils/calendarBuilder';

interface CalendarHeaderProps {
  currentYear: number;
  currentMonth: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onJumpToToday: () => void;
  todayDayObject: CalendarDay;
  onOpenPwaModal: () => void;
  onOpenSyncModal: () => void;
  onOpenDivinationModal: () => void;
  copiedToday: boolean;
  onCopyTodayDate: () => void;
}

const YEAR_OPTIONS = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];
const MONTH_NAMES = [
  '1月 一月',
  '2月 二月',
  '3月 三月',
  '4月 四月',
  '5月 五月',
  '6月 六月',
  '7月 七月',
  '8月 八月',
  '9月 九月',
  '10月 十月',
  '11月 十一月',
  '12月 十二月',
];

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentYear,
  currentMonth,
  onYearChange,
  onMonthChange,
  onPrevMonth,
  onNextMonth,
  onJumpToToday,
  todayDayObject,
  onOpenPwaModal,
  onOpenSyncModal,
  onOpenDivinationModal,
  copiedToday,
  onCopyTodayDate,
}) => {
  const isCurrentYearMonthToday =
    currentYear === todayDayObject.year && currentMonth === todayDayObject.month;

  const todayFormattedString = formatDayToCopyString(todayDayObject);

  return (
    <header className="w-full bg-gradient-to-r from-sky-50 via-pink-50 to-amber-50 border-b border-pink-200/70 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        {/* Top brand banner with Alice Panda */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-pink-200/50">
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer transition-transform hover:scale-105 active:scale-95" onClick={onJumpToToday} title="點選回到今天">
              <AlicePandaMascot size={58} className="drop-shadow-sm" />
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-white shadow-xs">
                魔法日曆
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 flex items-center gap-1.5">
                  <span className="text-sky-600">愛麗絲</span>
                  <span className="text-pink-600">貓熊</span>
                  <span className="text-slate-800">每月月曆</span>
                </h1>
                <span className="bg-pink-100 text-pink-700 text-xs px-2 py-0.5 rounded-full font-medium hidden sm:inline-block border border-pink-200">
                  台灣國定假・農曆24節氣
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                <span>{todayDayObject.ganzhiYear}年 【{todayDayObject.zodiac}年】</span>
                <span className="text-pink-400">•</span>
                <span>童話手繪風・PWA桌面App</span>
              </p>
            </div>
          </div>

          {/* Action button cluster (PWA, Export/Import, Oracles) */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            {/* Divination and Oracles button */}
            <button
              id="btn-open-oracles"
              onClick={onOpenDivinationModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xs hover:from-purple-600 hover:to-indigo-700 active:scale-95 transition-all"
              title="神明靈籤與指引：彩虹卡、東港鎮海宮靈籤、浪漫天使卡、台灣好神卡、愛的解答之書"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>靈籤神諭</span>
            </button>

            {/* Sync & Export/Import (.ics / Google Calendar) */}
            <button
              id="btn-open-sync"
              onClick={onOpenSyncModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 active:scale-95 transition-all shadow-xs"
              title="匯入與匯出至手機行事曆 (.ics)"
            >
              <Download className="w-4 h-4 text-sky-600" />
              <span>同步匯出</span>
            </button>

            {/* PWA QR Code and Install */}
            <button
              id="btn-open-pwa"
              onClick={onOpenPwaModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 active:scale-95 transition-all shadow-xs"
              title="手機下載QR Code與桌面App安裝"
            >
              <QrCode className="w-4 h-4 text-rose-600" />
              <span>手機QR Code</span>
            </button>
          </div>
        </div>

        {/* Today's Highlight Strip & Quick Copy Date */}
        <div className="mt-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 bg-white/80 backdrop-blur-xs p-2 sm:px-4 py-2 rounded-xl border border-pink-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 overflow-x-auto w-full sm:w-auto">
            <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0 shadow-xs">
              今日
            </span>
            <span className="font-semibold text-slate-800 whitespace-nowrap">
              {todayFormattedString}
            </span>
            {todayDayObject.solarTerm && (
              <span className="text-[11px] font-medium bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm shrink-0">
                節氣：{todayDayObject.solarTerm}
              </span>
            )}
            {todayDayObject.holidayName && (
              <span className="text-[11px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-sm shrink-0">
                {todayDayObject.holidayName}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              id="btn-copy-today"
              onClick={onCopyTodayDate}
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all ${
                copiedToday
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title="複製當天日期（格式：年月日農曆日期星期）"
            >
              {copiedToday ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>已複製！</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>複製今天日期</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Large Navigation Bar (Prev / Year Select / Month Select / Next / Jump to Today) - Strictly in the SAME ROW (flex-nowrap) */}
        <div className="mt-3 flex flex-nowrap items-center justify-between gap-1 sm:gap-3 w-full">
          {/* Large, touch-friendly Prev Month Button */}
          <button
            id="btn-prev-month"
            onClick={onPrevMonth}
            className="flex items-center justify-center gap-0.5 sm:gap-1.5 shrink-0 px-2.5 sm:px-4 h-11 sm:h-13 rounded-xl sm:rounded-2xl bg-white border-2 border-sky-300 text-sky-700 hover:bg-sky-50 active:bg-sky-100 active:scale-95 shadow-xs transition-all cursor-pointer font-bold text-xs sm:text-base select-none whitespace-nowrap"
            aria-label="上個月"
            title="上個月（放大好點選）"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            <span>上個月</span>
          </button>

          {/* Center cluster: Year and Month Selectors & Jump to Today */}
          <div className="flex items-center justify-center gap-1 sm:gap-2.5 shrink min-w-0">
            {/* Year Selector (2026 - 2033) */}
            <div className="relative">
              <select
                id="select-year"
                value={currentYear}
                onChange={(e) => onYearChange(Number(e.target.value))}
                className="appearance-none bg-white text-slate-900 border-2 border-pink-300 rounded-lg sm:rounded-xl px-2 sm:px-3.5 py-1.5 sm:py-2.5 pr-6 sm:pr-8 text-xs sm:text-base font-black shadow-xs focus:outline-hidden focus:ring-2 focus:ring-pink-400 cursor-pointer text-center"
              >
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}年
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 text-pink-500 font-bold text-[10px] sm:text-xs">
                ▼
              </div>
            </div>

            {/* Month Selector */}
            <div className="relative">
              <select
                id="select-month"
                value={currentMonth}
                onChange={(e) => onMonthChange(Number(e.target.value))}
                className="appearance-none bg-white text-slate-900 border-2 border-sky-300 rounded-lg sm:rounded-xl px-2 sm:px-3.5 py-1.5 sm:py-2.5 pr-6 sm:pr-8 text-xs sm:text-base font-black shadow-xs focus:outline-hidden focus:ring-2 focus:ring-sky-400 cursor-pointer text-center"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 text-sky-500 font-bold text-[10px] sm:text-xs">
                ▼
              </div>
            </div>

            {/* "回到今天" Button */}
            <button
              id="btn-jump-today"
              onClick={onJumpToToday}
              disabled={isCurrentYearMonthToday}
              className={`flex items-center justify-center gap-1 shrink-0 h-9 sm:h-11 px-2 sm:px-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border transition-all select-none whitespace-nowrap ${
                isCurrentYearMonthToday
                  ? 'bg-amber-100 text-amber-800 border-amber-300 cursor-default opacity-90'
                  : 'bg-amber-400 text-amber-950 border-amber-500 hover:bg-amber-500 active:scale-95 cursor-pointer shadow-xs'
              }`}
              title="回到今天 (當天日期月份)"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
              <span className="hidden sm:inline">回到今天</span>
              <span className="inline sm:hidden">今天</span>
            </button>
          </div>

          {/* Large, touch-friendly Next Month Button */}
          <button
            id="btn-next-month"
            onClick={onNextMonth}
            className="flex items-center justify-center gap-0.5 sm:gap-1.5 shrink-0 px-2.5 sm:px-4 h-11 sm:h-13 rounded-xl sm:rounded-2xl bg-white border-2 border-sky-300 text-sky-700 hover:bg-sky-50 active:bg-sky-100 active:scale-95 shadow-xs transition-all cursor-pointer font-bold text-xs sm:text-base select-none whitespace-nowrap"
            aria-label="下個月"
            title="下個月（放大好點選）"
          >
            <span>下個月</span>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
};
