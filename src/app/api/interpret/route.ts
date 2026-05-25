import { NextResponse } from "next/server";
import type { Timeline } from "@/types/timeline";
import { EVENT_MAP } from "@/lib/events";
import { computeTimeline } from "@/lib/accumulation";

const SYSTEM_PROMPT = `你是一个温暖而有洞察力的人生解读师。用户会给你一份用emoji时间线表示的人生经历。
请用一句话（20-30字）给出一个温暖、有洞察力、略带诗意的人生解读。
不要列举事件，而是抓住这段人生的核心主题或精神。
风格参考：像朋友在你回顾人生时说的那句让你心一暖的话。
只输出这一句话，不要加引号或其他标点。`;

function buildUserPrompt(timeline: Timeline): string {
  const rows = computeTimeline(timeline);
  const lines = rows
    .filter((r) => r.emojis.length > 0)
    .map((r) => {
      const yearEvents = timeline.years.find((y) => y.year === r.year);
      const labels = (yearEvents?.events ?? [])
        .map((e) => {
          const def = EVENT_MAP.get(e.eventId);
          return def ? `${def.emoji} ${def.label}` : "";
        })
        .filter(Boolean)
        .join("、");
      return `${r.year}: ${labels || r.emojis.join("")}`;
    });

  return `标题：${timeline.title}\n${lines.join("\n")}`;
}

export async function POST(req: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { interpretation: "" },
      { status: 200 }
    );
  }

  try {
    const timeline: Timeline = await req.json();
    const userPrompt = buildUserPrompt(timeline);

    const baseUrl = process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com/v1";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 100,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json({ interpretation: "" });
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content?.trim() ?? "";

    return NextResponse.json({ interpretation: content });
  } catch {
    return NextResponse.json({ interpretation: "" });
  }
}
