"use client";

import { useRef, useState, forwardRef, useImperativeHandle } from "react";
interface MergedRow {
  startYear: number;
  endYear: number;
  emojis: string[];
}

interface TimelineImageProps {
  title: string;
  rows: MergedRow[];
  interpretation?: string;
}

export interface TimelineImageHandle {
  capture: () => Promise<void>;
}

const TimelineImage = forwardRef<TimelineImageHandle, TimelineImageProps>(
  function TimelineImage({ title, rows, interpretation }, ref) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<"idle" | "generating" | "done">("idle");

    useImperativeHandle(ref, () => ({
      capture: handleCapture,
    }));

    async function handleCapture() {
      if (!cardRef.current || status === "generating") return;
      setStatus("generating");

      try {
        const html2canvas = (await import("html2canvas")).default;
        const canvas = await html2canvas(cardRef.current, {
          scale: 3,
          backgroundColor: "#ffffff",
          useCORS: true,
        });

        if (navigator.share && navigator.canShare) {
          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, "image/png")
          );
          if (blob) {
            const file = new File([blob], `年轮-${title || "我的年轮"}.png`, {
              type: "image/png",
            });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({ files: [file] });
              setStatus("done");
              return;
            }
          }
        }

        const link = document.createElement("a");
        link.download = `年轮-${title || "我的年轮"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        setStatus("done");
      } catch {
        setStatus("idle");
      }
    }

    return (
      <div>
        {/* Hidden render target for image capture — uses inline styles only */}
        <div
          ref={cardRef}
          style={{
            width: 360,
            background: "#ffffff",
            padding: "48px 28px 36px",
            position: "absolute",
            left: -9999,
            top: 0,
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              fontFamily: "'Josefin Slab', serif",
              fontSize: 18,
              fontWeight: 300,
              letterSpacing: "0.06em",
              color: "#1a1a1a",
            }}>
              年轮
            </div>
            <div style={{
              fontSize: 9,
              color: "#ddd",
              letterSpacing: "0.12em",
              marginTop: 4,
            }}>
              NIANLUN
            </div>
          </div>

          {/* Title */}
          <div style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: 500,
            color: "#1a1a1a",
            marginBottom: 24,
          }}>
            {title || "我的年轮"}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#f0f0f0", marginBottom: 20 }} />

          {/* Timeline rows */}
          <div style={{ marginBottom: 20 }}>
            {rows.map((row) => {
              const yearLabel = row.startYear === row.endYear
                ? `${row.startYear}`
                : `${row.startYear}-${row.endYear}`;
              return (
                <div
                  key={row.startYear}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <span style={{
                    fontSize: row.startYear === row.endYear ? 12 : 10,
                    fontWeight: 600,
                    color: "#999",
                    width: 56,
                    textAlign: "right",
                    flexShrink: 0,
                  }}>
                    {yearLabel}
                  </span>
                  <span style={{ fontSize: 22, lineHeight: 1.5 }}>
                    {row.emojis.join("")}
                  </span>
                </div>
              );
            })}
          </div>

          {/* AI Interpretation */}
          {interpretation && (
            <>
              <div style={{ height: 1, background: "#f0f0f0", marginBottom: 16 }} />
              <div style={{
                textAlign: "center",
                fontSize: 13,
                color: "#666",
                lineHeight: 1.8,
                fontStyle: "italic",
                padding: "0 8px",
              }}>
                {interpretation}
              </div>
            </>
          )}

          {/* Divider */}
          <div style={{ height: 1, background: "#f0f0f0", margin: "20px 0 16px" }} />

          {/* Footer watermark */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#ccc", letterSpacing: "0.04em" }}>
              扫码生成你的年轮
            </div>
            <div style={{ fontSize: 9, color: "#ddd", letterSpacing: "0.02em", marginTop: 4 }}>
              nianlun.earthonline.site
            </div>
          </div>
        </div>

        {/* Share button */}
        <button
          onClick={handleCapture}
          disabled={status === "generating"}
          style={{
            width: "100%",
            padding: "14px 0",
            background: status === "done" ? "#fff" : "#1a1a1a",
            color: status === "done" ? "#1a1a1a" : "#fff",
            border: status === "done" ? "1px solid #1a1a1a" : "none",
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: "0.04em",
            borderRadius: 8,
            cursor: status === "generating" ? "wait" : "pointer",
            transition: "all 0.2s",
          }}
        >
          {status === "generating"
            ? "生成中..."
            : status === "done"
              ? "已保存 ✓ 再次下载"
              : "保存图片"}
        </button>
      </div>
    );
  }
);

export default TimelineImage;
