module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        // 'plugin:prettier/recommended'
    ],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: false,
    },
    overrides: [
        {
            files: ['src/**/*.js', 'src/**/*.ts'],
        },
    ],
    rules: {
        'no-const-assign': 'warn',
        'no-this-before-super': 'warn',
        'no-undef': 'warn',
        'no-unreachable': 'warn',
        'no-unused-vars': 'warn',
        'constructor-super': 'warn',
        'valid-typeof': 'warn',
        'linebreak-style': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
    },
}
