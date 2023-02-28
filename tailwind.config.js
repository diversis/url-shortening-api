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
                    100: "hsla(var(--clr-primary-o))",
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

            fontSize: {
                sm: [
                    "1rem",
                    {
                        lineHeight: "1.25rem",
                    },
                ],
                base: [
                    "1.125rem",
                    {
                        lineHeight: "1.625rem",
                        letterSpacing: "-0.01em",
                    },
                ],
                lg: [
                    "1.375rem",
                    {
                        lineHeight: "1.975rem",
                        letterSpacing: "-0.01em",
                    },
                ],
                "2xl": [
                    "1.875rem",
                    {
                        lineHeight: "2.45rem",
                        letterSpacing: "-0.02em",
                    },
                ],
                "3xl": [
                    "2.25rem",
                    {
                        lineHeight: "2.75rem",
                        letterSpacing: "-0.03em",
                    },
                ],
                "4xl": [
                    "2.75rem",
                    {
                        lineHeight: "3.4rem",
                        letterSpacing: "-0.03em",
                    },
                ],
                "6xl": [
                    "4.375rem",
                    {
                        lineHeight: "5.4rem",
                        letterSpacing: "-0.03em",
                    },
                ],
            },
            animation: {
                // Tooltip
                "slide-up-fade":
                    "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-down-fade":
                    "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                // Form and last section background
                "bg-slide":
                    "bg-slide 50s cubic-bezier(0.46, 0.33, 0.3, -0.1) infinite",
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
                "bg-slide": {
                    "0%, 100%": { "background-position": "top left" },
                    "50%": { "background-position": "bottom right" },
                },
            },
            backgroundImage: {
                conic: "conic-gradient(from 0turn at 150% -20%,var(--tw-gradient-from),var(--tw-gradient-from) 230deg,var(--tw-gradient-to) 247deg,var(--tw-gradient-from) 250deg)",
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
