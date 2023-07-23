// @ts-check
const { devices } = require("@playwright/test");
/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  //Maximum time out one test can run for.
  timeout: 30 * 1000,

  //Assertion
  expect: {
    timeout: 5000,
  },
  //In what format we want our test report to be
  reporter: "html",

  //mention browser,mention screenshot etc
  use: {
    browserName: "chromium",
    headless:false,
    screenshot:'off',
    //trace:'on' --> for both pass and failed scenario screenshot will be captured
    //trace:'retain-on-failure' --> only failed scenario screenshot will be captured
    trace:'retain-on-failure'
  },
};

module.exports = config;
