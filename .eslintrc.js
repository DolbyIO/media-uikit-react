module.exports = {
  root: true,
    env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: ['**/*'],
  plugins: ['@nrwl/nx', 'react', '@typescript-eslint'],
  overrides: [{
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    rules: {
      '@nrwl/nx/enforce-module-boundaries': ['error', {
        enforceBuildableLibDependency: true,
        allow: [],
        depConstraints: [{
          sourceTag: '*',
          onlyDependOnLibsWithTags: ['*']
        }]
      }]
    }
  }, {
    files: ['*.ts', '*.tsx'],
    extends: ['plugin:@nrwl/nx/typescript'],
    rules: {}
  }, {
    files: ['*.js', '*.jsx'],
    extends: ['plugin:@nrwl/nx/javascript'],
    rules: {}
  },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },],
  extends: ["plugin:storybook/recommended",
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:testcafe/recommended',
    'plugin:prettier/recommended',],
    parser: '@typescript-eslint/parser',
      parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'warn',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        jsx: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      },
    },
  },
};
