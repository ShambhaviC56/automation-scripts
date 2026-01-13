import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { QuoteLocators } from '../locators/QuoteLocators';
import { click, fill, selectComboboxOption, waitForElement, getText } from '../utils/CommonActions';

export class QuotePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToCreateQuote(): Promise<void> {
    await click(this.page, QuoteLocators.createDropdown);
    await click(this.page, QuoteLocators.quotesOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isCreateQuotePageVisible(): Promise<boolean> {
        try {
            await this.page.waitForSelector(QuoteLocators.createQuotePageHeader, { timeout: 5000 });
            return true;
        } catch (error) {
            return false;
        }
    }

  async fillQuoteName(quoteName: string): Promise<void> {
    await fill(this.page, QuoteLocators.quoteNameInput, quoteName);
  }

  async selectStatus(status: string): Promise<void> {
    await selectComboboxOption(this.page, QuoteLocators.statusCombobox, status);
  }

  async getSuccessMessage(): Promise<string | null> {
    return await getText(this.page, QuoteLocators.successToast);
  }

  async isElementVisible(locatorKey: keyof typeof QuoteLocators): Promise<boolean> {
    try {
      await this.page.waitForSelector(QuoteLocators[locatorKey], { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}