'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const SECONDARY = [
  {
    id: 'email',
    platform: 'Email',
    handle: 'danieljofremolina@gmail.com',
    action: 'Copiar correo',
    href: null,
    value: 'danieljofremolina@gmail.com',
    color: '#f472b6',
    type: 'copy' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    id: 'github',
    platform: 'GitHub',
    handle: '@NiezTsuki',
    action: 'Ver perfil',
    href: 'https://github.com/NiezTsuki',
    color: '#cbd5e1',
    type: 'link' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    id: 'discord',
    platform: 'Discord',
    handle: 'daniel9445',
    action: 'Copiar usuario',
    href: null,
    value: 'daniel9445',
    color: '#818cf8',
    type: 'copy' as const,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: 'Perfil', href: '#hero' },
  { label: 'Stack', href: '#skills' },
  { label: 'Proyectos', href: '#work' },
  { label: 'Contacto', href: '#contact' },
];

function SecondaryRow({ c, index }: { c: typeof SECONDARY[0]; index: number }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handle = () => {
    if (c.type === 'copy' && c.value) {
      navigator.clipboard.writeText(c.value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const El = c.type === 'link' ? 'a' : 'button';
  const elProps = c.type === 'link'
    ? { href: c.href!, target: '_blank', rel: 'noopener noreferrer' }
    : { onClick: handle };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* @ts-ignore */}
      <El
        {...elProps}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          padding: '18px 22px', borderRadius: '12px', width: '100%',
          background: hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
          border: `1px solid ${hovered ? c.color + '35' : 'rgba(255,255,255,0.06)'}`,
          textDecoration: 'none', cursor: 'pointer',
          transition: 'all 0.25s ease',
          backdropFilter: hovered ? 'blur(8px)' : 'none',
        }}
      >
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hovered ? `${c.color}15` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hovered ? c.color + '30' : 'rgba(255,255,255,0.06)'}`,
          color: hovered ? c.color : 'var(--muted)',
          transition: 'all 0.25s ease',
        }}>
          {c.icon}
        </div>

        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', marginBottom: '2px' }}>
            {c.platform}
          </div>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
            color: copied ? c.color : 'var(--muted)',
            transition: 'color 0.2s ease',
          }}>
            {copied ? '✓ ¡Copiado!' : c.handle}
          </div>
        </div>

        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
          color: hovered ? c.color : 'rgba(124,111,154,0.4)',
          transition: 'color 0.25s ease', whiteSpace: 'nowrap',
        }}>
          {copied ? '' : c.action} {c.type === 'link' && !copied ? '↗' : ''}
        </span>
      </El>
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" style={{ position: 'relative', paddingTop: '120px' }}>

      {/* Ambient glow */}
      <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 500, background: 'radial-gradient(ellipse, rgba(168,85,247,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 400, height: 400, background: 'radial-gradient(ellipse, rgba(244,114,182,0.05) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      <div ref={ref} style={{ padding: '0 8%', position: 'relative', zIndex: 1 }}>

        {/* ── Two-column layout ── */}
        <div className="contact-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* LEFT — main CTA */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.73rem', color: 'var(--accent2)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px' }}
            >
              // Contacto
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: '20px' }}
            >
              ¿Tienes un proyecto<br />
              <span className="grad-text">en mente?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '32px', maxWidth: '420px' }}
            >
              Estoy disponible para proyectos freelance, colaboraciones y consultoría. Hablemos sobre cómo puedo ayudarte a construirlo.
            </motion.p>

            {/* Availability + info chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '7px 14px', borderRadius: '100px',
                background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)',
                fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#22c55e',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite', flexShrink: 0 }} />
                Disponible para proyectos
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '7px 14px', borderRadius: '100px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'var(--muted)',
              }}>
                📍 Panamá · UTC-5
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '7px 14px', borderRadius: '100px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'var(--muted)',
              }}>
                ⚡ Respuesta en &lt; 24h
              </span>
            </motion.div>

            {/* Primary CTA — WhatsApp */}
            <motion.a
              href="https://wa.me/50768756896?text=Hola%20Daniel,%20me%20interesa%20tu%20perfil."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(34,197,94,0.25)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '16px 32px', borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.08) 100%)',
                border: '1px solid rgba(34,197,94,0.35)',
                color: '#22c55e', fontWeight: 700, fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(34,197,94,0.12)',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              Escribir por WhatsApp
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.7 }}>
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </motion.a>
          </div>

          {/* RIGHT — secondary channels */}
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
              color: 'rgba(124,111,154,0.5)', letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: '20px', paddingLeft: '4px',
            }}>
              Otros canales
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SECONDARY.map((c, i) => <SecondaryRow key={c.id} c={c} index={i} />)}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ marginTop: '100px', position: 'relative', zIndex: 1 }}
      >
        {/* Gradient separator */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.25) 30%, rgba(56,189,248,0.2) 70%, transparent 100%)' }} />

        <div
          className="footer-inner"
          style={{ padding: '40px 8% 48px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '32px' }}
        >
          {/* Left: branding */}
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.3px', marginBottom: '5px' }}>
              Daniel <span className="grad-text">Jofre</span>
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: 'rgba(124,111,154,0.55)', letterSpacing: '0.5px' }}>
              Full Stack Engineer · Panamá
            </div>
          </div>

          {/* Center: nav links */}
          <nav style={{ display: 'flex', gap: '28px' }}>
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={e => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
                  color: 'rgba(124,111,154,0.6)', textDecoration: 'none',
                  transition: 'color 0.2s ease', letterSpacing: '0.5px',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(124,111,154,0.6)')}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right: built with + copyright */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: 'rgba(124,111,154,0.4)', marginBottom: '3px' }}>
              Construido con Next.js &amp; Framer Motion
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: 'rgba(124,111,154,0.3)' }}>
              © 2026 Daniel Jofre
            </div>
          </div>
        </div>
      </motion.footer>

      <style>{`
        @media (max-width: 900px) {
          .contact-split { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 640px) {
          .footer-inner { grid-template-columns: 1fr !important; text-align: center !important; gap: 24px !important; }
          .footer-inner > div:last-child { text-align: center !important; }
          .footer-inner nav { justify-content: center; flex-wrap: wrap; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}
