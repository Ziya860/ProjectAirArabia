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
    html: false,       // generate HTML later
    json: true,
    reportDir: "cypress/reports"
  },
  e2e: {
    setupNodeEvents(on, config) {
      //require("cypress-mochawesome-reporter/plugin")(on);
      // If you need to add other node event listeners, do so here
      return config;
    },
    webpack: {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "cypress"),
        },
      },
    },
  },
});
