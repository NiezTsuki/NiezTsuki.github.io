'use client';
import { useEffect, useRef } from 'react';

interface P {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    const mouse = { x: -1000, y: -1000 };
    let scrollY = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove  = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    const make = (): P => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.45 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.012 + Math.random() * 0.018,
    });

    const particles: P[] = Array.from({ length: 75 }, make);
    const LINE_DIST = 110;
    const REPEL_DIST = 130;

    let last = 0;
    const frame = (ts: number) => {
      animId = requestAnimationFrame(frame);
      if (ts - last < 33) return; // ~30fps cap
      last = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fade out as user scrolls down
      const fadeFactor = Math.max(0, 1 - scrollY / (canvas.height * 0.8));
      if (fadeFactor <= 0.01) {
        animId = requestAnimationFrame(frame);
        return;
      }

      particles.forEach((p, i) => {
        // Pulse opacity
        p.pulse += p.pulseSpeed;
        const op = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse)) * fadeFactor;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_DIST && dist > 0) {
          const force = (REPEL_DIST - dist) / REPEL_DIST;
          p.vx += (dx / dist) * force * 0.6;
          p.vy += (dy / dist) * force * 0.6;
        }

        // Dampen velocity
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Clamp speed
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.2) { p.vx = (p.vx / spd) * 1.2; p.vy = (p.vy / spd) * 1.2; }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges with padding
        if (p.x < -20) p.x = canvas.width  + 20;
        if (p.x > canvas.width  + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${op})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j];
          const ddx = p.x - o.x;
          const ddy = p.y - o.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < LINE_DIST) {
            const alpha = (1 - d / LINE_DIST) * 0.18 * fadeFactor;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

    };

    animId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    />
  );
}
