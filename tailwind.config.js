const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: colors.indigo[600],
                    DEFAULT: colors.indigo[700],
                },
                primarySoft: {
                    light: colors.indigo[100],
                    DEFAULT: colors.indigo[200],
                },
                secondary: {
                    light: colors.pink[300],
                    DEFAULT: colors.pink[400],
                },
                secondarySoft: {
                    light: colors.pink[100],
                    DEFAULT: colors.pink[200],
                },
                success: {
                    light: colors.green[500],
                    DEFAULT: colors.green[600],
                },
                successSoft: {
                    light: colors.green[100],
                    DEFAULT: colors.green[200],
                },
                warning: {
                    light: colors.orange[500],
                    DEFAULT: colors.orange[600],
                },
                warningSoft: {
                    light: colors.orange[100],
                    DEFAULT: colors.orange[200],
                },
                error: {
                    light: colors.red[500],
                    DEFAULT: colors.red[600],
                },
                errorSoft: {
                    light: colors.red[100],
                    DEFAULT: colors.red[200],
                },
                grayPrimary: {
                    DEFAULT: colors.gray[100],
                },
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
                logo: ['Akrobat-Black', 'sans-serif'],
            },
            transitionDuration: {
                DEFAULT: '250ms',
            },
            spacing: {
                4.5: '1.125rem',
                5.5: '1.375rem',
                6.5: '1.625rem',
            },
        },
    },
    plugins: [
        ({ addVariant }) => {
            addVariant('child', '& > *');
            addVariant('child-first', '& > *:first-child');
            addVariant('child-last', '& > *:last-child');
        },
    ],
};
