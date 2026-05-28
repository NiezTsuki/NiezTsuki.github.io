'use client';
import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useMotionTemplate, useTransform, useSpring } from 'framer-motion';

const PROJECTS = [
  {
    id: 'oralcrm',
    name: 'OralCRM',
    tagline: 'CRM para Clínicas Dentales',
    description: 'Plataforma SaaS completa para la gestión integral de clínicas dentales. Control de citas, historial clínico digital, facturación automatizada, inventario y comunicación directa con pacientes en tiempo real.',
    url: 'https://oralcrm.com',
    logo: '/images/logo-oralcrm.png',
    tags: ['SaaS', 'Next.js', 'TypeScript', 'PostgreSQL'],
    accentColor: '#38bdf8',
    glowColor: 'rgba(56,189,248,0.14)',
    year: '2026',
    status: 'Live',
    statusColor: '#22c55e',
  },
  {
    id: 'bellezacrm',
    name: 'BellezaCRM',
    tagline: 'CRM para Salones de Belleza',
    description: 'Fork especializado de OralCRM adaptado para salones de belleza y spas. Gestión de citas, clientes, servicios y facturación en una sola plataforma diseñada para el sector estético panameño.',
    url: 'https://bellezacrm.com',
    logo: '/images/logo-bellezacrm.svg',
    tags: ['SaaS', 'Next.js', 'TypeScript', 'PostgreSQL'],
    accentColor: '#f472b6',
    glowColor: 'rgba(244,114,182,0.14)',
    year: '2026',
    status: 'Live',
    statusColor: '#22c55e',
  },
  {
    id: 'jape',
    name: 'Multiservices Jape',
    tagline: 'App Móvil de Servicios Técnicos',
    description: 'Aplicación móvil que conecta clientes con técnicos especializados. Gestión de solicitudes de servicio, seguimiento en tiempo real, pagos integrados y sistema de valoraciones para iOS y Android.',
    url: 'https://multiservicesjape.com',
    logo: '/images/jape-logo.png',
    tags: ['Flutter', 'Node.js', 'Prisma', 'PostgreSQL'],
    accentColor: '#a855f7',
    glowColor: 'rgba(168,85,247,0.14)',
    year: '2026',
    status: 'Live',
    statusColor: '#22c55e',
  },
  {
    id: 'magaby',
    name: 'Magaby HairStyle',
    tagline: 'Portafolio de Estilista de Novias',
    description: 'Presencia digital elegante para estilista especializada en bodas con más de 20 años de experiencia. Galería de transformaciones, servicios nupciales y contacto directo con clientas.',
    url: 'https://magabyhairstyle.com',
    logo: 'https://magabyhairstyle.com/images/web.png',
    tags: ['Web Design', 'UI/UX', 'SEO'],
    accentColor: '#fb923c',
    glowColor: 'rgba(251,146,60,0.14)',
    year: '2026',
    status: 'Live',
    statusColor: '#22c55e',
  },
];

type Project = typeof PROJECTS[0];

/* ── Logo initials fallback ── */
const INITIALS: Record<string, string> = {
  oralcrm: 'OC',
  bellezacrm: 'BC',
  jape: 'MJ',
  magaby: 'MH',
};

function useTilt() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const glossX = useTransform(mouseX, [-0.5, 0.5], [20, 80]);
  const glossY = useTransform(mouseY, [-0.5, 0.5], [20, 80]);
  const gloss = useMotionTemplate`radial-gradient(260px at ${glossX}% ${glossY}%, rgba(255,255,255,0.05), transparent)`;
  return {
    rotateX, rotateY, gloss,
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width - 0.5);
      mouseY.set((e.clientY - r.top) / r.height - 0.5);
    },
    onMouseLeave: () => { mouseX.set(0); mouseY.set(0); },
  };
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const tilt = useTilt();

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={() => { tilt.onMouseLeave(); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          borderRadius: '18px',
          overflow: 'hidden',
          padding: '36px',
          height: '100%',
          background: 'rgba(10,6,24,0.92)',
          border: `1px solid ${hovered ? project.accentColor + '55' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: hovered
            ? `0 32px 80px rgba(0,0,0,0.6), 0 0 60px ${project.glowColor}`
            : '0 8px 40px rgba(0,0,0,0.4)',
          transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Gloss shimmer */}
        <motion.div style={{ background: tilt.gloss, position: 'absolute', inset: 0, borderRadius: '18px', pointerEvents: 'none', zIndex: 1 }} />

        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
          opacity: hovered ? 1 : 0.3, transition: 'opacity 0.35s ease', zIndex: 2,
        }} />

        <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '26px' }}>
            {/* Logo */}
            <div style={{
              width: '54px', height: '54px', borderRadius: '14px', flexShrink: 0,
              background: logoFailed
                ? `linear-gradient(135deg, ${project.accentColor}28, ${project.accentColor}08)`
                : `${project.accentColor}10`,
              border: `1px solid ${project.accentColor}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: hovered ? `0 0 28px ${project.glowColor}` : 'none',
              transition: 'box-shadow 0.3s ease',
            }}>
              {logoFailed ? (
                <span style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '0.8rem',
                  color: project.accentColor, letterSpacing: '-0.5px',
                }}>
                  {INITIALS[project.id]}
                </span>
              ) : (
                <img
                  src={project.logo}
                  alt={project.name}
                  onError={() => setLogoFailed(true)}
                  style={{ width: '38px', height: '38px', objectFit: 'contain' }}
                />
              )}
            </div>

            {/* Status badge */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '5px 12px', borderRadius: '100px',
              background: `${project.statusColor}14`, border: `1px solid ${project.statusColor}38`,
              fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: project.statusColor,
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: project.statusColor, animation: 'pulse 2s infinite' }} />
              {project.status}
            </span>
          </div>

          {/* Title + tagline */}
          <h3 style={{ fontSize: '1.55rem', fontWeight: 800, marginBottom: '5px', letterSpacing: '-0.3px', lineHeight: 1.15 }}>
            {project.name}
          </h3>
          <p style={{ color: project.accentColor, fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', marginBottom: '18px' }}>
            {project.tagline}
          </p>

          {/* Description */}
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.78, marginBottom: '24px', flex: 1 }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: '3px 10px', borderRadius: '100px',
                background: `${project.accentColor}0c`, border: `1px solid ${project.accentColor}22`,
                fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'var(--muted)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: 'rgba(124,111,154,0.45)' }}>
              {project.year}
            </span>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-hover="true"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: "'DM Mono', monospace", fontSize: '0.78rem', fontWeight: 600,
                color: hovered ? project.accentColor : 'var(--muted)',
                textDecoration: 'none', transition: 'color 0.25s ease',
              }}
            >
              Ver proyecto
              <motion.span
                animate={hovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-flex' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </motion.span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <section id="work" style={{ padding: '120px 8%', position: 'relative' }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', top: '5%', right: '-6%', width: 500, height: 500, background: 'radial-gradient(ellipse, rgba(56,189,248,0.04) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-4%', width: 480, height: 480, background: 'radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Heading */}
      <div ref={headingRef} style={{ marginBottom: '64px', position: 'relative', zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: 'var(--accent2)', marginBottom: '14px', letterSpacing: '3px', textTransform: 'uppercase' }}
        >
          // Proyectos
        </motion.p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <motion.h2
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-1px', whiteSpace: 'nowrap' }}
          >
            Trabajo <span className="grad-text">selecto</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '1px', background: 'linear-gradient(90deg, var(--border) 0%, transparent 100%)', transformOrigin: 'left', flex: 1 }}
          />
        </div>
      </div>

      {/* 2×2 grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          position: 'relative', zIndex: 1,
        }}
        className="projects-grid"
      >
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
