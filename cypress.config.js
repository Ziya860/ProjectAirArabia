const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "My Cypress Test Report",
    inlineAssets: true,
    html: true,       // generate HTML later
    json: false,
    reportDir: "cypress/reports"
  },

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.js",

    // Webpack aliases
    webpack: {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "cypress"),
        },
      },
    },
  },
});
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: "cypress/reports/html",
    overwrite: false,
  },
  e2e: {

    setupNodeEvents(on, config) {

      require("cypress-mochawesome-reporter/plugin")(on);
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
  defaultCommandTimeout: 20000,
  requestTimeout: 20000,
  viewportWidth: 1920,
  viewportHeight: 1080
});