/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    colors: {
      greenbtn: "#00791F",
      greenbg: "#005315"
    },
    extend: {
      textUnderlineOffset: {
        14: '14px',
        26: '26px'
      },
    },
  },
  plugins: [],
});

// module.exports = {
//   content: [
//     "./src/**/*.{html,js,jsx,ts,tsx}",
//    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
//   ],
//   theme: {
//     colors: {
//       greenbtn: "#00791F",
//       greenbg: "#005315"
//     },
//     extend: {
//       textUnderlineOffset: {
//         14: '14px',
//         26: '26px'
//       },
//     },
//   },
//   plugins: [],
// }

