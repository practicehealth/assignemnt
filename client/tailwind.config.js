/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        // primary: "#14a8b6",
        primary: "##0f4fff",
        secondary: "#1d69cc",
        accent: "#5565fa",
      }
    },
  },
  plugins: [],
}

