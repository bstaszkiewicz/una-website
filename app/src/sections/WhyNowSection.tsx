import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Sun, Leaf, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const drivers = [
  {
    num: '01',
    icon: TrendingUp,
    title: 'Zmienność cen energii i gazu',
    description: 'Czas zużycia i produkcji ma realną wartość finansową. Ceny zmieniają się godzinowo — rozliczenia post factum tracą pieniądze.',
  },
  {
    num: '02',
    icon: Sun,
    title: 'Rozwój OZE i magazynów',
    description: 'Tworzy nowe źródła wartości, ale też nowe problemy rozliczeniowe. PV, kogeneracja, magazyny — każde źródło to osobny billing.',
  },
  {
    num: '03',
    icon: Leaf,
    title: 'Presja ESG i dekarbonizacyjna',
    description: 'Wymaga danych o pochodzeniu energii, emisjach i efekcie decyzji operacyjnych. Audytorzy i regulatorzy chcą danych w czasie rzeczywistym.',
  },
  {
    num: '04',
    icon: Zap,
    title: 'OSD i ograniczenia sieciowe',
    description: 'Stają się elementem realnej optymalizacji, a nie tylko formalnym tłem. Moc przyłączeniowa, PPE, profile — to wpływa na koszt.',
  },
];

export default function WhyNowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.whynow-animate'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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
      id="whynow"
      ref={sectionRef}
      className="w-full band-padding"
      style={{
        background: 'linear-gradient(180deg, var(--navy-base) 0%, #0f1f38 100%)',
      }}
    >
      <div className="content-max-width">
        <div className="eyebrow mb-6 whynow-animate">DLACZEGO TERAZ</div>

        <h2 className="text-h1 text-offwhite max-w-[900px] mb-6 whynow-animate">
          Koszt energii zmienia się dziś zbyt szybko, żeby rozliczać go po fakcie
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {drivers.map((driver, i) => {
            const Icon = driver.icon;
            return (
              <div
                key={i}
                className="whynow-animate p-6 rounded-card transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  backgroundColor: 'var(--navy-mid)',
                  borderTop: '2px solid var(--cyan-deep)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-mono"
                    style={{ color: 'var(--lime)', opacity: 0.6 }}
                  >
                    {driver.num}
                  </span>
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    style={{ color: 'var(--cyan-accent)', opacity: 0.5 }}
                    className="group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="text-h3 text-offwhite mb-3">{driver.title}</h3>
                <p className="text-body text-offwhite/60">{driver.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
