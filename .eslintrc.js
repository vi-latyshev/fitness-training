/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    extends: [
        '@v.latyshev/eslint-config/react',
        'plugin:@next/next/recommended',
    ],
    parserOptions: {
        tsconfigRootDir: __dirname,
    },
    rules: {
        'func-names': ['error', 'never', { generators: 'as-needed' }],
        'no-param-reassign': ['error', { props: false }],
        'class-methods-use-this': 'warn',
        'import/export': 'warn',
        'import/no-default-export': 'warn',
        'no-restricted-imports': [
            'error',
            {
                patterns: ['**../../*'],
            },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: ['next.config.js', 'tailwind.config.js'],
            },
        ],
    },
    overrides: [
        {
            // Next.js App Router | Pages Routes
            files: ['**/app/**', '**/pages/**'],
            rules: {
                'import/no-default-export': 'off',
                'import/prefer-default-export': 'warn',
            },
        },
    ],
};
