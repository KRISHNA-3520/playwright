const { test } = require("@playwright/test");

test.only("Browser Context Playwright test", async ({ browser }) => {
  //to open fresh browser without plugins we use Context i.e. new instance of browser
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("Page Playwright test", async ({ page }) => {
    //no need to initial context when we pass 'page'
  await page.goto("https://google.com");
});
