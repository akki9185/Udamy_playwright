const {test} = require('@playwright/test');



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

