'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ROLES = ['Arquitecto de Soluciones', 'Full Stack Engineer', 'Digital Strategist', 'Cloud Architect'];

function TypeWriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 1800);
      return () => clearTimeout(t);
    }
    const word = words[idx];
    const speed = deleting ? 38 : 75;
    const t = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) { setPause(true); setDeleting(true); }
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIdx(i => (i + 1) % words.length);
        }
      }
    }, pause ? 2000 : speed);
    return () => clearTimeout(t);
  }, [text, deleting, pause, idx, words]);

  return (
    <span style={{ color: 'var(--accent)', fontFamily: "'DM Mono', monospace" }}>
      {text}
      <span className="cursor-blink" style={{ color: 'var(--primary)', marginLeft: '2px' }}>|</span>
    </span>
  );
}

function CountUp({ end, label }: { end: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = () => {
          start += Math.ceil(end / 50);
          if (start >= end) { setCount(end); return; }
          setCount(start);
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }} className="grad-text">{count}+</div>
      <div style={{ color: 'var(--muted)', fontSize: '0.78rem', fontFamily: "'DM Mono', monospace", marginTop: '6px' }}>{label}</div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const springY = useSpring(yText, { stiffness: 80, damping: 20 });

  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    imgRef.current.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
  };
  const handleMouseLeave = () => {
    if (imgRef.current) imgRef.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)';
  };

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{ position: 'relative', paddingTop: '90px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Scanline */}
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,85,247,0.008) 2px, rgba(168,85,247,0.008) 4px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Main grid */}
      <div
        className="hero-grid"
        style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr', alignItems: 'center', padding: '0 8%', gap: '4rem' }}
      >
        {/* LEFT */}
        <motion.div style={{ y: springY, opacity, position: 'relative', zIndex: 1 }}>
          <motion.div variants={stagger} initial="hidden" animate="show">

            <motion.h1 variants={item} style={{ fontSize: 'clamp(3rem, 5.5vw, 5.8rem)', lineHeight: 1.04, fontWeight: 800, marginBottom: '6px' }}>
              <span className="glitch" data-text="Daniel">Daniel</span>
            </motion.h1>
            <motion.h1 variants={item} style={{ fontSize: 'clamp(3rem, 5.5vw, 5.8rem)', lineHeight: 1.04, fontWeight: 800, marginBottom: '28px' }}>
              <span className="grad-text">Jofre.</span>
            </motion.h1>

            <motion.div variants={item} style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', marginBottom: '28px', height: '2rem', display: 'flex', alignItems: 'center' }}>
              <TypeWriter words={ROLES} />
            </motion.div>

            <motion.p variants={item} style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '490px', marginBottom: '44px', lineHeight: 1.8, fontWeight: 300 }}>
              Ingeniero en Informática especializado en materializar sistemas complejos. Ciclo completo: arquitectura, diseño e implementación de productos digitales escalables.
            </motion.p>

            <motion.div variants={item} className="hero-buttons" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '60px' }}>
              <MagneticBtn href="#work" primary>
                Ver Proyectos
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </MagneticBtn>
              <MagneticBtn href="#contact">Contactar</MagneticBtn>
            </motion.div>

            <motion.div variants={item} className="hero-stats" style={{ display: 'flex', gap: '40px' }}>
              <CountUp end={15} label="Proyectos" />
              <div style={{ width: '1px', background: 'var(--border)' }} />
              <CountUp end={3} label="Años exp." />
              <div style={{ width: '1px', background: 'var(--border)' }} />
              <CountUp end={8} label="Tecnologías" />
            </motion.div>

          </motion.div>
        </motion.div>

        {/* RIGHT — Photo */}
        <motion.div
          style={{ y: yImage, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1 }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div style={{ position: 'relative' }}>
            {/* Rotating rings */}
            {[1, 2, 3].map(i => (
              <motion.div key={i}
                style={{
                  position: 'absolute', inset: `-${i * 24}px`, borderRadius: '50%',
                  border: `1px solid rgba(168,85,247,${0.14 / i})`,
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 14 * i, repeat: Infinity, ease: 'linear' }}
              />
            ))}

            <div
              ref={imgRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ position: 'relative', width: '300px', height: '300px', borderRadius: '50%', cursor: 'default', transition: 'transform 0.35s ease', transformStyle: 'preserve-3d' }}
            >
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden',
                border: '2px solid rgba(168,85,247,0.28)',
                background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(232,121,249,0.08) 50%, rgba(56,189,248,0.1) 100%)',
                boxShadow: '0 0 70px rgba(168,85,247,0.18), inset 0 0 60px rgba(168,85,247,0.05)',
                position: 'relative',
              }}>
                <img
                  src="/images/me.jpg"
                  alt="Daniel Jofre"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
            </div>

            <FloatingBadge style={{ top: '-22px', left: '-110px' }} delay={0.8}>⚡ Next.js</FloatingBadge>
            <FloatingBadge style={{ bottom: '14%', left: '-100px' }} delay={1.2}>☁️ Cloud</FloatingBadge>
            <FloatingBadge style={{ bottom: '-22px', left: '50%', transform: 'translateX(-50%)' }} delay={1.6}>📱 Mobile</FloatingBadge>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 1 }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, var(--primary) 0%, transparent 100%)', animation: 'scroll-bounce 2s ease-in-out infinite' }} />
      </motion.div>

      <style>{`
        .hero-grid { min-height: calc(100vh - 90px); }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; padding-top: 40px !important; text-align: center; }
          .hero-grid > *:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function MagneticBtn({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-hover="true"
      onClick={e => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '14px 30px', borderRadius: '8px',
        fontWeight: 600, fontSize: '0.9rem',
        textDecoration: 'none',
        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease',
        ...(primary ? {
          background: 'linear-gradient(135deg, var(--primary-glow), var(--primary))',
          color: '#fff',
          boxShadow: '0 0 36px rgba(124,58,237,0.4)',
        } : {
          background: 'transparent',
          border: '1px solid rgba(168,85,247,0.28)',
          color: 'var(--text)',
        }),
      }}
    >
      {children}
    </a>
  );
}

function FloatingBadge({ children, style, delay }: { children: React.ReactNode; style: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{ opacity: { delay, duration: 0.4 }, scale: { delay, duration: 0.4 }, y: { delay: delay + 0.4, duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
      style={{
        position: 'absolute', ...style,
        background: 'rgba(10, 6, 24, 0.92)',
        border: '1px solid rgba(168,85,247,0.22)',
        borderRadius: '10px', padding: '8px 14px',
        fontSize: '0.75rem', fontFamily: "'DM Mono', monospace",
        color: 'var(--text)', backdropFilter: 'blur(12px)',
        whiteSpace: 'nowrap',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
      }}
    >
      {children}
    </motion.div>
  );
}
