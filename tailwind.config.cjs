/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "reddit-sans": ["Reddit Sans", "sans-serif"],
      },
      fontWeight: {
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900,
      },
      colors: {
        primary: "#B8E930",
        secondary: "#601FEB",
        tertiary: "#046878",
      },
      boxShadow: {
        "smooth-lg":
          "0 5px 6px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: "#FFFFFF",
            },
            h2: {
              color: "#FFFFFF",
            },
            h3: {
              color: "#FFFFFF",
            },
            strong: {
              color: "#FFFFFF",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
