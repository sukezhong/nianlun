"use client";

import { useState } from "react";
import { EVENT_CATALOG, CATEGORIES, EVENT_MAP } from "@/lib/events";
import type { EventCategory, YearEvent } from "@/types/timeline";

interface EventPickerProps {
  year: number;
  selectedEvents: YearEvent[];
  onAdd: (eventId: string) => void;
  onRemove: (eventId: string) => void;
  onClose: () => void;
}

export default function EventPicker({
  year,
  selectedEvents,
  onAdd,
  onRemove,
  onClose,
}: EventPickerProps) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("people");

  const categoryEvents = EVENT_CATALOG.filter((e) => e.category === activeCategory);

  function getCount(eventId: string): number {
    return selectedEvents.find((e) => e.eventId === eventId)?.count ?? 0;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: "16px 16px 0 0",
          padding: "20px 0 32px",
          maxHeight: "70vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          padding: "0 20px",
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>
            {year}年 · 发生了什么
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              fontSize: 13,
              color: "#999",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px",
            }}
          >
            完成
          </button>
        </div>

        {/* Category Tabs - horizontal scroll */}
        <div style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          padding: "0 20px",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          flexShrink: 0,
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "7px 14px",
                fontSize: 13,
                fontWeight: 500,
                border: "1px solid",
                borderColor: activeCategory === cat.id ? "#1a1a1a" : "#eee",
                background: activeCategory === cat.id ? "#1a1a1a" : "#fff",
                color: activeCategory === cat.id ? "#fff" : "#666",
                borderRadius: 20,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Event Grid - scrollable */}
        <div style={{
          padding: "0 20px",
          overflowY: "auto",
          flex: 1,
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
          }}>
            {categoryEvents.map((event) => {
              const count = getCount(event.id);
              const isActive = count > 0;
              const def = EVENT_MAP.get(event.id)!;

              return (
                <div key={event.id} style={{ textAlign: "center" }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isActive || def.stackable) {
                        onAdd(event.id);
                      } else {
                        onRemove(event.id);
                      }
                    }}
                    style={{
                      width: 56,
                      height: 56,
                      fontSize: 28,
                      border: "2px solid",
                      borderColor: isActive ? "#e07a7a" : "#f0f0f0",
                      background: isActive ? "#fff5f5" : "#fafafa",
                      borderRadius: 12,
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {event.emoji}
                    {count > 1 && (
                      <span style={{
                        position: "absolute",
                        top: -4,
                        right: -4,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "#e07a7a",
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {count}
                      </span>
                    )}
                  </button>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
                    {event.label}
                  </div>
                  {isActive && def.stackable && (
                    <button
                      type="button"
                      onClick={() => onRemove(event.id)}
                      style={{
                        fontSize: 10,
                        color: "#e07a7a",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginTop: 2,
                      }}
                    >
                      减少
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
