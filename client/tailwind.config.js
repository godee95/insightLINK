/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./src/styles/dashboard.css"],
  safelist: [
    "bg-colorRed",
    "bg-colorOrange",
    "bg-colorYellow",
    "bg-colorLightgreen",
    "bg-colorGreen",
    "bg-colorSkyblue",
    "bg-colorBlue",
    "bg-colorPurple",
    "bg-colorPink",
    "bg-blue-600",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-inter)"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        colorRed: "#EE6565",
        colorOrange: "#FB8351",
        colorYellow: "#FAC858",
        colorLightgreen: "#91CB75",
        colorGreen: "#3AA272",
        colorSkyblue: "#73C0DE",
        colorBlue: "#5470C6",
        colorPurple: "#9A60B4",
        colorPink: "#FFC0CB",
      },
    },
  },
  plugins: [],
};
