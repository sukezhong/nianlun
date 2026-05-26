"use client";

import { useState, useMemo, useRef } from "react";
import { useTimeline } from "@/hooks/use-timeline";
import { EVENT_MAP } from "@/lib/events";
import type { YearEvent } from "@/types/timeline";
import YearRow from "@/components/timeline/year-row";
import EventPicker from "@/components/timeline/event-picker";
import TimelineImage, { type TimelineImageHandle } from "@/components/timeline/timeline-image";

type Step = "setup" | "edit" | "preview";

function eventsToEmojis(events: YearEvent[]): string[] {
  const emojis: string[] = [];
  for (const ye of events) {
    const def = EVENT_MAP.get(ye.eventId);
    if (!def) continue;
    for (let i = 0; i < ye.count; i++) emojis.push(def.emoji);
  }
  return emojis;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 1969 }, (_, i) => 1970 + i);

export default function CreateWizard() {
  const { timeline, setTitle, setYears, addEvent, removeEvent, moveEvent } = useTimeline();
  const [step, setStep] = useState<Step>("setup");
  const [editingYear, setEditingYear] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState<string>("");
  const [interpreting, setInterpreting] = useState(false);
  const imageRef = useRef<TimelineImageHandle>(null);

  const rawRows = useMemo(() => {
    const rows: { year: number; emojis: string[] }[] = [];
    for (let y = timeline.startYear; y <= timeline.endYear; y++) {
      const entry = timeline.years.find((e) => e.year === y);
      rows.push({ year: y, emojis: eventsToEmojis(entry?.events ?? []) });
    }
    return rows;
  }, [timeline]);
  const hasEvents = timeline.years.some((y) => y.events.length > 0);

  async function fetchInterpretation() {
    if (interpreting || !hasEvents) return;
    setInterpreting(true);
    try {
      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(timeline),
      });
      if (res.ok) {
        const data = await res.json();
        setInterpretation(data.interpretation ?? "");
      }
    } catch {
      // non-blocking
    } finally {
      setInterpreting(false);
    }
  }

  // ── Step 1: Setup ──
  if (step === "setup") {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", padding: "32px 20px", maxWidth: 420, margin: "0 auto" }}>
        <a href="/" style={{ fontSize: 13, color: "#999", textDecoration: "none", marginBottom: 24 }}>
          ← 返回
        </a>

        <h2 style={{ fontSize: 18, fontWeight: 500, color: "#1a1a1a", marginBottom: 32 }}>
          创建你的年轮
        </h2>

        <label style={{ fontSize: 12, color: "#999", letterSpacing: "0.06em", fontWeight: 500, marginBottom: 8, display: "block" }}>
          标题
        </label>
        <input
          type="text"
          value={timeline.title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例：我们的十年"
          style={{
            width: "100%",
            padding: "12px 14px",
            fontSize: 15,
            border: "1px solid #eee",
            borderRadius: 8,
            outline: "none",
            marginBottom: 24,
            color: "#1a1a1a",
            boxSizing: "border-box",
          }}
        />

        <label style={{ fontSize: 12, color: "#999", letterSpacing: "0.06em", fontWeight: 500, marginBottom: 8, display: "block" }}>
          时间范围
        </label>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 32 }}>
          <select
            value={timeline.startYear}
            onChange={(e) => setYears(Number(e.target.value), timeline.endYear)}
            style={{
              flex: 1, padding: "12px 14px", fontSize: 15,
              border: "1px solid #eee", borderRadius: 8, outline: "none",
              color: "#1a1a1a", background: "#fff",
            }}
          >
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y} disabled={y >= timeline.endYear}>{y}</option>
            ))}
          </select>
          <span style={{ color: "#ccc", fontSize: 14 }}>→</span>
          <select
            value={timeline.endYear}
            onChange={(e) => setYears(timeline.startYear, Number(e.target.value))}
            style={{
              flex: 1, padding: "12px 14px", fontSize: 15,
              border: "1px solid #eee", borderRadius: 8, outline: "none",
              color: "#1a1a1a", background: "#fff",
            }}
          >
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y} disabled={y <= timeline.startYear}>{y}</option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: 13, color: "#bbb", marginBottom: 32, textAlign: "center" }}>
          共 {timeline.endYear - timeline.startYear + 1} 年
        </div>

        <button
          type="button"
          onClick={() => { setStep("edit"); }}
          style={{
            width: "100%",
            padding: "14px 0",
            background: timeline.title.trim() ? "#1a1a1a" : "#eee",
            color: timeline.title.trim() ? "#fff" : "#bbb",
            fontSize: 15,
            fontWeight: 500,
            border: "none",
            borderRadius: 8,
            cursor: timeline.title.trim() ? "pointer" : "default",
          }}
        >
          下一步
        </button>
      </main>
    );
  }

  // ── Step 2: Edit ──
  if (step === "edit") {
    const editingEntry = editingYear !== null
      ? timeline.years.find((y) => y.year === editingYear)
      : null;

    return (
      <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", padding: "32px 20px", maxWidth: 420, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <button
            type="button"
            onClick={() => setStep("setup")}
            style={{ fontSize: 13, color: "#999", background: "none", border: "none", cursor: "pointer" }}
          >
            ← 返回
          </button>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>
            {timeline.title}
          </span>
          <div style={{ width: 48 }} />
        </div>

        <p style={{ fontSize: 13, color: "#999", marginBottom: 16, textAlign: "center" }}>
          点击每一年，添加那年发生的事
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
          {Array.from(
            { length: timeline.endYear - timeline.startYear + 1 },
            (_, i) => timeline.startYear + i
          ).map((year) => {
            const entry = timeline.years.find((y) => y.year === year);
            return (
              <YearRow
                key={year}
                year={year}
                events={entry?.events ?? []}
                onEdit={() => setEditingYear(year)}
                onMove={(from, to) => moveEvent(year, from, to)}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => { setStep("preview"); fetchInterpretation(); }}
          style={{
            width: "100%",
            padding: "14px 0",
            background: hasEvents ? "#1a1a1a" : "#eee",
            color: hasEvents ? "#fff" : "#bbb",
            fontSize: 15,
            fontWeight: 500,
            border: "none",
            borderRadius: 8,
            cursor: hasEvents ? "pointer" : "default",
          }}
        >
          生成年轮
        </button>

        {editingYear !== null && (
          <EventPicker
            year={editingYear}
            selectedEvents={editingEntry?.events ?? []}
            onAdd={(eventId) => addEvent(editingYear, eventId)}
            onRemove={(eventId) => removeEvent(editingYear, eventId)}
            onClose={() => setEditingYear(null)}
          />
        )}
      </main>
    );
  }

  // ── Step 3: Preview ──
  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", padding: "32px 20px", maxWidth: 420, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <button
          type="button"
          onClick={() => setStep("edit")}
          style={{ fontSize: 13, color: "#999", background: "none", border: "none", cursor: "pointer" }}
        >
          ← 返回编辑
        </button>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>预览</span>
        <div style={{ width: 48 }} />
      </div>

      <div style={{
        background: "#fafafa", borderRadius: 12, padding: "28px 20px",
        border: "1px solid #f0f0f0", marginBottom: 16,
      }}>
        <div style={{ textAlign: "center", fontSize: 16, fontWeight: 500, color: "#1a1a1a", marginBottom: 20 }}>
          {timeline.title}
        </div>
        <div style={{ height: 1, background: "#eee", marginBottom: 16 }} />
        {rawRows.map((row) => (
          <div key={row.year} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#999", width: 36, textAlign: "right", flexShrink: 0 }}>
              {row.year}
            </span>
            <span style={{ fontSize: 22, lineHeight: 1.5 }}>
              {row.emojis.length > 0 ? row.emojis.join("") : "—"}
            </span>
          </div>
        ))}

        {interpreting && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <span style={{ fontSize: 12, color: "#ccc" }}>AI 解读中...</span>
          </div>
        )}
        {interpretation && (
          <>
            <div style={{ height: 1, background: "#eee", margin: "16px 0" }} />
            <p style={{ textAlign: "center", fontSize: 13, color: "#666", fontStyle: "italic", lineHeight: 1.8, margin: 0 }}>
              {interpretation}
            </p>
          </>
        )}
      </div>

      <TimelineImage ref={imageRef} title={timeline.title} rows={rawRows} interpretation={interpretation} />
    </main>
  );
}
