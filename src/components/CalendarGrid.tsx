import React from 'react';
import { CalendarDay } from '../types';
import { Sparkles, Calendar as CalendarIcon, Heart, Star } from 'lucide-react';

interface CalendarGridProps {
  days: CalendarDay[];
  onSelectDay: (day: CalendarDay) => void;
  selectedDayString?: string;
}

const WEEKDAYS = [
  { name: '日', full: '週日', isRed: true },
  { name: '一', full: '週一', isRed: false },
  { name: '二', full: '週二', isRed: false },
  { name: '三', full: '週三', isRed: false },
  { name: '四', full: '週四', isRed: false },
  { name: '五', full: '週五', isRed: false },
  { name: '六', full: '週六', isRed: true },
];

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  onSelectDay,
  selectedDayString,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 py-4">
      {/* Calendar Frame container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-pink-200 shadow-md overflow-hidden">
        {/* Weekday Header Row */}
        <div className="grid grid-cols-7 bg-gradient-to-r from-pink-100/80 via-purple-50 to-sky-100/80 border-b-2 border-pink-200">
          {WEEKDAYS.map((wd, index) => (
            <div
              key={wd.name}
              className={`py-2.5 sm:py-3 text-center font-black text-xs sm:text-base select-none border-r last:border-r-0 border-pink-200/60 ${
                wd.isRed ? 'text-rose-600 bg-rose-50/40' : 'text-slate-700'
              }`}
            >
              <span className="inline-block sm:hidden">{wd.name}</span>
              <span className="hidden sm:inline-block">{wd.full}</span>
            </div>
          ))}
        </div>

        {/* 42 Fixed-Size Grid Cells (6 rows x 7 days) */}
        <div className="grid grid-cols-7 divide-x divide-y divide-pink-100 bg-slate-50/30">
          {days.map((day, idx) => {
            const isSelected = selectedDayString === day.dateString;
            const isHolidayCell = day.isHoliday;
            const isCurrentMonth = day.isCurrentMonth;
            const isToday = day.isToday;

            return (
              <div
                key={`${day.dateString}-${idx}`}
                id={`cal-cell-${day.dateString}`}
                onClick={() => onSelectDay(day)}
                className={`group relative flex flex-col justify-between p-1 sm:p-2 transition-all cursor-pointer select-none min-h-[105px] sm:min-h-[128px] ${
                  // Month focus vs Dimmed
                  !isCurrentMonth
                    ? 'bg-slate-100/60 opacity-55 text-slate-400'
                    : isHolidayCell
                    ? 'bg-rose-50/95 hover:bg-rose-100/95' // 休假日粉紅色底色
                    : 'bg-white hover:bg-sky-50/70'
                } ${
                  // Today highlight with Alice magic border
                  isToday
                    ? 'ring-3 ring-amber-400 ring-inset bg-amber-50/60 z-10 shadow-sm'
                    : ''
                } ${
                  isSelected ? 'ring-2 ring-sky-500 ring-inset z-10' : ''
                }`}
                title={`${day.dateString} ${day.lunarFullText} ${day.holidayName ? `• ${day.holidayName}` : ''}`}
              >
                {/* Top Section: Date Number, Today Badge & National Tag */}
                <div>
                  <div className="flex items-start justify-between gap-1">
                    {/* Solar Date Number */}
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-base sm:text-xl leading-none font-black ${
                          !isCurrentMonth
                            ? 'text-slate-400'
                            : isHolidayCell
                            ? 'text-rose-600 font-black'
                            : isToday
                            ? 'text-sky-700 font-black'
                            : 'text-slate-800'
                        }`}
                      >
                        {day.day}
                      </span>

                      {/* Today Badge */}
                      {isToday && (
                        <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-1 py-0.2 rounded-md shadow-xs flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-950" />
                          <span className="hidden sm:inline">今日</span>
                        </span>
                      )}
                    </div>

                    {/* National Holiday mini badge */}
                    {day.isNationalHoliday && (
                      <span className="bg-rose-600 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 rounded-md shadow-xs whitespace-nowrap shrink-0">
                        國定假
                      </span>
                    )}
                  </div>

                  {/* 完整顯示假期名稱 (Full Holiday Name, break-words, never truncated) */}
                  {day.holidayName && (
                    <div className="mt-1 w-full">
                      <div className="w-full bg-rose-100/95 text-rose-800 border border-rose-300/80 rounded px-1 py-0.5 text-[10px] sm:text-[11px] font-extrabold leading-tight text-center sm:text-left break-words shadow-2xs">
                        {day.holidayName}
                      </div>
                    </div>
                  )}

                  {/* Western or Commemorative Holiday (if no national holiday name) */}
                  {day.westernHoliday && !day.holidayName && (
                    <div className="mt-1 w-full">
                      <div className="w-full text-[9px] sm:text-[10px] text-sky-800 font-bold bg-sky-50 border border-sky-200/80 rounded px-1 py-0.5 leading-tight break-words text-center sm:text-left shadow-2xs">
                        {day.westernHoliday}
                      </div>
                    </div>
                  )}
                  {day.commemorativeName && !day.holidayName && !day.westernHoliday && (
                    <div className="mt-1 w-full">
                      <div className="w-full text-[9px] sm:text-[10px] text-amber-800 font-bold bg-amber-50 border border-amber-200/80 rounded px-1 py-0.5 leading-tight break-words text-center sm:text-left shadow-2xs">
                        {day.commemorativeName}
                      </div>
                    </div>
                  )}
                </div>

                {/* Middle Row: Lunar Date, 24 Solar Terms & Lunar Festival */}
                <div className="my-1 flex items-center justify-between gap-1 flex-wrap">
                  {/* Lunar Date (農曆) */}
                  <span
                    className={`text-[10px] sm:text-xs font-semibold ${
                      !isCurrentMonth
                        ? 'text-slate-400'
                        : isHolidayCell
                        ? 'text-rose-600 font-bold'
                        : 'text-slate-500'
                    }`}
                  >
                    {day.lunarDay === 1 ? day.lunarMonthName : day.lunarDayName}
                  </span>

                  {/* 24 Solar Terms (24節氣) */}
                  {day.solarTerm && (
                    <span className="inline-flex items-center gap-0.5 bg-emerald-600 text-white text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.2 rounded-sm shadow-xs whitespace-nowrap">
                      <Sparkles className="w-2.5 h-2.5" />
                      {day.solarTerm}
                    </span>
                  )}

                  {/* Lunar Festival (if different from holidayName) */}
                  {day.lunarFestival && day.lunarFestival !== day.holidayName && (
                    <span className="text-[9px] sm:text-[10px] text-amber-800 font-bold break-words">
                      {day.lunarFestival}
                    </span>
                  )}
                </div>

                {/* Bottom Row: User Emoji Markers & Dot Indicator */}
                <div className="pt-0.5 border-t border-dashed border-pink-200/50 flex items-center justify-between min-h-[22px]">
                  {/* Emoji markers list */}
                  <div className="flex items-center flex-wrap gap-0.5 overflow-hidden max-h-[20px]">
                    {day.emojiMarkers && day.emojiMarkers.length > 0 ? (
                      day.emojiMarkers.slice(0, 4).map((emoji, eIdx) => (
                        <span
                          key={eIdx}
                          className="text-xs sm:text-sm leading-none inline-block hover:scale-125 transition-transform"
                        >
                          {emoji}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        +標記
                      </span>
                    )}
                    {day.emojiMarkers && day.emojiMarkers.length > 4 && (
                      <span className="text-[9px] text-slate-400 font-bold">
                        +{day.emojiMarkers.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Note marker dot */}
                  {day.notes && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0"
                      title="有備忘提醒"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Legend Footer */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 px-1">
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-rose-50 border border-rose-300 inline-block" />
            <span className="text-rose-700 font-bold">粉紅底紅字：休假日／國定假日</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-emerald-600 inline-block" />
            <span className="text-emerald-800 font-medium">綠色標籤：24節氣</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-amber-100 border border-amber-400 inline-block" />
            <span className="text-amber-800 font-medium">金框高亮：今日</span>
          </div>
        </div>

        <div className="text-slate-500 text-[11px]">
          點選任一日期可加入 ⭐🎂☀️🍖🌰🌱❤️🌹☕️ 特殊 emoji 記號
        </div>
      </div>
    </div>
  );
};
