import { LoveAnswer, YesNoOracle } from '../types';

export const LOVE_ANSWERS: LoveAnswer[] = [
  {
    id: 1,
    category: '命運契機',
    answerZh: '大膽說出你的真實感受，奇蹟就在開口的下一秒。',
    explanationZh: '沉默只會讓猜忌蔓延，當你勇敢撕開防備的薄紗，對方會被你的赤誠深深打動。',
    oracleTone: 'action',
  },
  {
    id: 2,
    category: '時機等待',
    answerZh: '給彼此一段安靜的呼吸期，時間會給出最好的答案。',
    explanationZh: '此時步步進逼只會適得其反。退後半步，讓思緒如水沉澱，真相自然水落石出。',
    oracleTone: 'reflective',
  },
  {
    id: 3,
    category: '內在肯定',
    answerZh: '你值得被毫無保留地深愛，不要在委屈中將就。',
    explanationZh: '你的價值不取決於任何人是否懂得欣賞。昂起頭，先成為那個深愛自己的溫柔存在。',
    oracleTone: 'positive',
  },
  {
    id: 4,
    category: '緣分指引',
    answerZh: '這不是巧合，而是靈魂跨越時空的必然相逢。',
    explanationZh: '你們之間的每一次心跳共鳴都在喚醒宿世的記憶，放下恐懼，勇敢信任這份牽引。',
    oracleTone: 'positive',
  },
  {
    id: 5,
    category: '警示提醒',
    answerZh: '留意那些反覆出現的微小不安，直覺正在保護你。',
    explanationZh: '不要試圖替對方的冷漠或飄忽找藉口。你的心靈比理智更早察覺到風暴的來臨。',
    oracleTone: 'warning',
  },
  {
    id: 6,
    category: '主動出擊',
    answerZh: '準備一份小驚喜，浪漫需要實質的心動點綴。',
    explanationZh: '一封手寫便簽、一杯熱咖啡或一句突如其來的問候，足以在對方心中激起千層浪。',
    oracleTone: 'action',
  },
  {
    id: 7,
    category: '釋懷放手',
    answerZh: '翻過這一頁吧，更絢麗的章節正在下一個路口等待你。',
    explanationZh: '緊抓枯萎的玫瑰只會刺傷掌心。唯有鬆開雙手，才能接住春日盛開的新繁花。',
    oracleTone: 'reflective',
  },
  {
    id: 8,
    category: '篤定真愛',
    answerZh: '毫無疑問，答案是肯定的，勇敢去愛吧！',
    explanationZh: '所有星光都在此刻匯聚為你們引路。堅定你們的信念，幸福近在咫尺。',
    oracleTone: 'positive',
  },
  {
    id: 9,
    category: '深層溝通',
    answerZh: '看著對方的眼睛，誠實談談未來的藍圖。',
    explanationZh: '猜想只是心靈的幻影。選一個舒適的午後，把彼此的心願拼湊成同一幅風景。',
    oracleTone: 'action',
  },
  {
    id: 10,
    category: '耐心守候',
    answerZh: '最甘甜的果實往往需要最漫長的陽光沉釀。',
    explanationZh: '急於求成只會摘下青澀的果子。把這段時光當成彼此心靈扎根的溫床。',
    oracleTone: 'reflective',
  },
  {
    id: 11,
    category: '放下執念',
    answerZh: '停止過度揣摩對方的每一句話，活出你自己的光芒。',
    explanationZh: '當你將焦點移回自己的充實生活時，你的吸引力將成倍激增。',
    oracleTone: 'action',
  },
  {
    id: 12,
    category: '溫柔和解',
    answerZh: '給對方一個台階，一個擁抱勝過千言萬語的爭辯。',
    explanationZh: '在親密關係中，贏了道理往往輸了感情。用溫柔化解堅冰，愛意將重新回流。',
    oracleTone: 'positive',
  },
];

// YES / NO Love Oracle generator
export const YES_NO_ORACLES: YesNoOracle[] = [
  {
    answer: 'YES',
    answerZh: '是的！毫無疑問（YES）',
    detailAdvice: '直覺是準確的，這段感情或這個決定充滿了正向的推動力。敞開心扉勇敢迎上前去，宇宙正為你敞開綠燈。',
    loveAffirmation: '我配得全然的美好，我滿懷喜悅地擁抱這個甜美的肯定！',
  },
  {
    answer: 'YES',
    answerZh: '是的，而且比你想像的更快到來！',
    detailAdvice: '星象與緣分正在加速匯合。保持熱忱與微笑，這是一段值得你全心投入的美好歷程。',
    loveAffirmation: '奇蹟正在發生，我準備好迎接這份深沉的愛。',
  },
  {
    answer: 'NO',
    answerZh: '不是現在，或者這不是對的人（NO）',
    detailAdvice: '目前的情況存在較大摩擦或不健康的依賴。如果繼續強求，只會帶來更多心力交瘁。及時停下腳步，好好愛惜自己。',
    loveAffirmation: '我尊重生命的指引，我值得在完全健康對等的關係中被深愛。',
  },
  {
    answer: 'NO',
    answerZh: '放下這份執念吧（NO）',
    detailAdvice: '眼前這扇門正在關上，是為了引導你走向那扇為你敞開的更大花園。不要回頭留戀陰霾。',
    loveAffirmation: '我輕盈地放下不屬於我的事物，迎接真正屬於我的幸福。',
  },
  {
    answer: 'NOT_YET',
    answerZh: '時機尚未成熟（NOT YET）',
    detailAdvice: '目前雙方都還需要各自沉澱與成長的時間。種子剛剛播下，過早翻土只會傷到嫩芽。耐心守候。',
    loveAffirmation: '我信任神聖時機的安排，最好的相遇值得耐心等待。',
  },
  {
    answer: 'MAYBE',
    answerZh: '結果取決於你如何行動（MAYBE）',
    detailAdvice: '命運的韁繩掌握在你的手中。若你願意主動溝通或改變以往的模式，局面將朝向美好逆轉。',
    loveAffirmation: '我有力量創造我渴望的幸福，我選擇以愛與智慧引領關係。',
  },
];

export function getRandomLoveAnswer(): LoveAnswer {
  const idx = Math.floor(Math.random() * LOVE_ANSWERS.length);
  return LOVE_ANSWERS[idx];
}

export function getRandomYesNoOracle(): YesNoOracle {
  const idx = Math.floor(Math.random() * YES_NO_ORACLES.length);
  return YES_NO_ORACLES[idx];
}
