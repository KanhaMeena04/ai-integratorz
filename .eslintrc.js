module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: false, // Double quotes, Prettier ke according
        jsxSingleQuote: false, // JSX mein bhi double quotes
        trailingComma: 'none', // No trailing commas
        printWidth: 100, // Max line width
        tabWidth: 2 // 2 spaces for indentation
      }
    ]
  }
};
