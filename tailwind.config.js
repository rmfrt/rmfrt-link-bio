/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#f4f4f5",
                    dark: "#09090b",
                },
                secondary: {
                    DEFAULT: "#a1a1aa",
                    dark: "#27272a",
                },
                accent: {
                    DEFAULT: "#22c55e",
                },
            },
        },
    },
};
