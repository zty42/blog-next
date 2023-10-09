/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   preflight: false,
  // },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./_posts/**/*.mdx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // important: "#__next",
  theme: {
    extend: {
      typography: ({theme})=> ({
        DEFAULT: {
          css: {
            maxWidth: '80ch',
            // '--tw-prose-headings': 'rgb(92, 107, 192)',
            code: {
              backgroundColor: "#f7fafc",
              color: "#f59e0b",
              "border-radius": "0.25rem",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
