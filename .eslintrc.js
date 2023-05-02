module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-multiple-empty-lines': 'error',
    'no-trailing-spaces': 'error',
    'import/extensions': [
      'error',
      {
        js: 'ignorePackages',
      },
    ],
  },
};