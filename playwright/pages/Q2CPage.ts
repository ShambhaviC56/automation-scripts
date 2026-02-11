import { Page } from '@playwright/test';
import { Q2CLocators } from '../locators/Q2CLocators';

export class Q2CPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToQ2CModule(): Promise<void> {
    // Replace with actual navigation logic to Q2C module
    await this.page.goto('/lightning/n/Q2C'); // Placeholder
  }

  async createNewEndToEndFlow(flowName: string, description: string): Promise<void> {
    await this.page.click(Q2CLocators.createNewFlowButton);
    await this.page.fill(Q2CLocators.flowNameInput, flowName);
    await this.page.fill(Q2CLocators.descriptionInput, description);
    await this.page.click(Q2CLocators.submitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getFlowNameText(): Promise<string | null> {
    return await this.page.textContent(Q2CLocators.flowItemName);
  }

  async getFlowDescriptionText(): Promise<string | null> {
        return await this.page.textContent(Q2CLocators.flowItemDescription);
  }
}