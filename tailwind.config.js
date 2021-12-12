module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pupule: {
          DEFAULT: "#570df8",
          900: "#570df8e6",
          800: "#570df8cc",
          700: "#570df8b3",
          600: "#570df899",
          500: "#570df880",
          400: "#570df866",
          300: "#570df84d",
          200: "#570df833",
          100: "#570df81a",
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('daisyui'),
    // eslint-disable-next-line global-require
    require('tailwindcss-scrollbar')
  ],
};
