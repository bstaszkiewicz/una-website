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
        borderTop: '1px solid var(--cyan-muted)',
      }}
    >
      <div className="content-max-width pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img src="/images/logo/una-mark-light.png" alt="UNA" style={{ height: 30, width: 'auto', display: 'block', marginBottom: 12 }} />
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
                style={{ color: 'var(--cyan-accent)' }}
              >
                contact@una.energy
              </a>
              <a
                href="https://una.energy"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-body transition-colors duration-200"
                style={{ color: 'var(--cyan-accent)' }}
              >
                una.energy
              </a>
              <div className="mt-3 pt-3 space-y-1" style={{ borderTop: '1px solid var(--cyan-muted)' }}>
                <p className="text-mono text-offwhite/40 text-xs">Magdalena Sokalska</p>
                <p className="text-mono text-offwhite/40 text-xs">Co-founder · Biznes & Regulacje</p>
              </div>
              <div className="pt-1 space-y-1">
                <p className="text-mono text-offwhite/40 text-xs">Bartłomiej Staszkiewicz</p>
                <p className="text-mono text-offwhite/40 text-xs">Co-founder · Technologia</p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://x.com/UNA_ENERGY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-offwhite/50 hover:text-cyan-accent transition-colors duration-200"
                  aria-label="X / Twitter"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/una-energy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-offwhite/50 hover:text-cyan-accent transition-colors duration-200"
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
        <div className="mb-10">
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
            </svg>
            <div>
              <p className="text-h3 text-offwhite font-semibold mb-4">UNA Energy P.S.A.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 40, rowGap: 12, maxWidth: 420 }}>
                <span className="font-mono text-mono text-offwhite/40">ADRES</span>
                <span className="text-body text-offwhite/70">ul. Stanisława Moniuszki 11<br />PL-35-015, Rzeszów</span>
                <span className="font-mono text-mono text-offwhite/40">KRS</span>
                <span className="text-body text-offwhite/70">0001243222</span>
                <span className="font-mono text-mono text-offwhite/40">NIP</span>
                <span className="text-body text-offwhite/70">8133952850</span>
                <span className="font-mono text-mono text-offwhite/40">REGON</span>
                <span className="text-body text-offwhite/70">54484719800000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: '1px solid var(--cyan-muted)' }}
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
