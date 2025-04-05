import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0f0f0f",
                surface: "#1a1a1a",
                surfaceLight: "#2a2a2a",
                border: "#3f3f46",
                textMuted: "#71717a",
                textPrimary: "#e4e4e7",
                accent: "#38bdf8",
                accentHover: "#0ea5e9",
                accentMuted: "#172554",
                highlight: "#60a5fa",
                danger: "#ef4444",
                warning: "#f59e0b",
                success: "#22c55e",
            },
        },
    },
    darkMode: "class",
    plugins: [],
};

export default config;