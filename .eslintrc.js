module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': 0,
    'operator-linebreak': 0
  },

  ignorePatterns: ['node_modules/']
};
