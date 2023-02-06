/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minWidth:{
        '1/4': '25%',
        '1/2': '50%'
      },
      width: {
        'button': '200px'
      },
      height:{
        'button': '70px'
      }
    },
  },
  plugins: [],
}
