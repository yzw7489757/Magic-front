// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  extends: ['plugin:vue/essential', 'standard'],
  plugins: ['vue'],
  rules: {
    'generator-star-spacing': 0,
    'no-unused-vars': 1,
    semi: 2,
    'no-tabs': 0,
    'no-eval': 0,
    'no-new-object': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': [0, 'always'],
    quotes: [0, 'single', 'avoid-escape'],
    'handle-callback-err': 0,
    camelcase: 0,
    'no-undef': 1,
    "eslint-plugin-vue":0,
    'prefer-promise-reject-errors':0
  },
};
