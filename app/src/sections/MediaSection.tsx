import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tabs = ['Publikacje', 'Baza wiedzy', 'W mediach', 'Newsletter'];

const publications = [
  { title: 'Przyszłość rozliczeń energetycznych w przemyśle', date: '2026-05-15' },
  { title: 'Jak połączyć dane z 5 systemów w jeden model', date: '2026-04-22' },
  { title: 'Real-time settlement: od teorii do praktyki', date: '2026-03-10' },
];

const knowledgeBase = [
  { title: 'Architektura UNA — 9 modułów', description: 'Szczegółowy opis architektury platformy' },
  { title: 'Wdrożenie Tryb 1: Główny billing', description: 'Przewodnik po wdrożeniu UNA jako głównego systemu' },
  { title: 'Integracja z EMS/SCADA', description: 'Jak połączyć UNA z istniejącymi systemami pomiarowymi' },
  { title: 'Raportowanie ESG i audyt', description: 'Generowanie raportów regulacyjnych i śladu audytowego' },
];

const pressMentions = [
  { publication: 'Biznes Energia', title: 'Startupy zmieniają rynek rozliczeń energetycznych', date: '2026-05-01' },
  { publication: 'PSE Portal', title: 'Nowe technologie w zarządzaniu hubami energetycznymi', date: '2026-04-18' },
  { publication: 'Rynek Energii', title: 'UNA wprowadza real-time settlement dla przemysłu', date: '2026-03-25' },
];

export default function MediaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.media-animate'),
        { opacity: 0, y: 30 },
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
      id="media"
      ref={sectionRef}
      className="w-full section-padding"
      style={{ backgroundColor: 'var(--navy-base)' }}
    >
      <div className="content-max-width">
        <div className="eyebrow mb-6 media-animate">MEDIA I PUBLIKACJE</div>

        <h2 className="text-h1 text-offwhite mb-10 media-animate">Baza wiedzy</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-6 mb-12 border-b media-animate" style={{ borderColor: 'var(--teal-muted)' }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="eyebrow pb-4 transition-all duration-200"
              style={{
                color: activeTab === i ? 'var(--offwhite)' : 'var(--offwhite)',
                opacity: activeTab === i ? 1 : 0.4,
                borderBottom: activeTab === i ? '2px solid var(--amber-light)' : '2px solid transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="relative min-h-[300px]">
          {/* Publikacje */}
          <div
            className="transition-opacity duration-300"
            style={{ opacity: activeTab === 0 ? 1 : 0, pointerEvents: activeTab === 0 ? 'auto' : 'none', position: activeTab === 0 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publications.map((pub, i) => (
                <div
                  key={i}
                  className="group cursor-pointer"
                >
                  <div
                    className="aspect-video rounded-t-card mb-4 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--navy-mid)' }}
                  >
                    <FileText size={32} style={{ color: 'var(--teal-accent)', opacity: 0.5 }} />
                  </div>
                  <h3 className="text-h3 text-offwhite mb-2 line-clamp-2 group-hover:text-teal-accent transition-colors">
                    {pub.title}
                  </h3>
                  <span className="font-mono text-mono" style={{ color: 'var(--teal-accent)' }}>
                    {pub.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Baza wiedzy */}
          <div
            className="transition-opacity duration-300"
            style={{ opacity: activeTab === 1 ? 1 : 0, pointerEvents: activeTab === 1 ? 'auto' : 'none', position: activeTab === 1 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {knowledgeBase.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-card transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  style={{ backgroundColor: 'var(--navy-mid)' }}
                >
                  <FileText size={32} style={{ color: 'var(--teal-accent)' }} className="mb-4" />
                  <h3 className="text-h3 text-offwhite mb-2">{item.title}</h3>
                  <p className="text-body text-offwhite/60">{item.description}</p>
                  <span className="inline-block mt-4 text-teal-accent hover:underline text-body">
                    Pobierz
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* W mediach */}
          <div
            className="transition-opacity duration-300"
            style={{ opacity: activeTab === 2 ? 1 : 0, pointerEvents: activeTab === 2 ? 'auto' : 'none', position: activeTab === 2 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
          >
            <div className="space-y-0">
              {pressMentions.map((mention, i) => (
                <div
                  key={i}
                  className="py-6"
                  style={{
                    borderBottom: i < pressMentions.length - 1 ? '1px solid var(--teal-muted)' : 'none',
                  }}
                >
                  <span className="font-mono text-mono block mb-2" style={{ color: 'var(--teal-accent)' }}>
                    {mention.publication}
                  </span>
                  <h3 className="text-h3 text-offwhite mb-1">{mention.title}</h3>
                  <span className="text-body text-offwhite/50">{mention.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div
            className="transition-opacity duration-300"
            style={{ opacity: activeTab === 3 ? 1 : 0, pointerEvents: activeTab === 3 ? 'auto' : 'none', position: activeTab === 3 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
          >
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-h2 text-offwhite mb-4">Bądź na bieżąco</h3>
              <p className="text-body text-offwhite/60 mb-8">
                Co tydzień najważniejsze informacje z rynku energii i technologii rozliczeniowych.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  placeholder="Twój adres e-mail"
                  className="flex-1 px-4 py-3 rounded-button text-offwhite outline-none transition-colors duration-200 focus:border-teal-accent"
                  style={{
                    backgroundColor: 'var(--navy-mid)',
                    border: '1px solid var(--teal-muted)',
                  }}
                />
                <button
                  type="submit"
                  className="px-8 py-3 rounded-button font-medium transition-all duration-250 hover:shadow-[0_0_20px_rgba(255,195,0,0.25)]"
                  style={{
                    backgroundColor: 'var(--amber-light)',
                    color: 'var(--navy-base)',
                  }}
                >
                  Zapisz się
                </button>
              </form>
              <p className="text-body text-offwhite/40 mt-4 text-sm">
                Zapisując się, akceptujesz politykę prywatności.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
