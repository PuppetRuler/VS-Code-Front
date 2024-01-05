/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@electron-toolkit',
        '@vue/eslint-config-prettier',
    ],
    rules: {
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': [
            'warn',
            {
                singleQuote: true,
                semi: false,
                printWidth: 100,
                endOfLine: 'auto',
                tabWidth: 4,
                vueIndentScriptAndStyle: true,
            },
        ],
        'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    },
}
