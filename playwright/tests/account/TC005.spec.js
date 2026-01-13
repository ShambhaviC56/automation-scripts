const { test } = require('../fixtures/auth.fixture');
const { expect } = require('@playwright/test');
const AccountPage = require('../pages/AccountPage');

test.describe('TC005 - Verify account creation fails when user lacks necessary permissions.', () => {
  test('Verify New button is not visible and Insufficient Privileges message is displayed', async ({ authenticatedPage, baseURL }) => {
    const accountPage = new AccountPage(authenticatedPage);

    await accountPage.navigateToAccountsTab();

    const isNewButtonVisible = await accountPage.isNewButtonVisible();
    expect(isNewButtonVisible).toBe(false);

    const accountCreationUrl = `${baseURL}/lightning/o/Account/new`;
    await accountPage.navigateToAccountCreationUrl(accountCreationUrl);

    const errorMessage = await accountPage.getInsufficientPrivilegesMessage();
    expect(errorMessage).toContain('Insufficient Privileges');
  });
});