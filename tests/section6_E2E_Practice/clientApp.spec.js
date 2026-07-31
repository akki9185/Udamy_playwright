const { test, expect } = require("@playwright/test");
const { BaseClass } = require("../base/baseClass.js");

test("Client application Login", async ({ page }) => {
    const baseClass = new BaseClass(page);
    await baseClass.login('ankitqa.iihglobal@gmail.com', 'Test@123');
});


test.only("Client app Login", async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('ankitqa.iihglobal@gmail.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await expect(page.locator('h5').first()).toBeVisible();
    console.log('ankit' + await page.locator('h5').first().textContent());

    const products = await page.locator('.card-body');
    //Select product "ZARA COAT 3"
    await page.pause();
    for (let i = 1; i < await products.count(); i++) {
        if (await products.locator('h5').nth(i).textContent() == 'ZARA COAT 3') {
            console.log('Testttttttttttttttttttttttttttttttt');
            await products.nth(i).locator('[class="btn w-10 rounded"]').click();
            break;
        }
    }
    await page.pause();
});





