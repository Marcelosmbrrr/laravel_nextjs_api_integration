/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "header_title": "25px",
        "page_title": "28px"
      },
      width: {
        "header": "95%"
      },
      gridTemplateColumns: {
        "header": "repeat(2, min-content) 1fr",
        "main": "130px 1fr"
      },
      gridTemplateRows: {
        "sidebar_items": "repeat(3, 105px) 1fr",
        "content": "75px 1fr",
        "dashboard": "200px 1fr"
      }
    },
  },
  plugins: [],
}