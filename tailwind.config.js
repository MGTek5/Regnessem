module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: '#dac64e',
          900: '#dac64ee6',
          800: '#dac64ecc',
          700: '#dac64eb3',
          600: '#dac64e99',
          500: '#dac64e80',
          400: '#dac64e66',
          300: '#dac64e4d',
          200: '#dac64e33',
          100: '#dac64e1a',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
