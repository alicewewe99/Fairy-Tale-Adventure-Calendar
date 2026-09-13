/**
 * Taiwan National Holidays, Memorial Days & Consecutive Holidays (2026 ~ 2033)
 * Formulated according to 行政院人事行政總處最新公告 & 紀念日及節日實施辦法
 */

export interface HolidayRule {
  isHoliday: boolean; // 是否為放假日
  isNationalHoliday: boolean; // 是否加註「國定假」
  name: string; // 假日/節日名稱
  note?: string; // 連假備註 (如「連休9天」)
}

// Fixed Commemorative Days (固定公曆紀念日)
export const COMMEMORATIVE_DAYS: Record<string, { name: string; isHoliday: boolean }> = {
  '01-01': { name: '元旦／開國紀念日', isHoliday: true },
  '02-14': { name: '西洋情人節', isHoliday: false },
  '02-28': { name: '和平紀念日', isHoliday: true },
  '03-08': { name: '婦女節', isHoliday: false },
  '03-12': { name: '國父逝世紀念日', isHoliday: false },
  '03-14': { name: '白色情人節', isHoliday: false },
  '03-21': { name: '民族平等紀念日', isHoliday: false },
  '03-29': { name: '青年節', isHoliday: false },
  '04-01': { name: '愚人節', isHoliday: false },
  '04-04': { name: '兒童節', isHoliday: true },
  '04-05': { name: '清明節', isHoliday: true },
  '04-07': { name: '言論自由日', isHoliday: false },
  '05-01': { name: '勞動節', isHoliday: true },
  '06-26': { name: '原住民族抵抗日', isHoliday: false },
  '07-15': { name: '解嚴紀念日', isHoliday: false },
  '08-01': { name: '原住民族日', isHoliday: false },
  '08-08': { name: '父親節', isHoliday: false },
  '08-15': { name: '終戰紀念日', isHoliday: false },
  '08-23': { name: '八二三紀念日', isHoliday: false },
  '09-03': { name: '軍人節', isHoliday: false },
  '09-21': { name: '國家防災日', isHoliday: false },
  '09-28': { name: '教師節／孔子誕辰', isHoliday: true },
  '10-10': { name: '國慶日', isHoliday: true },
  '10-24': { name: '臺灣聯合國日', isHoliday: false },
  '10-25': { name: '臺灣光復節', isHoliday: true },
  '10-31': { name: '萬聖節', isHoliday: false },
  '11-12': { name: '國父誕辰紀念日', isHoliday: false },
  '12-25': { name: '聖誕節／行憲紀念日', isHoliday: true },
  '12-28': { name: '全國客家日', isHoliday: false },
};

// Explicit consecutive holidays mapped for 2026 (人事行政總處最新公告 & IMG_4563.jpeg 100% 對照)
const TAIWAN_2026_HOLIDAYS: Record<string, HolidayRule> = {
  // 元旦連假 4天 (1/1 ~ 1/4)
  '2026-01-01': { isHoliday: true, isNationalHoliday: true, name: '元旦／開國紀念日', note: '元旦連休4天' },
  '2026-01-02': { isHoliday: true, isNationalHoliday: true, name: '元旦連假', note: '元旦連休4天' },
  '2026-01-03': { isHoliday: true, isNationalHoliday: true, name: '元旦連假', note: '元旦連休4天' },
  '2026-01-04': { isHoliday: true, isNationalHoliday: true, name: '元旦連假', note: '元旦連休4天' },

  // 1. 農曆春節假期，2月14日至2月22日，連休9天
  '2026-02-14': { isHoliday: true, isNationalHoliday: true, name: '西洋情人節／春節連假', note: '春節9天連休' },
  '2026-02-15': { isHoliday: true, isNationalHoliday: true, name: '春節連假', note: '春節9天連休' },
  '2026-02-16': { isHoliday: true, isNationalHoliday: true, name: '小年夜', note: '春節9天連休' },
  '2026-02-17': { isHoliday: true, isNationalHoliday: true, name: '農曆除夕', note: '春節9天連休' },
  '2026-02-18': { isHoliday: true, isNationalHoliday: true, name: '春節初一', note: '春節9天連休' },
  '2026-02-19': { isHoliday: true, isNationalHoliday: true, name: '春節初二', note: '春節9天連休' },
  '2026-02-20': { isHoliday: true, isNationalHoliday: true, name: '春節初三', note: '春節9天連休' },
  '2026-02-21': { isHoliday: true, isNationalHoliday: true, name: '春節初四', note: '春節9天連休' },
  '2026-02-22': { isHoliday: true, isNationalHoliday: true, name: '春節初五', note: '春節9天連休' },

  // 2. 和平紀念日，2月27日至3月1日，連休3天
  '2026-02-27': { isHoliday: true, isNationalHoliday: true, name: '228和平紀念日(補假)', note: '228連休3天' },
  '2026-02-28': { isHoliday: true, isNationalHoliday: true, name: '228和平紀念日', note: '228連休3天' },
  '2026-03-01': { isHoliday: true, isNationalHoliday: true, name: '和平紀念日連假', note: '228連休3天' },

  // 元宵節 (3/3 正月十四)
  '2026-03-03': { isHoliday: false, isNationalHoliday: false, name: '元宵節' },

  // 3. 兒童及清明節，4月3日至4月6日，連休4天
  '2026-04-03': { isHoliday: true, isNationalHoliday: true, name: '兒童節(補假)', note: '清明連休4天' },
  '2026-04-04': { isHoliday: true, isNationalHoliday: true, name: '兒童節', note: '清明連休4天' },
  '2026-04-05': { isHoliday: true, isNationalHoliday: true, name: '清明節', note: '清明連休4天' },
  '2026-04-06': { isHoliday: true, isNationalHoliday: true, name: '清明節(補假)', note: '清明連休4天' },

  // 4. 勞動節，5月1日至5月3日，連休3天
  '2026-05-01': { isHoliday: true, isNationalHoliday: true, name: '勞動節', note: '勞動節連休3天' },
  '2026-05-02': { isHoliday: true, isNationalHoliday: true, name: '勞動節連假', note: '勞動節連休3天' },
  '2026-05-03': { isHoliday: true, isNationalHoliday: true, name: '勞動節連假', note: '勞動節連休3天' },

  // 5. 端午節，6月19日至6月21日，連休3天
  '2026-06-19': { isHoliday: true, isNationalHoliday: true, name: '端午節', note: '端午連休3天' },
  '2026-06-20': { isHoliday: true, isNationalHoliday: true, name: '端午連假', note: '端午連休3天' },
  '2026-06-21': { isHoliday: true, isNationalHoliday: true, name: '端午連假', note: '端午連休3天' },

  // 6. 中秋節及孔子誕辰紀念日／教師節，9月25日至9月28日，連休4天
  '2026-09-25': { isHoliday: true, isNationalHoliday: true, name: '中秋節', note: '秋節與教師節連休4天' },
  '2026-09-26': { isHoliday: true, isNationalHoliday: true, name: '中秋連假', note: '秋節與教師節連休4天' },
  '2026-09-27': { isHoliday: true, isNationalHoliday: true, name: '孔子誕辰連假', note: '秋節與教師節連休4天' },
  '2026-09-28': { isHoliday: true, isNationalHoliday: true, name: '孔子誕辰／教師節', note: '秋節與教師節連休4天' },

  // 7. 國慶日，10月9日至10月11日，連休3天
  '2026-10-09': { isHoliday: true, isNationalHoliday: true, name: '國慶日(補假)', note: '國慶連休3天' },
  '2026-10-10': { isHoliday: true, isNationalHoliday: true, name: '雙十國慶日', note: '國慶連休3天' },
  '2026-10-11': { isHoliday: true, isNationalHoliday: true, name: '國慶連假', note: '國慶連休3天' },

  // 8. 臺灣光復暨金門古寧頭大捷紀念日，10月24日至10月26日，連休3天
  '2026-10-24': { isHoliday: true, isNationalHoliday: true, name: '臺灣光復節連假', note: '光復紀念連休3天' },
  '2026-10-25': { isHoliday: true, isNationalHoliday: true, name: '臺灣光復節', note: '光復紀念連休3天' },
  '2026-10-26': { isHoliday: true, isNationalHoliday: true, name: '臺灣光復節(補假)', note: '光復紀念連休3天' },

  // 9. 行憲紀念日，12月25日至12月27日，連休3天
  '2026-12-25': { isHoliday: true, isNationalHoliday: true, name: '聖誕節／行憲紀念日', note: '行憲紀念連休3天' },
  '2026-12-26': { isHoliday: true, isNationalHoliday: true, name: '行憲紀念連假', note: '行憲紀念連休3天' },
  '2026-12-27': { isHoliday: true, isNationalHoliday: true, name: '行憲紀念連假', note: '行憲紀念連休3天' },
};

// Explicit consecutive holidays mapped for 2027 (100% matched with Taiwan official calendar IMG_4564.jpeg)
const TAIWAN_2027_HOLIDAYS: Record<string, HolidayRule> = {
  // 1. 元旦 3 天（1/1(五) ~ 1/3(日)）
  '2027-01-01': { isHoliday: true, isNationalHoliday: true, name: '開國紀念日／元旦', note: '元旦連休3天' },
  '2027-01-02': { isHoliday: true, isNationalHoliday: true, name: '元旦連假', note: '元旦連休3天' },
  '2027-01-03': { isHoliday: true, isNationalHoliday: true, name: '元旦連假', note: '元旦連休3天' },

  // 2. 春節 6 天連休（2/5(五)除夕 ~ 2/10(三)初五）- IMG_4564.jpeg 官方粉紅標記，2/11初六與2/12初七為正常上班日
  '2027-02-05': { isHoliday: true, isNationalHoliday: true, name: '農曆除夕', note: '春節連休6天' },
  '2027-02-06': { isHoliday: true, isNationalHoliday: true, name: '春節初一', note: '春節連休6天' },
  '2027-02-07': { isHoliday: true, isNationalHoliday: true, name: '春節初二', note: '春節連休6天' },
  '2027-02-08': { isHoliday: true, isNationalHoliday: true, name: '春節初三', note: '春節連休6天' },
  '2027-02-09': { isHoliday: true, isNationalHoliday: true, name: '春節初四(補假)', note: '春節連休6天' },
  '2027-02-10': { isHoliday: true, isNationalHoliday: true, name: '春節初五(補假)', note: '春節連休6天' },

  // 3. 228和平紀念日 3 天連休（2/27(六) ~ 3/1(一)）- 2/28為週日，3/1(一)補假
  '2027-02-27': { isHoliday: true, isNationalHoliday: true, name: '228和平紀念連假', note: '228連休3天' },
  '2027-02-28': { isHoliday: true, isNationalHoliday: true, name: '和平紀念日', note: '228連休3天' },
  '2027-03-01': { isHoliday: true, isNationalHoliday: true, name: '和平紀念日(補假)', note: '228連休3天' },

  // 4. 兒童節與清明節 4 天連休（4/3(六) ~ 4/6(二)）- 4/4兒童節、4/5清明節、4/6補假
  '2027-04-03': { isHoliday: true, isNationalHoliday: true, name: '清明兒童連假', note: '清明兒童連休4天' },
  '2027-04-04': { isHoliday: true, isNationalHoliday: true, name: '兒童節', note: '清明兒童連休4天' },
  '2027-04-05': { isHoliday: true, isNationalHoliday: true, name: '清明節', note: '清明兒童連休4天' },
  '2027-04-06': { isHoliday: true, isNationalHoliday: true, name: '兒童節(補假)', note: '清明兒童連休4天' },

  // 5. 勞動節 3 天連休（4/30(五) ~ 5/2(日)）- 5/1為週六，4/30(五)補假
  '2027-04-30': { isHoliday: true, isNationalHoliday: true, name: '勞動節(補假)', note: '勞動節連休3天' },
  '2027-05-01': { isHoliday: true, isNationalHoliday: true, name: '勞動節', note: '勞動節連休3天' },
  '2027-05-02': { isHoliday: true, isNationalHoliday: true, name: '勞動節連假', note: '勞動節連休3天' },

  // 6. 端午節 (2027-06-09 週三)
  '2027-06-09': { isHoliday: true, isNationalHoliday: true, name: '端午節' },

  // 7. 中秋節 (2027-09-15 週三)
  '2027-09-15': { isHoliday: true, isNationalHoliday: true, name: '中秋節' },

  // 8. 孔子誕辰紀念日／教師節 (2027-09-28 週二)
  '2027-09-28': { isHoliday: true, isNationalHoliday: true, name: '孔子誕辰紀念日／教師節' },

  // 9. 雙十國慶 3 天連休（10/9(六) ~ 10/11(一)）- 10/10為週日，10/11(一)補假
  '2027-10-09': { isHoliday: true, isNationalHoliday: true, name: '國慶連假', note: '國慶連休3天' },
  '2027-10-10': { isHoliday: true, isNationalHoliday: true, name: '雙十國慶日', note: '國慶連休3天' },
  '2027-10-11': { isHoliday: true, isNationalHoliday: true, name: '國慶日(補假)', note: '國慶連休3天' },

  // 10. 臺灣光復節 3 天連休（10/23(六) ~ 10/25(一)）
  '2027-10-23': { isHoliday: true, isNationalHoliday: true, name: '臺灣光復節連假', note: '光復紀念連休3天' },
  '2027-10-24': { isHoliday: true, isNationalHoliday: true, name: '臺灣光復節連假', note: '光復紀念連休3天' },
  '2027-10-25': { isHoliday: true, isNationalHoliday: true, name: '臺灣光復節', note: '光復紀念連休3天' },

  // 11. 行憲紀念日 3 天連休（12/24(五) ~ 12/26(日)）- 12/25為週六，12/24(五)補假
  '2027-12-24': { isHoliday: true, isNationalHoliday: true, name: '行憲紀念日(補假)', note: '行憲紀念連休3天' },
  '2027-12-25': { isHoliday: true, isNationalHoliday: true, name: '聖誕節／行憲紀念日', note: '行憲紀念連休3天' },
  '2027-12-26': { isHoliday: true, isNationalHoliday: true, name: '行憲紀念連假', note: '行憲紀念連休3天' },

  // 12. 2028跨年元旦連假（12/31(五) ~ 1/2(日)）- 12/31(五)調整放假
  '2027-12-31': { isHoliday: true, isNationalHoliday: true, name: '元旦連假調整放假', note: '2028跨年連休3天' },
};

// Explicit consecutive holidays mapped for 2028 (IMG_4565.jpeg 100% 對照)
const TAIWAN_2028_HOLIDAYS: Record<string, HolidayRule> = {
  // 1. 元旦 (1/1 ~ 1/2)
  '2028-01-01': { isHoliday: true, isNationalHoliday: true, name: '開國紀念日／元旦', note: '元旦假期' },
  '2028-01-02': { isHoliday: true, isNationalHoliday: true, name: '元旦連假', note: '元旦假期' },

  // 2. 春節 9 天連休 (1/22(六) ~ 1/30(日)) - IMG_4565.jpeg 全粉紅標記
  '2028-01-22': { isHoliday: true, isNationalHoliday: true, name: '春節連假', note: '春節連休9天' },
  '2028-01-23': { isHoliday: true, isNationalHoliday: true, name: '春節連假', note: '春節連休9天' },
  '2028-01-24': { isHoliday: true, isNationalHoliday: true, name: '小年夜', note: '春節連休9天' },
  '2028-01-25': { isHoliday: true, isNationalHoliday: true, name: '農曆除夕', note: '春節連休9天' },
  '2028-01-26': { isHoliday: true, isNationalHoliday: true, name: '春節初一', note: '春節連休9天' },
  '2028-01-27': { isHoliday: true, isNationalHoliday: true, name: '春節初二', note: '春節連休9天' },
  '2028-01-28': { isHoliday: true, isNationalHoliday: true, name: '春節初三', note: '春節連休9天' },
  '2028-01-29': { isHoliday: true, isNationalHoliday: true, name: '春節初四', note: '春節連休9天' },
  '2028-01-30': { isHoliday: true, isNationalHoliday: true, name: '春節初五', note: '春節連休9天' },

  // 3. 228和平紀念日 3 天 (2/26(六) ~ 2/28(一))
  '2028-02-26': { isHoliday: true, isNationalHoliday: true, name: '228紀念連假', note: '228連休3天' },
  '2028-02-27': { isHoliday: true, isNationalHoliday: true, name: '228紀念連假', note: '228連休3天' },
  '2028-02-28': { isHoliday: true, isNationalHoliday: true, name: '和平紀念日', note: '228連休3天' },

  // 4. 清明兒童節 4 天連假 (4/1(六) ~ 4/4(二))
  '2028-04-01': { isHoliday: true, isNationalHoliday: true, name: '清明兒童連假', note: '清明連休4天' },
  '2028-04-02': { isHoliday: true, isNationalHoliday: true, name: '清明兒童連假', note: '清明連休4天' },
  '2028-04-03': { isHoliday: true, isNationalHoliday: true, name: '清明連假', note: '清明連休4天' },
  '2028-04-04': { isHoliday: true, isNationalHoliday: true, name: '兒童節／清明節', note: '清明連休4天' },

  // 5. 勞動節 3 天 (4/29(六) ~ 5/1(一))
  '2028-04-29': { isHoliday: true, isNationalHoliday: true, name: '勞動節連假', note: '勞動節連休3天' },
  '2028-04-30': { isHoliday: true, isNationalHoliday: true, name: '勞動節連假', note: '勞動節連休3天' },
  '2028-05-01': { isHoliday: true, isNationalHoliday: true, name: '勞動節', note: '勞動節連休3天' },

  // 6. 端午節 3 天 (5/27(六) ~ 5/29(一))
  '2028-05-27': { isHoliday: true, isNationalHoliday: true, name: '端午連假', note: '端午連休3天' },
  '2028-05-28': { isHoliday: true, isNationalHoliday: true, name: '端午節', note: '端午連休3天' },
  '2028-05-29': { isHoliday: true, isNationalHoliday: true, name: '端午節(補假)', note: '端午連休3天' },

  // 7. 孔子誕辰紀念日／教師節 (9/28(四))
  '2028-09-28': { isHoliday: true, isNationalHoliday: true, name: '孔子誕辰紀念日／教師節' },

  // 8. 中秋節 (10/3(二))
  '2028-10-03': { isHoliday: true, isNationalHoliday: true, name: '中秋節' },

  // 9. 雙十國慶日 (10/10(二))
  '2028-10-10': { isHoliday: true, isNationalHoliday: true, name: '雙十國慶日' },

  // 10. 臺灣光復節 (10/25(三))
  '2028-10-25': { isHoliday: true, isNationalHoliday: true, name: '臺灣光復節' },

  // 11. 聖誕節／行憲紀念日 3 天 (12/23(六) ~ 12/25(一))
  '2028-12-23': { isHoliday: true, isNationalHoliday: true, name: '行憲紀念連假', note: '行憲連休3天' },
  '2028-12-24': { isHoliday: true, isNationalHoliday: true, name: '行憲紀念連假', note: '行憲連休3天' },
  '2028-12-25': { isHoliday: true, isNationalHoliday: true, name: '聖誕節／行憲紀念日', note: '行憲連休3天' },
};

/**
 * Get holiday & memorial information for a specific date (2026 ~ 2033)
 */
export function getTaiwanHolidayInfo(
  dateString: string,
  year: number,
  month: number,
  day: number,
  dayOfWeek: number,
  lunarMonth: number,
  lunarDay: number,
  isLeap: boolean
): HolidayRule | null {
  const monthDay = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // Check explicit 2026 calendar (100% matched with IMG_4563.jpeg)
  if (year === 2026) {
    if (TAIWAN_2026_HOLIDAYS[dateString]) {
      return TAIWAN_2026_HOLIDAYS[dateString];
    }
    if (COMMEMORATIVE_DAYS[monthDay]) {
      return { isHoliday: false, isNationalHoliday: false, name: COMMEMORATIVE_DAYS[monthDay].name };
    }
    return null;
  }

  // Check explicit 2027 calendar (100% matched with IMG_4564.jpeg)
  if (year === 2027) {
    if (TAIWAN_2027_HOLIDAYS[dateString]) {
      return TAIWAN_2027_HOLIDAYS[dateString];
    }
    if (COMMEMORATIVE_DAYS[monthDay]) {
      return { isHoliday: false, isNationalHoliday: false, name: COMMEMORATIVE_DAYS[monthDay].name };
    }
    return null;
  }

  // Check explicit 2028 calendar (100% matched with IMG_4565.jpeg)
  if (year === 2028) {
    if (TAIWAN_2028_HOLIDAYS[dateString]) {
      return TAIWAN_2028_HOLIDAYS[dateString];
    }
    if (COMMEMORATIVE_DAYS[monthDay]) {
      return { isHoliday: false, isNationalHoliday: false, name: COMMEMORATIVE_DAYS[monthDay].name };
    }
    return null;
  }

  // 2028 ~ 2033 Statutory Rules (紀念日及節日實施辦法第四條、第五條)
  // 1. Lunar Festivals that are statutory holidays:
  // 除夕 & 春節 (初一、初二、初三)
  if (!isLeap) {
    if (lunarMonth === 12 && (lunarDay === 30 || lunarDay === 29)) {
      return { isHoliday: true, isNationalHoliday: true, name: '農曆除夕' };
    }
    if (lunarMonth === 1 && lunarDay === 1) {
      return { isHoliday: true, isNationalHoliday: true, name: '春節初一' };
    }
    if (lunarMonth === 1 && lunarDay === 2) {
      return { isHoliday: true, isNationalHoliday: true, name: '春節初二' };
    }
    if (lunarMonth === 1 && lunarDay === 3) {
      return { isHoliday: true, isNationalHoliday: true, name: '春節初三' };
    }
    // 端午節 (農曆五月初五)
    if (lunarMonth === 5 && lunarDay === 5) {
      return { isHoliday: true, isNationalHoliday: true, name: '端午節' };
    }
    // 中秋節 (農曆八月十五)
    if (lunarMonth === 8 && lunarDay === 15) {
      return { isHoliday: true, isNationalHoliday: true, name: '中秋節' };
    }
  }

  // 2. Solar Calendar Statutory Holidays (第四條 & 節日)
  // 元旦 (1/1)
  if (month === 1 && day === 1) {
    return { isHoliday: true, isNationalHoliday: true, name: '中華民國開國紀念日' };
  }
  // 和平紀念日 (2/28)
  if (month === 2 && day === 28) {
    return { isHoliday: true, isNationalHoliday: true, name: '和平紀念日' };
  }
  // 兒童節 (4/4) & 清明節 (4/4 or 4/5)
  if (month === 4 && day === 4) {
    return { isHoliday: true, isNationalHoliday: true, name: '兒童節' };
  }
  if (month === 4 && day === 5) {
    return { isHoliday: true, isNationalHoliday: true, name: '清明節' };
  }
  // 勞動節 (5/1)
  if (month === 5 && day === 1) {
    return { isHoliday: true, isNationalHoliday: true, name: '勞動節' };
  }
  // 孔子誕辰紀念日／教師節 (9/28)
  if (month === 9 && day === 28) {
    return { isHoliday: true, isNationalHoliday: true, name: '孔子誕辰紀念日' };
  }
  // 國慶日 (10/10)
  if (month === 10 && day === 10) {
    return { isHoliday: true, isNationalHoliday: true, name: '國慶日' };
  }
  // 臺灣光復暨金門古寧頭大捷紀念日 (10/25)
  if (month === 10 && day === 25) {
    return { isHoliday: true, isNationalHoliday: true, name: '臺灣光復暨古寧頭大捷紀念日' };
  }
  // 行憲紀念日 (12/25)
  if (month === 12 && day === 25) {
    return { isHoliday: true, isNationalHoliday: true, name: '行憲紀念日' };
  }

  // 週末補假自動補算 (若節日適逢週六，則週五補假；若適逢週日，則週一補假)
  // Check if yesterday or tomorrow was a holiday falling on weekend
  // Friday compensation if Saturday is a holiday
  if (dayOfWeek === 5) {
    const satDate = new Date(year, month - 1, day + 1);
    const satStr = `${String(satDate.getMonth() + 1).padStart(2, '0')}-${String(satDate.getDate()).padStart(2, '0')}`;
    const satHoliday = COMMEMORATIVE_DAYS[satStr];
    if (satHoliday && satHoliday.isHoliday) {
      return { isHoliday: true, isNationalHoliday: true, name: `${satHoliday.name}(補假)` };
    }
  }

  // Monday compensation if Sunday is a holiday
  if (dayOfWeek === 1) {
    const sunDate = new Date(year, month - 1, day - 1);
    const sunStr = `${String(sunDate.getMonth() + 1).padStart(2, '0')}-${String(sunDate.getDate()).padStart(2, '0')}`;
    const sunHoliday = COMMEMORATIVE_DAYS[sunStr];
    if (sunHoliday && sunHoliday.isHoliday) {
      return { isHoliday: true, isNationalHoliday: true, name: `${sunHoliday.name}(補假)` };
    }
  }

  // Commemorative days that are not day-offs
  if (COMMEMORATIVE_DAYS[monthDay]) {
    const comm = COMMEMORATIVE_DAYS[monthDay];
    return {
      isHoliday: comm.isHoliday,
      isNationalHoliday: comm.isHoliday,
      name: comm.name,
    };
  }

  return null;
}
