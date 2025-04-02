/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/App.{js,jsx,ts,tsx}",
    "./src/main.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#235d74',
        'primary-dark': '#1a4557',
        secondary: '#e2f0fa',
        tertiary: '#f5f5f5',
      },
    },
  },
  plugins: [],
} 