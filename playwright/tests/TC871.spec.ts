import { test, expect } from '../../fixtures/auth.fixture';
import { Q2CPage } from '../../pages/Q2CPage';

test.describe('TC871 - End to End Flow for Q2C Creation', () => {
  test('Create a new end-to-end flow successfully', async ({ authenticatedPage }) => {
    const q2cPage = new Q2CPage(authenticatedPage);
    const flowName = 'Test Flow ' + Date.now();
    const flowDescription = 'This is a test flow created by TC871';

    await q2cPage.navigateToQ2CModule();
    await q2cPage.createNewEndToEndFlow(flowName, flowDescription);

    // Add assertions to verify the flow creation
    const actualFlowName = await q2cPage.getFlowNameText();
    const actualFlowDescription = await q2cPage.getFlowDescriptionText();

    expect(actualFlowName).toContain(flowName);
    expect(actualFlowDescription).toContain(flowDescription);
  });
});