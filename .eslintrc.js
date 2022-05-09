module.exports = {
  ignorePatterns: ['node_modules/'],
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // 'comma-dangle': 0,
    'operator-linebreak': 0,
    'linebreak-style': 0,
  },
};
