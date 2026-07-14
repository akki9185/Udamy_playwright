const { test, expect } = require("@playwright/test");


test("Login with  Wrong UserName", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractice");
    await page.locator("#username").fill("rahulshettyacademy1");
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("#login").click();
    console.log(await page.locator("[style*='block']").textContent());
});