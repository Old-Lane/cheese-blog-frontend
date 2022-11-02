import { defineConfig } from "windicss/helpers";

export default defineConfig({
    extract: {
        include: ['src/**/*.{vue,html,jsx,tsx}'],
        exclude: ['node_modules', '.git']
    },
    attributify: false,
    darkMode: 'class',
    theme: {
        extend: {
            backgroundColor: {
                // 暗黑背景色
                'v-dark': 'var(--dark-bg-color)',
                'v-light': 'var(--light-bg-color)',
                'v-search-bgc': '#e3e5e7'
            },
            keyframes: {
                avatar: {
                  '0%, 100%': { transform: 'scale-90' },
                  '50%': { transform: 'rotate(3deg)' },
                },
            },
            animation: {
                'avatar': 'avatar 3s linear infinite',
            },
        }
    }
});