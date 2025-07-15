module.exports = {
  root: true,
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...require('globals').browser,
    },
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
};
