const { test } = require('../../fixtures/auth.fixture');
const { expect } = require('@playwright/test');
const QuotePage = require('../../pages/QuotePage');

test.describe('TC107 - Verify functionality of Create Quote Feature', () => {
  test('Verify Quote creation and cancel', async ({ authenticatedPage }) => {
    const quotePage = new QuotePage(authenticatedPage);

    await quotePage.navigateToQuotes();
    await quotePage.clickNewButton();

    // Verify that the page loaded successfully
    expect(authenticatedPage.url()).toContain('/lightning/o/Quote/new');

    // Enter quote details
    await quotePage.enterQuoteName('Test Quote TC107');

    // Account Lookup
    await quotePage.searchAndSelectAccount('edge communications');

    //Cancel
    await quotePage.cancelQuote();

    //New Quote and Verify save functionality

    await quotePage.navigateToQuotes();
    await quotePage.clickNewButton();
    // Enter quote details
    await quotePage.enterQuoteName('Test Quote TC107 SAVE');

    // Account Lookup
    await quotePage.searchAndSelectAccount('edge communications');
        // Opportunity Lookup
    //await quotePage.searchAndSelectOpportunity('Test Opportunity');
    await quotePage.saveQuote();
  });
});