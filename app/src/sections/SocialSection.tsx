import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SocialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.social-animate'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
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
      style={{
        background: 'linear-gradient(180deg, var(--navy-base) 0%, var(--navy-deep) 100%)',
      }}
    >
      <div className="content-max-width text-center">
        <p className="social-animate eyebrow mb-6">ŚLEDŹ NAS</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-animate inline-flex items-center px-6 py-3 rounded-pill border transition-all duration-250 hover:border-teal-accent hover:bg-teal-accent/10"
            style={{
              backgroundColor: 'var(--navy-mid)',
              borderColor: 'var(--teal-muted)',
              color: 'var(--offwhite)',
            }}
          >
            X / Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-animate inline-flex items-center px-6 py-3 rounded-pill border transition-all duration-250 hover:border-teal-accent hover:bg-teal-accent/10"
            style={{
              backgroundColor: 'var(--navy-mid)',
              borderColor: 'var(--teal-muted)',
              color: 'var(--offwhite)',
            }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
