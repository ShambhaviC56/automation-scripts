const { test, expect } = require('@playwright/test');

const generateUniqueName = () => {
  const timestamp = Date.now();
  return `Contact Creation - TC263 - ${timestamp}`;
};


test.describe('Contact Creation with Invalid Data', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('_');
    await page.waitForSelector('#username', { state: 'visible' });
    await page.fill('#username', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.fill('#password', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.click('#Login');
    await page.waitForSelector('.slds-global-header', { state: 'visible' });

    // Handle welcome modals or pop-ups (example, adjust as needed)
    // try {
    //   await page.locator('button:has-text("Maybe Later")').click({ timeout: 5000 });
    // } catch (e) { }

    // Navigate to Contacts tab
    await page.goto('/lightning/o/Contact/home');
    await page.waitForSelector('.slds-page-header', { state: 'visible' });
  });

  test(generateUniqueName(), async ({ page }) => {
    // Click the 'New' button
    await page.waitForSelector('button[name="New"]', { state: 'visible' });
    await page.click('button[name="New"]');

    // Wait for the New Contact modal to load
    await page.waitForSelector('lightning-input-field[field-name="LastName"] input', { state: 'visible' });

    // Leave required fields blank (e.g., Last Name)
    // Enter an invalid email address (e.g., missing @ symbol)
    await page.fill('lightning-input-field[field-name="Email"] input', 'invalid_email');

    // Click 'Save'
    await page.waitForSelector('button[name="SaveEdit"]', { state: 'visible' });
    await page.click('button[name="SaveEdit"]');

    // Verify error messages are displayed for each invalid or missing field
    await page.waitForSelector('.slds-page-header', { state: 'visible' });

    // Last Name validation
    await page.waitForSelector('div[data-output-message="Complete this field."]', { state: 'visible' });
    const lastNameErrorMessage = await page.locator('div[data-output-message="Complete this field."]').isVisible();
    expect(lastNameErrorMessage).toBe(true);

    // Email validation
    await page.waitForSelector('div[data-output-message="Enter a valid email address."]', { state: 'visible' });
    const emailErrorMessage = await page.locator('div[data-output-message="Enter a valid email address."]').isVisible();
    expect(emailErrorMessage).toBe(true);

    // Verify that the Contact record is not created (check URL for /e/Contact/ or similar - stay on new page)
    const url = page.url();
    expect(url).toContain('/lightning/o/Contact/new');


  });

  test.afterEach(async ({ page }) => {
    // Logout
    await page.waitForSelector('button.branding-userProfile-button', { state: 'visible' });
    await page.click('button.branding-userProfile-button');
    await page.waitForSelector('a[href*="logout"]', { state: 'visible' });
    await page.click('a[href*="logout"]');
    await page.waitForSelector('#username', { state: 'visible' }); // Wait for logout to complete
  });
});