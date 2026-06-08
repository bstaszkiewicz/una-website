import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.cta-animate'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--navy-deep) 0%, #0a1a35 40%, #0d2045 60%, var(--navy-deep) 100%)',
      }}
    >
      {/* Decorative gradient lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-px h-full"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,180,216,0.08), transparent)' }}
        />
        <div
          className="absolute top-0 right-1/3 w-px h-full"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,195,0,0.06), transparent)' }}
        />
        <div
          className="absolute top-1/3 left-0 w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(0,180,216,0.05), transparent)' }}
        />
      </div>

      <div className="content-max-width relative z-10 py-24 md:py-32 text-center">
        <h2 className="cta-animate text-h1 text-offwhite max-w-[800px] mx-auto mb-6">
          Gotowy na rozliczenia w czasie rzeczywistym?
        </h2>

        <p className="cta-animate text-body-lg text-offwhite/60 max-w-[600px] mx-auto mb-10">
          Porozmawiaj z naszym zespołem o tym, jak UNA może zintegrować Twoje dane energetyczne i zastąpić rozproszone systemy jedną warstwą.
        </p>

        <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:contact@una.energy"
            className="inline-flex items-center gap-3 px-8 py-4 font-medium transition-all duration-300 hover:gap-5 hover:shadow-[0_0_30px_rgba(255,195,0,0.25)]"
            style={{ backgroundColor: 'var(--amber-light)', color: 'var(--navy-base)' }}
          >
            <span>Porozmawiajmy</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="mailto:contact@una.energy"
            className="inline-flex items-center px-8 py-4 font-medium border transition-all duration-300 hover:border-teal-accent hover:bg-teal-accent/5"
            style={{ borderColor: 'var(--teal-muted)', color: 'var(--offwhite)' }}
          >
            contact@una.energy
          </a>
        </div>
      </div>
    </section>
  );
}
