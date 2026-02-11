import { test, expect } from '../../fixtures/auth.fixture';
import { Q2CPage } from '../../pages/Q2CPage';

test.describe('TC871 - End to End Flow for Q2C Creation', () => {
  test('Create new end-to-end flow successfully', async ({ authenticatedPage }) => {
    const q2cPage = new Q2CPage(authenticatedPage);
    const flowName = 'Test Flow ' + Date.now();
    const flowDescription = 'This is a test flow created by TC871';

    await q2cPage.navigateToQ2CModule();
    await q2cPage.createNewEndToEndFlow(flowName, flowDescription);

    // Assert that the flow is created successfully
    const actualFlowName = await q2cPage.getFlowName(flowName);
    const actualFlowDescription = await q2cPage.getFlowDescription(flowDescription);

    expect(actualFlowName).toBe(flowName);
    expect(actualFlowDescription).toBe(flowDescription);

    //Optional success message check.  Adjust assertion as needed
    //const successMessage = await q2cPage.getSuccessMessage();
    //expect(successMessage).toContain('Flow was created successfully');
  });
});