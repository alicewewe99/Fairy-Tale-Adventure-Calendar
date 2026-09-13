import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  Trash2,
  Calendar as CalendarIcon,
  Download,
  Sparkles,
  Share2,
} from 'lucide-react';
import { CalendarDay, DayMarkerStore } from '../types';
import { formatDayToCopyString } from '../utils/calendarBuilder';
import { generateIcsContent, downloadFile } from '../utils/calendarExport';

interface DayDetailModalProps {
  day: CalendarDay | null;
  onClose: () => void;
  markerStore: DayMarkerStore;
  onUpdateMarkers: (dateString: string, emojis: string[], notes: string) => void;
}

// User explicitly requested emojis: 星星⭐、蛋糕🎂☀️🍖🌰🌱❤️🌹☕️
const QUICK_EMOJIS = [
  { emoji: '⭐', label: '星星' },
  { emoji: '🎂', label: '蛋糕' },
  { emoji: '☀️', label: '太陽' },
  { emoji: '🍖', label: '吃肉' },
  { emoji: '🌰', label: '栗子' },
  { emoji: '🌱', label: '幼苗' },
  { emoji: '❤️', label: '愛心' },
  { emoji: '🌹', label: '玫瑰' },
  { emoji: '☕️', label: '咖啡' },
];

// Additional Alice Wonderland and daily life icons
const MORE_EMOJIS = [
  { emoji: '🐇', label: '白兔' },
  { emoji: '🎩', label: '瘋帽' },
  { emoji: '⏰', label: '懷錶' },
  { emoji: '🍄', label: '蘑菇' },
  { emoji: '🌸', label: '櫻花' },
  { emoji: '🍰', label: '甜點' },
  { emoji: '🎁', label: '禮物' },
  { emoji: '✈️', label: '旅行' },
  { emoji: '💊', label: '吃藥' },
  { emoji: '💼', label: '上班' },
  { emoji: '💰', label: '發薪' },
  { emoji: '🐾', label: '熊掌' },
];

export const DayDetailModal: React.FC<DayDetailModalProps> = ({
  day,
  onClose,
  markerStore,
  onUpdateMarkers,
}) => {
  if (!day) return null;

  const currentData = markerStore[day.dateString] || { emojis: [], notes: '' };
  const [emojis, setEmojis] = useState<string[]>(currentData.emojis || []);
  const [notes, setNotes] = useState<string>(currentData.notes || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = markerStore[day.dateString] || { emojis: [], notes: '' };
    setEmojis(data.emojis || []);
    setNotes(data.notes || '');
  }, [day.dateString, markerStore]);

  // Handle instant toggle of emoji
  const handleToggleEmoji = (emoji: string) => {
    let nextEmojis: string[];
    if (emojis.includes(emoji)) {
      nextEmojis = emojis.filter((e) => e !== emoji);
    } else {
      nextEmojis = [...emojis, emoji];
    }
    setEmojis(nextEmojis);
    onUpdateMarkers(day.dateString, nextEmojis, notes);
  };

  // Handle clear emojis
  const handleClearEmojis = () => {
    setEmojis([]);
    onUpdateMarkers(day.dateString, [], notes);
  };

  // Handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    onUpdateMarkers(day.dateString, emojis, newNotes);
  };

  // Copy full date string: 年月日農曆日期星期
  const handleCopyDate = () => {
    const text = formatDayToCopyString(day);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  // Single day export to .ics for Apple / Google Calendar
  const handleExportSingleDayIcs = () => {
    const singleStore: DayMarkerStore = {
      [day.dateString]: {
        emojis,
        notes: notes || `${day.holidayName || '貓熊童話日曆記號'}`,
      },
    };
    const icsString = generateIcsContent(singleStore);
    downloadFile(
      icsString,
      `panda-calendar-${day.dateString}.ics`,
      'text/calendar;charset=utf-8'
    );
  };

  const copyString = formatDayToCopyString(day);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border-2 border-pink-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-100 via-pink-100 to-amber-100 px-5 py-4 border-b border-pink-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎩</span>
            <div>
              <h3 className="text-lg font-black text-slate-800">
                {day.year}年{day.month}月{day.day}日
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {day.lunarFullText} • {day.dayOfWeekName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-white/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Formatted Date Banner & Copy Button */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between gap-2">
            <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
              <div>{copyString}</div>
              {day.solarTerm && (
                <span className="inline-block mt-1 text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                  節氣：{day.solarTerm}
                </span>
              )}
              {day.holidayName && (
                <span className="inline-block mt-1 ml-1.5 text-[11px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-md">
                  {day.holidayName}
                </span>
              )}
            </div>
            <button
              onClick={handleCopyDate}
              className={`shrink-0 flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${
                copied
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>已複製</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>複製日期</span>
                </>
              )}
            </button>
          </div>

          {/* Current selected emojis display */}
          <div className="bg-pink-50/70 border border-pink-200 rounded-2xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-pink-900 flex items-center gap-1">
                <span>⭐ 目前已選標記</span>
                <span className="text-pink-600 font-normal">({emojis.length}個)</span>
              </span>
              {emojis.length > 0 && (
                <button
                  onClick={handleClearEmojis}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-bold px-2 py-1 rounded-lg hover:bg-rose-100 transition-colors"
                  title="清除所有標記"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>清除圖示</span>
                </button>
              )}
            </div>
            {emojis.length === 0 ? (
              <p className="text-xs text-slate-400 py-1 italic">
                尚未加入標記，點選下方 emoji 即可直接加入！不用寫標題事項。
              </p>
            ) : (
              <div className="flex items-center flex-wrap gap-2 py-1">
                {emojis.map((emoji, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleToggleEmoji(emoji)}
                    className="text-2xl p-1 bg-white rounded-xl border border-pink-200 shadow-xs cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                    title="點選可移除"
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Prompt requested emoji markers: 星星⭐、蛋糕🎂☀️🍖🌰🌱❤️🌹☕️ */}
          <div>
            <div className="text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>必選專屬特記（點選直接加入/取消）：</span>
              <span className="text-[11px] text-pink-600 font-normal">即點即存</span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5">
              {QUICK_EMOJIS.map((item) => {
                const isSelected = emojis.includes(item.emoji);
                return (
                  <button
                    key={item.emoji}
                    onClick={() => handleToggleEmoji(item.emoji)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 scale-105 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-[10px] text-slate-600 font-medium mt-0.5">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* More Alice and Life icons */}
          <div>
            <div className="text-xs font-bold text-slate-700 mb-1.5">
              童話與日常標記：
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {MORE_EMOJIS.map((item) => {
                const isSelected = emojis.includes(item.emoji);
                return (
                  <button
                    key={item.emoji}
                    onClick={() => handleToggleEmoji(item.emoji)}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-100 border-sky-400 scale-105 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-[9px] text-slate-500 mt-0.5 truncate">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional notes / memo */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              備忘事項與提醒（選填，可同步至手機）：
            </label>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="例如：下午三點聚餐、買生日禮物、準備出國行程..."
              rows={2}
              className="w-full text-xs sm:text-sm p-3 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pink-400 placeholder:text-slate-400 resize-none"
            />
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between gap-2">
          <button
            onClick={handleExportSingleDayIcs}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
            title="將此日行程匯出到手機行事曆 (.ics)"
          >
            <Download className="w-3.5 h-3.5 text-sky-600" />
            <span>加到手機行事曆 (.ics)</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-xs hover:from-pink-600 hover:to-rose-600 active:scale-95 transition-all"
          >
            完成儲存
          </button>
        </div>
      </div>
    </div>
  );
};
