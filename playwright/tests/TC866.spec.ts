import { test, expect } from '../../fixtures/auth.fixture';
import { P2PPage } from '../../pages/P2PPage';

test.describe('TC866 - End-to-End P2P: Opportunity Closed Won to Invoice Generation and Payment Posting', () => {
  test('Update Opportunity to Closed Won', async ({ authenticatedPage }) => {
    const p2pPage = new P2PPage(authenticatedPage);

    await p2pPage.updateOpportunityStageToClosedWon();

    const successMessage = await p2pPage.getSuccessMessage();
    expect(successMessage).toContain('was saved');

    // Add further steps here to verify Zuora, SAP integrations, etc.
    // These steps are external to Salesforce and would involve separate API calls/UI interactions.
  });
});