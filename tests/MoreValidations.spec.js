const { test, expect } = require("@playwright/test");

test("More Validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  //await page.goto('https://www.google.com')

  //go back to rahulshetty.com/AutomationPractice website
  // await page.goBack()

  //go forward to google.com
  // await page.goForward()

  //check field is visible
  await expect(page.locator("#displayed-text")).toBeVisible();

  //click on hide button
  await page.locator("#hide-textbox").click();

  //check field in hidden
  await expect(page.locator("#displayed-text")).toBeHidden();

  //code to handle dialogue in playwright
  page.on("dialog", (dialog) => dialog.accept());

  //click on confirm button
  await page.locator("#confirmbtn").click();

  //code to hover over an element
  await page.locator("#mousehover").hover();

  //handling frames
  const framePage = page.frameLocator("#courses-iframe");

  await framePage.locator('li a[href*="lifetime-access"]:visible').click();

  const textCheck = await framePage.locator(".text h2").textContent();

  console.log(textCheck.split(" ")[1])

});