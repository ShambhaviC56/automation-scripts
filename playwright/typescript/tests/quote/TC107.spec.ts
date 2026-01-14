import { test, expect } from '../../fixtures/auth.fixture';
import { QuotePage } from '../../pages/QuotePage';

test.describe('TC107 - Verify functionality of Create Quote Feature', () => {
  test('Verify Create Quote Functionality', async ({ authenticatedPage }) => {
    const quotePage = new QuotePage(authenticatedPage);

    // 1. Click on 'New' button to start creating a new quote.
    await quotePage.navigateToNewQuote();

    //Expected Result 1: A form should open with necessary fields for entering the quote details.
    expect(await quotePage.isQuoteFormVisible()).toBe(true);

    // Fill in some data
    await quotePage.fillQuoteDetails('Test Quote 123', '12/31/2024');

    //2. The user should be able to save and cancel the creation process without any data loss.
    await quotePage.cancelQuote();

    //Verify that we are no longer on the New Quote Form
    expect(await quotePage.isQuoteFormVisible()).toBe(false);
  });
});