"use client";

import type { ComputedYearRow } from "@/types/timeline";

interface YearRowProps {
  row: ComputedYearRow;
  onEdit: () => void;
}

export default function YearRow({ row, onEdit }: YearRowProps) {
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
        {row.year}
      </span>

      <span style={{ flex: 1, fontSize: 22, lineHeight: 1.4, minHeight: 32 }}>
        {row.emojis.length > 0 ? row.emojis.join("") : (
          <span style={{ fontSize: 13, color: "#ccc" }}>点击添加事件 +</span>
        )}
      </span>
    </button>
  );
}
