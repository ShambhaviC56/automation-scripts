import { Page } from '@playwright/test';
import { Q2CLocators } from '../locators/Q2CLocators';

export class Q2CPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async createNewQuote(): Promise<void> {
    await this.page.click(Q2CLocators.newQuoteButton);
  }

  async addProductsToQuote(): Promise<void> {
    await this.page.click(Q2CLocators.addProductsButton);
    // Implement product selection logic here
    // This will depend on how the product selection UI is implemented.
  }

  async saveQuote(): Promise<void> {
    await this.page.click(Q2CLocators.saveQuoteButton);
    await this.page.waitForSelector(Q2CLocators.successMessage, { state: 'visible', timeout: 30000 });
  }

  async generateQuoteDocument(): Promise<void> {
    await this.page.click(Q2CLocators.generateDocumentButton);
    // Implement document verification logic here
  }

  async getSuccessMessage(): Promise<string | null> {
    return await this.page.textContent(Q2CLocators.successMessage);
  }


  async navigateToQuotesSection(): Promise<void> {
        await this.page.goto('/lightning/o/Quote/list?filterName=Recent');
    }
}