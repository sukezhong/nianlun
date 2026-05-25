import type { EventDefinition } from "@/types/timeline";

export const EVENT_CATALOG: EventDefinition[] = [
  // ── People ──
  {
    id: "dating",
    emoji: "👫",
    label: "恋爱",
    category: "people",
    persistence: "persistent",
    stackable: false,
    sortOrder: 1,
  },
  {
    id: "married",
    emoji: "💒",
    label: "结婚",
    category: "people",
    persistence: "persistent",
    stackable: false,
    cancels: ["dating"],
    sortOrder: 2,
  },
  {
    id: "baby",
    emoji: "👶",
    label: "宝宝",
    category: "people",
    persistence: "persistent",
    stackable: true,
    sortOrder: 3,
  },
  {
    id: "breakup",
    emoji: "💔",
    label: "分手",
    category: "people",
    persistence: "one-time",
    stackable: false,
    cancels: ["dating", "married"],
    sortOrder: 4,
  },

  // ── Lifestyle ──
  {
    id: "car",
    emoji: "🚗",
    label: "买车",
    category: "lifestyle",
    persistence: "persistent",
    stackable: false,
    sortOrder: 10,
  },
  {
    id: "house",
    emoji: "🏠",
    label: "买房",
    category: "lifestyle",
    persistence: "persistent",
    stackable: false,
    sortOrder: 11,
  },
  {
    id: "dog",
    emoji: "🐶",
    label: "养狗",
    category: "lifestyle",
    persistence: "persistent",
    stackable: true,
    sortOrder: 12,
  },
  {
    id: "cat",
    emoji: "🐱",
    label: "养猫",
    category: "lifestyle",
    persistence: "persistent",
    stackable: true,
    sortOrder: 13,
  },

  // ── Milestones ──
  {
    id: "graduation",
    emoji: "🎓",
    label: "毕业",
    category: "milestone",
    persistence: "one-time",
    stackable: false,
    sortOrder: 20,
  },
  {
    id: "job",
    emoji: "💼",
    label: "入职",
    category: "milestone",
    persistence: "one-time",
    stackable: false,
    sortOrder: 21,
  },
  {
    id: "travel",
    emoji: "✈️",
    label: "旅行",
    category: "milestone",
    persistence: "one-time",
    stackable: false,
    sortOrder: 22,
  },
  {
    id: "proposal",
    emoji: "💍",
    label: "求婚",
    category: "milestone",
    persistence: "one-time",
    stackable: false,
    sortOrder: 23,
  },
];

export const EVENT_MAP = new Map(EVENT_CATALOG.map((e) => [e.id, e]));

export const CATEGORIES = [
  { id: "people" as const, label: "人物", icon: "👥" },
  { id: "lifestyle" as const, label: "生活", icon: "🏡" },
  { id: "milestone" as const, label: "里程碑", icon: "🎯" },
];
