import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, TrendingDown, Users, FileCheck, Cpu, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Zap,
    title: 'Rozliczenia w czasie rzeczywistym',
    description: 'Przeciwnie do klasycznych billingów rozliczających post factum — UNA działa na żywo. Czas zużycia i produkcji ma realną wartość finansową.',
  },
  {
    icon: TrendingDown,
    title: 'Redukcja kosztów operacyjnych',
    description: 'Zamiast 5 rozproszonych systemów — jedna platforma. Mniej licencji, mniej integracji, mniej ręcznej pracy. Natychmiastowe oszczędności.',
  },
  {
    icon: Cpu,
    title: 'AI/ML ready',
    description: 'Data-driven: agregacja danych operacyjnych huba. Modele predykcji zużycia i optymalizacji w czasie rzeczywistym. Agent Ready: autonomiczne decyzje handlowe 24/7.',
  },
  {
    icon: ShieldCheck,
    title: 'Bezpieczeństwo i compliance',
    description: 'Security by Design, zgodność z RODO, niezmienny zapis zdarzeń pod wymogi regulacyjne. Ślad audytowy dla każdej transakcji.',
  },
  {
    icon: FileCheck,
    title: 'Raportowanie ESG i regulacyjne',
    description: 'Raporty zarządcze, ESG, ślad audytowy i compliance — generowane automatycznie. Gotowe pod audyt regulatora i zarządu.',
  },
  {
    icon: Users,
    title: 'Self-service dla klienta',
    description: 'Klient samodzielnie konfiguruje, raportuje i analizuje — bez czekania na konsultantów i zewnętrzne wdrożenia. Pełna kontrola.',
  },
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.benefit-animate'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full section-padding"
      style={{
        backgroundColor: 'var(--navy-base)',
        borderTop: '1px solid rgba(0, 180, 216, 0.12)',
      }}
    >
      <div className="content-max-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: sticky heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="eyebrow mb-6 benefit-animate" style={{ color: 'var(--teal-accent)' }}>
              KORZYŚCI
            </div>
            <h2 className="text-h1 text-offwhite benefit-animate">
              Dlaczego firmy wybierają UNA
            </h2>
          </div>

          {/* Right: benefit cards */}
          <div className="space-y-0">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="benefit-animate py-8"
                  style={{
                    borderBottom: i < benefits.length - 1 ? '1px solid rgba(0, 180, 216, 0.12)' : 'none',
                  }}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-card flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(0, 180, 216, 0.1)' }}
                    >
                      <Icon size={20} style={{ color: 'var(--teal-accent)' }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-h3 text-offwhite mb-2">{benefit.title}</h3>
                      <p className="text-body text-offwhite/55">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
