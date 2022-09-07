/* eslint-env node */

module.exports = {
  testMatch: ["<rootDir>/app/**/?(*.)(spec|test).js"],
  testEnvironment: 'jsdom',
  globalSetup: "<rootDir>/globalSetup.js"
};
