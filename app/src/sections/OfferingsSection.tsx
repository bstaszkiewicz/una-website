import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AccordionItem from '@/components/AccordionItem';
import { CheckCircle2, Database, Cog, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '5', label: 'rozproszonych systemów IT bez wspólnej warstwy rozliczeniowej' },
  { value: '80%', label: 'przemysłowych hubów energetycznych rozlicza energię post factum' },
  { value: '3–5 mld EUR', label: 'wartość europejskiego rynku systemów rozliczeniowych' },
];

const areas = [
  {
    icon: Database,
    title: 'Dane',
    color: 'var(--teal-accent)',
    items: ['Energia elektryczna', 'Gaz', 'Źródła wytwórcze', 'Magazyny i elastyczność', 'Ograniczenia sieciowe'],
  },
  {
    icon: Cog,
    title: 'Procesy',
    color: 'var(--amber-light)',
    items: ['Optymalizacja i sterowanie', 'Rozliczenia (settlement)', 'Kontrola należności'],
  },
  {
    icon: Shield,
    title: 'Wsparcie',
    color: 'var(--teal-deep)',
    items: ['Raportowanie i audyt', 'Kontrola należności'],
  },
];

const modes = [
  {
    title: 'Jedna baza danych',
    desc: 'Wszystkie dane energetyczne w jednym modelu — energia, gaz, źródła, magazyny.',
  },
  {
    title: 'Automatyczne rozliczenia',
    desc: 'Settlement w czasie rzeczywistym, bez ręcznych uzgodnień i arkuszy Excel.',
  },
  {
    title: 'Raporty zarządcze',
    desc: 'Raporty regulacyjne, ESG i audytowe generowane automatycznie.',
  },
  {
    title: 'Kontrola należności',
    desc: 'Monitoring płatności, spory i korekty w jednym miejscu.',
  },
];

export default function OfferingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.offering-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="offerings"
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: 'var(--navy-deep)' }}
    >
      <div className="content-max-width">
        {/* Section eyebrow */}
        <div className="pt-20 md:pt-32 pb-4">
          <div className="offering-header eyebrow mb-6">CO OFERUJEMY</div>
          <h2 className="offering-header text-h1 text-offwhite max-w-[700px]">
            Jedna warstwa zamiast pięciu rozproszonych systemów
          </h2>
        </div>

        {/* PROBLEM — Accordion */}
        <AccordionItem tags={['PROBLEM']} title="Rozproszone dane, brak jednej warstwy">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-body-lg text-offwhite/70 mb-6">
                Problemem energetyki nie jest brak danych. Problemem jest brak warstwy, która je łączy — w czasie rzeczywistym, nie post factum.
              </p>
              <p className="text-body text-offwhite/50 mb-8">
                Dziś dane o energii elektrycznej, gazie, źródłach wytwórczych i magazynach żyją w oddzielnych systemach. Nie ma jednej warstwy, która potrafi te dane połączyć, uzgodnić, rozliczyć i obronić przed finansami, audytem, regulatorem i zarządem.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#solution"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#solution')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-3 px-6 py-3 font-medium text-body transition-all duration-300 hover:gap-5"
                  style={{ backgroundColor: 'var(--amber-light)', color: 'var(--navy-base)' }}
                >
                  <span>Zobacz rozwiązanie</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-card"
                  style={{
                    backgroundColor: 'var(--navy-mid)',
                    borderTop: '2px solid var(--teal-accent)',
                  }}
                >
                  <div className="text-data" style={{ color: 'var(--amber-light)', fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                    {stat.value}
                  </div>
                  <p className="text-body text-offwhite/60 mt-3">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </AccordionItem>

        {/* SOLUTION — Accordion */}
        <AccordionItem tags={['ROZWIĄZANIE', 'ARCHITEKTURA']} title="UNA — 9 modułów w 3 obszarach" defaultOpen>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-body-lg text-offwhite/70 mb-6">
                Od danych do wyniku. W czasie rzeczywistym.
              </p>
              <div className="space-y-4">
                {modes.map((mode, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} style={{ color: 'var(--teal-accent)' }} className="mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-body text-offwhite font-medium">{mode.title}</span>
                      <p className="text-body text-offwhite/50">{mode.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              {areas.map((area, i) => {
                const Icon = area.icon;
                return (
                  <div
                    key={i}
                    className="flex-1 p-6 rounded-panel"
                    style={{
                      backgroundColor: 'var(--navy-mid)',
                      borderTop: `2px solid ${area.color}`,
                    }}
                  >
                    <Icon size={28} style={{ color: area.color }} strokeWidth={1.5} className="mb-4" />
                    <h4 className="text-h3 text-offwhite mb-3">{area.title}</h4>
                    <ul className="space-y-2">
                      {area.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--teal-accent)' }} />
                          <span className="font-mono text-mono text-offwhite/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </AccordionItem>

        {/* DEPLOYMENT MODE 1 */}
        <AccordionItem tags={['TRYB 01', 'BILLING']} title="UNA jako główny billing huba">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-body-lg text-offwhite/70 mb-6">
                Zastępuj rozproszone billingi, arkusze i narzędzia jednym systemem rozliczeniowym. UNA staje się centralną warstwą finansową całego huba.
              </p>
              <ul className="space-y-3">
                {['Jedna baza danych', 'Automatyczne rozliczenia', 'Raporty zarządcze', 'Kontrola należności'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} style={{ color: 'var(--teal-accent)' }} className="mt-0.5 flex-shrink-0" />
                    <span className="text-body text-offwhite/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-panel flex items-center justify-center min-h-[240px]"
              style={{ backgroundColor: 'var(--navy-mid)' }}
            >
              <img
                src="/images/energy-grid-abstract.jpg"
                alt="Energy grid"
                className="w-full h-full object-cover rounded-panel opacity-60"
              />
            </div>
          </div>
        </AccordionItem>

        {/* DEPLOYMENT MODE 2 */}
        <AccordionItem tags={['TRYB 02', 'INTEGRACJA']} title="UNA jako warstwa nad istniejącymi systemami">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-body-lg text-offwhite/70 mb-6">
                Integruje dane z ERP, CRM, ETRM, EMS/SCADA bez wymiany infrastruktury IT. Szybkie wdrożenie, natychmiastowa wartość.
              </p>
              <ul className="space-y-3">
                {['Otwarte API', 'Modułowa architektura', 'Brak zmian w istniejących systemach', 'Wdrożenie w tygodnie'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} style={{ color: 'var(--teal-accent)' }} className="mt-0.5 flex-shrink-0" />
                    <span className="text-body text-offwhite/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-panel flex items-center justify-center min-h-[240px]"
              style={{ backgroundColor: 'var(--navy-mid)' }}
            >
              <img
                src="/images/industrial-facility.jpg"
                alt="Industrial facility"
                className="w-full h-full object-cover rounded-panel opacity-60"
              />
            </div>
          </div>
        </AccordionItem>

        {/* DEPLOYMENT MODE 3 */}
        <AccordionItem tags={['TRYB 03', 'OPTMALIZACJA']} title="UNA jako silnik optymalizacji">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-body-lg text-offwhite/70 mb-6">
                Wykorzystuje dane z UNA do optymalizacji zakupów, produkcji i magazynowania energii. Decyzje oparte na danych w czasie rzeczywistym.
              </p>
              <ul className="space-y-3">
                {['Predykcja zużycia', 'Optymalizacja PPA', 'Reakcja na ograniczenia OSD', 'Automatyczne alerty'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} style={{ color: 'var(--teal-accent)' }} className="mt-0.5 flex-shrink-0" />
                    <span className="text-body text-offwhite/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-panel flex items-center justify-center min-h-[240px]"
              style={{ backgroundColor: 'var(--navy-mid)' }}
            >
              <img
                src="/images/hero-control-room.jpg"
                alt="Control room"
                className="w-full h-full object-cover rounded-panel opacity-60"
              />
            </div>
          </div>
        </AccordionItem>

        <div style={{ borderTop: '1px solid rgba(0, 180, 216, 0.12)' }} />
      </div>
    </section>
  );
}
