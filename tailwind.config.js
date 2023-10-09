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
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
