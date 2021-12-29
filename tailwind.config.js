module.exports = {
  content: [    "./src/**/*.{js,jsx,ts,tsx}", './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pupule: {
          DEFAULT: '#570df8',
          900: '#570df8e6',
          800: '#570df8cc',
          700: '#570df8b3',
          600: '#570df899',
          500: '#570df880',
          400: '#570df866',
          300: '#570df84d',
          200: '#570df833',
          100: '#570df81a',
        }
      },
      opacity: {
        100: "1",
        50: ".50",
        33: ".33",
        25: ".25",
        20: ".20",
        16: ".16",
        14: ".14",
        12: ".12",
        11: ".11",
        10: ".10",
        9: ".09",
        8: ".8",
        7: ".07",
        6: ".06",
        5: ".05",
        4: ".04",
        3: ".03",
        2: ".02",
        1: ".01",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss-scrollbar')
  ],
};
