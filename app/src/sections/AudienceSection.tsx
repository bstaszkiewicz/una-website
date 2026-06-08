import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Factory, Sun, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const audiences = [
  {
    icon: Factory,
    title: 'Wysokoenergochłonny przemysł',
    description: 'Piekarnie, metalurgia, przetwórstwo spożywcze. Firmy, dla których energia to znaczący koszt operacyjny.',
    tag: 'PRZEMYSŁ',
  },
  {
    icon: Sun,
    title: 'Z własnymi źródłami energii',
    description: 'PV, kogeneracja, magazyny energii, PPA. Firmy produkujące i konsumujące energię jednocześnie.',
    tag: 'PROSUMENT',
  },
  {
    icon: Building2,
    title: 'Parki przemysłowe i klastry',
    description: 'Rozliczenia między wieloma podmiotami w grupie. Złożony miks energetyczny wymagający jednego modelu.',
    tag: 'KLASTER',
  },
];

export default function AudienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.audience-animate'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="audience"
      ref={sectionRef}
      className="w-full section-padding"
      style={{ backgroundColor: 'var(--navy-base)' }}
    >
      <div className="content-max-width">
        <div className="eyebrow mb-6 audience-animate">DLA KOGO</div>

        <h2 className="text-h1 text-offwhite mb-16 audience-animate">
          Przemysł jako pierwszy segment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="audience-animate p-10 rounded-panel transition-all duration-300 hover:-translate-y-1 hover:border"
                style={{
                  backgroundColor: 'var(--navy-mid)',
                  borderColor: 'var(--teal-muted)',
                }}
              >
                <Icon
                  size={64}
                  strokeWidth={1}
                  style={{ color: 'var(--teal-accent)', opacity: 0.6 }}
                  className="mb-6"
                />

                <span
                  className="inline-block font-mono text-mono px-3 py-1 rounded-pill mb-4"
                  style={{
                    backgroundColor: 'var(--navy-mid)',
                    border: '1px solid var(--teal-muted)',
                    color: 'var(--teal-accent)',
                  }}
                >
                  {item.tag}
                </span>

                <h3 className="text-h3 text-offwhite mb-4">{item.title}</h3>

                <p className="text-body text-offwhite/65">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
