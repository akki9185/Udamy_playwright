const { test, expect } = require("@playwright/test");


test("asdasds", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();

    await page.waitForLoadState("networkidle");
    const products = await page.locator(".card-body b").allTextContents();
    console.log(products);


});