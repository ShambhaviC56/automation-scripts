import { test, expect } from '../../fixtures/auth.fixture';
import { OpportunityManagementPage } from '../../pages/OpportunityManagementPage';

test.describe('TC008 - Validate Workflow Rule Syncing', () => {
  test('Create and activate a new workflow rule', async ({ authenticatedPage }) => {
    const opportunityManagementPage = new OpportunityManagementPage(authenticatedPage);
    const ruleName = `WorkflowRule_${Date.now()}`;
    const fieldUpdateName = `FieldUpdate_${Date.now()}`;

    await opportunityManagementPage.navigateToWorkflowRules();
    await opportunityManagementPage.createNewWorkflowRule(ruleName, 'Opportunity Name', 'contains', 'test', fieldUpdateName, 'Description');
    
    await opportunityManagementPage.activateWorkflowRule();
    expect(await opportunityManagementPage.isSuccessMessageVisible()).toBe(true);

    const workflowRuleId = await opportunityManagementPage.getWorkflowRuleId();
    expect(workflowRuleId).toBeTruthy();

    // Deactivate the workflow rule so it won't interfere with other tests
    await opportunityManagementPage.deactivateWorkflowRule();
  });
});