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
    await click(this.page, P2PLocators.opportunitySaveButton);
    await waitForElement(this.page, P2PLocators.opportunitySuccessMessage);
  }

  async getOpportunitySuccessMessage(): Promise<string | null> {
    return await getText(this.page, P2PLocators.opportunitySuccessMessage);
  }

  async verifyZuoraSubscriptionProductName(): Promise<string | null> {
    return await getText(this.page, P2PLocators.zuoraSubscriptionProductName);
  }

  async verifyZuoraInvoiceLineItem(): Promise<string | null> {
    return await getText(this.page, P2PLocators.zuoraInvoiceLineItem);
  }

  async verifyZuoraPaymentAmount(): Promise<string | null> {
    return await getText(this.page, P2PLocators.zuoraPaymentAmount);
  }

  async verifySAPARInvoiceNumber(): Promise<string | null> {
     return await getText(this.page, P2PLocators.sapARInvoiceNumber);
  }

  async verifySAPPaymentReference(): Promise<string | null> {
    return await getText(this.page, P2PLocators.sapPaymentReference);
  }

  async verifyIntegrationMonitoringToolOpportunityStatus(): Promise<string | null> {
      return await getText(this.page, P2PLocators.integrationMonitoringToolStatus);
  }
  async verifyIntegrationMonitoringToolInvoiceStatus(): Promise<string | null> {
    return await getText(this.page, P2PLocators.integrationMonitoringToolStatus);
  }
  async verifyIntegrationMonitoringToolPaymentStatus(): Promise<string | null> {
    return await getText(this.page, P2PLocators.integrationMonitoringToolStatus);
  }

  // Add more methods to interact with Zuora, SAP, and the integration monitoring tool.
}