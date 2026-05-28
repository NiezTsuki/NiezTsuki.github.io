# Daniel Jofre — Portfolio Next.js

## Setup rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Añadir tus imágenes
Crea una carpeta `/public/images/` y coloca:
- `me.jpg` — tu foto de perfil
- `logo.png` — tu logo (opcional)
- `jape-logo.png` — logo del proyecto Jape

## Estructura
```
app/
  page.tsx        ← Página principal
  layout.tsx      ← Layout + metadata
  globals.css     ← Variables CSS, aurora, glitch, cursor

components/
  Aurora.tsx      ← Fondo con blobs animados
  Cursor.tsx      ← Cursor personalizado con lag
  Nav.tsx         ← Navegación fija con scroll-aware
  Hero.tsx        ← Hero con typewriter, parallax, 3D photo
  Projects.tsx    ← Tarjetas con efecto 3D tilt
  Contact.tsx     ← Grid de contacto con glow hover
```

## Tecnologías
- Next.js 15 (App Router)
- Framer Motion (animaciones)
- TypeScript
- Tailwind CSS
