import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const placeholderLogos = [
  'Utility Partner',
  'ESCO Group',
  'Energy Corp',
  'Power Systems',
  'Grid Solutions',
  'Green Energy',
];

export default function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.partner-animate'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full band-padding"
      style={{ backgroundColor: '#111e35' }}
    >
      <div className="content-max-width">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <h2 className="partner-animate text-h2 text-offwhite">Zaufali nam</h2>
          <h2 className="partner-animate text-h2 text-offwhite/50">Współpracujemy z</h2>
        </div>

        {/* Logo grid - desktop */}
        <div className="hidden md:grid grid-cols-6 gap-6 mb-10">
          {placeholderLogos.map((name, i) => (
            <div
              key={i}
              className="partner-animate flex items-center justify-center h-20 rounded-card transition-all duration-300 hover:border-cyan-accent/40 hover:bg-navy-mid"
              style={{
                border: '1px dashed var(--cyan-muted)',
              }}
            >
              <span className="font-mono text-mono text-offwhite/30">{name}</span>
            </div>
          ))}
        </div>

        {/* Logo carousel - mobile */}
        <div
          className="md:hidden flex gap-4 overflow-x-auto pb-4 mb-10 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {placeholderLogos.map((name, i) => (
            <div
              key={i}
              className="partner-animate flex-shrink-0 flex items-center justify-center w-40 h-20 rounded-card snap-start"
              style={{
                border: '1px dashed var(--cyan-muted)',
              }}
            >
              <span className="font-mono text-mono text-offwhite/30">{name}</span>
            </div>
          ))}
        </div>

        <div
          className="partner-animate w-full h-px mb-8"
          style={{ backgroundColor: 'var(--cyan-muted)' }}
        />

        <p className="partner-animate text-body text-offwhite/50 text-center max-w-[600px] mx-auto">
          Aktywnie rozwijamy sieć partnerów wdrożeniowych — sprzedawcy energii, ESCO, zarządzający aktywami.
        </p>
      </div>
    </section>
  );
}
