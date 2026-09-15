import { RAINBOW_CARDS } from '../data/rainbowCards';
import { ZHENHAI_ORACLES } from '../data/zhenhaiTempleOracles';
import { GOOD_DEITY_CARDS } from '../data/goodDeityCards';
import { MOONOLOGY_CARDS } from '../data/moonologyCards';

export type EnergyCategory = 'all' | 'rainbow' | 'oracle' | 'deity' | 'moon';

export interface DailyEnergyQuote {
  id: string;
  sourceType: 'rainbow' | 'oracle' | 'deity' | 'moon';
  categoryLabel: string;
  sourceName: string;
  quote: string;
  poemLines?: string[];
  wisdom: string;
  actionTip?: string;
  tags: string[];
  badgeTheme: {
    bg: string;
    text: string;
    border: string;
    accent: string;
  };
  cardBgGradient: string;
  iconName: string;
}

// Build the compiled list of all spiritual wisdom and oracle quotes
export const ALL_ENERGY_QUOTES: DailyEnergyQuote[] = [
  // 1. Rainbow Cards (七脈輪身心肯定語)
  ...RAINBOW_CARDS.map((card): DailyEnergyQuote => {
    let badgeTheme = {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      accent: '#10b981',
    };
    let cardBgGradient = 'from-emerald-50/70 via-teal-50/40 to-amber-50/50';

    if (card.color === 'red') {
      badgeTheme = { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-300', accent: '#f43f5e' };
      cardBgGradient = 'from-rose-50/70 via-pink-50/40 to-amber-50/50';
    } else if (card.color === 'orange') {
      badgeTheme = { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-300', accent: '#f97316' };
      cardBgGradient = 'from-orange-50/70 via-amber-50/40 to-yellow-50/50';
    } else if (card.color === 'yellow') {
      badgeTheme = { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', accent: '#f59e0b' };
      cardBgGradient = 'from-amber-50/70 via-yellow-50/40 to-rose-50/50';
    } else if (card.color === 'green') {
      badgeTheme = { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300', accent: '#10b981' };
      cardBgGradient = 'from-emerald-50/70 via-teal-50/40 to-sky-50/50';
    } else if (card.color === 'blue') {
      badgeTheme = { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-300', accent: '#0ea5e9' };
      cardBgGradient = 'from-sky-50/70 via-cyan-50/40 to-indigo-50/50';
    } else if (card.color === 'indigo') {
      badgeTheme = { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-300', accent: '#6366f1' };
      cardBgGradient = 'from-indigo-50/70 via-violet-50/40 to-purple-50/50';
    } else if (card.color === 'violet') {
      badgeTheme = { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-300', accent: '#a855f7' };
      cardBgGradient = 'from-purple-50/70 via-fuchsia-50/40 to-pink-50/50';
    }

    return {
      id: `rainbow-${card.id}`,
      sourceType: 'rainbow',
      categoryLabel: '🌈 七脈輪彩虹卡',
      sourceName: `${card.chakra} (${card.colorName})`,
      quote: card.affirmation,
      wisdom: card.wisdom,
      actionTip: `身心指引：${card.colorMeaning}。感覺失衡時注意：${card.imbalanceSymptom}。`,
      tags: [card.chakra, card.colorName, '每日肯定語', '正能量能量場'],
      badgeTheme,
      cardBgGradient,
      iconName: 'Sparkles',
    };
  }),

  // 2. Zhenhai Temple Oracles (東港鎮海宮七王爺六十甲子靈籤)
  ...ZHENHAI_ORACLES.map((oracle): DailyEnergyQuote => {
    return {
      id: `oracle-${oracle.signNo}`,
      sourceType: 'oracle',
      categoryLabel: '🏮 東港鎮海宮靈籤',
      sourceName: `第 ${oracle.signNo} 籤 ${oracle.ganzhi}・【${oracle.luckLevel}】`,
      quote: oracle.poem.join('，') + '。',
      poemLines: oracle.poem,
      wisdom: oracle.generalMeaning,
      actionTip: `籤詩典故【${oracle.title}】：${oracle.story}（${oracle.palace}）`,
      tags: [oracle.luckLevel, oracle.ganzhi, '神明指引', '吉祥福佑'],
      badgeTheme: {
        bg: 'bg-amber-50',
        text: 'text-amber-900',
        border: 'border-amber-300',
        accent: '#d97706',
      },
      cardBgGradient: 'from-amber-50/70 via-red-50/40 to-orange-50/50',
      iconName: 'Scroll',
    };
  }),

  // 3. Good Deity Cards (善良神祇溫暖祝福)
  ...GOOD_DEITY_CARDS.map((deity): DailyEnergyQuote => {
    return {
      id: `deity-${deity.id}`,
      sourceType: 'deity',
      categoryLabel: '✨ 善良神祇祝福',
      sourceName: `${deity.deityName}・${deity.title}`,
      quote: deity.fortuneMessage,
      wisdom: deity.templeBlessing,
      actionTip: `今日處方指引：${deity.actionGuidance}（守護領域：${deity.lifeDomain}）`,
      tags: [deity.deityName, deity.lifeDomain, '善念循環', '守護平安'],
      badgeTheme: {
        bg: 'bg-rose-50',
        text: 'text-rose-900',
        border: 'border-rose-300',
        accent: '#e11d48',
      },
      cardBgGradient: 'from-rose-50/70 via-pink-50/40 to-amber-50/50',
      iconName: 'Heart',
    };
  }),

  // 4. Moonology Cards (月相與星象宇宙靈性指引)
  ...MOONOLOGY_CARDS.map((moon): DailyEnergyQuote => {
    return {
      id: `moon-${moon.id}`,
      sourceType: 'moon',
      categoryLabel: '🌙 月相心靈指引',
      sourceName: `${moon.phaseIcon} ${moon.name} (${moon.nameEn})`,
      quote: moon.attunement,
      wisdom: `${moon.coreMessage} ${moon.wisdom.slice(0, 75)}...`,
      actionTip: `月相行動指南：${moon.actionForFuture}`,
      tags: [moon.category, moon.element, '宇宙頻率', '直覺心靈'],
      badgeTheme: {
        bg: 'bg-indigo-50',
        text: 'text-indigo-900',
        border: 'border-indigo-300',
        accent: '#4f46e5',
      },
      cardBgGradient: 'from-indigo-50/70 via-purple-50/40 to-sky-50/50',
      iconName: 'Moon',
    };
  }),
];

/**
 * Deterministic hash for date string YYYY-MM-DD
 */
export function getDailySeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Get daily quote for a specific date (consistent throughout the day)
 */
export function getDailyQuote(dateStr: string, category: EnergyCategory = 'all'): DailyEnergyQuote {
  const pool = getFilteredQuotes(category);
  if (pool.length === 0) return ALL_ENERGY_QUOTES[0];
  const seed = getDailySeed(dateStr);
  const index = seed % pool.length;
  return pool[index];
}

/**
 * Filter quotes by category
 */
export function getFilteredQuotes(category: EnergyCategory = 'all'): DailyEnergyQuote[] {
  if (category === 'all') return ALL_ENERGY_QUOTES;
  return ALL_ENERGY_QUOTES.filter((q) => q.sourceType === category);
}

/**
 * Draw a random quote from pool
 */
export function getRandomQuote(category: EnergyCategory = 'all', excludeId?: string): DailyEnergyQuote {
  const pool = getFilteredQuotes(category);
  const candidates = pool.filter((q) => q.id !== excludeId);
  const list = candidates.length > 0 ? candidates : pool;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
