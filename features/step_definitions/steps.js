const { When, Then, Given } = require('@cucumber/cucumber')
const { expect } = require("@playwright/test");
Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

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

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    const userName = this.page.locator("input#username");
    const signIn = this.page.locator("#signInBtn");

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());

    //enter username
    await userName.type(username);

    //enter password
    await this.page.locator("[type='password']").type(password);

    //click on SignIn button
    await signIn.click();


});

Then('Verify Error message is displayed', async function () {
    //Catch invalid error message
    console.log(await this.page.locator('[style*="block"]').textContent());

    //assert the text
    await expect(this.page.locator('[style*="block"]')).toContainText("Incorrect");
});