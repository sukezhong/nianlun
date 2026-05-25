"use client";

import { useState, useEffect } from "react";
import CreateWizard from "@/components/timeline/create-wizard";

export default function CreatePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <main style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 13, color: "#ccc" }}>加载中...</span>
      </main>
    );
  }

  return <CreateWizard />;
}
