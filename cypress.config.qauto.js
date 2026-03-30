const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: false
  },

  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    env: {
      email: "test1+1234@gmail.com",
      password: "Qwerty1234"
    },

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    }
  }
});