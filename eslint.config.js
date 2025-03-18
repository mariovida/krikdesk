import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:react/recommended', // Add React plugin for React-specific linting
      'plugin:react/jsx-runtime', // For JSX runtime (React 17+)
      'plugin:react-hooks/recommended', // Add React Hooks plugin for hooks linting
      'prettier', // Disable conflicting Prettier rules
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
      'import/resolver': {
        node: {
          paths: ['.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/ban-ts-comment': 'off', // Allow ts-comments
      '@typescript-eslint/no-empty-function': [
        'error',
        { allow: ['arrowFunctions'] },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'import/newline-after-import': 'error', // Ensure newline after imports
      'jsx-a11y/alt-text': 'off', // Disable alt-text rule (can be useful for accessibility)
      'no-unused-vars': 'off', // Disable global unused-vars warning
      'react/jsx-max-props-per-line': 'off', // Disable limit on JSX props per line
    },
  }
);
