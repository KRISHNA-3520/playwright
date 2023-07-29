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
projects:[
  {
    name:'safari',
    use: {
      browserName: "webkit",
      headless:true,
      screenshot:'off',
      //trace:'on' --> for both pass and failed scenario screenshot will be captured
      //trace:'retain-on-failure' --> only failed scenario screenshot will be captured
      trace:'retain-on-failure'
    },
  },
  {
    name:'chrome',
    use: {
      browserName: "chromium",
      headless:false,
      screenshot:'on',
      //trace:'on' --> for both pass and failed scenario screenshot will be captured
      //trace:'retain-on-failure' --> only failed scenario screenshot will be captured
      trace:'on',
      //viewport helps to open browser in desired width and height
      viewport:{width:720,height:720},

     //run testcases on iphone device
    // ...devices['iPhone 13 Pro Max']

      //ignore SSL certification
     // ignoreHttpsErrors:true

     //to handle geolocation popups
    // permissions:['geolocation']

    //record video on failure
    video:'retain-on-failure'
    },
  }
]
  //mention browser,mention screenshot etc
  
};

module.exports = config;
