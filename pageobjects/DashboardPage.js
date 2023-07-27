class DashboardPage {

    constructor(page) {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b")
        this.cart = page.locator('[routerlink*="cart"]')


    }

    async searchProductandAdd(productName) {
        console.log(await this.productsText.allTextContents());
        //get count of products
        const count = await this.products.count();

        for (let i = 0; i < count; ++i) {
            //compare productName
            if ((await this.products.nth(i).locator("b").textContent()) === productName) {
                //click on Add To Cart button
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }
    async navigateToCart() {
        await this.cart.click();
    }
    //click on cart button

}

module.exports = { DashboardPage }