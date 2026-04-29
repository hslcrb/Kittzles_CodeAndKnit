"use client";

import * as THREE from 'three';

/**
 * Procedurally generates a yarn-like texture for knitting stitches.
 */
export const generateYarnTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  // 1. Base Color (Wooly Background)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 512);

  // 2. Add fine fibers (noise)
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const length = Math.random() * 10 + 5;
    const angle = Math.random() * Math.PI * 2;

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }

  // 3. Add twist pattern (repeating diagonal lines)
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 4;
  for (let i = -512; i < 512; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 512, 512);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  return texture;
};

/**
 * Procedurally generates a normal map for yarn.
 */
export const generateYarnNormalMap = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  // Normal map neutral color (RGB: 128, 128, 255)
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, 512, 512);

  // Add fiber bumps
  for (let i = -512; i < 512; i += 16) {
    const gradient = ctx.createLinearGradient(i, 0, i + 16, 0);
    gradient.addColorStop(0, 'rgb(100, 128, 255)');
    gradient.addColorStop(0.5, 'rgb(128, 128, 255)');
    gradient.addColorStop(1, 'rgb(150, 128, 255)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(i, 0, 16, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  return texture;
};
