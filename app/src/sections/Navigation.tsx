import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Rozwiązanie', href: '#solution' },
  { label: 'Sposób wdrożenia', href: '#deployment' },
  { label: 'Dla kogo', href: '#audience' },
  { label: 'Kontakt', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);
      setHeroPassed(y > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      const links = mobileMenuRef.current.querySelectorAll('.mobile-link');
      gsap.fromTo(
        links,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(11, 19, 32, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="content-max-width flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-h3 font-medium text-offwhite tracking-tight"
          >
            UNA
          </a>

          {/* Center nav - desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="text-body text-offwhite/70 hover:text-offwhite transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-offwhite transition-all duration-250 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Language + CTA */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              <button
                className="px-2 py-1 text-label font-medium transition-colors duration-200"
                style={{
                  color: 'var(--amber-light)',
                  backgroundColor: 'rgba(255, 195, 0, 0.1)',
                  borderRadius: '4px',
                }}
              >
                PL
              </button>
              <button
                className="px-2 py-1 text-label font-medium transition-colors duration-200 hover:text-offwhite"
                style={{ color: 'var(--offwhite)' }}
              >
                EN
              </button>
              <button
                className="px-2 py-1 text-label font-medium transition-colors duration-200 hover:text-offwhite"
                style={{ color: 'var(--offwhite)' }}
              >
                DE
              </button>
            </div>

            {/* Divider */}
            <div
              className="hidden md:block w-px h-6 mr-1"
              style={{ backgroundColor: 'var(--teal-muted)' }}
            />

            {/* Right CTA */}
            {/* Hero CTA - shown initially, hides after hero */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#closing');
              }}
              className="hidden md:inline-flex items-center px-6 py-3 rounded-button font-medium transition-all duration-300"
              style={{
                backgroundColor: !heroPassed ? 'var(--amber-light)' : 'transparent',
                color: !heroPassed ? 'var(--navy-base)' : 'transparent',
                opacity: !heroPassed ? 1 : 0,
                transform: !heroPassed ? 'translateY(0)' : 'translateY(-100%)',
                pointerEvents: !heroPassed ? 'auto' : 'none',
              }}
            >
              Porozmawiajmy
            </a>

            {/* Nav pill CTA - appears after hero */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#closing');
              }}
              className="hidden md:inline-flex items-center px-4 py-2 rounded-pill font-medium text-label transition-all duration-300"
              style={{
                backgroundColor: 'var(--amber-light)',
                color: 'var(--navy-base)',
                opacity: heroPassed ? 1 : 0,
                transform: heroPassed ? 'translateY(0)' : 'translateY(-100%)',
                pointerEvents: heroPassed ? 'auto' : 'none',
                position: heroPassed ? 'relative' : 'absolute',
              }}
            >
              Porozmawiajmy
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-offwhite p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: 'var(--navy-base)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="mobile-link text-h2 text-offwhite hover:text-teal-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#closing"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#closing');
            }}
            className="mobile-link mt-4 text-body-lg text-amber-light hover:text-amber-deep transition-colors"
          >
            Porozmawiajmy
          </a>
        </div>
      )}
    </>
  );
}
