const { test, expect } = require('@playwright/test');

test.describe('Account Creation and Automation Verification', () => {

  test.beforeEach(async ({ page }) => {
    // Login to Salesforce
    await page.goto('_');
    await page.waitForSelector('#username', { state: 'visible' });
    await page.fill('#username', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.fill('#password', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.click('#Login');
    await page.waitForSelector('.slds-global-header', { state: 'visible' });

    // Handle potential welcome modals/pop-ups (example - adapt to your specific org)
    // await page.locator('button:has-text("Maybe Later")').click();
    // await page.waitForTimeout(2000);
  });

  test('Account Creation with Automation Trigger - TC004 - {timestamp}', async ({ page }) => {
    // Navigate to Accounts tab
    await page.goto('/lightning/o/Account/list?filterName=Recent');
    await page.waitForSelector('.slds-page-header', { state: 'visible' });

    // Click 'New' button
    await page.waitForSelector('button[name="New"]', { state: 'visible' });
    await page.click('button[name="New"]');

    // Enter valid values in required fields
    await page.waitForSelector('lightning-input-field[field-name="Name"] input', { state: 'visible' });
    await page.fill('lightning-input-field[field-name="Name"] input', 'Test Account Automation');

    // Owner ID - Required, so fill with current user.  Simplest is to type a character then select the first result.
    await page.click('lightning-lookup[field-name="OwnerId"] input');
    await page.fill('lightning-lookup[field-name="OwnerId"] input', 'a');
    await page.waitForSelector('lightning-base-combobox-item', { state: 'visible' });
    await page.click('lightning-base-combobox-item');

    //IsDeleted - Required.  Set to False.
    const isDeletedCheckbox = await page.locator('lightning-input[field-name="IsDeleted"] input[type="checkbox"]');
      if (await isDeletedCheckbox.isChecked()) {
          await isDeletedCheckbox.click();
      }

    // Fill in optional fields
    await page.fill('lightning-input-field[field-name="BillingCity"] input', 'San Francisco');
    await page.fill('lightning-input-field[field-name="BillingPostalCode"] input', '94105');

    // Select Account Type
    await page.click('lightning-combobox[field-name="Type"] button');
    await page.waitForSelector('lightning-base-combobox-item[data-value="Prospect"]', { state: 'visible' });
    await page.click('lightning-base-combobox-item[data-value="Prospect"]');

    // Click 'Save' button
    await page.click('button[name="SaveEdit"]');

    // Wait for record page to load
    await page.waitForSelector('div.forceToastMessage', { state: 'visible', timeout: 10000 });

    // Verify Account is created successfully and success message appears
    const toastText = await page.textContent('div.forceToastMessage');
    expect(toastText).toContain('was created');

    // Verify User is redirected to the newly created Account record page (check for Account Name on page)
    await page.waitForSelector('lightning-formatted-text[data-output-value="true"]', {state: 'visible'});
    const accountName = await page.textContent('lightning-formatted-text[data-output-value="true"]');
    expect(accountName).toBe('Test Account Automation');

    // Verify the 'Description' field is updated automatically according to the workflow/trigger logic
    const descriptionValue = await page.textContent('lightning-formatted-text.field-value');
    expect(descriptionValue).toBe('Workflow Updated Description'); // Replace with expected value from workflow
  });

  test.afterEach(async ({ page }) => {
    // Logout from Salesforce
    await page.click('button.branding-userProfile-button');
    await page.waitForSelector('a[href*="logout"]', { state: 'visible' });
    await page.click('a[href*="logout"]');
    await page.waitForSelector('#username', { state: 'visible' }); // Wait for login page to appear
  });
});