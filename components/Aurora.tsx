'use client';
import { useEffect, useRef } from 'react';

interface Layer {
  r: number; g: number; b: number;
  amp: number;
  freq: number;
  speed: number;
  yBase: number;
  ySwing: number;
  phase: number;
  opacity: number;
}

const LAYERS: Layer[] = [
  { r: 168, g: 85,  b: 247, amp: 0.14, freq: 0.0022, speed: 0.18, yBase: 0.22, ySwing: 0.07, phase: 0,   opacity: 0.18 },
  { r: 232, g: 121, b: 249, amp: 0.11, freq: 0.0028, speed: 0.26, yBase: 0.48, ySwing: 0.09, phase: 2.1, opacity: 0.13 },
  { r: 56,  g: 189, b: 248, amp: 0.09, freq: 0.0018, speed: 0.14, yBase: 0.72, ySwing: 0.06, phase: 4.3, opacity: 0.09 },
  { r: 124, g: 58,  b: 237, amp: 0.08, freq: 0.0032, speed: 0.32, yBase: 0.35, ySwing: 0.08, phase: 1.0, opacity: 0.10 },
];

export default function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawLayer = (layer: Layer) => {
      const W = canvas.width;
      const H = canvas.height;

      const yCenter = H * layer.yBase + Math.sin(t * layer.speed * 0.5 + layer.phase) * H * layer.ySwing;
      const bandH = H * layer.amp;

      const gradient = ctx.createLinearGradient(0, yCenter - bandH * 2.5, 0, yCenter + bandH * 2.5);
      gradient.addColorStop(0,    `rgba(${layer.r},${layer.g},${layer.b},0)`);
      gradient.addColorStop(0.35, `rgba(${layer.r},${layer.g},${layer.b},${layer.opacity})`);
      gradient.addColorStop(0.5,  `rgba(${layer.r},${layer.g},${layer.b},${layer.opacity * 1.3})`);
      gradient.addColorStop(0.65, `rgba(${layer.r},${layer.g},${layer.b},${layer.opacity})`);
      gradient.addColorStop(1,    `rgba(${layer.r},${layer.g},${layer.b},0)`);

      ctx.beginPath();
      ctx.moveTo(0, H + 10);

      for (let x = 0; x <= W + 4; x += 3) {
        const y = yCenter
          + Math.sin(x * layer.freq + t * layer.speed * 1.7) * bandH
          + Math.sin(x * layer.freq * 2.1 + t * layer.speed * 0.9 + 1.3) * bandH * 0.45
          + Math.sin(x * layer.freq * 0.6 + t * layer.speed * 2.3 + 2.7) * bandH * 0.28
          + Math.cos(x * layer.freq * 3.2 + t * layer.speed * 1.1 + 0.5) * bandH * 0.15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineTo(W + 4, H + 10);
      ctx.lineTo(0, H + 10);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    let last = 0;
    const frame = (ts: number) => {
      animId = requestAnimationFrame(frame);
      if (ts - last < 33) return; // ~30fps cap
      last = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      LAYERS.forEach(drawLayer);
      t += 0.004;
    };

    animId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
