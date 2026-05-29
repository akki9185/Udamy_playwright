const {expect} = require('@playwright/test');
const {test} = require('@playwright/test');

const url =  'http://206.189.23.26:3003';

test('NebulaLogin_EmailAndPassword_Wrong', async ({page})=>   // with only keyword we can run only this test case and ignore all other test cases in the file
{
    const email = page.locator('input#email');
    const password = page.locator('input#password');
    const submitButton = page.locator('button[type="submit"]');

    await page.goto(url); 
    await email.fill('ankitqa.iihglobal+ess27051078@gmail.com');
    await password.fill('Pa$$w0rd!');
    await submitButton.click();
    console.log( await page.locator('[class*="mui-kowl1"]').textContent());
    await expect(page.locator('[class*="mui-kowl1"]')).toContainText('Invalid Email or Password'); // with toHaveText we can verify the text of the element and if the text is not matching then it will throw an error and fail the test case
    await email.fill('');
    await password.fill('');
    await email.fill('ankitqa.iihglobal+es27054@gmail.com');
    await password.fill('Pa$$w0rd!1');
    await submitButton.click();
    console.log( await page.locator('[class*="mui-kowl1"]').textContent());
    await expect(page.locator('[class*="mui-kowl1"]')).toContainText('Invalid Email or Password'); // with toHaveText we can verify the text of the element and if the text is not matching then it will throw an error and fail the test case
    
});

test('NebulaLogin_Correct Data', async ({page})=>   // with only keyword we can run only this test case and ignore all other test cases in the file
{
    const email = page.locator('input#email');
    const password = page.locator('input#password');
    const submitButton = page.locator('button[type="submit"]');

    await page.goto(url); 
    // console.log(await page.title());
    // await expect(page).toHaveTitle('206.189.23.26:3003/webapp/login'); // with toHaveTitle we can verify the title of the page and if the title is not matching then it will throw an error and fail the test case
    await email.fill('ankitqa.iihglobal+ess270510@gmail.com');
    await password.fill('Pa$$w0rd!');
    await submitButton.click();
    await expect(page.locator('p.mui-1paa6iz')).toHaveText('Adhoc Search'); 
    //p.mui-1paa6iz
});



test('Subscription page', async ({page})=>   // with only keyword we can run only this test case and ignore all other test cases in the file
{

    const email = page.locator('input#email');
    const password = page.locator('input#password');
    const submitButton = page.locator('button[type="submit"]');
    const subscriptionHeading = page.locator('h5.mui-s2r9jq'); 
    await page.goto('http://206.189.23.26:3003/webapp/subscription');
    console.log(await subscriptionHeading.nth(0).textContent());
    console.log(await subscriptionHeading.nth(1).textContent());
    console.log(await subscriptionHeading.nth(2).textContent());
    console.log(await subscriptionHeading.nth(3).textContent());
    console.log(await subscriptionHeading.nth(4).textContent());
    console.log(await subscriptionHeading.first().textContent());
    console.log(await subscriptionHeading.last().textContent());
    console.log('-----------------------');
    const cardName = await subscriptionHeading.allTextContents();
    console.log(cardName);
    
        
});

test.only('Subscription page_Wait Dynamically', async ({page})=>   // with only keyword we can run only this test case and ignore all other test cases in the file
{

    const email = page.locator('input#email');
    const password = page.locator('input#password');
    const submitButton = page.locator('button[type="submit"]');
    const subscriptionHeading = page.locator('h5.mui-s2r9jq'); 
    await page.goto('http://206.189.23.26:3003/webapp/subscription');
    // await page.waitForLoadState('networkidle'); // First Method with waitForLoadState we can wait for the page to load completely and if the page is not loaded then it will throw an error and fail the test case
    await subscriptionHeading.first().waitFor(); // Second Method with waitFor we can wait for the element to be visible and if the element is not visible then it will throw an error and fail the test case
    console.log('-----------------------');
    const cardName = await subscriptionHeading.allTextContents(); 
    console.log(cardName);
    //hello
    
        
});
