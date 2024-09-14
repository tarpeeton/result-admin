module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '320px',
      'md': '360px',
      'mdx': '460px',
      'mdl': '550px',
      'slg': '750px',
      'lg': '900px',
      'xl': '1000px',
      '2xl': '1100px',
      '3xl': '1440px',
      '4xl': '1600px',
      '6xl': '1920px',
      '5xl': '2000px',
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        robotoFlex: ['Roboto Flex', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        white100: '#FFFFFF',
        violet100: '#7B72EB',
        titleDark: '#010101',
        titleDark50: '#7B7B7B',
        titleDark40: '#A6A6A6',
        titleDark20: '#CCCCCC',
        bgDark: '#F8F8F8',
        bgCardDark: '#F4F3FF',
        footerBgDark: '#1C1C1C',
        selectBg: '#F4F4F4',
        seletcText: '#454545'
      },
    },
  },
  plugins: [],
};
