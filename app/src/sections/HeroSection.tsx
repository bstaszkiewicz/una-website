import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import AuraCanvas from '@/components/AuraCanvas';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const handleSceneReady = useCallback(() => {
    setLoaded(true);
  }, []);

  // Hero entrance animation
  useEffect(() => {
    if (!loaded || !contentRef.current) return;

    const tl = gsap.timeline();
    const eyebrow = contentRef.current.querySelector('.hero-eyebrow');
    const headline = contentRef.current.querySelector('.hero-headline');
    const subheadline = contentRef.current.querySelector('.hero-subheadline');
    const cta = contentRef.current.querySelector('.hero-cta');

    tl.fromTo(eyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 })
      .fromTo(headline, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '-=0.4')
      .fromTo(subheadline, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '-=0.6')
      .fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6');

    return () => { tl.kill(); };
  }, [loaded]);

  // Scroll indicator fade
  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        const y = window.scrollY;
        scrollIndicatorRef.current.style.opacity = y > 200 ? '0' : '1';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', backgroundColor: 'var(--navy-deep)' }}
    >
      {/* Loading overlay */}
      {!loaded && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--navy-deep)' }}
        >
          <div className="text-h3 font-medium text-offwhite mb-4">UNA</div>
          <div className="w-32 h-0.5 overflow-hidden rounded-full" style={{ backgroundColor: 'var(--navy-mid)' }}>
            <div
              className="h-full rounded-full"
              style={{
                backgroundColor: 'var(--lime)',
                animation: 'loadingLine 2s ease-in-out forwards',
              }}
            />
          </div>
          <style>{`
            @keyframes loadingLine {
              0% { width: 0%; }
              50% { width: 70%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      )}

      {/* Three.js Aura Canvas - positioned on the right half */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <AuraCanvas onReady={handleSceneReady} />
      </div>

      {/* Gradient overlay to blend left edge */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, var(--navy-deep) 0%, var(--navy-deep) 30%, transparent 55%)',
        }}
      />

      {/* HTML Content - left aligned like snowstack */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex items-center pointer-events-none"
      >
        <div className="content-max-width w-full">
          <div className="max-w-[600px]">
            <div className="hero-eyebrow opacity-0 eyebrow mb-6 tracking-[0.15em]">
              PLATFORMA ROZLICZENIOWA
            </div>

            <h1 className="hero-headline opacity-0 text-h1 text-offwhite mb-6">
              Brakująca warstwa rozliczeń energetycznych w czasie rzeczywistym
            </h1>

            <p className="hero-subheadline opacity-0 text-body-lg text-offwhite/70 mb-10 max-w-[520px]">
              UNA łączy dane z ERP, EMS/SCADA i ETRM w jednym systemie rozliczeniowym dla przemysłowych hubów energetycznych.
            </p>

            <div className="hero-cta opacity-0 flex flex-wrap items-center gap-4 pointer-events-auto">
              <a
                href="#closing"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#closing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-8 py-4 rounded-button font-medium transition-all duration-250 hover:shadow-[0_0_20px_rgba(196,220,106,0.25)]"
                style={{ backgroundColor: 'var(--lime)', color: 'var(--navy-base)' }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--lime-deep)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--lime)';
                }}
              >
                Porozmawiajmy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - bottom left like snowstack */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] z-10 transition-opacity duration-500"
      >
        <div
          className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            border: '1px solid var(--cyan-muted)',
            backgroundColor: 'rgba(20, 33, 61, 0.6)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--offwhite)" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
