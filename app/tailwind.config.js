/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          base: '#0A2150',
          deep: '#061D49',
          mid: '#16294F',
          tint: '#081E4C',
        },
        teal: {
          accent: '#08AEEA',
          deep: '#0784B4',
          muted: 'rgba(8, 174, 234, 0.15)',
        },
        amber: {
          light: '#C4DC6A',
          deep: '#AEC663',
          glow: 'rgba(196, 220, 106, 0.25)',
        },
        offwhite: '#F7F8F3',
        cyan: {
          accent: '#08AEEA',
          deep: '#0784B4',
          muted: 'rgba(8, 174, 234, 0.15)',
          faint: 'rgba(8, 174, 234, 0.08)',
        },
        lime: {
          DEFAULT: '#C4DC6A',
          deep: '#AEC663',
          pale: '#EBF2C4',
          soft: '#D8E88C',
          glow: 'rgba(196, 220, 106, 0.25)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        button: '0.25rem',
        card: '0.5rem',
        panel: '0.75rem',
        pill: '9999px',
      },
      fontSize: {
        display: ['clamp(4rem, 10vw, 9rem)', { lineHeight: '0.85', letterSpacing: '-0.04em', fontWeight: '300' }],
        h1: ['clamp(2.5rem, 5vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '400' }],
        h2: ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '400' }],
        h3: ['clamp(1.2rem, 2vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '0', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '300' }],
        'body-lg': ['clamp(1.125rem, 1.5vw, 1.35rem)', { lineHeight: '1.55', fontWeight: '300' }],
        label: ['0.75rem', { lineHeight: '1.0', letterSpacing: '0.08em', fontWeight: '500' }],
        mono: ['0.8rem', { lineHeight: '1.4', fontWeight: '400' }],
        data: ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.9', letterSpacing: '-0.03em', fontWeight: '700' }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "scroll-down": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(30px)", opacity: "0.3" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "scroll-down": "scroll-down 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}