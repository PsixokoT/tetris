module.exports = {
  "transform": {
    ".ts": "ts-jest"
  },
  "testMatch": [
    '<rootDir>/__tests__/**/?(*.)(spec|test).ts'
  ],
  "setupFiles": [
    "<rootDir>/__tests__/setup.ts"
  ],
  "moduleFileExtensions": [
    "ts", "js"
  ],
  "testURL": "http://localhost/"
};
