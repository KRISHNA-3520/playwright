const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager')
const playwright = require("@playwright/test");

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    const browser = await playwright.chromium.launch({headless:false})
    const context = await browser.newContext();
    const page = await context.newPage();

    this.poManager = new POManager(page)
    const loginPage = this.poManager.getLoginPage()

    await loginPage.goTo()
    await loginPage.validLogin(username, password)
});


When('Add {string} to cart', async function (productName) {

    const dashboardPage = this.poManager.getDashboardPage()
    await dashboardPage.searchProductandAdd(productName)
    await dashboardPage.navigateToCart()

});

Then('Verify {string} is displayed in the cart', async function (productName) {
    const checkoutPage = this.poManager.getCheckOutPage()
    await checkoutPage.verifyProductIsDisplayed(productName)
    await checkoutPage.checkoutOrder()

});

Then('Verify order is present in the OrderHistory', async function () {
    const orderConfirm = this.poManager.getConfirmOrder()
    await orderConfirm.orderConfirmation()

});