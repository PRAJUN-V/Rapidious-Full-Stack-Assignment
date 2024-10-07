/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#D1C2B7', // Light Brown
          200: '#B8A89D', // Lighter Brown
          300: '#A48A77', // Medium Brown
          400: '#8F6B52', // Darker Brown
          500: '#7A4B2D', // Base Brown
          600: '#6B3B24', // Darker Shade
          700: '#5C2C1B', // Even Darker Shade
          800: '#4E1D12', // Very Dark Brown
          900: '#3F0E0A', // Darkest Brown
        },
        custom: { // Add your custom color here
          blue: '#0DE1FF',
        },
      },
    },
  },
  plugins: [],
}
