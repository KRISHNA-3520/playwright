const { After, Before,BeforeStep,AfterStep,Status } = require('@cucumber/cucumber');
const playwright = require("@playwright/test");
const { POManager } = require('../../pageobjects/POManager')

// It will run before every scenario
Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false })
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.poManager = new POManager(this.page)
});

//It will run before every steps in scenario
BeforeStep({ tags: "@foo" }, function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});

//It will run after every steps in scenario
AfterStep(async function ({result}) {

    if (result.status === Status.FAILED) {
        //it will take screenshot on failed case
        await this.page.screenshot({path:'failSS.png'})
    }
});