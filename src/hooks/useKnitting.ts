"use client";

import { useState, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js';

export interface Stitch {
  id: string;
  x: number;
  y: number;
  type: 'knit' | 'purl';
  color: string;
}

export const useKnitting = (initialRows = 10, initialCols = 10) => {
  const [stitches, setStitches] = useState<Stitch[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const fabricRef = useRef<THREE.Group>(null);

  const addStitch = useCallback((type: 'knit' | 'purl' = 'knit') => {
    setStitches((prev) => {
      const exists = prev.find(s => s.x === cursor.x && s.y === cursor.y);
      if (exists) return prev;

      const newStitch: Stitch = {
        id: `${cursor.x}-${cursor.y}`,
        x: cursor.x,
        y: cursor.y,
        type,
        color: '#f0abfc', // Default accent color
      };

      // Move cursor to next position
      setCursor(curr => {
        let nextX = curr.x + 1;
        let nextY = curr.y;
        if (nextX >= initialCols) {
          nextX = 0;
          nextY = curr.y + 1;
        }
        return { x: nextX, y: nextY };
      });

      return [...prev, newStitch];
    });
  }, [cursor, initialCols]);

  const moveCursor = useCallback((dx: number, dy: number) => {
    setCursor(curr => ({
      x: Math.max(0, Math.min(initialCols - 1, curr.x + dx)),
      y: Math.max(0, Math.min(initialRows - 1, curr.y + dy)),
    }));
  }, [initialCols, initialRows]);

  const exportToOBJ = useCallback(() => {
    if (!fabricRef.current) return;
    
    const exporter = new OBJExporter();
    const result = exporter.parse(fabricRef.current);
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kittzles_creation.obj';
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  const resetFabric = useCallback(() => {
    setStitches([]);
    setCursor({ x: 0, y: 0 });
  }, []);

  return {
    stitches,
    cursor,
    addStitch,
    moveCursor,
    exportToOBJ,
    resetFabric,
    fabricRef,
  };
};
