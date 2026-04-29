"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useKnitting } from "@/hooks/useKnitting";
import Overlay from "@/components/UI/Overlay";

// Import Scene dynamically to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/Canvas/Scene"), {
  ssr: false,
  loading: () => (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  ),
});

export default function Home() {
  const { 
    stitches, 
    cursor, 
    addStitch, 
    moveCursor, 
    exportToOBJ, 
    resetFabric, 
    fabricRef 
  } = useKnitting(20, 20);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          moveCursor(0, -1);
          break;
        case "s":
        case "arrowdown":
          moveCursor(0, 1);
          break;
        case "a":
        case "arrowleft":
          moveCursor(-1, 0);
          break;
        case "d":
        case "arrowright":
          moveCursor(1, 0);
          break;
        case " ":
        case "enter":
          e.preventDefault();
          addStitch("knit");
          break;
        case "p":
          addStitch("purl");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveCursor, addStitch]);

  return (
    <main>
      <Scene 
        stitches={stitches} 
        cursor={cursor} 
        fabricRef={fabricRef} 
      />
      
      <Overlay 
        onExport={exportToOBJ} 
        onReset={resetFabric} 
        onLoadTemplate={loadTemplate}
        stitchCount={stitches.length} 
      />
    </main>
  );
}
