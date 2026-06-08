import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ClosingSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const spanTopRef = useRef<HTMLSpanElement>(null);
  const spanBottomRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Split text into words for reveal
      const words = textRef.current!.querySelectorAll('.reveal-word');
      
      // Set initial state
      gsap.set(words, { overflow: 'hidden', display: 'inline-block' });
      
      const innerSpans = textRef.current!.querySelectorAll('.word-inner');
      gsap.set(innerSpans, { yPercent: 150, opacity: 0, rotation: -6 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        },
      });

      // Reveal text
      tl.fromTo(textRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.inOut' }, 0);

      // Word reveal
      tl.to(innerSpans, {
        yPercent: 0,
        duration: 1,
        ease: 'power2.inOut',
        opacity: 1,
        rotation: 0,
        stagger: 0.05,
      }, 0.6);

      // Decorative spans
      if (spanTopRef.current && spanBottomRef.current) {
        tl.fromTo([spanTopRef.current, spanBottomRef.current], { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power1.inOut' }, 0.7);
      }

      // Character scramble effect
      const charElements = textRef.current!.querySelectorAll('[data-char]');
      charElements.forEach((el) => {
        const original = el.textContent || '';
        el.setAttribute('data-original', original);
        
        let counter = 0;
        const maxCycles = 3;
        const interval = setInterval(() => {
          const text = el.textContent || '';
          const newChars = text.split('').map((char, i) => {
            if (counter >= maxCycles) return original[i] || char;
            if (Math.random() > 0.5) {
              return String.fromCharCode(33 + Math.floor(Math.random() * 94));
            }
            return char;
          }).join('');
          el.textContent = newChars;
          counter++;
          if (counter > maxCycles * 2) {
            clearInterval(interval);
            el.textContent = original;
          }
        }, 50);
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const renderWord = (text: string, className = '') => (
    <span className={`reveal-word ${className}`}>
      <span className="word-inner inline-block">{text}</span>
    </span>
  );

  return (
    <section
      id="closing"
      ref={wrapRef}
      className="reveal-wrap"
    >
      <span
        ref={spanTopRef}
        className="reveal-span reveal-span-top opacity-0"
      >
        UNA
      </span>

      <p ref={textRef} className="reveal-text opacity-0">
        <span className="font-lighter">ENERGIA</span>
        <br />
        {renderWord('rozliczana', '')}
        <span className="font-lighter"> w czasie</span>
        <br />
        <span className="font-lighter">rzeczywistym. </span>
        <span data-char className="reveal-word">
          <span className="word-inner inline-block">BO CZAS</span>
        </span>
        <br />
        <span data-char className="reveal-word">
          <span className="word-inner inline-block">TO PIENIĄDZ.</span>
        </span>
      </p>

      <p className="mt-12 text-body-lg text-offwhite/70 max-w-[560px] text-center">
        Rozliczamy energię w czasie rzeczywistym, bo czas to pieniądz. A energia to przyszłość.
      </p>

      <div className="mt-16 flex flex-col sm:flex-row items-center gap-4">
        <a
          href="mailto:contact@una.energy"
          className="inline-flex items-center px-8 py-4 rounded-button font-medium transition-all duration-250 hover:shadow-[0_0_20px_rgba(255,195,0,0.25)]"
          style={{ backgroundColor: 'var(--amber-light)', color: 'var(--navy-base)' }}
        >
          Porozmawiajmy
        </a>
        <a
          href="mailto:contact@una.energy"
          className="inline-flex items-center px-8 py-4 rounded-button font-medium border transition-all duration-250 hover:border-teal-accent hover:bg-teal-accent/10"
          style={{ borderColor: 'var(--teal-muted)', color: 'var(--offwhite)' }}
        >
          contact@una.energy
        </a>
      </div>

      <span
        ref={spanBottomRef}
        className="reveal-span reveal-span-bottom opacity-0"
      >
        2026
      </span>
    </section>
  );
}
