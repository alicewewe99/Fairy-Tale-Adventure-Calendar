import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Volume2,
  ChevronDown,
  ChevronUp,
  Heart,
  Compass,
  Scroll,
  Moon,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import {
  DailyEnergyQuote,
  EnergyCategory,
  getDailyQuote,
  getRandomQuote,
} from '../utils/dailyEnergyQuotes';
import { CalendarDay } from '../types';

interface DailyEnergyQuoteCardProps {
  todayDayObject: CalendarDay;
  onOpenDivinationModal: () => void;
  onOpenPwaModal: () => void;
}

export function DailyEnergyQuoteCard({
  todayDayObject,
  onOpenDivinationModal,
  onOpenPwaModal,
}: DailyEnergyQuoteCardProps) {
  const dateString = todayDayObject.dateString; // e.g. "2026-09-14"

  const [category, setCategory] = useState<EnergyCategory>('all');
  const [currentQuote, setCurrentQuote] = useState<DailyEnergyQuote>(() => {
    return getDailyQuote(dateString, 'all');
  });
  const [isDailyOriginal, setIsDailyOriginal] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCardCollapsed, setIsCardCollapsed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // When date changes or category resets, update daily quote if still in original daily mode
  useEffect(() => {
    if (isDailyOriginal) {
      setCurrentQuote(getDailyQuote(dateString, category));
    }
  }, [dateString, category, isDailyOriginal]);

  // Handle switching category
  const handleCategoryChange = (newCat: EnergyCategory) => {
    setCategory(newCat);
    setIsDailyOriginal(true);
    setCurrentQuote(getDailyQuote(dateString, newCat));
  };

  // Draw another quote
  const handleDrawNext = () => {
    const nextQuote = getRandomQuote(category, currentQuote.id);
    setCurrentQuote(nextQuote);
    setIsDailyOriginal(false);
  };

  // Reset to today's designated original quote
  const handleResetToDaily = () => {
    setCurrentQuote(getDailyQuote(dateString, category));
    setIsDailyOriginal(true);
  };

  // Copy quote text to clipboard
  const handleCopyQuote = () => {
    const textToCopy = `【今日能量短語・${currentQuote.categoryLabel}】\n${currentQuote.sourceName}\n\n「${currentQuote.quote}」\n\n💡 心靈指引：\n${currentQuote.wisdom}\n\n🌱 生活處方：\n${currentQuote.actionTip || ''}\n\n— 來自花栗鼠與貓熊看月曆 (${dateString})`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    });
  };

  // Optional text-to-speech reading
  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const speechText = `${currentQuote.categoryLabel}，${currentQuote.sourceName}。${currentQuote.quote}。心靈指引：${currentQuote.wisdom}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'zh-TW';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const categoryOptions: { id: EnergyCategory; label: string; icon: string }[] = [
    { id: 'all', label: '全部隨機', icon: '✨' },
    { id: 'rainbow', label: '彩虹卡肯定語', icon: '🌈' },
    { id: 'oracle', label: '媽祖六十甲子靈籤', icon: '🏮' },
    { id: 'deity', label: '善良神祇祝福', icon: '🙏' },
    { id: 'moon', label: '月相靈性指引', icon: '🌙' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 pt-3 pb-2 transition-all">
      <div
        className={`relative overflow-hidden rounded-3xl border border-amber-200/90 bg-gradient-to-r ${currentQuote.cardBgGradient} p-3.5 sm:p-5 shadow-xs backdrop-blur-md transition-all`}
      >
        {/* Decorative corner highlights */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/40 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-pink-100/40 blur-2xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
          {/* Left branding with icon click for desktop icon download */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenPwaModal}
              title="點此查看並下載這張可愛小貓熊桌面 Icon 圖示"
              className="group relative flex items-center justify-center p-0.5 rounded-2xl bg-white border border-amber-300 shadow-2xs hover:scale-105 active:scale-95 transition-transform"
            >
              <img
                src="/icon.svg"
                alt="貓熊月曆桌面圖示"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-contain bg-amber-50"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[8px] font-black px-1 rounded-full shadow-2xs group-hover:bg-amber-600">
                Icon
              </span>
            </button>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-black bg-amber-100/90 text-amber-900 border border-amber-300/80 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-600 animate-pulse" />
                  今日能量短語
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  彩虹卡 × 靈籤心靈指引
                </span>
                {isDailyOriginal ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    今日晨光指引
                  </span>
                ) : (
                  <button
                    onClick={handleResetToDaily}
                    className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-sky-100 text-sky-800 border border-sky-200 hover:bg-sky-200 active:scale-95 transition-all"
                    title="回到今日早晨自動指引"
                  >
                    回到今日指引
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {todayDayObject.year}年{todayDayObject.month}月{todayDayObject.day}日 ({todayDayObject.dayOfWeekName})・農曆{todayDayObject.lunarMonthName}{todayDayObject.lunarDayName}
              </p>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Draw / Next quote button */}
            <button
              onClick={handleDrawNext}
              id="btn-refresh-energy-quote"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-white/90 border border-amber-300 text-amber-900 hover:bg-amber-50 active:scale-95 transition-all shadow-2xs"
              title="隨機抽取另一句靈感與指引"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden xs:inline">抽下一句</span>
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopyQuote}
              id="btn-copy-energy-quote"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-white/90 border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-2xs"
              title="複製這句心靈語錄分享或記錄"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">已複製</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden xs:inline">複製</span>
                </>
              )}
            </button>

            {/* Speech read aloud button */}
            <button
              onClick={handleSpeak}
              className={`p-1.5 text-xs rounded-xl border transition-all shadow-2xs ${
                isSpeaking
                  ? 'bg-rose-100 border-rose-300 text-rose-700 animate-pulse'
                  : 'bg-white/90 border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title={isSpeaking ? '停止朗讀' : '語音朗讀此語錄'}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Collapse / Expand Card */}
            <button
              onClick={() => setIsCardCollapsed(!isCardCollapsed)}
              className="p-1.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95 transition-all shadow-2xs"
              title={isCardCollapsed ? '展開卡片' : '收合卡片'}
            >
              {isCardCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Category Pill Filters (Collapsible with card) */}
        {!isCardCollapsed && (
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1.5 mb-3 no-scrollbar">
            {categoryOptions.map((opt) => {
              const active = category === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleCategoryChange(opt.id)}
                  className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg border transition-all ${
                    active
                      ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                      : 'bg-white/80 text-slate-700 border-slate-200 hover:bg-white'
                  }`}
                >
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Card Main Quote Body */}
        {!isCardCollapsed ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3.5 sm:p-4 border border-amber-200/70 shadow-2xs">
            {/* Source & Tags Badge Row */}
            <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentQuote.badgeTheme.bg} ${currentQuote.badgeTheme.text} ${currentQuote.badgeTheme.border}`}
                >
                  {currentQuote.categoryLabel}
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {currentQuote.sourceName}
                </span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1 flex-wrap">
                {currentQuote.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Inspirational Quote */}
            <div className="my-2.5 relative pl-3.5 sm:pl-4 border-l-3 border-amber-400">
              {currentQuote.poemLines && currentQuote.poemLines.length > 0 ? (
                <div className="space-y-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm sm:text-base font-black text-slate-800 tracking-wide font-serif">
                    {currentQuote.poemLines.map((line, lIdx) => (
                      <div key={lIdx} className="flex items-center gap-1">
                        <span className="text-amber-500 text-xs">❖</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm sm:text-base font-black text-slate-800 leading-relaxed tracking-wide font-sans">
                  “{currentQuote.quote}”
                </p>
              )}
            </div>

            {/* Guidance Text */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/60">
              <span className="font-bold text-amber-900 mr-1.5">💡 今日指引：</span>
              {currentQuote.wisdom}
            </p>

            {/* Expanded Action Tip & Detailed Wisdom */}
            {isExpanded && currentQuote.actionTip && (
              <div className="mt-2.5 p-3 rounded-xl bg-white border border-pink-100 text-xs text-slate-700 space-y-1.5 transition-all">
                <div className="flex items-center gap-1.5 font-bold text-pink-700">
                  <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                  <span>生活日常心靈處方箋</span>
                </div>
                <p className="leading-relaxed pl-5 text-slate-600">
                  {currentQuote.actionTip}
                </p>
              </div>
            )}

            {/* Bottom Actions Row */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
              {/* Expand / collapse detail */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
              >
                <span>{isExpanded ? '收起生活處方' : '展開完整生活處方箋'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              <div className="flex items-center gap-2">
                {/* Download Desktop Icon quick link */}
                <button
                  onClick={onOpenPwaModal}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-sky-900 px-2 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all"
                  title="下載這張超萌貓熊桌面圖示"
                >
                  <Laptop className="w-3 h-3 text-sky-600" />
                  <span>桌面Icon下載</span>
                </button>

                {/* Jump to full Divination Modal */}
                <button
                  onClick={onOpenDivinationModal}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 hover:text-rose-900 px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all"
                  title="開啟線上神明靈籤與彩虹卡占卜殿堂"
                >
                  <ExternalLink className="w-3 h-3 text-rose-600" />
                  <span>進入占卜殿堂</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Minimized Compact Mode */
          <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-amber-200/70 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              <span className="text-xs font-bold text-amber-900 shrink-0">
                {currentQuote.categoryLabel}
              </span>
              <span className="text-xs text-slate-700 truncate font-medium">
                “{currentQuote.quote.slice(0, 40)}...”
              </span>
            </div>
            <button
              onClick={() => setIsCardCollapsed(false)}
              className="text-xs font-bold text-amber-800 hover:underline shrink-0 ml-2"
            >
              展開閱讀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
