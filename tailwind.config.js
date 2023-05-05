/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '375px',  //mobile
      md: '768px',
      lg: '1020px',
      xl: '1440px', //desktop
    },
    extend: {
      colors: {
        darkBlue:       'hsl(209, 23%, 22%)',     //Dark mode elements
        veryDarkBlue1:  'hsl(207, 26%, 17%)',     //Dark mode BG
        veryDarkBlue2:  'hsl(200, 15%, 8%)',      //Light mode text
        darkGray:       'hsl(0, 0%, 52%)',        //Light mode input
        verylightGray:   'hsl(0, 0%, 98%)',        //Light mode BG
        white:          'hsl(0, 0%, 100%)',       //Dark mode text, light mode 
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      spacing: {
        128: "32rem",
      },
    },
   
  },
  plugins: [],
}

