import type { EventDefinition } from "@/types/timeline";

export const EVENT_CATALOG: EventDefinition[] = [
  // ── 感情 love ──
  { id: "dating", emoji: "👫", label: "恋爱", category: "love", persistence: "persistent", stackable: false, sortOrder: 1 },
  { id: "dating_mm", emoji: "👬", label: "恋爱(男男)", category: "love", persistence: "persistent", stackable: false, sortOrder: 2 },
  { id: "dating_ff", emoji: "👭", label: "恋爱(女女)", category: "love", persistence: "persistent", stackable: false, sortOrder: 3 },
  { id: "crush", emoji: "💗", label: "暗恋", category: "love", persistence: "one-time", stackable: false, sortOrder: 4 },
  { id: "proposal", emoji: "💍", label: "求婚", category: "love", persistence: "one-time", stackable: false, sortOrder: 5 },
  { id: "married", emoji: "💒", label: "结婚", category: "love", persistence: "persistent", stackable: false, cancels: ["dating", "dating_mm", "dating_ff"], sortOrder: 6 },
  { id: "breakup", emoji: "💔", label: "分手", category: "love", persistence: "one-time", stackable: false, cancels: ["dating", "dating_mm", "dating_ff"], sortOrder: 7 },
  { id: "divorce", emoji: "📝", label: "离婚", category: "love", persistence: "one-time", stackable: false, cancels: ["married"], sortOrder: 8 },

  // ── 家庭 family ──
  { id: "pregnant", emoji: "🤰", label: "怀孕", category: "family", persistence: "one-time", stackable: false, sortOrder: 10 },
  { id: "baby", emoji: "👶", label: "生娃", category: "family", persistence: "persistent", stackable: true, sortOrder: 11 },
  { id: "baby_girl", emoji: "👧", label: "生女儿", category: "family", persistence: "persistent", stackable: true, sortOrder: 12 },
  { id: "baby_boy", emoji: "👦", label: "生儿子", category: "family", persistence: "persistent", stackable: true, sortOrder: 13 },
  { id: "loss", emoji: "🕯️", label: "丧亲", category: "family", persistence: "one-time", stackable: false, sortOrder: 14 },
  { id: "care_elderly", emoji: "🧓", label: "照顾长辈", category: "family", persistence: "persistent", stackable: false, sortOrder: 15 },

  // ── 学业 education ──
  { id: "school", emoji: "🎒", label: "入学", category: "education", persistence: "one-time", stackable: false, sortOrder: 20 },
  { id: "gaokao", emoji: "✏️", label: "高考", category: "education", persistence: "one-time", stackable: false, sortOrder: 21 },
  { id: "college", emoji: "🏫", label: "上大学", category: "education", persistence: "persistent", stackable: false, sortOrder: 22 },
  { id: "exam", emoji: "📝", label: "考试考证", category: "education", persistence: "one-time", stackable: true, sortOrder: 23 },
  { id: "graduation", emoji: "🎓", label: "毕业", category: "education", persistence: "one-time", stackable: true, sortOrder: 24 },
  { id: "study_abroad", emoji: "🌍", label: "留学", category: "education", persistence: "persistent", stackable: false, sortOrder: 25 },
  { id: "scholarship", emoji: "🏅", label: "获奖", category: "education", persistence: "one-time", stackable: true, sortOrder: 26 },

  // ── 事业 career ──
  { id: "intern", emoji: "🏢", label: "实习", category: "career", persistence: "one-time", stackable: false, sortOrder: 30 },
  { id: "first_job", emoji: "💼", label: "入职", category: "career", persistence: "one-time", stackable: false, sortOrder: 31 },
  { id: "job_change", emoji: "🔀", label: "跳槽", category: "career", persistence: "one-time", stackable: false, sortOrder: 32 },
  { id: "promotion", emoji: "📈", label: "升职加薪", category: "career", persistence: "one-time", stackable: true, sortOrder: 33 },
  { id: "startup", emoji: "🚀", label: "创业", category: "career", persistence: "persistent", stackable: false, sortOrder: 34 },
  { id: "freelance", emoji: "💻", label: "自由职业", category: "career", persistence: "persistent", stackable: false, sortOrder: 35 },
  { id: "resign", emoji: "🚪", label: "离职", category: "career", persistence: "one-time", stackable: false, sortOrder: 36 },

  // ── 生活 life ──
  { id: "house", emoji: "🏠", label: "买房", category: "life", persistence: "persistent", stackable: false, sortOrder: 40 },
  { id: "rent", emoji: "🔑", label: "租房搬家", category: "life", persistence: "one-time", stackable: true, sortOrder: 41 },
  { id: "car", emoji: "🚗", label: "买车", category: "life", persistence: "persistent", stackable: false, sortOrder: 42 },
  { id: "travel", emoji: "✈️", label: "旅行", category: "life", persistence: "one-time", stackable: true, sortOrder: 43 },
  { id: "move_city", emoji: "🏙️", label: "换城市", category: "life", persistence: "one-time", stackable: false, sortOrder: 44 },
  { id: "got_license", emoji: "🪪", label: "拿驾照", category: "life", persistence: "one-time", stackable: false, sortOrder: 45 },
  { id: "move_abroad", emoji: "🛫", label: "出国", category: "life", persistence: "one-time", stackable: false, sortOrder: 46 },

  // ── 宠物 pet ──
  { id: "dog", emoji: "🐶", label: "狗", category: "pet", persistence: "persistent", stackable: true, sortOrder: 50 },
  { id: "cat", emoji: "🐱", label: "猫", category: "pet", persistence: "persistent", stackable: true, sortOrder: 51 },
  { id: "rabbit", emoji: "🐰", label: "兔子", category: "pet", persistence: "persistent", stackable: true, sortOrder: 52 },
  { id: "hamster", emoji: "🐹", label: "仓鼠", category: "pet", persistence: "persistent", stackable: true, sortOrder: 53 },
  { id: "fish", emoji: "🐠", label: "鱼", category: "pet", persistence: "persistent", stackable: true, sortOrder: 54 },
  { id: "bird", emoji: "🦜", label: "鸟", category: "pet", persistence: "persistent", stackable: true, sortOrder: 55 },
  { id: "turtle", emoji: "🐢", label: "龟", category: "pet", persistence: "persistent", stackable: true, sortOrder: 56 },
  { id: "chicken", emoji: "🐔", label: "鸡", category: "pet", persistence: "persistent", stackable: true, sortOrder: 57 },
  { id: "duck", emoji: "🦆", label: "鸭", category: "pet", persistence: "persistent", stackable: true, sortOrder: 58 },
  { id: "goose", emoji: "🦢", label: "鹅", category: "pet", persistence: "persistent", stackable: true, sortOrder: 59 },
  { id: "snake", emoji: "🐍", label: "蛇", category: "pet", persistence: "persistent", stackable: true, sortOrder: 60 },
  { id: "horse", emoji: "🐴", label: "马", category: "pet", persistence: "persistent", stackable: true, sortOrder: 61 },
  { id: "pet_loss", emoji: "🌈", label: "宠物离世", category: "pet", persistence: "one-time", stackable: true, sortOrder: 62 },

  // ── 成长 growth ──
  { id: "fitness", emoji: "💪", label: "健身", category: "growth", persistence: "persistent", stackable: false, sortOrder: 70 },
  { id: "hobby", emoji: "🎨", label: "新爱好", category: "growth", persistence: "persistent", stackable: true, sortOrder: 71 },
  { id: "music", emoji: "🎵", label: "学音乐", category: "growth", persistence: "persistent", stackable: false, sortOrder: 72 },
  { id: "cooking", emoji: "🍳", label: "学做饭", category: "growth", persistence: "persistent", stackable: false, sortOrder: 73 },
  { id: "reading", emoji: "📚", label: "读书", category: "growth", persistence: "persistent", stackable: false, sortOrder: 74 },
  { id: "therapy", emoji: "🧠", label: "心理咨询", category: "growth", persistence: "persistent", stackable: false, sortOrder: 75 },

  // ── 低谷 hardship ──
  { id: "sick", emoji: "🏥", label: "生病住院", category: "hardship", persistence: "one-time", stackable: true, sortOrder: 80 },
  { id: "layoff", emoji: "⚡", label: "被裁员", category: "hardship", persistence: "one-time", stackable: false, sortOrder: 81 },
  { id: "accident", emoji: "🚑", label: "意外事故", category: "hardship", persistence: "one-time", stackable: false, sortOrder: 82 },
  { id: "depression", emoji: "🌧️", label: "低谷期", category: "hardship", persistence: "persistent", stackable: false, sortOrder: 83 },
];

export const EVENT_MAP = new Map(EVENT_CATALOG.map((e) => [e.id, e]));

export const CATEGORIES = [
  { id: "love" as const, label: "感情", icon: "💕" },
  { id: "family" as const, label: "家庭", icon: "👨‍👩‍👧" },
  { id: "education" as const, label: "学业", icon: "📚" },
  { id: "career" as const, label: "事业", icon: "💼" },
  { id: "life" as const, label: "生活", icon: "🏡" },
  { id: "pet" as const, label: "宠物", icon: "🐾" },
  { id: "growth" as const, label: "成长", icon: "🌱" },
  { id: "hardship" as const, label: "低谷", icon: "🌧️" },
];
