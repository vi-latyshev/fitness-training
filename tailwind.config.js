/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(67 56 202)', // indigo-700
                primaryWhite: 'rgb(79 70 229)', // indigo-600

                primarySoft: 'rgb(199 210 254)', // indigo-200
                primarySoftWhite: 'rgb(224 231 255)', // indigo-100

                secondary: 'rgb(244 114 182)', // pink-400
                secondaryWhite: 'rgb(249 168 212)', // pink-300

                secondarySoft: 'rgb(251 207 232)', // pink-200
                secondarySoftWhite: 'rgb(252 231 243)', // pink-100

                success: 'rgb(22 163 74)', // green-600
                successWhite: 'rgb(34 197 94)', // green-500

                successSoft: 'rgb(187 247 208)', // green-200
                successSoftWhite: 'rgb(220 252 231)', // green-100

                error: 'rgb(220 38 38)', // red-600
                errorWhite: 'rgb(239 68 68)', // red-500

                errorSoft: 'rgb(254 202 202)', // red-200
                errorSoftWhite: 'rgb(254 226 226)', // red-100

                grayPrimary: 'rgb(243 244 246)', // gray-100
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
            },
            transitionDuration: {
                DEFAULT: '250ms',
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
