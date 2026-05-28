'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Orbit data ── */
const INNER: { name: string; color: string }[] = [
  { name: 'Next.js',    color: '#ffffff' },
  { name: 'TypeScript', color: '#3b82f6' },
  { name: 'Node.js',    color: '#22c55e' },
  { name: 'React',      color: '#38bdf8' },
];

const OUTER: { name: string; color: string }[] = [
  { name: 'PostgreSQL',    color: '#60a5fa' },
  { name: 'Prisma',        color: '#a78bfa' },
  { name: 'Stripe',        color: '#818cf8' },
  { name: 'React Native',  color: '#38bdf8' },
  { name: 'TailwindCSS',   color: '#06b6d4' },
  { name: 'Docker',        color: '#2563eb' },
];

/* ── Skill bars ── */
const SKILL_GROUPS = [
  {
    label: 'Frontend',
    color: '#a855f7',
    skills: [
      { name: 'Next.js / React', pct: 95 },
      { name: 'TypeScript',      pct: 92 },
      { name: 'TailwindCSS',     pct: 90 },
      { name: 'Framer Motion',   pct: 85 },
    ],
  },
  {
    label: 'Backend',
    color: '#38bdf8',
    skills: [
      { name: 'Node.js / Express', pct: 93 },
      { name: 'PostgreSQL / Prisma', pct: 88 },
      { name: 'WebSockets / REST', pct: 87 },
      { name: 'Docker / CI-CD',    pct: 78 },
    ],
  },
];

/* ── CSS orbital animation ── */
const ORBIT_CSS = `
@keyframes orbit-cw {
  from { transform: rotate(0deg)   translateX(var(--r)) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(var(--r)) rotate(-360deg); }
}
@keyframes orbit-ccw {
  from { transform: rotate(360deg)  translateX(var(--r)) rotate(-360deg); }
  to   { transform: rotate(0deg)   translateX(var(--r)) rotate(0deg); }
}
`;

function OrbitBadge({
  name, color, index, total, radius, duration, direction,
}: {
  name: string; color: string; index: number; total: number;
  radius: number; duration: number; direction: 'cw' | 'ccw';
}) {
  const startDeg = (index / total) * 360;
  const anim = direction === 'cw' ? 'orbit-cw' : 'orbit-ccw';

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%', top: '50%',
        width: 0, height: 0,
        ['--r' as string]: `${radius}px`,
        animation: `${anim} ${duration}s linear infinite`,
        animationDelay: `-${(index / total) * duration}s`,
      }}
    >
      <div style={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        padding: '5px 13px',
        borderRadius: 100,
        background: 'rgba(10,6,24,0.92)',
        border: `1px solid ${color}45`,
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.68rem',
        color,
        whiteSpace: 'nowrap',
        boxShadow: `0 0 14px ${color}20`,
        backdropFilter: 'blur(8px)',
      }}>
        {name}
      </div>
    </div>
  );
}

function SkillBar({ name, pct, color, delay }: { name: string; pct: number; color: string; delay: number }) {
  const ref  = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'var(--text)' }}>{name}</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color }}>{pct}%</span>
      </div>
      <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={seen ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}80`,
            borderRadius: 2,
            position: 'relative',
          }}
        >
          {/* Shimmer head */}
          <motion.div
            animate={seen ? { left: ['0%', '100%'] } : {}}
            transition={{ duration: 0.6, delay: delay + 0.9 }}
            style={{
              position: 'absolute', top: -2, width: 4, height: 6,
              borderRadius: 3, background: '#fff',
              boxShadow: `0 0 8px ${color}`,
              transform: 'translateX(-50%)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const headRef = useRef(null);
  const inView  = useInView(headRef, { once: true, margin: '-80px' });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="skills" style={{ padding: '120px 8%', position: 'relative', overflow: 'hidden' }}>
      <style>{ORBIT_CSS}</style>

      {/* Background glows */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Section heading */}
      <div ref={headRef} style={{ textAlign: 'center', marginBottom: 80, position: 'relative', zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'var(--accent2)', marginBottom: 14, letterSpacing: '3px', textTransform: 'uppercase' }}
        >
          // Tecnologías
        </motion.p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 1, width: 80, background: 'linear-gradient(90deg, transparent, var(--border))', transformOrigin: 'right' }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-1px' }}
          >
            Stack <span className="grad-text">técnico</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 1, width: 80, background: 'linear-gradient(90deg, var(--border), transparent)', transformOrigin: 'left' }}
          />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

        {/* LEFT — Orbital system */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: 460, height: 460 }}>

              {/* Orbit ring lines */}
              {[140, 215].map((r, i) => (
                <div key={r} style={{
                  position: 'absolute',
                  left: '50%', top: '50%',
                  width: r * 2, height: r * 2,
                  borderRadius: '50%',
                  border: `1px solid rgba(168,85,247,${0.1 + i * 0.04})`,
                  transform: 'translate(-50%, -50%)',
                }} />
              ))}

              {/* Inner orbit (cw) */}
              {INNER.map((item, i) => (
                <OrbitBadge
                  key={item.name}
                  {...item} index={i} total={INNER.length}
                  radius={140} duration={22} direction="cw"
                />
              ))}

              {/* Outer orbit (ccw) */}
              {OUTER.map((item, i) => (
                <OrbitBadge
                  key={item.name}
                  {...item} index={i} total={OUTER.length}
                  radius={215} duration={34} direction="ccw"
                />
              ))}

              {/* Center */}
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 88, height: 88, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(168,85,247,0.18), rgba(232,121,249,0.08))',
                border: '1.5px solid rgba(168,85,247,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 40px rgba(168,85,247,0.2), inset 0 0 20px rgba(168,85,247,0.06)',
              }}>
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '1.4rem', fontWeight: 800,
                    background: 'linear-gradient(135deg, #a855f7, #e879f9)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}
                >
                  DJ
                </motion.span>
              </div>

              {/* Rotating outer decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', left: '50%', top: '50%',
                  width: 440, height: 440,
                  border: '1px dashed rgba(168,85,247,0.06)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* RIGHT — Skill bars */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {SKILL_GROUPS.map((group, gi) => (
            <div key={group.label} style={{ marginBottom: gi < SKILL_GROUPS.length - 1 ? 44 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: group.color, boxShadow: `0 0 10px ${group.color}` }} />
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
                  color: group.color, letterSpacing: '2px', textTransform: 'uppercase',
                }}>
                  {group.label}
                </span>
              </div>
              {group.skills.map((sk, si) => (
                <SkillBar
                  key={sk.name}
                  name={sk.name} pct={sk.pct}
                  color={group.color}
                  delay={gi * 0.3 + si * 0.12}
                />
              ))}
            </div>
          ))}

          {/* Floating badges row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
            {['Expo', 'WebSockets', 'AWS', 'Figma', 'GitHub Actions', 'Stripe', 'Redis'].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
                style={{
                  padding: '5px 12px', borderRadius: 100,
                  background: 'rgba(168,85,247,0.06)',
                  border: '1px solid rgba(168,85,247,0.18)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.68rem', color: 'var(--muted)',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 900px) {
          #skills > div:last-child { grid-template-columns: 1fr !important; }
          #skills > div:last-child > div:first-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
