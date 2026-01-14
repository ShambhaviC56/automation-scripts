const { test } = require('../../fixtures/auth.fixture');
const { expect } = require('@playwright/test');
const QuotePage = require('../../pages/QuotePage');

test.describe('TC106 - Verify UI of Create Quote Feature', () => {
  test('Verify redirection to Create Quote page and UI elements', async ({ authenticatedPage }) => {
    const quotePage = new QuotePage(authenticatedPage);
    await quotePage.navigateToNewQuotePage();

    // Verify URL after clicking 'Quotes' option
    expect(authenticatedPage.url()).toContain('/lightning/o/Quote/new');

    // Verify Page Header is visible
    const pageHeaderVisible = await quotePage.isQuotePageLoaded();
    expect(pageHeaderVisible).toBeTruthy();

    // Verify Quote Name input field is present
    await authenticatedPage.waitForSelector(quotePage.locators.quoteNameInput, {state: 'visible'});
    expect(await authenticatedPage.isVisible(quotePage.locators.quoteNameInput)).toBe(true);

    // Verify Account Lookup field is present
    await authenticatedPage.waitForSelector(quotePage.locators.accountLookup, {state: 'visible'});
    expect(await authenticatedPage.isVisible(quotePage.locators.accountLookup)).toBe(true);

    // Verify Save Button is present
    await authenticatedPage.waitForSelector(quotePage.locators.saveButton, {state: 'visible'});
    expect(await authenticatedPage.isVisible(quotePage.locators.saveButton)).toBe(true);

     // Verify Cancel Button is present
    await authenticatedPage.waitForSelector(quotePage.locators.cancelButton, {state: 'visible'});
    expect(await authenticatedPage.isVisible(quotePage.locators.cancelButton)).toBe(true);

  });
});