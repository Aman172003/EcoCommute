/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // Enable JIT mode
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, 
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arimo', 'sans-serif'], 
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold:600,
        bold: 700,
        
      },
      colors: {
        'custom-green': '#173308',
      },
      gradientColorStops: theme => ({
        'blue-start': '#8feafe',
        'blue-end': '#a5ff6f',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
};
