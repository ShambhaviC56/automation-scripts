import { test, expect } from '../../fixtures/auth.fixture';
import { QuotePage } from '../../pages/QuotePage';

test.describe('TC106 - Verify UI of Create Quote Feature', () => {
  test('Verify UI of Create Quote Feature', async ({ authenticatedPage }) => {
    const quotePage = new QuotePage(authenticatedPage);

    await quotePage.navigateToCreateQuote();

    // Verify redirection to Create Quote page
    const isQuotePageVisible = await quotePage.isCreateQuotePageVisible();
    expect(isQuotePageVisible).toBe(true);

    //Verify Quote Name input field is visible
    expect(await quotePage.isElementVisible('quoteNameInput')).toBe(true);

    //Verify Expiration Date input field is visible
    expect(await quotePage.isElementVisible('expirationDateInput')).toBe(true);

    //Verify Status combobox is visible
    expect(await quotePage.isElementVisible('statusCombobox')).toBe(true);

    //Verify Description textarea is visible
    expect(await quotePage.isElementVisible('descriptionTextarea')).toBe(true);

    //Verify Account Lookup is visible
    expect(await quotePage.isElementVisible('accountLookup')).toBe(true);

    //Verify Opportunity Lookup is visible
    expect(await quotePage.isElementVisible('opportunityLookup')).toBe(true);

    //Verify Save Button is visible
    expect(await quotePage.isElementVisible('saveButton')).toBe(true);

     //Verify Cancel Button is visible
    expect(await quotePage.isElementVisible('cancelButton')).toBe(true);
  });
});