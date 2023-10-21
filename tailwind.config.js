/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textUnderlineOffset: {
        14: '14px',
        26: '26px'
      },
    },
  },
  plugins: [],
}

