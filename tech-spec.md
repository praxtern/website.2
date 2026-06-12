# JAPAN TOURS — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.2.0 | UI framework |
| `react-dom` | ^18.2.0 | React DOM renderer |
| `gsap` | ^3.12.0 | Core animation engine, timelines, tweens |
| `lenis` | ^1.0.0 | Smooth scroll with inertia |
| `lucide-react` | ^0.400.0 | Monoline icons (Globe, Compass, Plane, Bus, Hotel, Instagram, Facebook, Send) |
| `tailwindcss` | ^3.4.0 | Utility-first CSS |
| `vite` | ^5.0.0 | Build tool |
| `typescript` | ^5.3.0 | Type safety |
| `@types/react` | ^18.2.0 | React type definitions |
| `@types/react-dom` | ^18.2.0 | React DOM type definitions |

**GSAP Plugins Used (all free, bundled with gsap):** ScrollTrigger, ScrollToPlugin

**Font Loading:** Bebas Neue, Cormorant Garamond, Inter — loaded via Google Fonts `<link>` in `index.html`. No npm font packages needed.

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| **Navigation** | Custom | Single | Fixed header with scroll-state background transition. Contains wordmark, nav links, book button. |
| **Footer** | Custom | Single | Simple flex row with wordmark, footer nav, social icons. |
| **SocialIcons** | Custom | Shared (Nav right edge + Footer) | Three outlined icons in vertical (nav) or horizontal (footer) arrangement. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| **HeroSection** | Custom | Three-plane parallax composition. Contains all hero sub-elements. |
| **AboutSection** | Custom | Black background, two-column layout with timeline. |
| **IncludedSection** | Custom | Black background, 4-card bento grid. |
| **ContactSection** | Custom | Full-bleed background image with frosted glass form overlay. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| **PolaroidCard** | Custom | HeroSection (x5) | Image + caption in dark card shell. Accepts image src, caption text, and optional hover class. |
| **TimelineNode** | Custom | AboutSection (x3) | Dot on vertical line + label + photo cluster. Each node is independent — the vertical line is part of the parent layout. |
| **PhotoCluster** | Custom | TimelineNode (x3) | Two offset/rotated photos with hover-separate animation. |
| **GlassCard** | Custom | IncludedSection (x4) | Glassmorphism panel with icon, title, description. Hover lift + lime border glow. |
| **LimeRevealText** | Custom | AboutSection (x2) | Wraps text spans that fade+slide in when scrolled into view. Uses IntersectionObserver. |
| **FrostedForm** | Custom | ContactSection | Glass form panel with underlined inputs and pill submit button. |

### Hooks

| Hook | Purpose |
|------|---------|
| **useLenis** | Initialize Lenis, wire to GSAP ScrollTrigger RAF loop, expose instance for scroll-to |
| **useScrollProgress** | Track nav background transition (past hero threshold) |
| **useCustomCursor** | RAF-driven cursor dot with lerp delay, expand on interactive hover |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| **Smooth scroll (global)** | Lenis | Lenis instance in useLenis hook. `lenis.on('scroll', ScrollTrigger.update)` + shared RAF loop. Expose lenis ref for programmatic scroll-to via GSAP ScrollToPlugin. | Low |
| **Hero 3-layer parallax** | GSAP ScrollTrigger | Single ScrollTrigger on hero section, `scrub: true`, `start: "top top"`, `end: "bottom top"`. Three `gsap.to()` tweens targeting: bg layer (y at 0.3x), typography (y at 0.5x), polaroid strip (x at -0.4x). Kimono figure excluded (fixed). All scrubbed to scroll position. | **High** 🔒 |
| **Hero typography stroke glow** | CSS | Static `text-shadow: 0 0 60px rgba(212, 248, 122, 0.08)` on the JAPAN text. No animation needed. | Low |
| **Nav background on scroll** | GSAP ScrollTrigger | ScrollTrigger with `start: "100vh top"`, `toggleActions: "play reverse play reverse"`. Toggles class that adds `background` + `backdrop-filter`. | Low |
| **Nav link underline hover** | CSS | `::after` pseudo-element with `scaleX(0→1)`, `transform-origin: left`, CSS transition. Pure CSS, no JS. | Low |
| **Polaroid card hover lift** | CSS | `transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s`. Hover: `translateY(-6px)` + lime glow box-shadow. | Low |
| **Timeline stagger reveal** | GSAP ScrollTrigger | Three ScrollTriggers (one per TimelineNode), `start: "top 80%"`, `toggleActions: "play none none none"`. Each animates its cluster: `opacity: 0→1`, `y: 40→0`, `duration: 0.6`, `ease: "power2.out"`. Staggered via sequential `delay` values (0s, 0.2s, 0.4s) or GSAP timeline. | **High** 🔒 |
| **Lime accent text reveal** | IntersectionObserver + CSS | Custom LimeRevealText component. IntersectionObserver at `threshold: 0.5` toggles class that sets `opacity: 1` + `translateY(0)` from initial `opacity: 0` + `translateY(10px)`. CSS `transition: 0.5s ease`. | Medium |
| **Photo cluster hover separate** | CSS | `transition: transform 0.3s cubic-bezier(0.16,1,0.3,1)` on both photos. Parent hover changes rotation and translate offsets for each photo. | Low |
| **Glass card hover** | CSS | `transition: 0.3s cubic-bezier(0.16,1,0.3,1)`. Hover: `translateY(-4px)`, border color to lime, icon `scale(1.1)`, box-shadow glow. All CSS. | Low |
| **Book button hover gradient** | CSS | `background` transitions to `linear-gradient(to top, #D4A853, #F5E8D3)`. Alternatively use `background-position` shift on a pre-set gradient. | Low |
| **Form input focus underline** | CSS | `border-bottom` color transition from `rgba(250,250,250,0.2)` to `#D4F87A`, `transition: 0.3s`. | Low |
| **Send button hover** | CSS | `background` transition from `#FAFAFA` to `#D4F87A`, `transition: 0.3s`. | Low |
| **Image lazy-load fade-in** | IntersectionObserver + CSS | Images start at `opacity: 0`. On IntersectionObserver entry (or native `onLoad` if already cached), set `opacity: 1` with `transition: opacity 0.4s ease`. | Low |
| **Custom cursor** | requestAnimationFrame | Hook tracks mouse position. RAF loop with lerp (0.15) interpolates cursor position. Dot (8px) expands to outlined circle (32px) on hover over `[data-cursor-expand]` elements via mouseenter/mouseleave delegation. `pointer-events: none`, `position: fixed`. | Medium |
| **Nav smooth-scroll to sections** | GSAP ScrollToPlugin | On nav link click, call `gsap.to(window, { scrollTo: { y: targetSection, offsetY: 0 }, duration: 1.2, ease: "power2.inOut" })`. Integrates with Lenis via shared ScrollTrigger. | Low |

---

## State & Logic Plan

### Lenis ↔ GSAP ScrollTrigger Integration

Lenis must own the scroll RAF loop and feed into GSAP's ScrollTrigger. Architecture:

- `useLenis` hook creates a single Lenis instance stored in a ref (never triggers re-render)
- On mount: `lenis.on('scroll', ScrollTrigger.update)` wires Lenis scroll events into GSAP
- Shared RAF loop: `gsap.ticker.add((time) => lenis.raf(time * 1000))` — GSAP's ticker drives Lenis
- Disable GSAP lag smoothing: `gsap.ticker.lagSmoothing(0)` to prevent jump corrections
- Expose `lenisRef` for programmatic scroll-to calls from nav links

### Hero Z-Index Compositing

The hero's three-plane visual is achieved through precise positioning — no masks, no clip-paths:

- **Background image** (`z-index: 1`): `position: absolute; inset: 0`. The mountain ridge line in the generated image naturally sits at ~55-60% from the top.
- **JAPAN text** (`z-index: 2`): `position: absolute; top: 45%; transform: translateY(-50%)`. The text's bottom half is visually occluded by the mountain ridge below it. Adjust `top` value (45-50%) during implementation to achieve the exact crop where letter bottoms disappear behind the mountain line.
- **Kimono figure** (`z-index: 3`): `position: absolute; bottom: 0; right: 5%`. No scroll movement — acts as the visual anchor.
- **Polaroid strip** (`z-index: 4`): `position: absolute; bottom: 40px; left: 40px`.

Critical: The background image's `object-position: center 40%` shifts the composition slightly upward, ensuring more mountain mass is visible in the lower half to occlude the typography.

### Custom Cursor Architecture

- Hook initializes a single RAF loop on mount
- Mouse position stored in refs (never re-renders component)
- Cursor position interpolated via lerp formula: `current += (target - current) * 0.15`
- Hover detection via event delegation on `document` — listen for `mouseover` on `[data-cursor-expand]` elements (nav links, buttons, cards)
- Two visual states: dot (8px filled lime) vs. circle (32px outlined lime) — toggled via CSS class
- `cursor: none` on `body`, `*` elements show default cursor for accessibility fallback

### Scroll-Triggered Reveals Strategy

Three different scroll-reveal mechanisms used:

1. **GSAP ScrollTrigger (Timeline nodes):** For staggered, sequenced reveals with precise timing control. Each TimelineNode gets its own ScrollTrigger.
2. **IntersectionObserver (Lime text reveals):** For simple visibility toggles. Custom hook returns ref + boolean.
3. **CSS-only (Image lazy-load):** Images use `onLoad` + IntersectionObserver. Once loaded and in view, CSS transition handles fade.

---

## Other Key Decisions

### No shadcn/ui Components

The design is entirely bespoke — every element is custom-styled with precise glassmorphism, exact color values, and specific hover behaviors. No standard UI primitives (dialog, dropdown, table, etc.) are needed. shadcn/ui would add unnecessary abstraction.

### Font Loading Strategy

Load all three fonts via a single Google Fonts link in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:wght@300&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```
No npm font packages. `font-display: swap` ensures text is visible immediately.

### Image Assets

All images stored in `public/images/`. The build process copies them to `dist/` unchanged. No import-time optimization — images are referenced by string path. For production, consider running images through an optimizer or serving via CDN.

### Form Handling

The contact form is a UI-only implementation (no backend). On submit, show a success state change on the button (text changes to "Sent!" briefly, lime background). No actual API call is made — this is a static landing page.
