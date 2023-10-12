/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./_posts/**/*.mdx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: "80ch",
            '--tw-prose-invert-links':theme.colors.gray[300],
            '--tw-prose-invert-headings':theme.colors.gray[300],
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
