const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,

  // Reporter configuration
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
      // Register the mochawesome reporter plugin
      require("cypress-mochawesome-reporter/plugin")(on);

      // Add other node event listeners here if needed
      return config;
    },

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
