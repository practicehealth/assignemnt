/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary: "#14a8b6",
        secondary: "#c2f1eb",
        accent: "#89dbd2",
      }
    },
  },
  plugins: [],
}

