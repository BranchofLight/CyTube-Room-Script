module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  ignorePatterns: [".eslintrc.js", "node_modules"],
  rules: {
    "no-use-before-define": "error",
    "no-unused-vars": "error",
  },
};
