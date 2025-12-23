const { test, expect } = require('@playwright/test');

const generateUniqueName = () => {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `Opportunity Name - ${timestamp}-${randomNumber}`;
};

test.describe('Opportunity Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login to Salesforce
    await page.goto('_');
    await page.waitForSelector('#username', { state: 'visible' });
    await page.fill('#username', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.fill('#password', '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */');
    await page.click('#Login');
    await page.waitForSelector('.slds-global-header', { state: 'visible' });
    // Handle any welcome modals or pop-ups that might appear (example)
    // You might need to adjust the selectors based on your Salesforce setup
    try {
      await page.waitForSelector('button.slds-button:has-text(\'Maybe Later\')', { timeout: 5000 });
      await page.click('button.slds-button:has-text(\'Maybe Later\')');
    } catch (e) {
      // Ignore if the element is not found
    }
  });

  test(`Opportunity Creation - TC036 - ${Date.now()}`, async ({ page }) => {
    // 1. Click on 'New' button in the top right corner
    await page.waitForSelector('div.slds-global-actions button[title="New"]', { state: 'visible' });
    await page.click('div.slds-global-actions button[title="New"]');

    // 2. Select 'Opportunities' from the dropdown list
    await page.waitForSelector('div.forceActionButton.uiActionGroup.desktop.oneActionsRibbon a[title="New Opportunity"]', { state: 'visible' });
    await page.click('div.forceActionButton.uiActionGroup.desktop.oneActionsRibbon a[title="New Opportunity"]');

    // Expected Result 1: New Opportunity page should open with a blank form.
    await page.waitForSelector('lightning-input-field[field-name="Name"] input', { state: 'visible' });

    // 3. Fill in all required fields (Name, Account Name, Stage, Amount etc.)
    const opportunityName = generateUniqueName();
    await page.fill('lightning-input-field[field-name="Name"] input', opportunityName);

    // Account Name (Lookup field)
    await page.click('lightning-lookup[field-name="AccountId"] input');
    await page.fill('lightning-lookup[field-name="AccountId"] input', 'Edge Communications'); //Replace with a valid Account Name in your org
    await page.waitForSelector('lightning-base-combobox-item span[title="Edge Communications"]', { state: 'visible' });
    await page.click('lightning-base-combobox-item span[title="Edge Communications"]');

    // Stage (Picklist)
    await page.click('lightning-combobox[field-name="StageName"] button');
    await page.waitForSelector('lightning-base-combobox-item[data-value="Prospecting"]', { state: 'visible' });
    await page.click('lightning-base-combobox-item[data-value="Prospecting"]');

    // Close Date
    await page.click('lightning-input[field-name="CloseDate"] input');
    await page.locator('button.slds-button[title="Go to next month"]').click();
    await page.locator('button.slds-day[aria-label*="Choose Monday"]').first().click();

    //Amount
    await page.fill('lightning-input-field[field-name="Amount"] input', '1000');

    // 4. Save the Opportunity
    await page.waitForSelector('button[name="SaveEdit"]', { state: 'visible' });
    await page.click('button[name="SaveEdit"]');

    // Expected Result 2: Success message 'Opportunity has been created.' should appear at the top of the screen.
    await page.waitForSelector('div.forceToastMessage', { state: 'visible', timeout: 10000 });
    const toastText = await page.textContent('div.forceToastMessage');
    expect(toastText).toContain('Opportunity');
  });

  test.afterEach(async ({ page }) => {
    // Logout from Salesforce
    await page.waitForSelector('button.branding-userProfile-button', { state: 'visible' });
    await page.click('button.branding-userProfile-button');
    await page.waitForSelector('a[href*="logout"]', { state: 'visible' });
    await page.click('a[href*="logout"]');
    await page.waitForSelector('#username', { state: 'visible' }); // Wait for login page to appear
  });
});