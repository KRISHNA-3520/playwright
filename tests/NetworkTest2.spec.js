const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};

const fakePayload = { data: [], message: "No Orders" };

const orderPayload = {
  orders: [{ country: "Benin", productOrderedId: "6262e95ae26b7e1a10e89bf0" }],
};

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("Browser Context Playwright test", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  //click on ORDERS button
  await page.locator('[routerlink*="myorders"]').click();

  //altering request
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64bfab667244490f958b59d3",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64bfa3f27244490f958b4c8e",
      })
  );

  //click on View
  await page.locator('button:has-text("View")').first().click();
  await page.pause();
});
