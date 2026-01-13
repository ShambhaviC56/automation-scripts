import { test, expect, Page } from '@playwright/test';

const now = Date.now();

test.describe('Account Creation', () => {
  test(`Create New Account with All Fields - TC001 - ${now}`, async ({ page }) => {

    // Login to Salesforce
    await page.goto('_');
    await page.waitForSelector('#username', { state: 'visible' });
    await page.fill('#username', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.fill('#password', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.click('#Login');
    await page.waitForSelector('.slds-global-header', { state: 'visible' });

    // Navigate to Accounts
    await page.goto('/lightning/o/Account/list?filterName=Recent');
    await page.waitForLoadState('networkidle');

    // Click New button
    await page.locator('a[title="New"], button[name="New"]').first().click();
    await page.waitForSelector('div.slds-modal__container', { timeout: 10000 });

    // Fill Account Name
    await page.waitForSelector('lightning-input-field[field-name="Name"] input', { state: 'visible' });
    await page.fill('lightning-input-field[field-name="Name"] input', 'Acme Corporation');

    // Select Industry
    await page.click('lightning-combobox[field-name="Industry"] button');
    await page.waitForSelector('lightning-base-combobox-item[data-value="Technology"]', { state: 'visible' });
    await page.click('lightning-base-combobox-item[data-value="Technology"]');

    // Select Type
    await page.click('lightning-combobox[field-name="Type"] button');
    await page.waitForSelector('lightning-base-combobox-item[data-value="Customer"]', { state: 'visible' });
    await page.click('lightning-base-combobox-item[data-value="Customer"]');

    // Select Rating
    await page.click('lightning-combobox[field-name="Rating"] button');
    await page.waitForSelector('lightning-base-combobox-item[data-value="Hot"]', { state: 'visible' });
    await page.click('lightning-base-combobox-item[data-value="Hot"]');

    // Fill Website
    await page.waitForSelector('lightning-input-field[field-name="Website"] input', { state: 'visible' });
    await page.fill('lightning-input-field[field-name="Website"] input', 'www.acme.com');

    // Fill Phone
    await page.waitForSelector('lightning-input-field[field-name="Phone"] input', { state: 'visible' });
    await page.fill('lightning-input-field[field-name="Phone"] input', '415-555-1234');

    // Click Save
    await page.locator('button[name="SaveEdit"], button[title="Save"]').first().click();

    // Verify Account is created successfully and toast message is displayed
    await expect(page.locator('div.forceToastMessage')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('div.forceToastMessage')).toContainText('Account was created');

    // Verify Account Name is displayed
    await page.waitForSelector('lightning-output-field[field-name="Name"] lightning-formatted-text', { state: 'visible' });
    await expect(page.locator('lightning-output-field[field-name="Name"] lightning-formatted-text')).toContainText('Acme Corporation');

    // Verify Industry is displayed
    await page.waitForSelector('lightning-output-field[field-name="Industry"] lightning-formatted-text', { state: 'visible' });
    await expect(page.locator('lightning-output-field[field-name="Industry"] lightning-formatted-text')).toContainText('Technology');

    // Verify Type is displayed
    await page.waitForSelector('lightning-output-field[field-name="Type"] lightning-formatted-text', { state: 'visible' });
    await expect(page.locator('lightning-output-field[field-name="Type"] lightning-formatted-text')).toContainText('Customer');

    // Verify Rating is displayed
    await page.waitForSelector('lightning-output-field[field-name="Rating"] lightning-formatted-text', { state: 'visible' });
    await expect(page.locator('lightning-output-field[field-name="Rating"] lightning-formatted-text')).toContainText('Hot');

    // Verify Website is displayed
    await page.waitForSelector('lightning-output-field[field-name="Website"] lightning-formatted-url', { state: 'visible' });
    await expect(page.locator('lightning-output-field[field-name="Website"] lightning-formatted-url')).toContainText('www.acme.com');

    // Verify Phone is displayed
    await page.waitForSelector('lightning-output-field[field-name="Phone"] lightning-formatted-phone', { state: 'visible' });
    await expect(page.locator('lightning-output-field[field-name="Phone"] lightning-formatted-phone')).toContainText('415-555-1234');

    // Logout
    await page.click('button.branding-userProfile-button');
    await page.waitForSelector('a[href*="logout"]', { state: 'visible' });
    await page.click('a[href*="logout"]');
    await page.waitForSelector('#username', { state: 'visible' });
  });
});