import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { QuoteLocators } from '../locators/QuoteLocators';
import { click, fill, waitForElement } from '../utils/CommonActions';

export class QuotePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToNewQuote(): Promise<void> {
    await click(this.page, QuoteLocators.newButton);
    await waitForElement(this.page, QuoteLocators.createQuotePageHeader);
  }

  async fillQuoteDetails(quoteName: string, expirationDate: string): Promise<void> {
    await fill(this.page, QuoteLocators.quoteNameInput, quoteName);
    await fill(this.page, QuoteLocators.expirationDateInput, expirationDate);
  }

  async saveQuote(): Promise<void> {
    await click(this.page, QuoteLocators.saveButton);
    await waitForElement(this.page, QuoteLocators.successToast);
  }

  async cancelQuote(): Promise<void> {
    await click(this.page, QuoteLocators.cancelButton);
  }

  async isQuoteFormVisible(): Promise<boolean> {
    return await this.page.isVisible(QuoteLocators.quoteNameInput);
  }
}