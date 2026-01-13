const { test } = require('../fixtures/auth.fixture');
const { expect } = require('@playwright/test');
const AccountPage = require('../pages/AccountPage');

test.describe('TC001 - Verify successful account creation with valid data.', () => {
  test('Create new account successfully', async ({ authenticatedPage }) => {
    const accountPage = new AccountPage(authenticatedPage);

    // Assuming navigation to Accounts tab is needed before creating account.
    // Replace with actual navigation steps if needed.
    await accountPage.navigateToAccountsTab();

    const accountName = 'Test Account ' + Date.now();
    const accountNumber = '12345';
    const accountType = 'Technology Partner';
    const accountIndustry = 'Energy';
    const accountSite = 'Test Site';

    await accountPage.createAccount(accountName, accountNumber, accountType, accountIndustry, accountSite);

    const successMessage = await accountPage.getSuccessMessage();
    expect(successMessage).toContain('was created.');
  });
});
