module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  ignorePatterns: ['src/index.css'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': 'off',
    'react/no-unstable-nested-components': 'off',
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    'react/prop-types': 'off',
    'max-len': 'off',
    'no-console': 'off',
    'default-param-last': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
        paths: ['./src']
      }
    }
  },
};
