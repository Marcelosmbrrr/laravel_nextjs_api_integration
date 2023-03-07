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
      boxShadow: {
        "card": "rgba(0, 0, 0, 0.16) 0px 1px 4px"
      },
      fontSize: {
        "header_title": "25px",
        "page_title": "28px"
      },
      width: {
        "header": "95%"
      },
      height: {
        "dash_card": "192px",
        "sidebar": "calc()"
      },
      gridTemplateColumns: {
        "header": "repeat(2, min-content) 1fr",
        "main": "130px 1fr"
      },
      gridTemplateRows: {
        "sidebar_items": "repeat(3, 105px) 1fr",
        "content": "75px 1fr",
        "min_dash": "768px 192px",
        "sm_dash": "384px 450px",
        "md_dash": "384px 450px",
        "lg_dash": "192px 450px",
        "min_dash_cards": "repeat(4, 192px)",
        "sm_dash_cards": "repeat(2, 192px)",
        "md_dash_cards": "repeat(2, 192px)",
        "lg_dash_cards": "none"
      }
    },
  },
  plugins: [],
}