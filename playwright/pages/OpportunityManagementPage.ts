import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { OpportunityManagementLocators } from '../locators/OpportunityManagementLocators';
import { click, fill, selectOption, getText, waitForElement, isElementVisible } from '../utils/CommonActions';

export class OpportunityManagementPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToWorkflowRules(): Promise<void> {
    await click(this.page, OpportunityManagementLocators.setupButton);
    await fill(this.page, OpportunityManagementLocators.setupSearchInput, 'Workflow Rules');
    await this.page.locator(OpportunityManagementLocators.workflowRulesLink).nth(0).click();
  }

  async createNewWorkflowRule(ruleName: string, field: string, operator: string, value: string, fieldUpdateName: string, fieldToUpdate:string): Promise<void> {
    await click(this.page, OpportunityManagementLocators.newWorkflowRuleButton);
    await fill(this.page, OpportunityManagementLocators.ruleNameInput, ruleName);
    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.selectedObjectCombobox).click();
    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.opportunityObjectOption).click();

    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.nextButton).click();
    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.ruleCriteriaAll).click();
    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.addRuleCriteriaButton).click();

    await selectOption(this.page, OpportunityManagementLocators.fieldCombobox, field);
    await selectOption(this.page, OpportunityManagementLocators.operatorCombobox, operator);
    await fill(this.page, OpportunityManagementLocators.valueInput, value);
    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.saveAndNextButton).click();

    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.addWorkflowActionDropdown).click();
    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.newFieldUpdateButton).click();

    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.fieldUpdateNameInput).fill(fieldUpdateName);
    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.uniqueNameInput).fill(fieldUpdateName);
    await selectOption(this.page, OpportunityManagementLocators.fieldToUpdateCombobox, fieldToUpdate);
    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.specifyNewValueRadio).check();
    await this.page.frameLocator('#vfFrameId').locator(OpportunityManagementLocators.saveButton).click();
  }

  async activateWorkflowRule(): Promise<void>{
    await click(this.page, OpportunityManagementLocators.activateButton);
    this.page.on('dialog', async dialog => {
        await dialog.accept();
      });
  }

  async deactivateWorkflowRule(): Promise<void> {
      await click(this.page, OpportunityManagementLocators.deactivateButton);
      this.page.on('dialog', async dialog => {
          await dialog.accept();
        });
  }

  async getWorkflowRuleId(): Promise<string | null> {
    return await getText(this.page, OpportunityManagementLocators.workflowRuleId);
  }

  async isSuccessMessageVisible(): Promise<boolean> {
      return await isElementVisible(this.page, OpportunityManagementLocators.successMessage);
  }
}
