module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "sm":"100px",
        "md":"768px",
        "lg":"1024px",
        "xl":"1280px",
        "2xl":"1536px"
      },
      colors:{
      primary:"#00274c",
      secoundary:"#ffcc18",
      gray1:"#999",
      skyblue:"#007bff",
      gray2:"rgb(44, 47, 52)",
      red1:"#fc1111",
      textgray:"#212529"
    },
    fontFamily:{
      Roboto: ['Roboto'],
      Gesstwo:['GE SS TWO']
    }
  },
  },
  plugins: [],
}