"use client";

import { useState } from "react";
import { EVENT_CATALOG, CATEGORIES, EVENT_MAP } from "@/lib/events";
import type { EventCategory, YearEvent } from "@/types/timeline";

interface EventPickerProps {
  year: number;
  timelineStartYear: number;
  timelineEndYear: number;
  selectedEvents: YearEvent[];
  onAdd: (eventId: string) => void;
  onRemove: (eventId: string) => void;
  onBatchAdd: (startYear: number, endYear: number, eventId: string) => void;
  onBatchRemove: (startYear: number, endYear: number, eventId: string) => void;
  onClose: () => void;
}

export default function EventPicker({
  year,
  timelineStartYear,
  timelineEndYear,
  selectedEvents,
  onAdd,
  onRemove,
  onBatchAdd,
  onBatchRemove,
  onClose,
}: EventPickerProps) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("people");
  const [rangeStart, setRangeStart] = useState(year);
  const [rangeEnd, setRangeEnd] = useState(year);

  const isRangeMode = rangeStart !== rangeEnd;
  const categoryEvents = EVENT_CATALOG.filter((e) => e.category === activeCategory);

  // Build year options for range selectors
  const yearOptions: number[] = [];
  for (let y = timelineStartYear; y <= timelineEndYear; y++) {
    yearOptions.push(y);
  }

  function getCount(eventId: string): number {
    return selectedEvents.find((e) => e.eventId === eventId)?.count ?? 0;
  }

  function handleAdd(eventId: string) {
    if (isRangeMode) {
      onBatchAdd(rangeStart, rangeEnd, eventId);
    } else {
      onAdd(eventId);
    }
  }

  function handleRemove(eventId: string) {
    if (isRangeMode) {
      onBatchRemove(rangeStart, rangeEnd, eventId);
    } else {
      onRemove(eventId);
    }
  }

  const headerText = isRangeMode
    ? `${rangeStart}-${rangeEnd}年 · 批量添加`
    : `${year}年 · 发生了什么`;

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
          marginBottom: 8,
          padding: "0 20px",
        }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>
            {headerText}
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

        {/* Range Selector */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 20px",
          marginBottom: 12,
        }}>
          <span style={{ fontSize: 12, color: "#999", flexShrink: 0 }}>时间段</span>
          <select
            value={rangeStart}
            onChange={(e) => {
              const v = Number(e.target.value);
              setRangeStart(v);
              if (v > rangeEnd) setRangeEnd(v);
            }}
            style={{
              flex: 1,
              padding: "6px 8px",
              fontSize: 13,
              border: "1px solid #eee",
              borderRadius: 6,
              outline: "none",
              color: "#1a1a1a",
              background: "#fff",
            }}
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <span style={{ color: "#ccc", fontSize: 12 }}>→</span>
          <select
            value={rangeEnd}
            onChange={(e) => {
              const v = Number(e.target.value);
              setRangeEnd(v);
              if (v < rangeStart) setRangeStart(v);
            }}
            style={{
              flex: 1,
              padding: "6px 8px",
              fontSize: 13,
              border: "1px solid #eee",
              borderRadius: 6,
              outline: "none",
              color: "#1a1a1a",
              background: "#fff",
            }}
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {isRangeMode && (
            <span style={{ fontSize: 11, color: "#e07a7a", flexShrink: 0 }}>
              {rangeEnd - rangeStart + 1}年
            </span>
          )}
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
                        handleAdd(event.id);
                      } else {
                        handleRemove(event.id);
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
                      onClick={() => handleRemove(event.id)}
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
