"use client";

import type { YearEvent } from "@/types/timeline";
import { EVENT_MAP } from "@/lib/events";

interface YearRowProps {
  year: number;
  events: YearEvent[];
  onEdit: () => void;
}

export default function YearRow({ year, events, onEdit }: YearRowProps) {
  const emojis: string[] = [];
  for (const ye of events) {
    const def = EVENT_MAP.get(ye.eventId);
    if (!def) continue;
    for (let i = 0; i < ye.count; i++) {
      emojis.push(def.emoji);
    }
  }

  return (
    <button
      onClick={onEdit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "8px 12px",
        background: "none",
        border: "1px solid #f0f0f0",
        borderRadius: 10,
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color 0.15s",
        minHeight: 48,
      }}
    >
      <span style={{
        fontSize: 13,
        fontWeight: 600,
        color: "#1a1a1a",
        width: 40,
        textAlign: "right",
        flexShrink: 0,
      }}>
        {year}
      </span>

      <span style={{ flex: 1, fontSize: 22, lineHeight: 1.4, minHeight: 32 }}>
        {emojis.length > 0 ? emojis.join("") : (
          <span style={{ fontSize: 13, color: "#ccc" }}>点击添加事件 +</span>
        )}
      </span>
    </button>
  );
}
