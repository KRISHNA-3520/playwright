
const { POManager } = require('../pageobjects/POManager');
const { customTest } = require("../utils/test-base");



customTest(`Custom Test`, async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page)
  const loginPage = poManager.getLoginPage()
  const dashboardPage = poManager.getDashboardPage()
  const checkoutPage = poManager.getCheckOutPage()
  const orderConfirm = poManager.getConfirmOrder()

  await loginPage.goTo()
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password)

  await dashboardPage.searchProductandAdd(testDataForOrder.productName)
  await dashboardPage.navigateToCart()

  await checkoutPage.verifyProductIsDisplayed(testDataForOrder.productName)
  await checkoutPage.checkoutOrder()

  await orderConfirm.orderConfirmation()

  //await page.pause();
});
