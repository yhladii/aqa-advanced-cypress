const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space/",
    viewportWidth: 1280,
    viewportHeight: 720
  },
});
