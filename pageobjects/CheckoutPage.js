const { expect } = require("@playwright/test");
class CheckoutPage {

    constructor(page) {
        this.page=page
        this.wait = page.locator("div li")
        this.productVisibility = page.locator('h3:has-text("adidas original")')
        this.checkOutButton = page.locator("text=Checkout")
        this.cvv = page.locator("div input")
        this.name = page.locator("div input")
        this.country = page.locator("[placeholder*='Country']")
        this.dropdown = page.locator(".ta-results")
        this.submit = page.locator(".action__submit")
    }

    async verifyProductIsDisplayed(productName) {
        //wait for cart page to load
        await this.wait.first().waitFor();

        //check whether our product is present in cart page
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }

    async checkoutOrder() {

        //click on Checkout button
        await this.checkOutButton.click();

        //fill CVV Code
        await this.cvv.nth(1).type("123");

        //fill name
        await this.name.nth(2).type("Sample User");

        //Select India in Auto-suggestion
        await this.country.type("ind", { delay: 100 });

        //get the auto-suggestion count
        const dropdown = this.dropdown;

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
        await this.submit.click();

    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')")
    }
}

module.exports = { CheckoutPage }