// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000, //40 Seconds is the default timeout for each test but if need more time then we can increase it here
  expect: {
    timeout:40 * 1000//5 Seconds is the default timeout for each expect assertion but if need more time then we can increase it here
    
  },

  use: {

    browserName: 'chromium', //we can also use 'chromium', 'firefox', 'chromium' or 'chromium-headless' for headless mode, 'chromium' for headed mode, 'chromium' for incognito mode, 'chromium' for persistent context mode, 'chromium' for mobile emulation mode, 'chromium' for webkit mode, 'chromium' for firefox mode, 'chromium' for edge mode, 'chromium' for chrome mode, 'chromium' for safari mode, 'chromium' for opera mode, 'chromium' for brave mode, 'chromium' for vivaldi mode, 'chromium' for tor mode, 'chromium' for edge chromium mode, 'chromium' for chrome headless mode, 'chromium' for firefox headless mode, 'chromium' for webkit headless mode, 'chromium' for edge headless mode, 'chromium' for chrome incognito mode, 'chromium' for firefox incognito mode, 'chromium' for webkit incognito mode, 'chromium' for edge incognito mode, 'chromium' for chrome persistent context mode, 'chromium' for firefox persistent context mode, 'chromium' for webkit persistent context mode, 'chromium' for edge persistent context mode, 'chromium' for chrome mobile emulation mode, 'chromium' for firefox mobile emulation mode, 'chromium' for webkit mobile emulation mode, and so on.

  },

});

