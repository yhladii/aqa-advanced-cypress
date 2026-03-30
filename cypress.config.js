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
    baseUrl: "https://qauto.forstudy.space/",
    viewportWidth: 1280,
    viewportHeight: 720,

   etupNodeEvents(on, config) {

  require("cypress-mochawesome-reporter/plugin")(on);
      return config;
  }
  },
});