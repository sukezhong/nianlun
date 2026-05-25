export type EventPersistence = "persistent" | "one-time";

export type EventCategory =
  | "people"
  | "love"
  | "family"
  | "education"
  | "career"
  | "life"
  | "pet"
  | "growth"
  | "hardship";

export interface EventDefinition {
  id: string;
  emoji: string;
  label: string;
  category: EventCategory;
  persistence: EventPersistence;
  stackable: boolean;
  cancels?: string[];
  sortOrder: number;
}

export interface YearEvent {
  eventId: string;
  count: number;
}

export interface YearEntry {
  year: number;
  events: YearEvent[];
}

export interface Timeline {
  title: string;
  startYear: number;
  endYear: number;
  years: YearEntry[];
}

export interface ComputedYearRow {
  year: number;
  emojis: string[];
  newThisYear: string[];
}
