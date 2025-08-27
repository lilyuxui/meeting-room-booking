/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Figma Design System Colors
        'brand': {
          'default': '#0e7c3a',      // Primary green
          'tertiary': '#edfdf3',     // Light green background
          'secondary': '#ffffff',     // White
        },
        'text': {
          'primary': '#121c2d',      // Dark text
          'secondary': '#606b85',    // Secondary text
        },
        'background': {
          'gray': '#f4f4f6',         // Light gray background
          'light': '#ffffff',        // White background
          'dark-gray': '#cacdd8',    // Dark gray background
        },
        'border': {
          'light': '#e1e3ea',        // Light border
          'success': '#a2f6c3',      // Success border
          'success-hover': '#36d576', // Success border hover
          'gray': '#cacdd8',         // Gray border
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.5' }],
        'base': ['16px', { lineHeight: '1.5' }],
        'lg': ['18px', { lineHeight: '1.5' }],
        'xl': ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.5' }],
      },
      borderRadius: {
        '3xl': '24px',
      },
      maxWidth: {
        '896': '896px',
      }
    },
  },
  plugins: [],
}
