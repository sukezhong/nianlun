"use client";

import type { YearEvent } from "@/types/timeline";
import { EVENT_MAP } from "@/lib/events";

interface YearRowProps {
  year: number;
  events: YearEvent[];
  onEdit: () => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

export default function YearRow({ year, events, onEdit, onMove }: YearRowProps) {
  const emojis: string[] = [];
  for (const ye of events) {
    const def = EVENT_MAP.get(ye.eventId);
    if (!def) continue;
    for (let i = 0; i < ye.count; i++) {
      emojis.push(def.emoji);
    }
  }

  return (
    <div style={{
      border: "1px solid #f0f0f0",
      borderRadius: 10,
      overflow: "hidden",
    }}>
      {/* Main row — tap to open picker */}
      <button
        onClick={onEdit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "8px 12px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
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

      {/* Reorder bar — only when 2+ events */}
      {events.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px 8px",
            borderTop: "1px solid #f5f5f5",
            background: "#fafafa",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          <span style={{ fontSize: 10, color: "#bbb", flexShrink: 0 }}>排序</span>
          {events.map((ye, idx) => {
            const def = EVENT_MAP.get(ye.eventId);
            if (!def) return null;
            return (
              <div key={ye.eventId} style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexShrink: 0,
              }}>
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => onMove(idx, idx - 1)}
                    style={{
                      width: 22,
                      height: 22,
                      fontSize: 11,
                      color: "#666",
                      background: "#eee",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ←
                  </button>
                )}
                <span style={{ fontSize: 20, padding: "0 2px" }}>
                  {def.emoji}
                </span>
                {idx < events.length - 1 && (
                  <button
                    type="button"
                    onClick={() => onMove(idx, idx + 1)}
                    style={{
                      width: 22,
                      height: 22,
                      fontSize: 11,
                      color: "#666",
                      background: "#eee",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
