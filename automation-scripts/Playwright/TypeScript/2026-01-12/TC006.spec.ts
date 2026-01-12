import { test, expect, Page } from '@playwright/test';

test.describe('Account Record Verification', () => {
  let page: Page;
  const timestamp = new Date().getTime();

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();

    // Login to Salesforce
    await page.goto('https://login.salesforce.com');
    await page.waitForSelector('#username', { state: 'visible' });
    await page.fill('#username', '/* ADD YOUR SALESFORCE USERNAME */');
    await page.fill('#password', '/* ADD YOUR SALESFORCE PASSWORD */');
    await page.click('#Login');
    await page.waitForSelector('.slds-global-header', { state: 'visible' });

    // Handle any potential welcome modals or pop-ups (example - you might need different selectors)
    try {
      await page.waitForSelector('button[title="View All"]', { state: 'visible', timeout: 5000 });
      await page.click('button[title="View All"]');
    } catch (e) {
      // Do nothing, continue if View All button doesn't exist
    }
  });

  test(`Verify Existing Account Record - TC006 - ${timestamp}`, async () => {
    // 1. Navigate to the Accounts tab.
    await page.goto('https://login.salesforce.com/lightning/o/Account/list?filterName=Recent');
    await page.waitForSelector('.forceListViewManager', { state: 'visible' });

    // 2. Select any existing Account record from the list view.
    // Assuming the first record in the list is clickable, adjust selector as needed.
    await page.waitForSelector('th[data-label="Account Name"] a', { state: 'visible' });
    const firstAccountLink = await page.locator('th[data-label="Account Name"] a').first();
    await firstAccountLink.click();

    // 3. Verify the Account record page loads correctly.
    // Expectation 1: Account record page loads without any errors.
    await page.waitForSelector('.slds-page-header', { state: 'visible' });

    // Expectation 2: All existing Account details are displayed correctly.
    // Verify at least one required field is visible with its label. Replace 'Name' with a more reliable unique identifier if needed
    await page.waitForSelector('lightning-formatted-text[data-output-field-id="Name"]', { state: 'visible' });
    expect(await page.isVisible('lightning-formatted-text[data-output-field-id="Name"]')).toBe(true);

    // Expectation 3: Related lists (e.g., Contacts, Opportunities) load successfully.
    // Verify that the related list container is visible
    await page.waitForSelector('h2[title="Contacts"]', { state: 'visible' });
    expect(await page.isVisible('h2[title="Contacts"]')).toBe(true);

    await page.waitForSelector('h2[title="Opportunities"]', { state: 'visible' });
    expect(await page.isVisible('h2[title="Opportunities"]')).toBe(true);

  });

  test.afterEach(async () => {
    // Logout from Salesforce
    await page.click('button.branding-userProfile-button');
    await page.waitForSelector('a[href*="logout"]', { state: 'visible' });
    await page.click('a[href*="logout"]');
    await page.waitForLoadState('networkidle');
  });
});