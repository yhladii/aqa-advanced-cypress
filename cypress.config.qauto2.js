const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto2.forstudy.space",
    env: {
      email: "test2+123@gmail.com",
      password: "Qwerty123"
    },
    setupNodeEvents(on, config) {
      return config;
    }
  }
});