const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

const loginPayload = {
  userEmail: "kjamadar26@gmail.com",
  userPassword: "Sachin@200",
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

  //altering response
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6484119a568c3e9fb18365c1",
    async (route) => {
      //intercepting response - API response --> browser-->render data on frontend
      const response = await page.request.fetch(route.request());
      let body = fakePayload;
      route.fulfill({
        response,
        body,
      });
    }
  );
  await page.pause();
  //click on ORDERS button
  await page.locator('[routerlink*="myorders"]').click();

  console.log(await page.locator(".mt-4").textContent());
  // await page.pause();
});
