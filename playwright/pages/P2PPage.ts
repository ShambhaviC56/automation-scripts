import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { P2PLocators } from '../locators/P2PLocators';
import { click, selectComboboxOption, waitForElement, getText } from '../utils/CommonActions';

export class P2PPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async updateOpportunityStageToClosedWon(): Promise<void> {
    await selectComboboxOption(this.page, P2PLocators.opportunityStagePicklist, 'Closed Won');
    await click(this.page, P2PLocators.saveButton);
    await waitForElement(this.page, P2PLocators.opportunitySuccessMessage);
  }

  async getSuccessMessage(): Promise<string | null> {
    return await getText(this.page, P2PLocators.opportunitySuccessMessage);
  }
}