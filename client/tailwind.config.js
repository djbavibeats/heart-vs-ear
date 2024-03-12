/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [ '"Univers 55 Roman"' ],
    },
    extend: {
      fontFamily: {
        "ultra-condensed": '"Univers 59 Ultra Condensed"'
      },
      colors: {
        "ip-blue": "#319fd9",
        "ip-blue-gradient": "linear-gradient(#319fd9, #ffffff)",
        "ip-black": "#000000",
        "ip-gray": "#cfcecf",
        "ip-white": "#ffffff",
        "ip-gray-transparent": "rgba(207, 206, 207, .15)"
      },
      dropShadow: {
        glow: [
          "0px 0px 20px #319fff"
        ],
        "glow-sm": [
          "0px 0px 10px #319fff"
        ]
      }
    },
  },
  plugins: [],
}

