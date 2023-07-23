const { test, expect } = require("@playwright/test");

test.only("UI Controls test", async ({ browser }) => {
  //to open fresh browser without plugins we use Context i.e. new instance of browser
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("input#username");
  const passWord = page.locator("[type='password']");
  const dropdown = page.locator("select.form-control");
  const userRadiobutton = page.locator(".radiotextsty").nth(1);
  const terms = page.locator("#terms");
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  //enter username
  await userName.type("rahulshetty");

  //enter password
  await passWord.type("learning");

  //dropdown
  await dropdown.selectOption("consult");

  //click on radio button User
  await userRadiobutton.click();

  //click on Okay button on popup
  await page.locator("#okayBtn").click();

  //verify whether radio button is checked
  await expect(userRadiobutton).toBeChecked();

  //check on checkbox
  await terms.click();

  //assert whether checkbox is clicked or not
  expect(terms.isChecked()).toBeTruthy();

  //uncheck on checkbox
  await terms.uncheck();

  //assert whether checkbox is unchecked
  expect(await terms.isChecked()).toBeFalsy();

  //verify blink text
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  //handling new tab scenario
  //new tab are returned in any array
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    await documentLink.click(),
  ]);

  const text = await newPage.locator(".red").textContent();
  console.log(text);
  await expect(newPage.locator(".red")).toContainText(
    "Please email us at mentor@rahulshettyacademy.com with below template to receive response"
  );

  // get the domain from above text
  const emailText = text.split("@");
  const domain = emailText[1].split(" ")[0];

  console.log(domain);

  //enter domain in parent tab
  await userName.fill("")
  await userName.type(domain);
  await page.pause();
  //click on SignIn button
  // await signIn.click();
});
