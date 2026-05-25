import Link from "next/link";

const EXAMPLE_ROWS = [
  { year: 2016, emojis: ["👫"] },
  { year: 2017, emojis: ["👫", "🎓"] },
  { year: 2018, emojis: ["👫", "💼"] },
  { year: 2019, emojis: ["👫", "💍"] },
  { year: 2020, emojis: ["💒", "🚗"] },
  { year: 2021, emojis: ["💒", "🚗", "🏠"] },
  { year: 2022, emojis: ["💒", "🚗", "🏠", "👶"] },
  { year: 2023, emojis: ["💒", "🚗", "🏠", "👶", "🐶"] },
  { year: 2024, emojis: ["💒", "🚗", "🏠", "👶", "🐶", "👶"] },
  { year: 2025, emojis: ["💒", "🚗", "🏠", "👶", "🐶", "👶", "🐱"] },
];

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col items-center px-5 py-12 safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl font-light tracking-wider mb-2" style={{ color: "#1a1a1a" }}>
          年轮
        </h1>
        <p style={{ fontSize: 12, color: "#ccc", letterSpacing: "0.1em" }}>
          NIANLUN
        </p>
      </div>

      {/* Tagline */}
      <p className="text-center mb-8" style={{ fontSize: 15, color: "#666", maxWidth: 280 }}>
        用 emoji 时间线讲述你的人生故事
        <br />
        <span style={{ color: "#999", fontSize: 13 }}>1 分钟生成，一键分享</span>
      </p>

      {/* Example Preview */}
      <div
        className="w-full mb-10"
        style={{
          maxWidth: 340,
          background: "#fafafa",
          borderRadius: 12,
          padding: "24px 20px",
          border: "1px solid #f0f0f0",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 16, textAlign: "center" }}>
          我们的十年 ✨
        </div>
        {EXAMPLE_ROWS.map((row) => (
          <div key={row.year} style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}>
            <span style={{
              fontSize: 12,
              color: "#999",
              fontWeight: 500,
              width: 40,
              textAlign: "right",
              flexShrink: 0,
            }}>
              {row.year}
            </span>
            <span style={{ fontSize: 20, lineHeight: 1.4 }}>
              {row.emojis.join("")}
            </span>
          </div>
        ))}
      </div>

      {/* Value Prop */}
      <div className="text-center mb-10" style={{ maxWidth: 300 }}>
        <div className="flex justify-center gap-6 mb-4">
          {[
            { icon: "🎯", text: "选事件" },
            { icon: "✨", text: "自动排" },
            { icon: "📸", text: "出美图" },
          ].map((step) => (
            <div key={step.text} className="text-center">
              <div style={{ fontSize: 24, marginBottom: 4 }}>{step.icon}</div>
              <div style={{ fontSize: 12, color: "#999" }}>{step.text}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "#bbb" }}>
          不用在备忘录里手动排 emoji 了
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/create"
        className="block text-center"
        style={{
          width: "100%",
          maxWidth: 300,
          padding: "14px 0",
          background: "#1a1a1a",
          color: "#fff",
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: "0.04em",
          borderRadius: 8,
          textDecoration: "none",
        }}
      >
        创建你的年轮
      </Link>

      {/* Footer */}
      <div className="mt-auto pt-12 text-center">
        <div style={{ fontSize: 10, color: "#ddd", letterSpacing: "0.04em" }}>
          nianlun.earthonline.site
        </div>
      </div>
    </main>
  );
}
