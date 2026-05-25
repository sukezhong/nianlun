import type {
  Timeline,
  ComputedYearRow,
  YearEvent,
} from "@/types/timeline";
import { EVENT_MAP } from "./events";

export function computeTimeline(timeline: Timeline): ComputedYearRow[] {
  const rows: ComputedYearRow[] = [];
  const accumulated = new Map<string, number>();

  for (let year = timeline.startYear; year <= timeline.endYear; year++) {
    const entry = timeline.years.find((y) => y.year === year);
    const yearEvents = entry?.events ?? [];
    const newThisYear: string[] = [];

    // Process cancellations first
    for (const ye of yearEvents) {
      const def = EVENT_MAP.get(ye.eventId);
      if (!def?.cancels) continue;
      for (const cancelId of def.cancels) {
        accumulated.delete(cancelId);
      }
    }

    // Add new events
    for (const ye of yearEvents) {
      const def = EVENT_MAP.get(ye.eventId);
      if (!def) continue;

      if (def.persistence === "persistent") {
        if (def.stackable) {
          const prev = accumulated.get(ye.eventId) ?? 0;
          accumulated.set(ye.eventId, prev + ye.count);
        } else {
          accumulated.set(ye.eventId, 1);
        }
      }

      const emoji = def.emoji;
      const count = def.persistence === "persistent"
        ? (def.stackable ? ye.count : 1)
        : ye.count;
      for (let i = 0; i < count; i++) {
        newThisYear.push(emoji);
      }
    }

    // Build the emoji sequence for this year
    const emojis: string[] = [];

    // Accumulated persistent events (sorted by sortOrder)
    const sortedAccumulated = [...accumulated.entries()]
      .map(([id, count]) => ({ def: EVENT_MAP.get(id)!, count }))
      .filter((e) => e.def)
      .sort((a, b) => a.def.sortOrder - b.def.sortOrder);

    for (const { def, count } of sortedAccumulated) {
      for (let i = 0; i < count; i++) {
        emojis.push(def.emoji);
      }
    }

    // One-time events for this year only
    const oneTimeEvents = yearEvents
      .map((ye) => ({ def: EVENT_MAP.get(ye.eventId)!, ...ye }))
      .filter((e) => e.def?.persistence === "one-time")
      .sort((a, b) => a.def.sortOrder - b.def.sortOrder);

    for (const { def, count } of oneTimeEvents) {
      for (let i = 0; i < count; i++) {
        emojis.push(def.emoji);
      }
    }

    rows.push({ year, emojis, newThisYear });
  }

  return rows;
}
