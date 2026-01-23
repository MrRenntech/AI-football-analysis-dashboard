import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                audi: {
                    black: "var(--audi-black)",
                    white: "var(--audi-white)",
                    red: "var(--audi-red)",
                    grey: {
                        100: "var(--audi-grey-100)",
                        300: "var(--audi-grey-300)",
                        600: "var(--audi-grey-600)",
                        900: "var(--audi-grey-900)",
                    }
                }
            },
            fontFamily: {
                audi: ["Inter", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
