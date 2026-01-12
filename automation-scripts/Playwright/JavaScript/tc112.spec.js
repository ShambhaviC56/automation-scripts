const { test, expect } = require('@playwright/test');

test.describe('Quote Functionality Verification', () => {
  let page;
  let context;
  const loginURL = '_';
  const username = '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */';
  const password = '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */';

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    // Login
    await page.goto(loginURL);
    await page.waitForSelector('#username', { state: 'visible' });
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('#Login');
    await page.waitForSelector('.slds-global-header', { state: 'visible' });

    // Handle potential welcome modals
    try {
      await page.waitForSelector('button[title="End Tour"]', { state: 'visible', timeout: 5000 });
      await page.click('button[title="End Tour"]');
    } catch (e) {
      // No modal
    }
  });

  test('Verify Quote Creation in Older Version - TC112 - ' + Date.now(), async () => {
    // Navigate to Quotes
    await page.goto('/lightning/o/Quote/home');
    await page.waitForSelector('.slds-page-header', { state: 'visible' });

    // Click New button
    await page.waitForSelector('div[title="New"]', { state: 'visible' });
    await page.locator('div[title="New"]').click();

    // Wait for the new quote page to load
    await page.waitForSelector('lightning-input-field[field-name="Name"] input', { state: 'visible' });

    // Verify that the page loaded successfully without errors.
    expect(page.url()).toContain('/lightning/o/Quote/new');

    // Enter Quote Name
    await page.fill('lightning-input-field[field-name="Name"] input', 'Test Quote');

    // Account Lookup
    await page.click('lightning-lookup[field-name="AccountId"] input');
    await page.fill('lightning-lookup[field-name="AccountId"] input', 'edge communications');
    await page.waitForSelector('lightning-base-combobox-item', { state: 'visible' });
    await page.click('lightning-base-combobox-item:has-text("Edge Communications")');

    // Expiration Date
    await page.click('lightning-input[field-name="ExpirationDate"] input');
    await page.locator('button[aria-label="Go to next month"]').click();
    await page.locator('td[aria-label="Choose Tuesday, July 16, 2024 as your expiration date"] button').click();

    // Verify existing functionality (account lookup) is working as expected
    const accountNameValue = await page.inputValue('lightning-lookup[field-name="AccountId"] input');
    expect(accountNameValue).toBe('Edge Communications');

    // Cancel Quote Creation
    await page.locator('button[name="CancelEdit"]').click();
    await page.locator('button[title="Cancel"]');
    await page.locator('button[title="Cancel"]').click();
  });

  test.afterEach(async () => {
    // Logout
    await page.waitForSelector('button.branding-userProfile-button', { state: 'visible' });
    await page.click('button.branding-userProfile-button');
    await page.waitForSelector('a[href*="logout"]', { state: 'visible' });
    await page.click('a[href*="logout"]');
    await page.waitForSelector('#username', { state: 'visible' });
    await context.close();
  });
});