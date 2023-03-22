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
      typography: {
        DEFAULT: {
          css: {
            // pre: {
            //   color: "#eee",
            //   backgroundColor: "#2f2f2f",
            // },
            code: {
              backgroundColor: "#f3f4f6",
              color: "#f59e0b",
              fontWeight: "400",
              "border-radius": "0.25rem",
            }
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
