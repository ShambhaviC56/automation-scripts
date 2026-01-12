import { test, expect, Page } from '@playwright/test';

const timestamp = Date.now();

test.describe('Account Creation with Insufficient Permissions', () => {

  test.beforeEach(async ({ page }) => {
    // Login to Salesforce
    await page.goto('_');
    await page.waitForSelector('#username', { state: 'visible' });
    await page.fill('#username', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.fill('#password', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.click('#Login');
    await page.waitForSelector('.slds-global-header', { state: 'visible' });

    // Handle any welcome modals or pop-ups
    // Example: await page.locator('button:has-text("Close")').click();
  });

  test(`Account Creation Fails - Read Only User - ${timestamp}`, async ({ page }) => {
    // 2. Navigate to the Accounts tab.
    await page.goto('/lightning/o/Account/home');
    await page.waitForSelector('.slds-page-header', { state: 'visible' });

    // 3. Attempt to click the 'New' button or navigate to the Account creation URL directly.
    // Verify the 'New' button is not visible.
    const newButton = page.locator("button[name='New']");
    await expect(newButton).toBeHidden();

    // If user tries to access Account creation URL directly, an 'Insufficient Privileges' error message is displayed.
    await page.goto('/lightning/o/Account/new');
    await page.waitForLoadState();

    // Check for Insufficient Privileges message.  Adjust selector if needed.
    await expect(page.locator('text=Insufficient Privileges')).toBeVisible();

  });

  test.afterEach(async ({ page }) => {
    // Logout from Salesforce
    await page.waitForTimeout(2000);
    await page.click('button.branding-userProfile-button');
    await page.waitForSelector('a[href*="logout"]', { state: 'visible' });
    await page.click('a[href*="logout"]');
    await page.waitForLoadState();
    await page.waitForSelector('#username', { state: 'visible' }); // Wait for login page
  });
});