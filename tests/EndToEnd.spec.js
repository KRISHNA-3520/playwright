const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ page }) => {
  const email = "kjamadar26@gmail.com";
  const productName = "adidas original";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").type("Sachin@200");
  await page.locator('[value="Login"]').click();
  //execution will till all api calls  are made
  await page.waitForLoadState("networkidle");

  //allTextContents() return an array of item
  console.log(await page.locator(".card-body b").allTextContents());

  //get count of products
  const count = await products.count();

  for (let i = 0; i < count; ++i) {
    //compare productName
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //click on Add To Cart button
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  //click on cart button
  await page.locator('[routerlink*="cart"]').click();

  //wait for cart page to load
  await page.locator("div li").first().waitFor();

  //check whether our product is present in cart page
  const bool = await page.locator('h3:has-text("adidas original")').isVisible();
  expect(bool).toBeTruthy();

  //click on Checkout button
  await page.locator("text=Checkout").click();

  //fill CVV Code
  await page.locator("div input").nth(1).type("123");

  //fill name
  await page.locator("div input").nth(2).type("Sample User");

  //Apply Coupon Code
  //await page.locator("div input").nth(3).type("testingCoupon");

  //click on Apply code button
  // await page.locator('button[type="submit"]').click()

  //Select India in Auto-suggestion
  await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });

  //get the auto-suggestion count
  const dropdown = page.locator(".ta-results");

  //wait for dropdown to appear
  await dropdown.waitFor();

  const optionsCount = await dropdown.locator("button").count();

  //iterate through dropdown count
  for (let i = 0; i < optionsCount; i++) {
    //get all context from dropdown
    const text = await dropdown.locator("button").nth(i).textContent();

    if (text === " India") {
      //click on India
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  //verify email
 //  await expect(page.locator('.user__name [type="text"]').nth(1)).toHaveText(email)

  //click on PLACE ORDER button
  await page.locator(".action__submit").click();

  //verify Thank you message
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );

  //Store order ID
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  //click on ORDERS button
  await page.locator('[routerlink*="myorders"]').nth(1).click();

  //search placed order id in Orders Tab
  await page.locator("tbody").waitFor();

  //get row count
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    //get order id from row
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      //click on View button of matched order id
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdfromDetailsPage=await page.locator('.col-text').textContent()
  expect(orderId.includes(orderIdfromDetailsPage)).toBeTruthy()

  await page.pause();
});
