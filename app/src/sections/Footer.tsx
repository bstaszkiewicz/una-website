export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="contact"
      className="w-full"
      style={{
        backgroundColor: 'var(--navy-deep)',
        borderTop: '1px solid var(--teal-muted)',
      }}
    >
      <div className="content-max-width pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="text-h2 font-medium text-offwhite mb-3">UNA</div>
            <p className="text-body text-offwhite/50">
              Brakująca warstwa rozliczeń energetycznych
            </p>
          </div>

          {/* Solution */}
          <div>
            <h4 className="text-h3 text-offwhite mb-4">Rozwiązanie</h4>
            <ul className="space-y-2">
              {[
                { label: 'Problem', href: '#problem' },
                { label: 'Architektura', href: '#solution' },
                { label: 'Tryby wdrożenia', href: '#deployment' },
                { label: 'Technologia', href: '#pipeline' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-body text-offwhite/50 hover:text-offwhite transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-h3 text-offwhite mb-4">Firma</h4>
            <ul className="space-y-2">
              {['O nas', 'Zespół', 'Kariera', 'Kontakt'].map((label) => (
                <li key={label}>
                  <span className="text-body text-offwhite/50 hover:text-offwhite transition-colors duration-200 cursor-pointer">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-h3 text-offwhite mb-4">Kontakt</h4>
            <div className="space-y-2">
              <a
                href="mailto:contact@una.energy"
                className="block text-body transition-colors duration-200 hover:underline"
                style={{ color: 'var(--teal-accent)' }}
              >
                contact@una.energy
              </a>
              <a
                href="https://una.energy"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-body transition-colors duration-200"
                style={{ color: 'var(--teal-accent)' }}
              >
                una.energy
              </a>
              <div className="mt-3 pt-3 space-y-1" style={{ borderTop: '1px solid var(--teal-muted)' }}>
                <p className="text-mono text-offwhite/40 text-xs">Magdalena Sokalska</p>
                <p className="text-mono text-offwhite/40 text-xs">Co-founder · Biznes & Regulacje</p>
              </div>
              <div className="pt-1 space-y-1">
                <p className="text-mono text-offwhite/40 text-xs">Bartłomiej Staszkiewicz</p>
                <p className="text-mono text-offwhite/40 text-xs">Co-founder · Technologia</p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-offwhite/50 hover:text-teal-accent transition-colors duration-200"
                  aria-label="X / Twitter"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-offwhite/50 hover:text-teal-accent transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dane rejestrowe */}
        <div
          className="mb-10 p-6 rounded-card"
          style={{
            backgroundColor: 'var(--navy-mid)',
            border: '1px solid var(--teal-muted)',
          }}
        >
          <h4 className="text-h3 text-offwhite/80 mb-4">Dane rejestrowe</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            <div>
              <span className="font-mono text-mono text-offwhite/40 block">KRS</span>
              <span className="text-body text-offwhite/70">0001243222</span>
            </div>
            <div>
              <span className="font-mono text-mono text-offwhite/40 block">REGON</span>
              <span className="text-body text-offwhite/70">54484719800000</span>
            </div>
            <div>
              <span className="font-mono text-mono text-offwhite/40 block">NIP</span>
              <span className="text-body text-offwhite/70">8133952850</span>
            </div>
            <div>
              <span className="font-mono text-mono text-offwhite/40 block">Oficjalna nazwa</span>
              <span className="text-body text-offwhite/70">UNA ENERGY</span>
            </div>
            <div className="sm:col-span-2">
              <span className="font-mono text-mono text-offwhite/40 block">Adres rejestracji</span>
              <span className="text-body text-offwhite/70">UL. STANISŁAWA MONIUSZKI 11, PL-35-015, RZESZÓW</span>
            </div>
            <div>
              <span className="font-mono text-mono text-offwhite/40 block">Data rejestracji KRS</span>
              <span className="text-body text-offwhite/70">2026-05-26</span>
            </div>
            <div>
              <span className="font-mono text-mono text-offwhite/40 block">Forma prawna</span>
              <span className="text-body text-offwhite/70">Prosta spółka akcyjna</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: '1px solid var(--teal-muted)' }}
        >
          <p className="text-sm text-offwhite/30">
            &copy; 2026 UNA. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-4 text-sm text-offwhite/30">
            <span className="hover:text-offwhite/60 transition-colors cursor-pointer">
              Polityka prywatności
            </span>
            <span>&middot;</span>
            <span className="hover:text-offwhite/60 transition-colors cursor-pointer">
              Regulamin
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
