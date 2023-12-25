module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  env: {
    browser: true,
    node: true,
    jest: true,
    es5: true
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier',
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off"
    'consistent-this': [2, 'self'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['warn', { enableDangerousAutofixThisMayCauseInfiniteLoops: true }],
    'react/display-name': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    'prettier/prettier': ['error', { endOfLine: 'auto' }]
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
}
