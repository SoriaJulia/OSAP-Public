module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['trade-gothic-next-condensed', 'sans-serif'],
      sans: ['trade-gothic-next', 'ui-sans-serif', 'Roboto'],
    },
    extend: {
      colors: {
        yellow: {
          50: '#FFF0DB',
          100: '#FAE6C2',
          200: '#ffcd80',
          300: '#ffb84d',
          400: '#ffa826',
          500: '#ff9900',
          600: '#fb8d00',
          700: '#f57d00',
          800: '#ef6d00',
          900: '#e65200',
        },
        orange: {
          25: '#ffebe6',
          50: '#ffd6cc',
          100: '#ffad99',
          200: '#ff8566',
          300: '#ff5c33',
          400: '#ff4719',
          500: '#ff3300',
          550: '#F84209',
          600: '#e62e00',
          700: '#cc2900',
          800: '#991f00',
          900: '#661400',
        },
        blue: {
          100: '#ebf3f6',
          200: '#b0cfd9',
          300: '#9dc3d0',
          400: '#4e93aa',
          500: '#286064',
          600: '#285E78',
          700: '#2E5078',
          800: '#1d4451',
          900: '#112930',
        },
        grey: {
          50: '#f4f4f5',
          100: '#e9e9eb',
          200: '#bcbec2',
          300: '#8f9299',
          400: '#626670',
          500: '#1e2533',
          600: '#1b212e',
          700: '#181e29',
          800: '#151a24',
          900: '#12161f',
        },
      },
      gridTemplateColumns: {
        'footer-lg': '13% 1.3fr repeat(2, 1fr)',
        'footer-md': '30% 1fr',
        'footer': 'repeat(2, 1fr)',
        'facturas': '40% 25% 30% 5%',
        'autorizaciones': '14% 57% 25% 4%',
        'coseguros': '16% 1fr 15% 4%',
        'coseguros-print': '10% 1fr 15%',
      },
      screens: {
        xs: '380px',
      },
      backgroundImage: {
        '404img': "url('/img/404.svg')",
      },
      width: {
        screen: 'calc(100vw - 8px)',
      },
      animation: {
        sideBounce: 'sideBounce 2s linear 300ms 4',
      },
      keyframes: {
        sideBounce: {
          '0%': {
            transform: 'translate(0,0)',
          },
          '20%': {
            transform: 'translate(0,-3px) rotate(16deg) scale(1.25)',
          },
          '35%': {
            transform: 'translate(0,-1px) scale(1.25) ',
          },
          '50%': {
            transform: 'translate(0,-3px) rotate(-16deg) scale(1.25)',
          },
          '65%': {
            transform: 'translate(0,-1px) scale(1.25) ',
          },
          '80%': {
            transform: 'translate(0,-3px) rotate(16deg) scale(1.25)',
          },
          '100%': {
            transform: 'translate(0,0)',
          },
        },
      },
    },
  },
  plugins: [],
};
