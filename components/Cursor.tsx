'use client';
import { useEffect, useRef } from 'react';

const TRAIL = 7;

export default function Cursor() {
  const mainRef  = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mouse   = useRef({ x: -300, y: -300 });
  const target  = useRef({ x: -300, y: -300 });
  const cur     = useRef({ x: -300, y: -300 });
  const trail   = useRef(Array.from({ length: TRAIL }, () => ({ x: -300, y: -300 })));
  const hovRef  = useRef(false);
  const rafId   = useRef(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      const el  = document.elementFromPoint(e.clientX, e.clientY);
      const mag = el?.closest('[data-hover]') as HTMLElement | null;

      if (mag) {
        const r  = mag.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        target.current = {
          x: e.clientX + (cx - e.clientX) * 0.28,
          y: e.clientY + (cy - e.clientY) * 0.28,
        };
        if (!hovRef.current) {
          hovRef.current = true;
          mainRef.current?.classList.add('hov');
        }
      } else {
        target.current = { x: e.clientX, y: e.clientY };
        if (hovRef.current) {
          hovRef.current = false;
          mainRef.current?.classList.remove('hov');
        }
      }
    };

    const animate = () => {
      cur.current.x = lerp(cur.current.x, target.current.x, 0.13);
      cur.current.y = lerp(cur.current.y, target.current.y, 0.13);

      const isHov = hovRef.current;
      const size  = isHov ? 46 : 28;

      if (mainRef.current) {
        mainRef.current.style.left   = `${cur.current.x - size / 2}px`;
        mainRef.current.style.top    = `${cur.current.y - size / 2}px`;
        mainRef.current.style.width  = `${size}px`;
        mainRef.current.style.height = `${size}px`;
      }

      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x - 3}px`;
        dotRef.current.style.top  = `${mouse.current.y - 3}px`;
        dotRef.current.style.opacity = isHov ? '0' : '1';
      }

      let prev = cur.current;
      trail.current.forEach((pos, i) => {
        const lag = Math.max(0.04, 0.26 - i * 0.025);
        pos.x = lerp(pos.x, prev.x, lag);
        pos.y = lerp(pos.y, prev.y, lag);

        const el = trailRefs.current[i];
        if (el) {
          const s = Math.max(4, (9 - i * 1.1)) * (isHov ? 1.2 : 1);
          el.style.left    = `${pos.x - s / 2}px`;
          el.style.top     = `${pos.y - s / 2}px`;
          el.style.width   = `${s}px`;
          el.style.height  = `${s}px`;
          el.style.opacity = `${((TRAIL - i) / TRAIL) * (isHov ? 0.55 : 0.45)}`;
        }
        prev = pos;
      });

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* SVG goo / liquid merge filter */}
      <svg style={{ position: 'fixed', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Goo container — all blobs inside merge into liquid */}
      <div
        style={{
          position: 'fixed', inset: 0,
          pointerEvents: 'none', zIndex: 9998,
          filter: 'url(#goo)',
          mixBlendMode: 'screen',
        }}
      >
        {/* Main blob */}
        <div
          ref={mainRef}
          className="cursor-blob"
          style={{
            position: 'fixed',
            borderRadius: '50%',
            background: 'rgba(168,85,247,0.92)',
            transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s',
          }}
        />

        {/* Trail blobs */}
        {Array.from({ length: TRAIL }).map((_, i) => (
          <div
            key={i}
            ref={el => { trailRefs.current[i] = el; }}
            style={{
              position: 'fixed',
              borderRadius: '50%',
              background: i < 3 ? 'rgba(232,121,249,0.85)' : 'rgba(168,85,247,0.8)',
              transition: 'opacity 0.2s',
            }}
          />
        ))}
      </div>

      {/* Sharp dot (exact mouse position, no goo) */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', width: 6, height: 6, borderRadius: '50%',
          background: '#fff',
          pointerEvents: 'none', zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'opacity 0.2s',
        }}
      />

      <style>{`
        .cursor-blob.hov {
          background: rgba(232,121,249,0.95) !important;
        }
        @media (max-width: 768px) {
          body { cursor: auto !important; }
        }
      `}</style>
    </>
  );
}
