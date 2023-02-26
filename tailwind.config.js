/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          500: "hsl(var(--clr-primary))",
          600: "hsl(var(--clr-tertiary))",
        },
        secondary: {
          500: "hsl(var(--clr-secondary))",
        },
        surface: {
          500: "hsl(var(--clr-surface-l))",
          600: "hsl(var(--clr-surface-d))",
        },
        tneutral: {
          500: "hsl(var(--clr-neutral-l))",
          600: "hsl(var(--clr-neutral-d))",
        },
      },
      fontFamily: {
        default: ["Poppins", "system-ui", "sans-serif"],
      },
      animation: {
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        conic:
          "conic-gradient(at bottom right, var(--tw-gradient-from), 120deg,var(--tw-gradient-via), 150deg, var(--tw-gradient-to)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    plugin(({ addVariant }) => {
      addVariant("radix-side-top", '&[data-side="top"]');
      addVariant("radix-side-bottom", '&[data-side="bottom"]');
    }),
  ],
};
//           "conic-gradient(at bottom right, var(--tw-gradient-from), 120deg,var(--tw-gradient-via),180deg",
