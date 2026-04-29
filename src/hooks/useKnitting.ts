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

export const TEMPLATES = {
  SQUARE: '작은 사각 직물',
  SCARF: '심플 목도리',
  COASTER: '컵 받침대',
};

export const useKnitting = (initialRows = 20, initialCols = 20) => {
  const [stitches, setStitches] = useState<Stitch[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const fabricRef = useRef<THREE.Group>(null);

  const addStitch = useCallback((type: 'knit' | 'purl' = 'knit') => {
    setStitches((prev) => {
      const exists = prev.find(s => s.x === cursor.x && s.y === cursor.y);
      let nextStitches = prev;
      
      if (!exists) {
        const newStitch: Stitch = {
          id: `${cursor.x}-${cursor.y}-${Date.now()}`,
          x: cursor.x,
          y: cursor.y,
          type,
          color: '#d946ef', // Default Magenta
        };
        nextStitches = [...prev, newStitch];
      }

      // Auto-advance cursor
      setCursor(curr => {
        let nextX = curr.x + 1;
        let nextY = curr.y;
        if (nextX >= initialCols) {
          nextX = 0;
          nextY = Math.min(initialRows - 1, curr.y + 1);
        }
        return { x: nextX, y: nextY };
      });

      return nextStitches;
    });
  }, [cursor, initialCols, initialRows]);

  const moveCursor = useCallback((dx: number, dy: number) => {
    setCursor(curr => ({
      x: Math.max(0, Math.min(initialCols - 1, curr.x + dx)),
      y: Math.max(0, Math.min(initialRows - 1, curr.y + dy)),
    }));
  }, [initialCols, initialRows]);

  const loadTemplate = useCallback((templateName: string) => {
    let newStitches: Stitch[] = [];
    let width = 0;
    let height = 0;

    switch (templateName) {
      case TEMPLATES.SQUARE:
        width = 10;
        height = 10;
        break;
      case TEMPLATES.SCARF:
        width = 8;
        height = 30;
        break;
      case TEMPLATES.COASTER:
        width = 12;
        height = 12;
        break;
      default:
        return;
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        newStitches.push({
          id: `${x}-${y}`,
          x,
          y,
          type: (x + y) % 2 === 0 ? 'knit' : 'purl',
          color: '#d946ef',
        });
      }
    }

    setStitches(newStitches);
    setCursor({ x: 0, y: height < initialRows ? height : 0 });
  }, [initialRows]);

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
    loadTemplate,
    exportToOBJ,
    resetFabric,
    fabricRef,
  };
};
