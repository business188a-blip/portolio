import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        void: '#050508',
        surface: '#0a0a12',
        'surface-2': '#0f0f1a',
        glass: 'rgba(255,255,255,0.04)',
        'glass-border': 'rgba(255,255,255,0.08)',
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          glow: 'rgba(34,211,238,0.15)',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          glow: 'rgba(139,92,246,0.15)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'text-shimmer': 'textShimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(20px)' },
          '50%': { opacity: '1', filter: 'blur(30px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        textShimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(34,211,238,0.2), 0 0 60px rgba(34,211,238,0.1)',
        'glow-violet': '0 0 30px rgba(139,92,246,0.2), 0 0 60px rgba(139,92,246,0.1)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
}

export default config
