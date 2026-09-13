/**
 * Core type definitions for 貓熊每月月曆
 */

export interface CalendarDay {
  date: Date;
  dateString: string; // YYYY-MM-DD
  year: number;
  month: number; // 1-12
  day: number;
  dayOfWeek: number; // 0 (Sun) - 6 (Sat)
  dayOfWeekName: string; // 星期日, 星期一...
  
  // Lunar info
  lunarYear: number;
  lunarMonth: number;
  lunarMonthName: string; // 正月, 二月...
  lunarDay: number;
  lunarDayName: string; // 初一, 初二...
  lunarFullText: string; // 農曆八月初三
  isLeapMonth: boolean;
  ganzhiYear: string; // 丙午年 (馬年)
  zodiac: string; // 馬
  
  // Solar terms & Holidays
  solarTerm?: string; // 24節氣如: 秋分, 白露
  isHoliday: boolean; // 是否放假
  isNationalHoliday: boolean; // 是否為國定假日
  holidayName?: string; // 假日名稱 (e.g., 中秋節, 國慶日)
  commemorativeName?: string; // 紀念日名稱 (非放假或放假紀念日)
  westernHoliday?: string; // 西洋節日 (情人節, 萬聖節等)
  
  // States
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  
  // User markers
  emojiMarkers: string[];
  notes?: string;
  hasSchedule: boolean;
}

export interface StoredDayData {
  emojis: string[];
  notes?: string;
  updatedAt?: string;
}

export interface DayMarkerStore {
  [dateString: string]: StoredDayData;
}

// Rainbow Cards (彩虹卡 7 色能量卡)
export type RainbowColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';

export interface RainbowCard {
  id: number;
  color: RainbowColor;
  colorName: string;
  chakra: string; // 海底輪, 臍輪, etc.
  chakraLocation: string; // 脊椎底部, 肚臍下方...
  colorMeaning: string; // 活力、熱情、福氣...
  imbalanceSymptom: string; // 失衡症狀
  affirmation: string; // 肯定語
  wisdom: string; // 智慧引導
}

// Donggang Zhenhai Temple 60 Jiazi Oracle (東港鎮海宮六十甲子靈籤)
export interface ZhenhaiOracle {
  signNo: number; // 1 - 60
  ganzhi: string; // 甲子, 乙丑...
  palace: string; // 屬水, 屬金...
  title: string; // 籤名/歷史典故 (包公審郭槐, 薛仁貴救駕...)
  poem: [string, string, string, string]; // 七言四句籤詩
  story: string; // 典故由來
  generalMeaning: string; // 聖意解說
  luckLevel: string; // 大吉, 上吉, 中平...
  aspects: {
    career: string; // 事業
    love: string; // 姻緣/感情
    family: string; // 家庭/家運
    wealth: string; // 財運
    health: string; // 健康/疾病
  };
}

// Romance Angels Oracle Cards (浪漫天使指引卡 44張)
export interface RomanceAngelCard {
  id: number;
  titleEn: string;
  titleZh: string;
  keyword: string;
  meaning: string;
  guidance: string;
  affirmation: string;
  imageTheme: string;
}

// Taiwan Good Deity Cards (台灣好神卡 44張)
export interface GoodDeityCard {
  id: number;
  deityName: string; // 媽祖, 關聖帝君, 土地公...
  cardType: 'oracle' | 'astrology'; // 神諭卡 或 星象卡
  title: string;
  templeBlessing: string;
  fortuneMessage: string;
  actionGuidance: string;
  lifeDomain: '日常' | '愛情' | '事業' | '財運' | '健康' | '轉運';
}

// Love Answers Book (愛的解答之書)
export interface LoveAnswer {
  id: number;
  category: string;
  answerZh: string;
  explanationZh: string;
  oracleTone: 'positive' | 'reflective' | 'action' | 'warning';
}

// YES/NO Oracle
export interface YesNoOracle {
  id: number;
  answer: 'YES' | 'NO' | 'NOT_YET' | 'MAYBE';
  answerZh: string;
  detailAdvice: string;
  loveAffirmation: string;
  signSymbol: string;
}

// Moonology Oracle Cards (月相神諭卡 44張：連接古老的月亮智慧，開創屬於你的夢想和未來)
export type MoonologyCategory = '月相牌' | '新月牌' | '滿月牌' | '特別月牌';

export interface MoonologyCard {
  id: number;
  name: string; // 新月, 新月在牡羊座, 滿月在金牛座, 超級月亮...
  nameEn: string;
  category: MoonologyCategory;
  phaseIcon: string;
  astrologySign?: string;
  element?: '火象' | '土象' | '風象' | '水象' | '宇宙靈性';
  coreMessage: string; // 核心神諭訊息
  attunement: string; // 月亮調準肯定語 (Attunement)
  wisdom: string; // 古老的月亮智慧解讀
  actionForFuture: string; // 開創屬於你的夢想與未來
}
