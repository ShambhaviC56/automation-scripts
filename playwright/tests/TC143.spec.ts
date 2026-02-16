import { test, expect } from '../../fixtures/auth.fixture';
import { Q2CPage } from '../../pages/Q2CPage';

test.describe('TC143 - Verify Existing Quote Creation Functionality', () => {
  test('Verify Quote Creation', async ({ authenticatedPage }) => {
    const q2cPage = new Q2CPage(authenticatedPage);

    // Navigate to Quotes
    await q2cPage.navigateToQuotesSection();

    // Create new Quote
    await q2cPage.createNewQuote();

    // Add products
    await q2cPage.addProductsToQuote();

    // Save the quote
    await q2cPage.saveQuote();
    const successMessage = await q2cPage.getSuccessMessage();
    expect(successMessage).toContain('was created');

    // Generate Quote Document
    await q2cPage.generateQuoteDocument();

    // Add assertions to verify the quote details, pricing, discounts, and document generation.
    // The specific assertions will depend on the implementation of the application.
  });
});