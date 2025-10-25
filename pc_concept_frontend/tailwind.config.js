/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pc-red': '#B42525',
        'pc-dark-red': '#A11F1F',
        'pc-gray-light': '#F2F2F2',
        'pc-gray-medium': '#D9D9D9',
        'pc-gray-dark': '#242424',
        'pc-gray-icon': '#6C6969',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
