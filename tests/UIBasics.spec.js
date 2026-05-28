const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');



test('First Case Type 1 with function', async function()
{
});


test('launch browser context declaration for in incognito mode', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com/'); 
});

test('Launch Browser in normal Way with  cookies', async ({browser, page})=>
{
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto('https://www.flipkart.com/');
});




test('launch browser in default mode', async ({page})=>
{

    await page.goto('https://www.google.com/'); 
});

test('launch browser in default mode1', async ({page})=> 
{

    await page.goto('https://www.google.com/'); 
    console.log(await page.title());
    await expect(page).toHaveTitle('Google'); // with toHaveTitle we can verify the title of the page and if the title is not matching then it will throw an error and fail the test case
});


test('NebulaLogin_Correct Data', async ({page})=>   // with only keyword we can run only this test case and ignore all other test cases in the file
{

    await page.goto('http://206.189.23.26:3003'); 
    // console.log(await page.title());
    // await expect(page).toHaveTitle('206.189.23.26:3003/webapp/login'); // with toHaveTitle we can verify the title of the page and if the title is not matching then it will throw an error and fail the test case
    await page.locator('input#email').fill('ankitqa.iihglobal+ess270510@gmail.com');
    await page.locator('input#password').fill('Pa$$w0rd!');
    await page.locator('button[type="submit"]').click();
});


test.only('NebulaLogin_Email_Wrong', async ({page})=>   // with only keyword we can run only this test case and ignore all other test cases in the file
{

    await page.goto('http://206.189.23.26:3003'); 
    // console.log(await page.title());
    // await expect(page).toHaveTitle('206.189.23.26:3003/webapp/login'); // with toHaveTitle we can verify the title of the page and if the title is not matching then it will throw an error and fail the test case
    await page.locator('input#email').fill('ankitqa.iihglobal+ess27051078@gmail.com');
    await page.locator('input#password').fill('Pa$$w0rd!');
    await page.locator('button[type="submit"]').click();
    console.log( await page.locator('[class*="mui-kowl1"]').textContent());
    await expect(page.locator('[class*="mui-kowl1"]')).toContainText("Invalid Email or Password"); // with toHaveText we can verify the text of the element and if the text is not matching then it will throw an error and fail the test case
   
});
