module.exports = {
    root: true,
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    env: {
        browser: true,
        amd: true,
        node: true,
        es6: true,
        jest: true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'no-secrets', 'unused-imports'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'plugin:sonarjs/recommended',
        'plugin:security/recommended',
        'prettier'
    ],
    rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': ['off'],
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton']
            }
        ],
        'react/prop-types': 'off',
        'no-secrets/no-secrets': 'warn',
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': [
            'warn',
            { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
        ],
        'sonarjs/no-nested-template-literals': 'off'
    },
    globals: {
        JSX: true,
        NodeJS: true
    },
    ignorePatterns: ['.eslintrc.js']
}
