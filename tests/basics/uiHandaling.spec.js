const { test, expect } = require("@playwright/test");


test("22. Select Value form the Dropdown", async ({ page }) => {
    // Description: Select a value from the dropdown and verify the blinking documents link is present.
    await page.goto("https://rahulshettyacademy.com/loginpagePractice");
    const usrname = page.locator("#username");
    const password = page.locator("#password");
    const dropdown = page.locator("select.form-control");
    const blinkingText = page.locator("[href*='documents-request']"); //24
    // await usrname.fill("rahulshettyacademy");
    // await password.fill("Learning@830$3mK2");
    // await page.locator("#signInBtn").click();

    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();//23
    await page.locator("#okayBtn").click();
    await blinkingText.toHaveAttribute("class", "blinkingText");  //24
});

test("26.Child window heandling", async ({ browser }) => {
    // Description: Open the documents request link and wait for the new child page to be created.
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractice");
    const blinkingText = page.locator("[href*='documents-request']");
    //User for handling child window, we need to use Promise.all() to wait for the new page to be created and the click event to be triggered.
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        blinkingText.click(),
    ]);

    const text = await newPage.locator(".red").textContent();
    const domain = text.split("@")[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    await page.pause();

});


test("27.Difference between textcontent and valueInput", async ({ browser }) => {
    // Description: Open the documents request link and wait for the new child page to be created.
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractice");
    const blinkingText = page.locator("[href*='documents-request']");
    //User for handling child window, we need to use Promise.all() to wait for the new page to be created and the click event to be triggered.
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        blinkingText.click(),
    ]);

    const text = await newPage.locator(".red").textContent();
    const domain = text.split("@")[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());


    // await page.pause();

});