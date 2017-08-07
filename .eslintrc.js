module.exports = {
  "extends": ["airbnb", "plugin:react/recommended"],
  "rules": {
    "comma-dangle": ["error", "never"],
    "camelcase": [0],
    "react/prop-types": [0],
    "react/prefer-stateless-function": [0],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/valid-expect": "error",
    "no-confusing-arrow": ["error", {"allowParens": true}]
  },
  "plugins": [
    "jest",
    "react"
  ],
  "env": {
    "jest/globals": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "globals": {
    "localStorage": true,
    "document": true
  }
};
