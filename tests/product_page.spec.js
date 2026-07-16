const { test, expect } = require("@playwright/test");


test("Get all product name", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractice");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("#login").click();
    // await page.waitForLoadState("networkidle"); this is Fleky approch, sometimes it is work and sometimes its not so we use below.
    await page.locator(".card-body h1 a").last().waitFor();
    console.log(await page.locator(".card-body h1 a").allTextContents());

});