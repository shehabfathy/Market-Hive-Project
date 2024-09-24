/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { primary: '#F39932' },
      fontFamily: {
        'josefin-sans': ['Josefin Sans', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
