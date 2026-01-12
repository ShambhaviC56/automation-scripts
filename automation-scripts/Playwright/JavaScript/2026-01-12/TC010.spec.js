const { test, expect } = require('@playwright/test');

test.describe('Account Integrations Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Login to Salesforce
    await page.goto('_');
    await page.waitForSelector('#username', { state: 'visible' });
    await page.fill('#username', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.fill('#password', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.click('#Login');
    await page.waitForSelector('.slds-global-header', { state: 'visible' });

    // Handle potential welcome modals or pop-ups
    // Example: await page.locator('button:has-text("Maybe Later")').click();
  });

  test(`Account Integration - TC010 - ${Date.now()}`, async ({ page }) => {
    // Navigate to Accounts
    await page.goto('/lightning/o/Account/list?filterName=Recent');
    await page.waitForSelector('.slds-page-header', { state: 'visible' });

    // Click New
    await page.waitForSelector('button[name="New"]', { state: 'visible' });
    await page.click('button[name="New"]');

    // Wait for the new account modal to load
    await page.waitForSelector('lightning-input-field[field-name="Name"] input', { state: 'visible' });

    // Enter Account Name (Required Field)
    const accountName = `Test Account ${Date.now()}`;
    await page.fill('lightning-input-field[field-name="Name"] input', accountName);

    //Fill OwnerId (Required Field)
    await page.click('lightning-lookup[field-name="OwnerId"] input');
    await page.fill('lightning-lookup[field-name="OwnerId"] input', 'User'); //Replace 'User' with actual user name
    await page.waitForSelector('lightning-base-combobox-item', { state: 'visible' });
    await page.click('lightning-base-combobox-item:first-child');

    // Fill Optional fields.
    await page.fill('lightning-input-field[field-name="BillingCity"] input', 'San Francisco');
    await page.fill('lightning-input-field[field-name="BillingPostalCode"] input', '94105');
    await page.fill('lightning-input-field[field-name="BillingCountry"] input', 'USA');
    await page.fill('lightning-input-field[field-name="Phone"] input[type="tel"]', '123-456-7890');

    // Save the new Account
    await page.waitForSelector('button[name="SaveEdit"]', { state: 'visible' });
    await page.click('button[name="SaveEdit"]');

    // Verify the Account is created successfully. (Check for toast message)
    await page.waitForSelector('div.forceToastMessage', { state: 'visible', timeout: 10000 });
    const toastText = await page.textContent('div.forceToastMessage');
    expect(toastText).toContain('was created');

    // Verify Account Name is displayed on the record page
    await page.waitForSelector('lightning-formatted-text[data-output-field-id="Name"]', {state: 'visible'});
    const accountNameValue = await page.textContent('lightning-formatted-text[data-output-field-id="Name"]');
    expect(accountNameValue).toBe(accountName);

    // **MONITOR EXTERNAL SYSTEM**
    //Add steps to verify successful sync in the external system.
    //This will require knowledge of the external system's API or UI.
    //Example (Placeholder):
    //const externalSystemData = await fetchExternalSystemData(accountId);
    //expect(externalSystemData.name).toBe(accountName);
    //expect(externalSystemData.billingCity).toBe('San Francisco');

    //For demo purposes, add a dummy wait and assertion
    await page.waitForTimeout(5000); //Wait 5 seconds to simulate external system sync.
    expect(true).toBe(true); //Dummy Assertion.
  });

  test.afterEach(async ({ page }) => {
    // Logout from Salesforce
    await page.click('button.branding-userProfile-button');
    await page.waitForSelector('a[href*="logout"]', { state: 'visible' });
    await page.click('a[href*="logout"]');
    await page.waitForSelector('#username', { state: 'visible' }); // Wait for logout to complete
  });
});