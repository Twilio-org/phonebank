module.exports = {
  "extends": "airbnb",
  "rules": {
    "comma-dangle": ["error", "never"],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/valid-expect": "error"
  },
  "plugins": [
    "jest"
  ],
  "env": {
    "jest/globals": true
  }
};
