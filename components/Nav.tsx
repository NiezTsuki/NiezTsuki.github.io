'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { num: '01', label: 'Perfil',     href: '#hero' },
  { num: '02', label: 'Stack',      href: '#skills' },
  { num: '03', label: 'Proyectos',  href: '#work' },
  { num: '04', label: 'Contacto',   href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['#contact', '#work', '#hero'];
      for (const id of sections) {
        const el = document.querySelector(id);
        if (el && window.scrollY >= (el as HTMLElement).offsetTop - 200) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setActive(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          padding: scrolled ? '14px 52px' : '22px 52px',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          background: scrolled ? 'rgba(5,2,14,0.82)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(168,85,247,0.1)' : '1px solid transparent',
          position: 'fixed', width: '100%', zIndex: 100,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={e => scrollTo(e, '#hero')}
          whileHover={{ scale: 1.05 }}
          data-hover="true"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <div style={{ width: '64px', height: '64px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/images/satu.svg"
              alt="Daniel Jofre"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.6))',
              }}
            />
          </div>
        </motion.a>

        {/* Desktop nav */}
        <nav className="desktop-nav">
          <ul style={{ display: 'flex', gap: '8px', listStyle: 'none' }}>
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href={link.href}
                  onClick={e => scrollTo(e, link.href)}
                  className="nav-link-item"
                  data-hover="true"
                  style={{
                    color: active === link.href ? 'var(--primary)' : '#d4c8f0',
                    textDecoration: 'none', fontSize: '0.88rem',
                    display: 'flex', gap: '7px', alignItems: 'center',
                    fontFamily: "'Syne', sans-serif", fontWeight: 600,
                    padding: '8px 14px', borderRadius: '8px',
                    background: active === link.href ? 'rgba(168,85,247,0.08)' : 'transparent',
                    border: active === link.href ? '1px solid rgba(168,85,247,0.18)' : '1px solid transparent',
                    transition: 'color 0.25s ease, background 0.25s ease, border-color 0.25s ease',
                  }}
                >
                  <span style={{ color: 'var(--primary)', fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', opacity: 0.7 }}>
                    {link.num}.
                  </span>
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* CTA button */}
        <motion.a
          href="https://wa.me/50768756896?text=Hola%20Daniel,%20me%20interesa%20tu%20perfil."
          target="_blank"
          rel="noopener noreferrer"
          data-hover="true"
          className="nav-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(168,85,247,0.35)' }}
          style={{
            padding: '9px 22px', borderRadius: '8px', fontWeight: 700, fontSize: '0.84rem',
            textDecoration: 'none', color: '#fff',
            background: 'linear-gradient(135deg, var(--primary-glow), var(--primary))',
            boxShadow: '0 0 20px rgba(124,58,237,0.3)',
            border: '1px solid rgba(168,85,247,0.4)',
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            transition: 'box-shadow 0.25s ease, transform 0.25s ease',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite', flexShrink: 0 }} />
          Hablemos
        </motion.a>

        {/* Mobile burger */}
        <button
          className="mobile-burger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none', flexDirection: 'column', gap: '5px' }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={menuOpen ? (i === 1 ? { opacity: 0 } : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 10 : -10 }) : { opacity: 1, rotate: 0, y: 0 }}
              style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--text)', borderRadius: '2px', transformOrigin: 'center' }}
            />
          ))}
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: '70px', left: 0, right: 0, zIndex: 99,
              background: 'rgba(5,2,14,0.96)', backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(168,85,247,0.1)',
              padding: '20px 32px',
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={e => scrollTo(e, link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  color: active === link.href ? 'var(--primary)' : 'var(--text)',
                  textDecoration: 'none', fontSize: '1.1rem', fontWeight: 700,
                  padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', gap: '12px', alignItems: 'center',
                }}
              >
                <span style={{ color: 'var(--primary)', fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', opacity: 0.6 }}>{link.num}.</span>
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .nav-cta { display: none !important; }
          .mobile-burger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-burger { display: none !important; }
        }
      `}</style>
    </>
  );
}
