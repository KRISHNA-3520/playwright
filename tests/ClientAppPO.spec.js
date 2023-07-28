const { test, expect } = require("@playwright/test");
const { POManager } = require('../pageobjects/POManager')
//JSON-->string-->js object
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorder.json')))

for (const data of dataset) {
  test(`Client App Login for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage()
    const dashboardPage = poManager.getDashboardPage()
    const checkoutPage = poManager.getCheckOutPage()
    const orderConfirm = poManager.getConfirmOrder()

    await loginPage.goTo()
    await loginPage.validLogin(data.username, data.password)

    await dashboardPage.searchProductandAdd(data.productName)
    await dashboardPage.navigateToCart()

    await checkoutPage.verifyProductIsDisplayed(data.productName)
    await checkoutPage.checkoutOrder()

    await orderConfirm.orderConfirmation()


    //await page.pause();
  });
}