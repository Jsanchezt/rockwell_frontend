module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [

  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'vue',
    'regex',
  ],
  ignorePatterns: ['src/@iconify/*.js', 'node_modules', 'dist'],
  rules: {

  },
  settings: {

  },
}
