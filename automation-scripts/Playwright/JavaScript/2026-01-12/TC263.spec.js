const { test, expect } = require('@playwright/test');

const generateUniqueName = () => {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `TestContact${timestamp}${randomNumber}`;
};

test.describe('Contact Creation', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('_');
    await page.waitForSelector('#username');
    await page.fill('#username', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.fill('#password', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.click('#Login');
    await page.waitForSelector('.slds-global-header', { state: 'visible' });

    // Handle potentially displayed welcome modal
    const modalLocator = page.locator('div[role="dialog"]:has-text("Welcome to Lightning Experience")');
        if (await modalLocator.count() > 0) {
            const closeModalButton = page.locator('button:has-text("Close")');
            await closeModalButton.click();
        }

    // Navigate to Contacts tab
    await page.goto('/lightning/o/Contact/home');
    await page.waitForSelector('.slds-page-header', { state: 'visible' });
  });

  test(`Attempt to create a Contact with invalid data and verify error messages - TC263 - ${Date.now()}`, async ({ page }) => {
    // Click the 'New' button
    await page.waitForSelector('a[title="New"]', { state: 'visible' });
    await page.click('a[title="New"]');

    // Leave required fields blank (e.g., Last Name)
    // Enter an invalid email address (e.g., missing @ symbol)
    await page.waitForSelector('lightning-input[field-name="Email"] input', { state: 'visible' });
    await page.fill('lightning-input[field-name="Email"] input', 'invalid-email');

    // Click 'Save'
    await page.waitForSelector('button[name="SaveEdit"]', { state: 'visible' });
    await page.click('button[name="SaveEdit"]');

    // Error messages are displayed for each invalid or missing field
    // The Contact record is not created
    // The user remains on the Contact creation page
    // Specific error messages are displayed: 'Last Name: Required field is missing', 'Email: Invalid Email Address'

    // Last Name Error
    await page.waitForSelector('div[data-output-id="lastName_ileinner"] div.slds-form-element__help', { state: 'visible' });
    const lastNameError = await page.textContent('div[data-output-id="lastName_ileinner"] div.slds-form-element__help');
    expect(lastNameError).toContain('Last Name');

    //Email Error
    await page.waitForSelector('div[data-output-id="Email_ileinner"] div.slds-form-element__help', { state: 'visible' });
    const emailError = await page.textContent('div[data-output-id="Email_ileinner"] div.slds-form-element__help');
    expect(emailError).toContain('Invalid Email Address');
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