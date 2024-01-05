module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
    parserOptions: {
      parser: "@babel/eslint-parser",
    },
    rules: {
      'vue/multi-word-component-names': 0,
      "vetur.validation.template":0,
    },
    requireConfigFile: false
  };