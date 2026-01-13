const { test } = require('../fixtures/auth.fixture');
const { expect } = require('@playwright/test');
const AccountPage = require('../pages/AccountPage');

test.describe('TC002 - Verify account creation fails with missing required fields.', () => {
  test('Verify account creation fails with missing required fields', async ({ authenticatedPage }) => {
    const accountPage = new AccountPage(authenticatedPage);
    const billingCityValue = 'San Francisco';

    // 1. Navigate to the Accounts tab.
    await accountPage.navigateToAccountsTab();

    // 2. Click 'New' button.
    await accountPage.clickNewButton();

    // 3. Leave required fields (e.g., Account Name) blank.

    // 4. Enter valid values in optional fields.
    await accountPage.fillOptionalFields(billingCityValue);

    // 5. Click 'Save' button.
    await accountPage.clickSaveButton();

    // Expected Results:
    // 1. Account creation fails.
    expect(await accountPage.isAccountCreationFailedMessageDisplayed()).toBe(true);

    // 2. Error message(s) are displayed indicating which required fields are missing.
    // Add specific error message check here if possible. General failure is checked above.

    // 3. User remains on the Account creation page.
    expect(await accountPage.checkIfStillOnAccountCreationPage()).toBe(true);

    // 4. The entered data in optional fields is preserved.
    expect(await accountPage.isBillingCityPopulated(billingCityValue)).toBe(true);
  });
});