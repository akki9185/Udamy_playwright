const { test, expect } = require("@playwright/test");

//basic test structure
//For Await use async keyword is required for function or block scope

test("Test1 basics", async function () {
    console.log("Hello world");
});


test("Test1 basics1", async () => {
    console.log("Hello world");
});

//Open new fresh browser with the page context 
test("Browser context", async ({ browser }) => {
    const pageContext = await browser.newContext();
    const page = await pageContext.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractice");
})
//Browser without page context, Page as fixture
test("Browser without page context, Page as fixture", async ({ page }) => {
    //const pageContext = await browser.newContext();
    //const page = await pageContext.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractice");
})

test("Make sance", async ({ page }) => {
    await page.goto("https://www.flipkart.com");
    console.log("Make sance")
})


test.only("13.basics Codes", async ({ page }) => {
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    })




