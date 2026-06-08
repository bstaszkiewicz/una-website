import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Plus, Minus } from 'lucide-react';

interface AccordionItemProps {
  tags: string[];
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionItem({ tags, title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !innerRef.current) return;
    if (isOpen) {
      gsap.set(contentRef.current, { height: 'auto' });
      const h = contentRef.current.offsetHeight;
      gsap.fromTo(contentRef.current, { height: 0 }, { height: h, duration: 0.5, ease: 'power3.out' });
      gsap.fromTo(innerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: 'power3.inOut' });
    }
  }, [isOpen]);

  return (
    <div
      className="group"
      style={{
        borderTop: '1px solid rgba(0, 180, 216, 0.12)',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 md:py-10 flex items-start justify-between gap-6 text-left transition-colors duration-200"
      >
        <div className="flex-1">
          {/* Tags */}
          <div className="flex items-center gap-3 mb-4">
            {tags.map((tag, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="eyebrow" style={{ color: 'var(--teal-accent)', opacity: 0.7 }}>
                  {tag}
                </span>
                {i < tags.length - 1 && (
                  <span className="text-offwhite/20">&#9670;</span>
                )}
              </span>
            ))}
          </div>
          {/* Title */}
          <h3
            className="text-h1 text-offwhite transition-colors duration-200 group-hover:text-offwhite/80"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
          >
            {title}
          </h3>
        </div>
        {/* Toggle button */}
        <div
          className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 mt-1"
          style={{
            backgroundColor: isOpen ? 'var(--amber-light)' : 'transparent',
            border: isOpen ? '1px solid var(--amber-light)' : '1px solid var(--teal-muted)',
          }}
        >
          {isOpen ? (
            <Minus size={20} style={{ color: 'var(--navy-base)' }} />
          ) : (
            <Plus size={20} style={{ color: 'var(--offwhite)' }} />
          )}
        </div>
      </button>

      {/* Expandable content */}
      <div ref={contentRef} className="overflow-hidden" style={{ height: isOpen ? 'auto' : 0 }}>
        <div ref={innerRef} className="pb-10 md:pb-14">
          {children}
        </div>
      </div>
    </div>
  );
}
