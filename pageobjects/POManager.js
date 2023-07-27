const { CheckoutPage } = require("./CheckoutPage")
const { DashboardPage } = require("./DashboardPage")
const { LoginPage } = require("./LoginPage")
const { OrderSuccessPage } = require("./OrderSuccessPage")

class POManager{

    constructor(page){
        this.page=page
        this.loginPage=new LoginPage(this.page)
        this.dashboardPage=new DashboardPage(this.page)
        this.checkOutPage=new CheckoutPage(this.page)
        this.orderSuccessPage=new OrderSuccessPage(this.page)
    }


    getLoginPage(){
        return this.loginPage
    }

    getDashboardPage(){
        return this.dashboardPage
    }

    getCheckOutPage(){
        return this.checkOutPage
    }

    getConfirmOrder(){
        return this.orderSuccessPage
    }
}
module.exports={POManager}