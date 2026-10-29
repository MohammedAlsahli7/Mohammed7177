// Google JavaScript Style Guide (eslint-config-google), with Prettier doing the
// formatting. Browser files share one global scope by design (see CLAUDE.md),
// so cross-file globals are not flagged there.
'use strict';

const googleLen = {
  code: 80,
  tabWidth: 2,
  ignoreUrls: true,
  ignoreStrings: true,
  ignoreTemplateLiterals: true,
  ignoreRegExpLiterals: true,
};

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'google'],
  parserOptions: {ecmaVersion: 2022, sourceType: 'script'},
  env: {es2022: true},
  rules: {
    'max-len': ['error', googleLen],
    // Prettier owns these layout choices.
    'indent': 'off',
    'space-before-function-paren': 'off',
    'operator-linebreak': 'off',
    'object-curly-spacing': ['error', 'never'],
    // Constructors only; the design files use short capitalised helpers (N,
    // If).
    'quotes': [
      'error',
      'single',
      {avoidEscape: true, allowTemplateLiterals: true},
    ],
    'new-cap': ['error', {capIsNew: false}],
  },
  overrides: [
    {
      files: [
        'server/**/*.js',
        'scripts/**/*.cjs',
        'test/**/*',
        '.eslintrc.cjs',
      ],
      env: {node: true},
    },
    {
      // Browser tests run code inside the page (page.evaluate).
      files: ['test/**/*.e2e.cjs'],
      env: {node: true, browser: true},
    },
    {
      files: [
        '**/*.jsx',
        'ui_kits/**/*.js',
        'components/**/*.js',
        'site.config.js',
      ],
      env: {browser: true},
      plugins: ['react'],
      parserOptions: {ecmaFeatures: {jsx: true}},
      settings: {react: {version: '18.3'}},
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'react/jsx-uses-vars': 'error',
        'react/jsx-key': 'error',
        'react/jsx-no-duplicate-props': 'error',
        // Components are documented by their file header and .d.ts contracts.
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
      },
    },
    {
      files: ['components/**/*.jsx', 'components/**/*.js'],
      parserOptions: {sourceType: 'module'},
    },
  ],
};
