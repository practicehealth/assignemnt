/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Specify the files where Tailwind CSS classes are used
    './public/index.html', // Specify your HTML file to track class usage in HTML
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Add any Tailwind CSS plugins you want to use here
    // For example, to enable the aspect ratio plugin:
  ],
}

