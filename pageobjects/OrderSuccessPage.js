const{expect}=require('@playwright/test')
class OrderSuccessPage {

    constructor(page) {
        this.thankyou = page.locator(".hero-primary")
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")
        this.orderButton = page.locator('[routerlink*="myorders"]')
        this.placedOrder = page.locator("tbody")
        this.rowCount = page.locator("tbody tr")
        this.confirmOrder = page.locator('.col-text')
    }

    async orderConfirmation() {


        //verify Thank you message
        await expect(this.thankyou).toHaveText(
            " Thankyou for the order. "
        );

        //Store order ID
        const orderId = await this.orderId.textContent();
        console.log(orderId);

        //click on ORDERS button
        await this.orderButton.nth(1).click();

        //search placed order id in Orders Tab
        await this.placedOrder.waitFor();

        //get row count
        const rows = await this.rowCount;

        for (let i = 0; i < (await rows.count()); i++) {
            //get order id from row
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                //click on View button of matched order id
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }

        const orderIdfromDetailsPage = await this.confirmOrder.textContent()
        expect(orderId.includes(orderIdfromDetailsPage)).toBeTruthy()

    }

}

module.exports = { OrderSuccessPage }