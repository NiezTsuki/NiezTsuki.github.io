'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコ0123456789#@$%';

function ScrambleText({ text, running, className, style }: {
  text: string;
  running: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [displayed, setDisplayed] = useState(() =>
    text.split('').map(c => (c === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])).join('')
  );

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const revealTo = Math.floor(frame * 1.4);
      setDisplayed(
        text.split('').map((char, i) => {
          if (char === ' ' || char === '/' || char === '.') return char;
          if (i < revealTo) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join('')
      );
      if (revealTo >= text.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [text, running]);

  return <span className={className} style={style}>{displayed}</span>;
}

const BOOT_LINES = [
  '> Verificando módulos del sistema...',
  '> Compilando proyectos...',
  '> Estableciendo conexiones...',
  '> Todo listo. Iniciando...',
];

function CornerBracket({ t, r, b, l }: { t?: boolean; r?: boolean; b?: boolean; l?: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      top: t !== undefined ? 24 : undefined,
      bottom: b !== undefined ? 24 : undefined,
      left: l !== undefined ? 24 : undefined,
      right: r !== undefined ? 24 : undefined,
      width: 22, height: 22,
      borderTop: t ? '1.5px solid rgba(168,85,247,0.45)' : 'none',
      borderBottom: b ? '1.5px solid rgba(168,85,247,0.45)' : 'none',
      borderLeft: l ? '1.5px solid rgba(168,85,247,0.45)' : 'none',
      borderRight: r ? '1.5px solid rgba(168,85,247,0.45)' : 'none',
    }} />
  );
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => { if (!cancelled) setStarted(true); }, 300));

    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        if (!cancelled) setBootLines(prev => prev.includes(line) ? prev : [...prev, line]);
      }, 500 + i * 520));
    });

    let p = 0;
    const id = setInterval(() => {
      if (cancelled) { clearInterval(id); return; }
      p += Math.random() * 2.5 + 0.6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        timers.push(setTimeout(() => { if (!cancelled) setVisible(false); }, 500));
        timers.push(setTimeout(() => { if (!cancelled) onComplete(); }, 1050));
      }
      setProgress(p);
    }, 28);

    return () => {
      cancelled = true;
      clearInterval(id);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'var(--bg)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Radial bg glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Noise overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.25,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
            pointerEvents: 'none',
          }} />

          {/* Spinning rings */}
          {[320, 230, 160].map((size, i) => (
            <motion.div
              key={size}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 5 + i * 3, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: size, height: size,
                borderRadius: '50%',
                border: `1px solid rgba(168,85,247,${0.06 + i * 0.04})`,
                borderTopColor: i === 0 ? 'rgba(168,85,247,0.7)' : i === 1 ? 'rgba(232,121,249,0.65)' : 'rgba(56,189,248,0.6)',
              }}
            />
          ))}

          {/* Center pulse dot */}
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', width: 8, height: 8, borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 16px var(--accent), 0 0 40px rgba(232,121,249,0.5)',
            }}
          />

          {/* Text block */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <h1 style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 'clamp(1.3rem, 4vw, 2rem)',
                fontWeight: 400,
                letterSpacing: '0.45em',
                color: 'var(--text)',
                marginBottom: '8px',
              }}>
                <ScrambleText text="DANIEL JOFRE" running={started} />
              </h1>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.68rem',
                color: 'var(--accent2)',
                letterSpacing: '0.28em',
                marginBottom: '52px',
              }}>
                <ScrambleText text="// FULL STACK ENGINEER" running={started && progress > 15} />
              </p>
            </motion.div>

            {/* Progress bar */}
            <div style={{ width: 'min(320px, 80vw)', margin: '0 auto' }}>
              <div style={{
                height: '1px',
                background: 'rgba(168,85,247,0.12)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '20px',
              }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.08 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--primary-glow), var(--primary), var(--accent))',
                    boxShadow: '0 0 10px rgba(168,85,247,0.9), 0 0 20px rgba(168,85,247,0.4)',
                  }}
                />
                {/* Glow head */}
                <motion.div
                  animate={{ left: `${progress}%` }}
                  transition={{ duration: 0.08 }}
                  style={{
                    position: 'absolute', top: -3, width: 6, height: 6,
                    borderRadius: '50%', background: 'var(--accent)',
                    boxShadow: '0 0 8px var(--accent)',
                    transform: 'translateX(-50%)',
                  }}
                />
              </div>

              {/* Boot lines */}
              <div style={{ textAlign: 'left', minHeight: '72px' }}>
                <AnimatePresence>
                  {bootLines.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.62rem',
                        color: i === bootLines.length - 1 ? 'var(--accent2)' : 'rgba(124,111,154,0.6)',
                        marginBottom: '5px',
                        lineHeight: 1.5,
                      }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </AnimatePresence>
              </div>

              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.6rem',
                color: 'rgba(168,85,247,0.45)',
                letterSpacing: '3px',
                marginTop: '14px',
                textAlign: 'right',
              }}>
                {Math.floor(progress).toString().padStart(3, '0')}%
              </p>
            </div>
          </div>

          {/* Corner brackets */}
          <CornerBracket t l />
          <CornerBracket t r />
          <CornerBracket b l />
          <CornerBracket b r />

          {/* Horizontal scanline */}
          <motion.div
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.25), transparent)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
