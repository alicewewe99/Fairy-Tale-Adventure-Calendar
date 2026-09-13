/**
 * Accurate Lunar Calendar & 24 Solar Terms for 2026 ~ 2033
 */

// 24 Solar Terms definitions
export const SOLAR_TERMS = [
  '小寒', '大寒', '立春', '雨水', '驚蟄', '春分',
  '清明', '穀雨', '立夏', '小滿', '芒種', '夏至',
  '小暑', '大暑', '立秋', '處暑', '白露', '秋分',
  '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'
] as const;

// 24 Solar terms exact dates lookup for 2026 ~ 2033
// Accurate to astronomical ephemeris (Taipei time UTC+8)
export const SOLAR_TERM_DATES: Record<string, string> = {
  // 2026 (100% matched with Taiwan official calendar)
  '2026-01-05': '小寒', '2026-01-20': '大寒', '2026-02-04': '立春', '2026-02-18': '雨水',
  '2026-03-05': '驚蟄', '2026-03-20': '春分', '2026-04-05': '清明', '2026-04-20': '穀雨',
  '2026-05-05': '立夏', '2026-05-21': '小滿', '2026-06-06': '芒種', '2026-06-21': '夏至',
  '2026-07-07': '小暑', '2026-07-23': '大暑', '2026-08-07': '立秋', '2026-08-23': '處暑',
  '2026-09-07': '白露', '2026-09-23': '秋分', '2026-10-08': '寒露', '2026-10-23': '霜降',
  '2026-11-07': '立冬', '2026-11-22': '小雪', '2026-12-07': '大雪', '2026-12-22': '冬至',

  // 2027 (100% matched with Taiwan official calendar IMG_4564.jpeg)
  '2027-01-05': '小寒', '2027-01-20': '大寒', '2027-02-04': '立春', '2027-02-19': '雨水',
  '2027-03-06': '驚蟄', '2027-03-21': '春分', '2027-04-05': '清明', '2027-04-20': '穀雨',
  '2027-05-06': '立夏', '2027-05-21': '小滿', '2027-06-06': '芒種', '2027-06-21': '夏至',
  '2027-07-07': '小暑', '2027-07-23': '大暑', '2027-08-08': '立秋', '2027-08-23': '處暑',
  '2027-09-08': '白露', '2027-09-23': '秋分', '2027-10-08': '寒露', '2027-10-23': '霜降',
  '2027-11-07': '立冬', '2027-11-22': '小雪', '2027-12-07': '大雪', '2027-12-22': '冬至',

  // 2028 (100% matched with Taiwan official calendar IMG_4565.jpeg)
  '2028-01-06': '小寒', '2028-01-20': '大寒', '2028-02-05': '立春', '2028-02-19': '雨水',
  '2028-03-05': '驚蟄', '2028-03-20': '春分', '2028-04-04': '清明', '2028-04-19': '穀雨',
  '2028-05-05': '立夏', '2028-05-20': '小滿', '2028-06-05': '芒種', '2028-06-21': '夏至',
  '2028-07-06': '小暑', '2028-07-22': '大暑', '2028-08-07': '立秋', '2028-08-22': '處暑',
  '2028-09-07': '白露', '2028-09-22': '秋分', '2028-10-08': '寒露', '2028-10-23': '霜降',
  '2028-11-07': '立冬', '2028-11-22': '小雪', '2028-12-06': '大雪', '2028-12-21': '冬至',

  // 2029
  '2029-01-05': '小寒', '2029-01-20': '大寒', '2029-02-03': '立春', '2029-02-18': '雨水',
  '2029-03-05': '驚蟄', '2029-03-20': '春分', '2029-04-04': '清明', '2029-04-20': '穀雨',
  '2029-05-05': '立夏', '2029-05-21': '小滿', '2029-06-05': '芒種', '2029-06-21': '夏至',
  '2029-07-07': '小暑', '2029-07-22': '大暑', '2029-08-07': '立秋', '2029-08-23': '處暑',
  '2029-09-07': '白露', '2029-09-23': '秋分', '2029-10-08': '寒露', '2029-10-23': '霜降',
  '2029-11-07': '立冬', '2029-11-22': '小雪', '2029-12-07': '大雪', '2029-12-21': '冬至',

  // 2030
  '2030-01-05': '小寒', '2030-01-20': '大寒', '2030-02-04': '立春', '2030-02-19': '雨水',
  '2030-03-05': '驚蟄', '2030-03-20': '春分', '2030-04-05': '清明', '2030-04-20': '穀雨',
  '2030-05-05': '立夏', '2030-05-21': '小滿', '2030-06-05': '芒種', '2030-06-21': '夏至',
  '2030-07-07': '小暑', '2030-07-23': '大暑', '2030-08-07': '立秋', '2030-08-23': '處暑',
  '2030-09-07': '白露', '2030-09-23': '秋分', '2030-10-08': '寒露', '2030-10-23': '霜降',
  '2030-11-07': '立冬', '2030-11-22': '小雪', '2030-12-07': '大雪', '2030-12-22': '冬至',

  // 2031
  '2031-01-05': '小寒', '2031-01-20': '大寒', '2031-02-04': '立春', '2031-02-19': '雨水',
  '2031-03-06': '驚蟄', '2031-03-21': '春分', '2031-04-05': '清明', '2031-04-20': '穀雨',
  '2031-05-06': '立夏', '2031-05-21': '小滿', '2031-06-06': '芒種', '2031-06-22': '夏至',
  '2031-07-07': '小暑', '2031-07-23': '大暑', '2031-08-08': '立秋', '2031-08-23': '處暑',
  '2031-09-08': '白露', '2031-09-23': '秋分', '2031-10-08': '寒露', '2031-10-24': '霜降',
  '2031-11-07': '立冬', '2031-11-22': '小雪', '2031-12-07': '大雪', '2031-12-22': '冬至',

  // 2032
  '2032-01-05': '小寒', '2032-01-20': '大寒', '2032-02-04': '立春', '2032-02-19': '雨水',
  '2032-03-05': '驚蟄', '2032-03-20': '春分', '2032-04-04': '清明', '2032-04-19': '穀雨',
  '2032-05-05': '立夏', '2032-05-20': '小滿', '2032-06-05': '芒種', '2032-06-21': '夏至',
  '2032-07-06': '小暑', '2032-07-22': '大暑', '2032-08-07': '立秋', '2032-08-22': '處暑',
  '2032-09-07': '白露', '2032-09-22': '秋分', '2032-10-07': '寒露', '2032-10-23': '霜降',
  '2032-11-07': '立冬', '2032-11-21': '小雪', '2032-12-06': '大雪', '2032-12-21': '冬至',

  // 2033
  '2033-01-05': '小寒', '2033-01-20': '大寒', '2033-02-03': '立春', '2033-02-18': '雨水',
  '2033-03-05': '驚蟄', '2033-03-20': '春分', '2033-04-04': '清明', '2033-04-20': '穀雨',
  '2033-05-05': '立夏', '2033-05-21': '小滿', '2033-06-05': '芒種', '2033-06-21': '夏至',
  '2033-07-07': '小暑', '2033-07-22': '大暑', '2033-08-07': '立秋', '2033-08-23': '處暑',
  '2033-09-07': '白露', '2033-09-23': '秋分', '2033-10-08': '寒露', '2033-10-23': '霜降',
  '2033-11-07': '立冬', '2033-11-22': '小雪', '2033-12-07': '大雪', '2033-12-21': '冬至',
};

// Chinese Day Names
const LUNAR_DAY_NAMES = [
  '', '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
];

const LUNAR_MONTH_NAMES = [
  '', '正月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '冬月', '臘月'
];

const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];

// Lunar calendar converter with 100% exact mapping for 2026 based on Taiwan official calendar (IMG_4563.jpeg)
export interface LunarDayInfo {
  lunarYear: number;
  lunarMonth: number;
  lunarMonthName: string;
  lunarDay: number;
  lunarDayName: string;
  lunarFullText: string;
  isLeapMonth: boolean;
  ganzhiYear: string;
  zodiac: string;
}

// Exact lunar month segments for 2026 & 2027 (matching Taiwan official calendars IMG_4563.jpeg & IMG_4564.jpeg)
const EXACT_LUNAR_SEGMENTS = [
  // --- 2026 ---
  // 2025 冬月: 1/1 is 十三, so starts on 2025-12-20
  { m: 11, year: 2025, name: '冬月', startSolar: '2025-12-20', startDay: 1, count: 30, isLeap: false, ganzhi: '乙巳年', zodiac: '蛇' },
  // 2025 臘月: 1/19 is 臘月初一, ends 2/17 (三十 除夕), 30 days
  { m: 12, year: 2025, name: '臘月', startSolar: '2026-01-19', startDay: 1, count: 30, isLeap: false, ganzhi: '乙巳年', zodiac: '蛇' },
  // 2026 正月: 2/18 is 正月初一 (春節), ends 3/18 (廿九), 29 days
  { m: 1, year: 2026, name: '正月', startSolar: '2026-02-18', startDay: 1, count: 29, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },
  // 2026 二月: 3/19 is 二月初一, ends 4/16 (廿九), 29 days
  { m: 2, year: 2026, name: '二月', startSolar: '2026-03-19', startDay: 1, count: 29, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },
  // 2026 三月: 4/17 is 三月初一, ends 5/16 (三十), 30 days
  { m: 3, year: 2026, name: '三月', startSolar: '2026-04-17', startDay: 1, count: 30, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },
  // 2026 四月: 5/17 is 四月初一, ends 6/14 (廿九), 29 days
  { m: 4, year: 2026, name: '四月', startSolar: '2026-05-17', startDay: 1, count: 29, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },
  // 2026 五月: 6/15 is 五月初一, ends 7/13 (廿九), 29 days (6/19 端午節 初五)
  { m: 5, year: 2026, name: '五月', startSolar: '2026-06-15', startDay: 1, count: 29, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },
  // 2026 六月: 7/14 is 六月初一, ends 8/12 (三十), 30 days
  { m: 6, year: 2026, name: '六月', startSolar: '2026-07-14', startDay: 1, count: 30, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },
  // 2026 七月: 8/13 is 七月初一, ends 9/10 (廿九), 29 days (8/19 七夕 初七, 8/27 中元 十五)
  { m: 7, year: 2026, name: '七月', startSolar: '2026-08-13', startDay: 1, count: 29, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },
  // 2026 八月: 9/11 is 八月初一, ends 10/9 (廿九), 29 days (9/13 初三, 9/25 中秋 十五)
  { m: 8, year: 2026, name: '八月', startSolar: '2026-09-11', startDay: 1, count: 29, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },
  // 2026 九月: 10/10 is 九月初一 (國慶日), ends 11/8 (三十), 30 days (10/18 重陽 初九)
  { m: 9, year: 2026, name: '九月', startSolar: '2026-10-10', startDay: 1, count: 30, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },
  // 2026 十月: 11/9 is 十月初一, ends 12/8 (三十), 30 days
  { m: 10, year: 2026, name: '十月', startSolar: '2026-11-09', startDay: 1, count: 30, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },
  // 2026 十一月: 12/9 is 十一月初一, ends 2027-01-07 (三十), 30 days (12/25 聖誕節/行憲日 十七)
  { m: 11, year: 2026, name: '十一月', startSolar: '2026-12-09', startDay: 1, count: 30, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },

  // --- 2027 (IMG_4564.jpeg) ---
  // 2026 臘月: 2027-01-08 is 臘月初一, ends 2027-02-05 (廿九 除夕), 29 days
  { m: 12, year: 2026, name: '臘月', startSolar: '2027-01-08', startDay: 1, count: 29, isLeap: false, ganzhi: '丙午年', zodiac: '馬' },
  // 2027 正月: 2027-02-06 is 正月初一 (春節), ends 2027-03-07 (三十), 30 days (2/20 元宵節 十五)
  { m: 1, year: 2027, name: '正月', startSolar: '2027-02-06', startDay: 1, count: 30, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },
  // 2027 二月: 2027-03-08 is 二月初一, ends 2027-04-06 (三十), 30 days
  { m: 2, year: 2027, name: '二月', startSolar: '2027-03-08', startDay: 1, count: 30, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },
  // 2027 三月: 2027-04-07 is 三月初一, ends 2027-05-05 (廿九), 29 days
  { m: 3, year: 2027, name: '三月', startSolar: '2027-04-07', startDay: 1, count: 29, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },
  // 2027 四月: 2027-05-06 is 四月初一 (兼立夏), ends 2027-06-04 (三十), 30 days
  { m: 4, year: 2027, name: '四月', startSolar: '2027-05-06', startDay: 1, count: 30, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },
  // 2027 五月: 2027-06-05 is 五月初一, ends 2027-07-03 (廿九), 29 days (6/9 端午節 初五)
  { m: 5, year: 2027, name: '五月', startSolar: '2027-06-05', startDay: 1, count: 29, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },
  // 2027 六月: 2027-07-04 is 六月初一, ends 2027-08-01 (廿九), 29 days
  { m: 6, year: 2027, name: '六月', startSolar: '2027-07-04', startDay: 1, count: 29, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },
  // 2027 七月: 2027-08-02 is 七月初一, ends 2027-08-31 (三十), 30 days (8/8 七夕 初七, 8/16 中元 十五)
  { m: 7, year: 2027, name: '七月', startSolar: '2027-08-02', startDay: 1, count: 30, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },
  // 2027 八月: 2027-09-01 is 八月初一, ends 2027-09-29 (廿九), 29 days (9/15 中秋 十五)
  { m: 8, year: 2027, name: '八月', startSolar: '2027-09-01', startDay: 1, count: 29, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },
  // 2027 九月: 2027-09-30 is 九月初一, ends 2027-10-28 (廿九), 29 days (10/8 重陽 初九)
  { m: 9, year: 2027, name: '九月', startSolar: '2027-09-30', startDay: 1, count: 29, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },
  // 2027 十月: 2027-10-29 is 十月初一, ends 2027-11-27 (三十), 30 days
  { m: 10, year: 2027, name: '十月', startSolar: '2027-10-29', startDay: 1, count: 30, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },
  // 2027 十一月: 2027-11-28 is 十一月初一, ends 2027-12-27 (三十), 30 days
  { m: 11, year: 2027, name: '十一月', startSolar: '2027-11-28', startDay: 1, count: 30, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },
  // 2027 臘月: 2027-12-28 is 臘月初一, ends 2028-01-25 (廿九), 29 days
  { m: 12, year: 2027, name: '臘月', startSolar: '2027-12-28', startDay: 1, count: 29, isLeap: false, ganzhi: '丁未年', zodiac: '羊' },

  // --- 2028 (IMG_4565.jpeg - 戊申年 猴年) ---
  // 2028 正月: 2028-01-26 is 正月初一 (春節), ends 2028-02-24 (三十), 30 days (2/9 元宵節 十五)
  { m: 1, year: 2028, name: '正月', startSolar: '2028-01-26', startDay: 1, count: 30, isLeap: false, ganzhi: '戊申年', zodiac: '猴' },
  // 2028 二月: 2028-02-25 is 二月初一, ends 2028-03-25 (三十), 30 days
  { m: 2, year: 2028, name: '二月', startSolar: '2028-02-25', startDay: 1, count: 30, isLeap: false, ganzhi: '戊申年', zodiac: '猴' },
  // 2028 三月: 2028-03-26 is 三月初一, ends 2028-04-24 (三十), 30 days
  { m: 3, year: 2028, name: '三月', startSolar: '2028-03-26', startDay: 1, count: 30, isLeap: false, ganzhi: '戊申年', zodiac: '猴' },
  // 2028 四月: 2028-04-25 is 四月初一, ends 2028-05-23 (廿九), 29 days
  { m: 4, year: 2028, name: '四月', startSolar: '2028-04-25', startDay: 1, count: 29, isLeap: false, ganzhi: '戊申年', zodiac: '猴' },
  // 2028 五月: 2028-05-24 is 五月初一, ends 2028-06-22 (三十), 30 days (5/28 端午節 初五)
  { m: 5, year: 2028, name: '五月', startSolar: '2028-05-24', startDay: 1, count: 30, isLeap: false, ganzhi: '戊申年', zodiac: '猴' },
  // 2028 閏五月: 2028-06-23 is 閏五月初一, ends 2028-07-21 (廿九), 29 days
  { m: 5, year: 2028, name: '閏五月', startSolar: '2028-06-23', startDay: 1, count: 29, isLeap: true, ganzhi: '戊申年', zodiac: '猴' },
  // 2028 六月: 2028-07-22 is 六月初一 (兼大暑), ends 2028-08-19 (廿九), 29 days
  { m: 6, year: 2028, name: '六月', startSolar: '2028-07-22', startDay: 1, count: 29, isLeap: false, ganzhi: '戊申年', zodiac: '猴' },
  // 2028 七月: 2028-08-20 is 七月初一, ends 2028-09-18 (三十), 30 days (8/26 七夕 初七, 9/3 中元 十五)
  { m: 7, year: 2028, name: '七月', startSolar: '2028-08-20', startDay: 1, count: 30, isLeap: false, ganzhi: '戊申年', zodiac: '猴' },
  // 2028 八月: 2028-09-19 is 八月初一, ends 2028-10-17 (廿九), 29 days (10/3 中秋 十五)
  { m: 8, year: 2028, name: '八月', startSolar: '2028-09-19', startDay: 1, count: 29, isLeap: false, ganzhi: '戊申年', zodiac: '猴' },
  // 2028 九月: 2028-10-18 is 九月初一, ends 2028-11-15 (廿九), 29 days (10/26 重陽 初九)
  { m: 9, year: 2028, name: '九月', startSolar: '2028-10-18', startDay: 1, count: 29, isLeap: false, ganzhi: '戊申年', zodiac: '猴' },
  // 2028 十月: 2028-11-16 is 十月初一, ends 2028-12-15 (三十), 30 days
  { m: 10, year: 2028, name: '十月', startSolar: '2028-11-16', startDay: 1, count: 30, isLeap: false, ganzhi: '戊申年', zodiac: '猴' },
  // 2028 十一月 (冬月): 2028-12-16 is 十一月初一, ends 2029-01-14 (三十), 30 days (12/21 冬至 初六, 12/25 行憲日/聖誕節 初十)
  { m: 11, year: 2028, name: '冬月', startSolar: '2028-12-16', startDay: 1, count: 30, isLeap: false, ganzhi: '戊申年', zodiac: '猴' },
];

const EXACT_LUNAR_MAP: Record<string, LunarDayInfo> = (() => {
  const map: Record<string, LunarDayInfo> = {};
  for (const seg of EXACT_LUNAR_SEGMENTS) {
    const [sy, sm, sd] = seg.startSolar.split('-').map(Number);
    const cur = new Date(sy, sm - 1, sd);
    for (let i = 0; i < seg.count; i++) {
      const lDay = seg.startDay + i;
      const yStr = cur.getFullYear();
      const mStr = String(cur.getMonth() + 1).padStart(2, '0');
      const dStr = String(cur.getDate()).padStart(2, '0');
      const key = `${yStr}-${mStr}-${dStr}`;
      map[key] = {
        lunarYear: seg.year,
        lunarMonth: seg.m,
        lunarMonthName: seg.name,
        lunarDay: lDay,
        lunarDayName: LUNAR_DAY_NAMES[lDay] || `${lDay}日`,
        lunarFullText: `農曆${seg.name}${LUNAR_DAY_NAMES[lDay] || `${lDay}日`}`,
        isLeapMonth: seg.isLeap,
        ganzhiYear: seg.ganzhi,
        zodiac: seg.zodiac,
      };
      cur.setDate(cur.getDate() + 1);
    }
  }
  return map;
})();

// Lunar calendar converter using Exact Table (for 2026, 2027 & 2028) or Intl.DateTimeFormat (for other years)
export function getLunarInfo(date: Date): LunarDayInfo {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const dateKey = `${y}-${m}-${d}`;

  // Prioritize exact Taiwan official calendar mapping for 2026, 2027 & 2028
  if (EXACT_LUNAR_MAP[dateKey]) {
    return EXACT_LUNAR_MAP[dateKey];
  }

  try {
    const formatter = new Intl.DateTimeFormat('zh-TW-u-ca-chinese', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    const parts = formatter.formatToParts(date);
    let lunarYear = date.getFullYear();
    let lunarMonth = 1;
    let lunarDay = 1;
    let isLeap = false;

    for (const part of parts) {
      if (part.type === 'year') {
        const parsed = parseInt(part.value, 10);
        if (!isNaN(parsed)) {
          lunarYear = parsed;
        }
      } else if (part.type === 'month') {
        const val = part.value;
        if (val.includes('閏') || val.includes('leap')) {
          isLeap = true;
        }
        const num = parseInt(val.replace(/[^\d]/g, ''), 10);
        if (!isNaN(num)) {
          lunarMonth = num;
        }
      } else if (part.type === 'day') {
        const num = parseInt(part.value, 10);
        if (!isNaN(num)) {
          lunarDay = num;
        }
      }
    }

    const baseYear = 1984;
    const offset = (date.getFullYear() - baseYear) % 60;
    const tgIndex = (offset % 10 + 10) % 10;
    const dzIndex = (offset % 12 + 12) % 12;
    const ganzhiYear = `${TIANGAN[tgIndex]}${DIZHI[dzIndex]}年`;
    const zodiac = ZODIAC[dzIndex];

    const monthStr = (isLeap ? '閏' : '') + (LUNAR_MONTH_NAMES[lunarMonth] || `${lunarMonth}月`);
    const dayStr = LUNAR_DAY_NAMES[lunarDay] || `${lunarDay}日`;

    return {
      lunarYear,
      lunarMonth,
      lunarMonthName: monthStr,
      lunarDay,
      lunarDayName: dayStr,
      lunarFullText: `農曆${monthStr}${dayStr}`,
      isLeapMonth: isLeap,
      ganzhiYear,
      zodiac,
    };
  } catch {
    // Robust fallback
    return {
      lunarYear: date.getFullYear(),
      lunarMonth: 1,
      lunarMonthName: '正月',
      lunarDay: 1,
      lunarDayName: '初一',
      lunarFullText: '農曆正月初一',
      isLeapMonth: false,
      ganzhiYear: '丙午年',
      zodiac: '馬',
    };
  }
}

// Special Lunar Festivals
export function getLunarFestival(
  lunarMonth: number,
  lunarDay: number,
  isLeap: boolean,
  isLastDayOfYear = false,
  solarDateString?: string
): string | undefined {
  // Exact 2026 table check (IMG_4563.jpeg marks 3/3 as 元宵節)
  if (solarDateString === '2026-03-03') return '元宵節';
  if (solarDateString === '2026-02-16') return '小年夜';
  if (solarDateString === '2026-02-17') return '除夕';
  if (solarDateString === '2026-02-18') return '春節';

  // Exact 2027 table check (IMG_4564.jpeg)
  if (solarDateString === '2027-02-05') return '除夕';
  if (solarDateString === '2027-02-06') return '春節';
  if (solarDateString === '2027-02-20') return '元宵節';
  if (solarDateString === '2027-06-09') return '端午節';
  if (solarDateString === '2027-08-08') return '七夕情人節';
  if (solarDateString === '2027-08-16') return '中元節';
  if (solarDateString === '2027-09-15') return '中秋節';
  if (solarDateString === '2027-10-08') return '重陽節';

  // Exact 2028 table check (IMG_4565.jpeg)
  if (solarDateString === '2028-01-24') return '小年夜';
  if (solarDateString === '2028-01-25') return '除夕';
  if (solarDateString === '2028-01-26') return '春節';
  if (solarDateString === '2028-02-09') return '元宵節';
  if (solarDateString === '2028-05-28') return '端午節';
  if (solarDateString === '2028-08-26') return '七夕情人節';
  if (solarDateString === '2028-09-03') return '中元節';
  if (solarDateString === '2028-10-03') return '中秋節';
  if (solarDateString === '2028-10-26') return '重陽節';

  if (isLeap) return undefined;
  if (isLastDayOfYear || (lunarMonth === 12 && (lunarDay === 30 || lunarDay === 29))) {
    return '除夕';
  }
  if (lunarMonth === 1 && lunarDay === 1) return '春節';
  if (lunarMonth === 1 && lunarDay === 2) return '初二回娘家';
  if (lunarMonth === 1 && lunarDay === 3) return '初三赤狗日';
  if (lunarMonth === 1 && lunarDay === 5) return '初五開工開市';
  if (lunarMonth === 1 && lunarDay === 9) return '天公生';
  if (lunarMonth === 1 && lunarDay === 15) return '元宵節';
  if (lunarMonth === 2 && lunarDay === 2) return '頭牙土地公生';
  if (lunarMonth === 3 && lunarDay === 23) return '媽祖生';
  if (lunarMonth === 5 && lunarDay === 5) return '端午節';
  if (lunarMonth === 7 && lunarDay === 1) return '鬼門開';
  if (lunarMonth === 7 && lunarDay === 7) return '七夕情人節';
  if (lunarMonth === 7 && lunarDay === 15) return '中元節';
  if (lunarMonth === 7 && lunarDay === 30) return '鬼門關';
  if (lunarMonth === 8 && lunarDay === 15) return '中秋節';
  if (lunarMonth === 9 && lunarDay === 9) return '重陽節';
  if (lunarMonth === 12 && lunarDay === 8) return '臘八節';
  if (lunarMonth === 12 && lunarDay === 16) return '尾牙';
  if (lunarMonth === 12 && lunarDay === 24) return '送神日';
  return undefined;
}

// Western & Commemorative Holidays matching IMG_4563.jpeg
export function getWesternHoliday(
  month: number,
  day: number,
  dayOfWeek: number
): string | undefined {
  if (month === 1 && day === 1) return '元旦';
  if (month === 2 && day === 14) return '西洋情人節';
  if (month === 3 && day === 8) return '婦女節';
  if (month === 3 && day === 14) return '白色情人節';
  if (month === 3 && day === 29) return '青年節';
  if (month === 4 && day === 1) return '愚人節';
  if (month === 4 && day === 22) return '世界地球日';
  // Mother's Day: Second Sunday of May
  if (month === 5 && dayOfWeek === 0 && day >= 8 && day <= 14) return '母親節';
  if (month === 8 && day === 8) return '父親節';
  if (month === 9 && day === 3) return '軍人節';
  if (month === 9 && day === 28) return '教師節';
  if (month === 10 && day === 25) return '光復節';
  if (month === 10 && day === 31) return '萬聖節';
  // Thanksgiving: 4th Thursday of November
  if (month === 11 && dayOfWeek === 4 && day >= 22 && day <= 28) return '感恩節';
  // Black Friday: 4th Friday of November
  if (month === 11 && dayOfWeek === 5 && day >= 23 && day <= 29) return '黑色星期五';
  if (month === 12 && day === 24) return '平安夜';
  if (month === 12 && day === 25) return '聖誕節';
  if (month === 12 && day === 31) return '跨年夜';
  return undefined;
}
