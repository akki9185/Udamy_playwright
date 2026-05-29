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



