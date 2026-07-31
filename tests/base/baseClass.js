const { expect } = require("@playwright/test");

class BaseClass {
    constructor(page) {
        this.page = page;
    }

    async login(email, password) {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await this.page.locator('#userEmail').fill(email);
        await this.page.locator('#userPassword').fill(password);
        await this.page.locator('#login').click();
        await expect(this.page.locator('h5').first()).toBeVisible();
        console.log(await this.page.locator('h5').first().textContent());
    }
}

module.exports = { BaseClass };