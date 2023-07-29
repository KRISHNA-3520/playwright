const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

const loginPayload = {
  userEmail: "kjamadar26@gmail.com",
  userPassword: "Sachin@200",
};

const orderPayload = {
  orders: [{ country: "Benin", productOrderedId: "6262e95ae26b7e1a10e89bf0" }],
};

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("@API Browser Context Playwright test", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  //click on ORDERS button
  await page.locator('[routerlink*="myorders"]').click();

  //search placed order id in Orders Tab
  await page.locator("tbody").waitFor();

  //get row count
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    //get order id from row
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderID.includes(rowOrderId)) {
      //click on View button of matched order id
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdfromDetailsPage = await page.locator(".col-text").textContent();
  expect(response.orderID.includes(orderIdfromDetailsPage)).toBeTruthy();

  // await page.pause();
});
