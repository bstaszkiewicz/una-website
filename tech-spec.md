# UNA Landing Page — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.2 | UI framework |
| `react-dom` | ^18.2 | React DOM renderer |
| `vite` | ^5.0 | Build tool |
| `@vitejs/plugin-react` | ^4.2 | Vite React integration |
| `tailwindcss` | ^3.4 | Utility-first CSS |
| `postcss` | ^8.4 | CSS processing |
| `autoprefixer` | ^10.4 | CSS vendor prefixes |
| `geist` | ^1.2 | Self-hosted Inter variable font |
| `three` | ^0.160 | WebGL: aura shader + blob grid |
| `@types/three` | ^0.160 | Three.js type definitions |
| `gsap` | ^3.12 | Core animation engine + ScrollTrigger + SplitText |
| `lenis` | ^1.1 | Smooth scroll with inertia |
| `splitting` | ^1.0 | Character-level text splitting for reveal effect |
| `normalize-wheel` | ^1.0 | Cross-browser mouse wheel normalization |
| `lucide-react` | ^0.400 | Icon library (Factory, Sun, Building2, Database, Cog, Shield, CheckCircle2, FileText, ChevronRight, Zap, Menu, X, Twitter, Linkedin) |
| `clsx` | ^2.1 | Conditional class names |
| `tailwind-merge` | ^2.2 | Tailwind class deduplication |

> **Note on `imagesloaded`**: The pitch deck does not contain photographic assets requiring progressive load. The single hero image is generated and can be preloaded via standard `new Image()` in a useEffect gate. Skip `imagesloaded` npm package — use a simple `<img onLoad>` callback instead.

---

## Component Inventory

### Layout (shared)

| Component | Source | Notes |
|-----------|--------|-------|
| **Navigation** | Custom | Fixed top bar. Scroll-aware background (transparent → blurred navy). CTA morph: hero button ↔ nav pill swap. Mobile hamburger with full-screen overlay. |
| **Footer** | Custom | 4-column grid on desktop, stacked mobile. No dependencies. |
| **PageLoader** | Custom | Navy overlay with "UNA" text + amber progress line. Fades out after hero image + Three.js ready. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| **HeroSection** | Custom | Three.js canvas (Aura + BlobGrid) + HTML overlay (text, CTAs, scroll indicator) + 3D Text Tunnel. Pinned for 2000px scroll. |
| **ProblemSection** | Custom | Stats grid with count-up animation. |
| **SolutionSection** | Custom | Three-column architecture diagram with arrows. |
| **DeploymentSection** | Custom | Three mode cards with accent borders. |
| **PipelineSection** | Custom | Text compression scroll effect + gradient border frame. |
| **AudienceSection** | Custom | Three audience cards with icons. |
| **PartnersSection** | Custom | Logo grid + partner statement. Horizontal scroll on mobile. |
| **MediaSection** | Custom | Tabbed interface (4 tabs) with crossfade content. Newsletter signup form. |
| **SocialSection** | Custom | Pill buttons for social platforms. |
| **ClosingSection** | Custom | Dual text reveal with Splitting.js + character swap. |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| **SectionEyebrow** | Custom | Problem, Solution, Deployment, Audience, Media — "LABEL" style text (Label typography, Teal Accent, uppercase) |
| **CountUp** | Custom | ProblemSection — animates number from 0 to target over 1.5s via GSAP |
| **GradientBorder** | Custom | PipelineSection — CSS `@property --angle` conic gradient border, 6s rotation |
| **AuraCanvas** | Custom | HeroSection — isolated Three.js scene (fullscreen quad shader + blob grid + image overlay) |
| **TextTunnel** | Custom | HeroSection — GSAP ScrollTrigger 3D CSS text rings |
| **TextCompression** | Custom | PipelineSection — GSAP ScrollTrigger letter-spacing + 3D transform |
| **TextReveal** | Custom | ClosingSection — Splitting.js word split + character swap + scroll reveal |
| **MobileLogoCarousel** | Custom | PartnersSection — CSS scroll-snap horizontal scroll |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| **Energy aura shader** | Three.js (raw ShaderMaterial) | Fullscreen quad with custom GLSL fragment shader. 4-color radial gradient with mouse-reactive pulse. | **High** 🔒 |
| **Blob grid distortion** | Three.js (InstancedMesh) | 50×50 CircleGeometry instances. Spring-based wave + mouse proximity push via raycast plane. | **High** 🔒 |
| **3D text tunnel** | GSAP ScrollTrigger + CSS 3D | Two rings of 200 span elements in 3D spherical distribution. Pinned scroll timeline moves camera z + rotates rings. Opacity culling based on z position. | **High** 🔒 |
| **Text compression** | GSAP ScrollTrigger (scrub) | Large text animates letter-spacing 1.5rem→0 + rotateY/rotateX/scale 3D transform. Shadow text fades. | **Medium** |
| **Dual text reveal** | GSAP ScrollTrigger + Splitting.js | Words split into containers with overflow:hidden. Inner spans slide from yPercent 150→0. Characters swap via data-char randomization. | **Medium** |
| **Nav scroll morph** | GSAP / CSS | Scroll listener toggles CTA visibility (hero button hides, nav pill appears). Background transition at 100px. | Low |
| **Section entrances** | GSAP ScrollTrigger | Default fade-up (opacity 0→1, y 30→0) triggered at "top 80%". Stagger 0.1–0.15s between siblings. | Low |
| **Stat count-up** | GSAP ScrollTrigger | Tween number value 0→target over 1.5s with snap to integer/decimal format. | Low |
| **Card hover states** | CSS transitions | translateY + border + box-shadow. 0.3–0.35s cubic-bezier(0.16, 1, 0.3, 1). | Low |
| **Button hover states** | CSS transitions | Background color shift + box-shadow glow. | Low |
| **Mobile menu** | GSAP | Full-screen overlay. Links stagger in from left (translateX -30, 0.4s, 0.08s stagger). | Low |
| **Loading screen** | GSAP | Progress line width 0→100% (2s), then overlay opacity 1→0 (0.6s). | Low |
| **Hero entrance sequence** | GSAP timeline | Staggered fade-up: eyebrow (0.6s delay) → headline lines (0.8s, 0.15s stagger) → subheadline (1.4s) → CTAs (1.8s, 0.1s stagger). | Low |
| **Scroll indicator** | CSS keyframes | Circle animates down vertical line, 2s infinite. Fades at 200px scroll. | Low |
| **Gradient border** | CSS @property + keyframes | Conic-gradient border with --angle animated 0→360deg, 6s linear infinite. | Low |
| **Tab crossfade** | CSS transition | Active tab content opacity 0→1, 0.3s. | Low |
| **Mobile logo carousel** | CSS scroll-snap | Horizontal overflow scroll with snap-type: x mandatory. | Low |
| **Lenis smooth scroll** | Lenis + GSAP ticker | Lenis RAF integrated via gsap.ticker. ScrollTrigger.update() on every lenis scroll event. | Low |

---

## State & Logic Plan

### Three.js ↔ React Bridge (AuraCanvas)

The Three.js scene runs entirely outside React's render cycle. Architecture:

- **AuraCanvas** component creates a `<div ref={containerRef}>` mount point.
- `useEffect` initializes the renderer, scene, camera, and all objects on mount.
- All animation state (time, mouse position, uniforms) is stored in a `useRef` object — never in React state.
- The render loop is a `requestAnimationFrame` callback that mutates uniforms and instance matrices directly.
- Cleanup: dispose renderer, geometries, materials, and cancel RAF on unmount.
- **Mouse sharing**: The hero HTML overlay has `pointer-events: auto` on interactive elements and `pointer-events: none` on the canvas container. Mouse events are captured on the container div and passed to the Three.js scene via a shared ref. This avoids React re-renders entirely.

### Loading Gate

A 3-state loading sequence:
1. **Loading**: Overlay visible, progress line animates.
2. **Ready**: Hero image `onLoad` fires + Three.js scene reports ready (first frame rendered). Both conditions must be true.
3. **Dismissed**: Overlay fades out, hero entrance timeline starts.

Use a single ref object `{ imageLoaded: boolean, sceneReady: boolean, dismissed: boolean }` with a `checkReady()` function that triggers dismissal when both image and scene are ready.

### Hero Pin + Tunnel Lifecycle

The hero section is pinned by GSAP ScrollTrigger for 2000px. The text tunnel (position: fixed, pointer-events: none) must:
- Be created on mount and always exist in DOM.
- During the pin: tunnel animations are active (camera z, ring rotation).
- After pin releases: tunnel fades out (opacity 1→0, 0.3s).
- When user scrolls back up into the hero pin range: tunnel fades back in.

This requires a ScrollTrigger `onLeave` / `onEnterBack` callback to toggle tunnel visibility.

### Scroll-Triggered Nav CTA Morph

Two CTA elements exist simultaneously:
- Hero CTA (in hero overlay): visible by default.
- Nav pill CTA (in nav bar): hidden by default (`opacity: 0, translateY(-100%)`).

A single `useEffect` attaches a scroll listener (or ScrollTrigger) at `scrollY = viewportHeight`. When crossed:
- Hero CTA → `opacity: 0, translateY(-20px), pointer-events: none`
- Nav pill → `opacity: 1, translateY(0)`

Reverse when scrolling back up.

### Tab State (MediaSection)

Local React state (`useState<number>`) tracks active tab index. Content area renders the active tab's component. Crossfade handled by CSS transition on a wrapper div's opacity.

---

## Other Key Decisions

### Raw Three.js (not React Three Fiber)

The design requires precise control over custom GLSL shaders, InstancedMesh with manual per-frame matrix updates, and OrthographicCamera with specific frustum scaling. R3F's declarative model adds overhead without benefit here. Use raw Three.js in a single `useEffect`.

### Raw GSAP (not @gsap/react)

The animation complexity is in custom timelines and scroll-scrubbed transforms, not in React lifecycle management. @gsap/react's `useGSAP` hook adds little value for this use case. Use raw GSAP with manual cleanup in `useEffect`.

### Font Strategy

Load Inter via the `geist` npm package's CSS file (`geist/font/sans.css`). This provides self-hosted variable font (300–700). No Google Fonts CDN needed. JetBrains Mono is optional — use `font-mono` with system monospace fallback unless explicitly needed.

### Image Strategy

Generate 3 images as specified in design.md Assets section. The hero image is loaded as a Three.js texture (TextureLoader). The other two are used as section backgrounds at reduced opacity. All images are pre-generated and stored in `/public/images/`.

### Mobile Degradation Plan

| Feature | Desktop | Mobile (< 768px) |
|---------|---------|------------------|
| Blob grid | 50×50 instances | 30×30 instances |
| Mouse interaction | Cursor-reactive | Disabled; auto circular motion |
| Text tunnel | 200 chars/ring | 100 chars/ring |
| Pipeline text | Full effect | Reduced 3D transform angles |
| Closing reveal | Full effect | Smaller dy values (200 vs 500) |
| Partners logos | Grid | Horizontal scroll-snap carousel |
| Nav | Full links | Hamburger menu |
