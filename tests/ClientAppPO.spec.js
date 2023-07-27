const { test,expect } = require("@playwright/test");
const {POManager}=require('../pageobjects/POManager')

test("Browser Context Playwright test", async ({ page }) => {
  const poManager=new POManager(page)
  const username="anshika@gmail.com"
  const password="Iamking@000"
  const productName = "adidas original";
  const loginPage=poManager.getLoginPage()
  const dashboardPage=poManager.getDashboardPage()
  const checkoutPage=poManager.getCheckOutPage()
  const orderConfirm=poManager.getConfirmOrder()

  await loginPage.goTo()
  await loginPage.validLogin(username,password)
  
  await dashboardPage.searchProductandAdd(productName)
  await dashboardPage.navigateToCart()

  await checkoutPage.checkoutOrder()

  await orderConfirm.orderConfirmation()


  //await page.pause();
});
