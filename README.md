# Arslan Akif — Portfolio

Cinematic personal developer portfolio built with Next.js 14, React Three Fiber, GSAP, and Framer Motion.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Engine**: React Three Fiber + Drei + Three.js
- **Animation**: Framer Motion + GSAP
- **Smooth Scroll**: Lenis
- **Fonts**: Cormorant Garamond (display) + DM Sans (body) + JetBrains Mono (code)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx          # Root layout + metadata
  page.tsx            # Main page (assembles all sections)

components/
  ui/
    Navbar.tsx         # Glassmorphism nav with mobile menu
    GlassButton.tsx    # Reusable glass button (3 variants)
    GlassCard.tsx      # 3D tilt card with glass effect
  sections/
    Hero.tsx           # Cinematic hero with typewriter + orbs
    About.tsx          # Bio, stats, skills grid
    Projects.tsx       # 6-project showcase grid
    Experience.tsx     # Timeline: Zaiham, Hackathon, Edu, AWS
    Contact.tsx        # Contact links + email CTA
  three/
    Scene.tsx          # R3F Canvas (lazy loaded, no SSR)
    CameraRig.tsx      # Mouse-reactive camera parallax
    FloatingObjects.tsx # Crystals, tori, wireframe spheres
    Particles.tsx      # 1200-particle star field
    Lights.tsx         # Animated cyan/violet lighting

styles/
  globals.css          # CSS variables, animations, glass system

lib/
  utils.ts             # cn(), lerp(), clamp(), mapRange()
```

## Customization

- Update personal info in `components/sections/` files
- Replace email/links in `Contact.tsx`
- Adjust 3D object count/speed in `FloatingObjects.tsx` and `Particles.tsx`
- Tweak color palette in `tailwind.config.ts` and `styles/globals.css`

## Deployment

```bash
npm run build
```

Deploy to Vercel — just connect your GitHub repo. Works out of the box with Next.js.

## Phase Roadmap

- [x] Phase 1: Foundation scaffold
- [x] Phase 2: 3D hero world (R3F + particles + camera rig)
- [x] Phase 3: Scroll-based section reveal (Framer Motion)
- [ ] Phase 4: GSAP ScrollTrigger deep animations
- [ ] Phase 5: Postprocessing (bloom/glow via @react-three/postprocessing)
- [ ] Phase 6: Intro video + signature animation

## Notes

- 3D canvas is `pointer-events: none` — won't block UI interactions
- Lenis smooth scroll initialized in `page.tsx`
- `dpr={[1, 1.5]}` on Canvas limits pixel ratio for performance
- Mobile: 3D scene still renders but particles auto-throttle via PerformanceMonitor
