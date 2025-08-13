/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      // Breakpoints personalizados
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: { max: '1860px' }, // hasta 1860px
      '2xl': '1861px', // a partir de 1861px
    },
    extend: {
      height: {
        'screen-dynamic': 'calc(var(--vh, 1vh) * 100)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
