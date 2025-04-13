import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6',
        'primary-foreground': '#ffffff',
        'secondary': '#1f2937',
        'secondary-foreground': '#f3f4f6',
        'accent': '#8b5cf6',
        'muted': '#1f2937',
        'foreground': '#ededed',
        'background': '#0a0a0a',
        'card': '#111827',
        'border': '#374151',
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'slide-up': 'slideUp 1s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'slide-in': 'slideIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-custom': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        'slow': '0.5s',
        'medium': '0.3s',
        'fast': '0.15s',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config; 