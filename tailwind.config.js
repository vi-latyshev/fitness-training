/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#182277',
                primaryDark: '#0F1657',
                secondary: '#FFB7E4',
                secondaryDark: '#de8cbf',
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
            },
            transitionDuration: {
                DEFAULT: '250ms',
            },
        },
    },
    plugins: [],
};
