import { Page } from '@playwright/test';
import { Q2CLocators } from '../locators/Q2CLocators';

export class Q2CPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToQ2CModule(): Promise<void> {
    // Assuming a direct URL for the Q2C module.  Adjust as needed for navigation.
    await this.page.goto('/lightning/n/Q2C');
  }

  async createNewEndToEndFlow(flowName: string, flowDescription: string): Promise<void> {
    await this.page.click(Q2CLocators.createNewFlowButton);
    await this.page.fill(Q2CLocators.flowNameInput, flowName);
    await this.page.fill(Q2CLocators.flowDescriptionInput, flowDescription);
    await this.page.click(Q2CLocators.submitButton);
  }

  async getFlowName(flowName: string): Promise<string | null> {
    const flowLocator = this.page.locator(Q2CLocators.flowItemName, { hasText: flowName });
    return await flowLocator.textContent();
  }

  async getFlowDescription(flowDescription: string): Promise<string | null>{
    const descriptionLocator = this.page.locator(Q2CLocators.flowItemDescription, {hasText: flowDescription});
    return await descriptionLocator.textContent();
  }

  async getSuccessMessage(): Promise<string | null> {
      return await this.page.textContent(Q2CLocators.successMessage);
  }
}