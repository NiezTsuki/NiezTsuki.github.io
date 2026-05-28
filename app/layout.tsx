import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Daniel Jofre — Arquitecto Digital & Full Stack Engineer',
  description: 'Ingeniero en Informática especializado en sistemas complejos y soluciones digitales escalables. Arquitectura, diseño e implementación de productos SaaS.',
  keywords: ['Full Stack', 'Next.js', 'TypeScript', 'Cloud', 'SaaS', 'Panama'],
  openGraph: {
    title: 'Daniel Jofre — Arquitecto Digital',
    description: 'Ingeniero en Informática especializado en soluciones digitales escalables.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
