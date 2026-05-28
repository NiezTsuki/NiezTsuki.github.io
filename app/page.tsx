'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Hero         = dynamic(() => import('../components/Hero'),         { ssr: false });
const Nav          = dynamic(() => import('../components/Nav'),          { ssr: false });
const Projects     = dynamic(() => import('../components/Projects'),     { ssr: false });
const Contact      = dynamic(() => import('../components/Contact'),      { ssr: false });
const Aurora       = dynamic(() => import('../components/Aurora'),       { ssr: false });
const Loader       = dynamic(() => import('../components/Loader'),       { ssr: false });
const ParticleField = dynamic(() => import('../components/ParticleField'), { ssr: false });
const Skills       = dynamic(() => import('../components/Skills'),       { ssr: false });

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {/* Loader sits on top; content renders below so it's ready when loader exits */}
      <Loader onComplete={() => setReady(true)} />

      <div
        style={{
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.6s ease',
          visibility: ready ? 'visible' : 'hidden',
        }}
      >
        <Aurora />
        <ParticleField />
        <Nav />
        <main className="relative z-10">
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  );
}
