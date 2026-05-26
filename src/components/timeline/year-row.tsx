"use client";

import { useRef, useState, useCallback } from "react";
import type { YearEvent } from "@/types/timeline";
import { EVENT_MAP } from "@/lib/events";

interface YearRowProps {
  year: number;
  events: YearEvent[];
  onEdit: () => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

export default function YearRow({ year, events, onEdit, onMove }: YearRowProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dragStartX = useRef(0);
  const dragIndexRef = useRef<number | null>(null);
  const isDragging = useRef(false);

  // Build display items at event level (not flattened)
  const displayItems = events
    .map((ye) => {
      const def = EVENT_MAP.get(ye.eventId);
      if (!def) return null;
      return { emoji: def.emoji, eventId: ye.eventId, count: ye.count };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const getIndexAtX = useCallback((clientX: number) => {
    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const mid = rect.left + rect.width / 2;
      if (clientX < mid) return i;
    }
    return itemRefs.current.length - 1;
  }, []);

  function handleDragStart(idx: number, clientX: number) {
    dragStartX.current = clientX;
    dragIndexRef.current = idx;
    isDragging.current = false;
    setDragIndex(idx);
    setOverIndex(idx);
  }

  function handleDragMove(clientX: number) {
    // Use ref to avoid stale closure issue
    if (dragIndexRef.current === null) return;
    if (!isDragging.current && Math.abs(clientX - dragStartX.current) > 5) {
      isDragging.current = true;
    }
    if (isDragging.current) {
      setOverIndex(getIndexAtX(clientX));
    }
  }

  function handleDragEnd() {
    const from = dragIndexRef.current;
    if (from !== null && overIndex !== null && from !== overIndex && isDragging.current) {
      onMove(from, overIndex);
    }
    dragIndexRef.current = null;
    setDragIndex(null);
    setOverIndex(null);
    isDragging.current = false;
  }

  // No events — simple button
  if (displayItems.length === 0) {
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
          minHeight: 48,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", width: 40, textAlign: "right", flexShrink: 0 }}>
          {year}
        </span>
        <span style={{ fontSize: 13, color: "#ccc" }}>点击添加事件 +</span>
      </button>
    );
  }

  // Has events — draggable row
  return (
    <div
      ref={rowRef}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "8px 12px",
        border: "1px solid #f0f0f0",
        borderRadius: 10,
        minHeight: 48,
        touchAction: "pan-y",
      }}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <span
        onClick={onEdit}
        style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", width: 40, textAlign: "right", flexShrink: 0, cursor: "pointer" }}
      >
        {year}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        {displayItems.map((item, idx) => {
          const beingDragged = dragIndex === idx && isDragging.current;
          const isDropTarget = overIndex === idx && dragIndex !== null && isDragging.current && dragIndex !== idx;

          // Render repeated emojis for count > 1
          const emojiText = item.count > 1
            ? Array(item.count).fill(item.emoji).join("")
            : item.emoji;

          return (
            <span
              key={`${item.eventId}-${idx}`}
              ref={(el) => { itemRefs.current[idx] = el; }}
              onMouseDown={(e) => { e.preventDefault(); handleDragStart(idx, e.clientX); }}
              onTouchStart={(e) => handleDragStart(idx, e.touches[0].clientX)}
              style={{
                fontSize: 22,
                lineHeight: 1.4,
                padding: "2px 3px",
                borderRadius: 6,
                cursor: "grab",
                userSelect: "none",
                WebkitUserSelect: "none",
                opacity: beingDragged ? 0.4 : 1,
                background: isDropTarget ? "#e8f0fe" : "transparent",
                transition: "background 0.15s, opacity 0.15s",
              }}
            >
              {emojiText}
            </span>
          );
        })}

        {/* Add button */}
        <span
          onClick={onEdit}
          style={{
            fontSize: 16,
            color: "#ccc",
            cursor: "pointer",
            padding: "2px 6px",
            marginLeft: 4,
          }}
        >
          +
        </span>
      </div>
    </div>
  );
}
