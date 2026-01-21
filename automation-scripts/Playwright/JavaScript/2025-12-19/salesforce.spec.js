
const baseUrl = 'https://fa-esev-dev18-saasfademo1.ds-fa.oraclepdemos.com';
const username = '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */';
const password = '/* CREDENTIALS NOT CONFIGURED - Add in Configurations */';

test.describe('Quote Creation with Invalid Account/Contact', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    // Login
    await page.goto(baseUrl);
    await page.locator('#username').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#Login').click();
    await page.waitForLoadState('networkidle');
  });

  test('TC108 - Verify Account/Contact lookup functionality', async () => {
    // Navigate to Quotes
    await page.goto(baseUrl + '/lightning/o/Quote/list');
    await page.waitForSelector('.slds-page-header', { state: 'visible' });

    // Click New Quote
    await page.waitForSelector('div[title="New"]', { state: 'visible' });
    await page.click('div[title="New"]');

    // Enter invalid Account ID
    await page.waitForSelector('lightning-input[data-field="AccountId"] input', { state: 'visible' });
    await page.fill('lightning-input[data-field="AccountId"] input', 'InvalidAccountId123');

    // Enter invalid Contact ID
    await page.waitForSelector('lightning-input[data-field="ContactId"] input', { state: 'visible' });
    await page.fill('lightning-input[data-field="ContactId"] input', 'InvalidContactId456');

    //Click save
    await page.waitForSelector('button[name="SaveEdit"]', { state: 'visible' });
    await page.click('button[name="SaveEdit"]');

    // Verify error message for invalid Account/Contact
    await page.waitForSelector('.slds-text-color_error', { state: 'visible' });
    const errorMessage = await page.textContent('.slds-text-color_error');
    expect(errorMessage).toContain('Account ID: id value of incorrect type');

    const contactErrorMessage = await page.textContent('.slds-text-color_error');
    expect(contactErrorMessage).toContain('Contact ID: id value of incorrect type');


    //Clear the invalid data
    await page.fill('lightning-input[data-field="AccountId"] input', '');
    await page.fill('lightning-input[data-field="ContactId"] input', '');

    //Enter valid account
    await page.click("lightning-input[data-field='AccountId'] input");
    await page.fill("lightning-input[data-field='AccountId'] input", 'Edge Communications');
    await page.waitForSelector("lightning-base-combobox-item:has-text('Edge Communications')");
    await page.click("lightning-base-combobox-item:has-text('Edge Communications')");

    //Enter valid contact
    await page.click("lightning-input[data-field='ContactId'] input");
    await page.fill("lightning-input[data-field='ContactId'] input", 'Amy Taylor');
    await page.waitForSelector("lightning-base-combobox-item:has-text('Amy Taylor')");
    await page.click("lightning-base-combobox-item:has-text('Amy Taylor')");

    //Click save again
    await page.click('button[name="SaveEdit"]');

    //Assert success message
    await page.waitForSelector('div.forceToastMessage', { state: 'visible', timeout: 10000 });
    const toastText = await page.textContent('div.forceToastMessage');
    expect(toastText).toContain('was created');

  });

  test.afterEach(async () => {
        // Logout
        await page.goto(baseUrl + '/secur/logout.jsp');
    });
});