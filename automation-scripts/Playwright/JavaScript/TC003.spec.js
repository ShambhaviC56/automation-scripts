const { test } = require('../fixtures/auth.fixture');
const { expect } = require('@playwright/test');
const AccountPage = require('../pages/AccountPage');

test.describe('TC003 - Verify account creation fails with invalid data (e.g., invalid email format, number in Account Name).', () => {
  test('Verify account creation fails with invalid data', async ({ authenticatedPage }) => {
    const accountPage = new AccountPage(authenticatedPage);

    const invalidAccountName = '123TestAccount';
    const invalidWebsite = 'invalid-email';

    await accountPage.createAccountWithInvalidData(invalidAccountName, invalidWebsite);

    const accountNameErrorMessage = await accountPage.getAccountNameErrorMessage();
    const websiteErrorMessage = await accountPage.getWebsiteErrorMessage();

    expect(await accountPage.isErrorMessageDisplayed()).toBe(true);
    expect(accountNameErrorMessage).not.toBe('');
    expect(websiteErrorMessage).not.toBe('');

    expect(await accountPage.isAccountNameInputPopulated()).toBe(invalidAccountName);
    expect(await accountPage.isWebsiteInputPopulated()).toBe(invalidWebsite);
  });
});