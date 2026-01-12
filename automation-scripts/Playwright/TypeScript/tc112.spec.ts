import { test, expect, Page } from '@playwright/test';

const testCaseCode = 'TC112';


test.describe('Quote Functionality Verification', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();

    // Login
    await page.goto('_');
    await page.waitForSelector('#username', { state: 'visible' });
    await page.fill('#username', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.fill('#password', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.click('#Login');
    await page.waitForSelector('.slds-global-header', { state: 'visible' });

    // Handle any welcome modals or pop-ups (example)
    // await page.locator('button:has-text("Maybe Later")').click();
  });

  test(`Verify Quote Creation - ${testCaseCode.toLowerCase()} - ${Date.now()}`, async () => {
    // Try creating a quote using an older version of Salesforce.
    await page.goto('/lightning/o/Quote/new');

    // Assert that the system redirects to the correct page for creating quotes without any errors or issues.
    await expect(page).toHaveURL(//lightning/o/Quote/new/);

    // Assert that all existing functionalities continue to operate as expected.
    // including account/contact lookups and security measures.

    // For example, check if the account lookup field is present:
    await page.waitForSelector('lightning-input-field[field-name="AccountId"] input', { state: 'visible' });
    await expect(page.locator('lightning-input-field[field-name="AccountId"] input')).toBeVisible();


    // Enter some dummy values to test other functionalities.  This part requires Salesforce Field Metadata
    // Since no metadata is available, I will add the steps to enter some basic information which usually exists on the New Quote screen

    //Fill Quote Name
    await page.locator('lightning-input-field[field-name="Name"] input').fill('Test Quote');

    //Check Expiration Date input availability
    await page.locator('lightning-input-field[field-name="ExpirationDate"] input').isVisible();


  });

  test.afterEach(async () => {
    // Logout
    await page.click('button.branding-userProfile-button');
    await page.waitForSelector('a[href*="logout"]', { state: 'visible' });
    await page.click('a[href*="logout"]');
    await page.waitForSelector('#username', { state: 'visible' });
  });
});