const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ browser }) => {
  //to open fresh browser without plugins we use Context i.e. new instance of browser
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("input#username");
  const signIn = page.locator("#signInBtn");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  //enter username
  await userName.type("rahulshetty");

  //enter password
  await page.locator("[type='password']").type("learning");

  //click on SignIn button
  await signIn.click();

  //Catch invalid error message
  console.log(await page.locator('[style*="block"]').textContent());

  //assert the text
  await expect(page.locator('[style*="block"]')).toContainText("Incorrect");

  //we can use fill to clear the field
  await userName.fill("")

  //we can use either type or fill to enter text into the field
  await userName.fill('rahulshettyacademy')
  await signIn.click()

  //we can use first() method to get first element or .nth(0)
  console.log(await page.locator('.card-body a').first().textContent())
  console.log(await page.locator('.card-body a').nth(1).textContent())
});

test("Page Playwright test", async ({ page }) => {
  //no need to initial context when we pass 'page'
  await page.goto("https://google.com");
  await expect(page).toHaveTitle("Google");
});
