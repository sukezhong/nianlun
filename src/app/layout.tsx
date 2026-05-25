import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC, Josefin_Slab } from "next/font/google";
import "./globals.css";

const notoSansSC = Noto_Sans_SC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const josefinSlab = Josefin_Slab({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "年轮 — 一键生成你的N年",
  description: "用 emoji 时间线讲述你的人生故事，1 分钟生成可分享的精美图片",
  openGraph: {
    title: "年轮 — 一键生成你的N年",
    description: "用 emoji 时间线讲述你的人生故事",
    siteName: "年轮",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSansSC.variable} ${josefinSlab.variable}`}>
        {children}
      </body>
    </html>
  );
}
