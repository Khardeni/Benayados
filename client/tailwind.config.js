/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        earth: {
          50:  '#faf7f2',
          100: '#f2ead8',
          200: '#e4d4b0',
          300: '#d2b880',
          400: '#c09a58',
          500: '#a87d3e',
          600: '#8a6332',
          700: '#6e4e28',
          800: '#533c20',
          900: '#3b2b18',
        },
        olive: {
          50:  '#f5f7ed',
          100: '#e8eed4',
          200: '#d0dcaa',
          300: '#b2c478',
          400: '#93ac50',
          500: '#728f35',
          600: '#587228',
          700: '#435821',
          800: '#37471e',
          900: '#2e3b1b',
        },
        sage: {
          50:  '#f4f6f0',
          100: '#e2e9d8',
          200: '#c3d2b2',
          300: '#9db585',
          400: '#7a9960',
          500: '#5e7f46',
          600: '#496535',
          700: '#3b502b',
          800: '#314124',
          900: '#29361e',
        },
        cream: '#f9f4ea',
        parchment: '#ede8dc',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'scroll-reveal': 'scrollReveal 0.7s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        scrollReveal: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
