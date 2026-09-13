import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  RefreshCw,
  Heart,
  BookOpen,
  Moon,
  Compass,
  CheckCircle2,
  AlertCircle,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { RAINBOW_CARDS, CHAKRA_INFO } from '../data/rainbowCards';
import { ZHENHAI_ORACLES, getZhenhaiOracle } from '../data/zhenhaiTempleOracles';
import { ROMANCE_ANGELS_CARDS, getRomanceAngelCard } from '../data/romanceAngelsCards';
import { GOOD_DEITY_CARDS, getGoodDeityCard } from '../data/goodDeityCards';
import { MOONOLOGY_CARDS, getMoonologyCard } from '../data/moonologyCards';
import {
  LOVE_ANSWERS,
  getRandomLoveAnswer,
  YES_NO_ORACLES,
  getRandomYesNoOracle,
} from '../data/loveAnswersBook';
import {
  RainbowCard,
  ZhenhaiOracle,
  RomanceAngelCard,
  GoodDeityCard,
  MoonologyCard,
  MoonologyCategory,
  LoveAnswer,
  YesNoOracle,
} from '../types';

interface DivinationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DivinationTab = 'rainbow' | 'zhenhai' | 'romance' | 'deity' | 'moonology' | 'loveBook' | 'yesNo';

export const DivinationModal: React.FC<DivinationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<DivinationTab>('rainbow');

  // Drawn States
  const [currentRainbow, setCurrentRainbow] = useState<RainbowCard>(() => RAINBOW_CARDS[0]);
  const [currentZhenhai, setCurrentZhenhai] = useState<ZhenhaiOracle>(() => ZHENHAI_ORACLES[0]);
  const [currentRomance, setCurrentRomance] = useState<RomanceAngelCard>(() => ROMANCE_ANGELS_CARDS[0]);
  const [currentDeity, setCurrentDeity] = useState<GoodDeityCard>(() => GOOD_DEITY_CARDS[0]);
  const [currentMoonology, setCurrentMoonology] = useState<MoonologyCard>(() => MOONOLOGY_CARDS[0]);
  const [moonCategoryFilter, setMoonCategoryFilter] = useState<'全部' | MoonologyCategory>('全部');
  const [currentLoveAnswer, setCurrentLoveAnswer] = useState<LoveAnswer>(() => LOVE_ANSWERS[0]);
  const [currentYesNo, setCurrentYesNo] = useState<YesNoOracle>(() => getRandomYesNoOracle());

  // Shuffling animation state
  const [isShuffling, setIsShuffling] = useState(false);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#38bdf8', '#fbbf24', '#a855f7', '#6366f1'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  const drawCard = (specificMoonFilter?: '全部' | MoonologyCategory) => {
    setIsShuffling(true);
    setTimeout(() => {
      if (activeTab === 'rainbow') {
        const rand = RAINBOW_CARDS[Math.floor(Math.random() * RAINBOW_CARDS.length)];
        setCurrentRainbow(rand);
      } else if (activeTab === 'zhenhai') {
        setCurrentZhenhai(getZhenhaiOracle());
      } else if (activeTab === 'romance') {
        setCurrentRomance(getRomanceAngelCard());
      } else if (activeTab === 'deity') {
        setCurrentDeity(getGoodDeityCard());
      } else if (activeTab === 'moonology') {
        const filter = specificMoonFilter ?? moonCategoryFilter;
        let pool = MOONOLOGY_CARDS;
        if (filter !== '全部') {
          pool = MOONOLOGY_CARDS.filter((c) => c.category === filter);
        }
        const rand = pool[Math.floor(Math.random() * pool.length)];
        setCurrentMoonology(rand);
      } else if (activeTab === 'loveBook') {
        setCurrentLoveAnswer(getRandomLoveAnswer());
      } else if (activeTab === 'yesNo') {
        setCurrentYesNo(getRandomYesNoOracle());
      }
      setIsShuffling(false);
      triggerConfetti();
    }, 450);
  };

  const handleMoonFilterChange = (filter: '全部' | MoonologyCategory) => {
    setMoonCategoryFilter(filter);
    drawCard(filter);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 px-5 py-4 border-b border-purple-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔮</span>
            <div>
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-1.5">
                <span>童話神明靈籤與心靈神諭</span>
                <span className="text-xs font-normal text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                  每日祝福
                </span>
              </h3>
              <p className="text-xs text-slate-600">
                心誠則靈，閉目靜心默念問題後點擊抽籤
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto p-1.5 gap-1 select-none scrollbar-thin">
          <button
            onClick={() => setActiveTab('rainbow')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'rainbow'
                ? 'bg-white text-purple-700 shadow-xs border border-purple-200'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <span>🌈</span>
            <span>彩虹卡 (七脈輪)</span>
          </button>

          <button
            onClick={() => setActiveTab('zhenhai')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'zhenhai'
                ? 'bg-white text-amber-800 shadow-xs border border-amber-200'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <span>🏮</span>
            <span>東港鎮海宮靈籤</span>
          </button>

          <button
            onClick={() => setActiveTab('romance')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'romance'
                ? 'bg-white text-pink-700 shadow-xs border border-pink-200'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <span>👼</span>
            <span>浪漫天使卡 (44張)</span>
          </button>

          <button
            onClick={() => setActiveTab('deity')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'deity'
                ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <span>⛩️</span>
            <span>台灣好神卡 (44張)</span>
          </button>

          <button
            onClick={() => setActiveTab('moonology')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'moonology'
                ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200 ring-1 ring-indigo-300'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <span>🌙</span>
            <span>月相神諭卡 (44張)</span>
          </button>

          <button
            onClick={() => setActiveTab('loveBook')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'loveBook'
                ? 'bg-white text-rose-700 shadow-xs border border-rose-200'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <span>📖</span>
            <span>愛的解答之書</span>
          </button>

          <button
            onClick={() => setActiveTab('yesNo')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'yesNo'
                ? 'bg-white text-purple-700 shadow-xs border border-purple-200'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <span>⚖️</span>
            <span>YES / NO 直覺神諭</span>
          </button>
        </div>

        {/* Card Display Area */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: 彩虹卡 RAINBOW CARDS */}
          {activeTab === 'rainbow' && (
            <div className="space-y-4">
              <div
                className={`rounded-3xl p-5 border-2 shadow-sm transition-all duration-300 ${
                  CHAKRA_INFO[currentRainbow.color].bgClass
                } ${CHAKRA_INFO[currentRainbow.color].borderClass} ${
                  isShuffling ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                }`}
              >
                <div className="flex items-center justify-between border-b pb-3 mb-4 border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full shadow-xs"
                      style={{ backgroundColor: CHAKRA_INFO[currentRainbow.color].colorHex }}
                    />
                    <h4
                      className={`text-base font-black ${
                        CHAKRA_INFO[currentRainbow.color].textClass
                      }`}
                    >
                      {currentRainbow.colorName}光芒 • {currentRainbow.chakra}
                    </h4>
                  </div>
                  <span className="text-xs bg-white/80 px-2.5 py-1 rounded-full font-medium text-slate-700 border border-slate-200 shadow-xs">
                    對應部位：{currentRainbow.chakraLocation}
                  </span>
                </div>

                <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-white shadow-xs mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    心靈肯定句 (Affirmation)：
                  </span>
                  <p className="text-base sm:text-lg font-black text-slate-800 leading-relaxed">
                    「{currentRainbow.affirmation}」
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-white/80 p-3 rounded-xl border border-white">
                    <span className="font-bold text-slate-700 block mb-0.5">
                      🌟 脈輪能量涵義：
                    </span>
                    <p className="text-slate-600">{CHAKRA_INFO[currentRainbow.color].meaning}</p>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-white">
                    <span className="font-bold text-slate-700 block mb-0.5">
                      💡 失衡指引與調適：
                    </span>
                    <p className="text-slate-600">{CHAKRA_INFO[currentRainbow.color].imbalance}</p>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-600 italic bg-white/60 p-2.5 rounded-xl border border-white/60">
                  <span className="font-semibold not-italic">🌿 靜心冥想指引：</span>{' '}
                  {currentRainbow.wisdom}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 東港鎮海宮靈籤 ZHENHAI ORACLE */}
          {activeTab === 'zhenhai' && (
            <div className="space-y-4">
              <div
                className={`bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-5 shadow-sm transition-all duration-300 ${
                  isShuffling ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                }`}
              >
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-xs">
                      第 {currentZhenhai.signNo} 籤
                    </span>
                    <span className="font-black text-slate-800 text-base sm:text-lg">
                      {currentZhenhai.ganzhi}籤【{currentZhenhai.title}】
                    </span>
                  </div>
                  <span className="bg-amber-200 text-amber-900 text-xs font-black px-2.5 py-1 rounded-lg">
                    {currentZhenhai.luckLevel}
                  </span>
                </div>

                <div className="bg-white/90 rounded-2xl p-4 border border-amber-200 text-center shadow-xs mb-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-base sm:text-lg font-black tracking-widest text-slate-800">
                    {currentZhenhai.poem.map((line, lIdx) => (
                      <div key={lIdx} className="py-1">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <div className="bg-white/70 p-3 rounded-xl border border-amber-100">
                    <span className="font-bold text-amber-900 block mb-0.5">📜 籤詩聖意：</span>
                    <p className="leading-relaxed">{currentZhenhai.generalMeaning}</p>
                  </div>
                  <div className="bg-white/70 p-3 rounded-xl border border-amber-100">
                    <span className="font-bold text-amber-900 block mb-0.5">📖 典故故事：</span>
                    <p className="leading-relaxed text-slate-600">{currentZhenhai.story}</p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/70">
                    <span className="font-bold text-sky-700">💼 事業功名：</span>
                    <p className="text-slate-600 mt-0.5">{currentZhenhai.aspects.career}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/70">
                    <span className="font-bold text-pink-700">💍 婚姻感情：</span>
                    <p className="text-slate-600 mt-0.5">{currentZhenhai.aspects.love}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/70">
                    <span className="font-bold text-emerald-700">💰 財運求財：</span>
                    <p className="text-slate-600 mt-0.5">{currentZhenhai.aspects.wealth}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/70 sm:col-span-1.5">
                    <span className="font-bold text-purple-700">🏡 家運平安：</span>
                    <p className="text-slate-600 mt-0.5">{currentZhenhai.aspects.family}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/70 sm:col-span-1.5">
                    <span className="font-bold text-teal-700">🌿 健康疾厄：</span>
                    <p className="text-slate-600 mt-0.5">{currentZhenhai.aspects.health}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 浪漫天使指引卡 ROMANCE ANGELS (44 Cards) */}
          {activeTab === 'romance' && (
            <div className="space-y-4">
              <div
                className={`bg-gradient-to-b from-pink-50 to-rose-50 border-2 border-pink-300 rounded-3xl p-5 shadow-sm transition-all duration-300 ${
                  isShuffling ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                }`}
              >
                <div className="flex items-center justify-between border-b border-pink-200 pb-3 mb-4">
                  <div>
                    <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">
                      {currentRomance.titleEn}
                    </span>
                    <h4 className="text-xl font-black text-slate-800 mt-0.5 flex items-center gap-1.5">
                      <span>{currentRomance.titleZh}</span>
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    </h4>
                  </div>
                  <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full border border-rose-200">
                    第 {currentRomance.id} / 44 張
                  </span>
                </div>

                <div className="bg-white/90 rounded-2xl p-4 border border-pink-200 mb-3 shadow-xs">
                  <span className="text-xs font-bold text-pink-600 block mb-1">
                    ✨ 核心意涵（Keyword）：
                  </span>
                  <p className="text-sm font-semibold text-slate-800">{currentRomance.keyword}</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {currentRomance.meaning}
                  </p>
                </div>

                <div className="bg-white/80 rounded-2xl p-4 border border-pink-200 mb-3">
                  <span className="text-xs font-bold text-purple-700 block mb-1">
                    👼 浪漫天使的溫柔指引：
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {currentRomance.guidance}
                  </p>
                </div>

                <div className="bg-rose-100/60 p-3 rounded-xl border border-rose-200 text-center">
                  <span className="text-[11px] font-bold text-rose-800 block mb-0.5">
                    💖 每日愛情肯定句：
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-rose-900">
                    「{currentRomance.affirmation}」
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 台灣好神卡 GOOD DEITY CARDS (44 Cards) */}
          {activeTab === 'deity' && (
            <div className="space-y-4">
              <div
                className={`bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 shadow-sm transition-all duration-300 ${
                  isShuffling ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                }`}
              >
                <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-4">
                  <div>
                    <span className="text-xs font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      {currentDeity.deityName}
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      {currentDeity.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold bg-white text-slate-700 px-2.5 py-1 rounded-full border border-amber-200">
                      對應領域：{currentDeity.lifeDomain}
                    </span>
                  </div>
                </div>

                <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 mb-3 shadow-xs">
                  <span className="text-xs font-bold text-amber-800 block mb-1">
                    ⛩️ 廟宇神聖祝福：
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    {currentDeity.templeBlessing}
                  </p>
                </div>

                <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 mb-3">
                  <span className="text-xs font-bold text-emerald-800 block mb-1">
                    🌟 神明解惑開示：
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {currentDeity.fortuneMessage}
                  </p>
                </div>

                <div className="bg-amber-100/70 p-3 rounded-xl border border-amber-200 text-xs">
                  <span className="font-bold text-amber-900 block mb-0.5">
                    👣 轉運行動方針：
                  </span>
                  <p className="text-slate-700">{currentDeity.actionGuidance}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: 月相神諭卡 MOONOLOGY ORACLE CARDS (44 Cards) */}
          {activeTab === 'moonology' && (
            <div className="space-y-4">
              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-500 font-bold shrink-0 flex items-center gap-1 mr-1">
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>分類篩選：</span>
                </span>
                {(['全部', '月相牌', '新月牌', '滿月牌', '特別月牌'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleMoonFilterChange(cat)}
                    className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                      moonCategoryFilter === cat
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                    {cat === '全部' && ' (44)'}
                    {cat === '月相牌' && ' (8)'}
                    {cat === '新月牌' && ' (12)'}
                    {cat === '滿月牌' && ' (12)'}
                    {cat === '特別月牌' && ' (12)'}
                  </button>
                ))}
              </div>

              {/* Main Card */}
              <div
                className={`bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-slate-100 border-2 border-indigo-500/40 rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300 relative overflow-hidden ${
                  isShuffling ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                }`}
              >
                {/* Background Celestial Accents */}
                <div className="absolute top-2 right-3 text-7xl opacity-10 select-none pointer-events-none">
                  {currentMoonology.phaseIcon}
                </div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Card Subheader & Category */}
                <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3 mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                      <span>{currentMoonology.phaseIcon}</span>
                      <span>{currentMoonology.category}</span>
                    </span>
                    {currentMoonology.astrologySign && (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {currentMoonology.astrologySign} • {currentMoonology.element}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      第 {currentMoonology.id} / 44 張
                    </span>
                  </div>
                </div>

                {/* Card Titles */}
                <div className="relative z-10 mb-4 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-600/30 border border-indigo-300/30 text-3xl mb-2 shadow-inner">
                    {currentMoonology.phaseIcon}
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-indigo-200 tracking-wide">
                    {currentMoonology.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-indigo-300 mt-0.5 tracking-wider uppercase">
                    {currentMoonology.nameEn}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 italic">
                    — 連接古老的月亮智慧，開創屬於你的夢想和未來 —
                  </p>
                </div>

                {/* Core Message Highlight */}
                <div className="bg-indigo-900/40 backdrop-blur-xs rounded-2xl p-4 border border-indigo-400/30 mb-3.5 relative z-10 shadow-xs">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>核心神諭指引（Core Oracle）：</span>
                  </span>
                  <p className="text-base sm:text-lg font-black text-white leading-relaxed">
                    「{currentMoonology.coreMessage}」
                  </p>
                </div>

                {/* Ancient Wisdom & Guidance */}
                <div className="space-y-2.5 relative z-10 text-xs sm:text-sm">
                  {/* Ancient Wisdom */}
                  <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-white/10">
                    <span className="font-bold text-indigo-300 flex items-center gap-1 mb-1">
                      <span>🔮</span>
                      <span>古老月亮智慧解析（Ancient Wisdom）：</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {currentMoonology.wisdom}
                    </p>
                  </div>

                  {/* Future Actions */}
                  <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-white/10">
                    <span className="font-bold text-emerald-300 flex items-center gap-1 mb-1">
                      <span>🚀</span>
                      <span>開創你的夢想與未來（Action for Future）：</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {currentMoonology.actionForFuture}
                    </p>
                  </div>

                  {/* Attunement Prayer */}
                  <div className="bg-gradient-to-r from-purple-950/70 to-indigo-950/70 p-3.5 rounded-2xl border border-purple-400/30 text-center">
                    <span className="text-[11px] font-bold text-purple-300 block mb-0.5">
                      🕊️ 月亮調準肯定語（Attunement）：
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-purple-100 italic">
                      「{currentMoonology.attunement}」
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: 愛的解答之書 BOOK OF LOVE ANSWERS */}
          {activeTab === 'loveBook' && (
            <div className="space-y-4">
              <div
                className={`bg-gradient-to-b from-rose-50 via-pink-50/60 to-white border-2 border-rose-300 rounded-3xl p-5 sm:p-6 shadow-md transition-all duration-300 ${
                  isShuffling ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                }`}
              >
                {/* Book header */}
                <div className="flex items-center justify-between border-b border-rose-200/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm shadow-xs">
                      📖
                    </span>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-slate-800">
                        《愛的解答之書》心靈指引
                      </h4>
                      <p className="text-xs text-rose-600">
                        傾聽心跳的頻率，文字將為你照亮迷茫
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
                    {currentLoveAnswer.category}
                  </span>
                </div>

                {/* Big answer quote */}
                <div className="bg-white/90 p-5 rounded-2xl border border-rose-200 shadow-xs text-center my-4">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block mb-2">
                    — 神聖愛的啟示 —
                  </span>
                  <blockquote className="text-xl sm:text-2xl font-black text-slate-800 leading-relaxed">
                    “{currentLoveAnswer.answerZh}”
                  </blockquote>
                </div>

                {/* Explanation */}
                <div className="bg-rose-100/50 p-4 rounded-2xl border border-rose-200/80">
                  <span className="text-xs font-bold text-rose-800 block mb-1">
                    💡 心靈深度解讀：
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {currentLoveAnswer.explanationZh}
                  </p>
                </div>

                {/* Reflection advice */}
                <div className="mt-3 text-xs text-slate-500 text-center italic">
                  靜下心來，把這句話放在心口沉思三十秒，宇宙會在無聲中給你力量。
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: YES / NO 直覺神諭 */}
          {activeTab === 'yesNo' && (
            <div className="space-y-4">
              <div
                className={`rounded-3xl p-6 shadow-md text-center transition-all duration-300 border-2 ${
                  currentYesNo.answer === 'YES'
                    ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white border-emerald-400 shadow-emerald-200'
                    : currentYesNo.answer === 'NO'
                    ? 'bg-gradient-to-br from-rose-600 via-red-600 to-amber-700 text-white border-rose-400 shadow-rose-200'
                    : currentYesNo.answer === 'NOT_YET'
                    ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white border-amber-300 shadow-amber-200'
                    : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white border-purple-300 shadow-purple-200'
                } ${isShuffling ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <span className="text-xs uppercase tracking-widest font-black bg-black/20 px-3 py-1 rounded-full backdrop-blur-xs">
                    直覺占卜 • YES / NO 神諭
                  </span>
                </div>

                {/* Icon & Big Answer */}
                <div className="my-2">
                  <span className="text-5xl drop-shadow-md block mb-2">
                    {currentYesNo.signSymbol || (currentYesNo.answer === 'YES' ? '✨' : currentYesNo.answer === 'NO' ? '🛡️' : '⏳')}
                  </span>
                  <h4 className="text-2xl sm:text-4xl font-black tracking-wide drop-shadow-sm text-yellow-100">
                    {currentYesNo.answerZh}
                  </h4>
                </div>

                {/* Detail Advice */}
                <div className="bg-black/20 backdrop-blur-xs p-4 rounded-2xl border border-white/20 my-4 max-w-lg mx-auto text-left sm:text-center">
                  <span className="text-xs font-bold text-white/80 block mb-1">
                    🎯 當前局勢直覺指引：
                  </span>
                  <p className="text-xs sm:text-sm text-white leading-relaxed">
                    {currentYesNo.detailAdvice}
                  </p>
                </div>

                {/* Love / Life Affirmation */}
                <div className="bg-white/15 backdrop-blur-xs p-3.5 rounded-xl border border-white/30 max-w-lg mx-auto">
                  <span className="text-[11px] font-bold text-yellow-200 block mb-0.5">
                    💫 內在肯定與祝福：
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    「{currentYesNo.loveAffirmation}」
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 hidden sm:inline">
            心誠則靈，隨時點擊按鈕獲取神聖指引
          </span>
          <button
            onClick={() => drawCard()}
            disabled={isShuffling}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md active:scale-95 transition-all cursor-pointer w-full sm:w-auto justify-center"
          >
            <RefreshCw className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
            <span>
              {isShuffling
                ? '神聖洗牌中...'
                : activeTab === 'moonology'
                ? '抽一張月相神諭卡'
                : activeTab === 'loveBook'
                ? '翻開愛的解答'
                : activeTab === 'yesNo'
                ? '抽取 YES / NO 答案'
                : '重新抽籤 / 解答'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
