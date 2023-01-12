/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./_posts/**/*.mdx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#__next',
  theme: {
    extend: {},
  },
  plugins: [],
};
