import { test, expect } from '../../fixtures/auth.fixture';
import { P2PPage } from '../../pages/P2PPage';

test.describe('TC866 - End-to-End P2P: Opportunity Closed Won to Invoice Generation and Payment Posting', () => {
  test('Opportunity Closed Won to Invoice Generation and Payment Posting', async ({ authenticatedPage }) => {
    const p2pPage = new P2PPage(authenticatedPage);

    // Step 1: Update Opportunity stage to 'Closed Won'.
    await p2pPage.updateOpportunityStageToClosedWon();

    // Step 2: Verify Opportunity is successfully Closed Won.
    const successMessage = await p2pPage.getOpportunitySuccessMessage();
    expect(successMessage).toContain('was saved'); // Adjust based on actual success message

    // Step 3: Check integration monitoring tool for Opportunity data.
    // Assuming a method to navigate to and verify data in the integration monitoring tool exists in P2PPage
    const opportunityIntegrationStatus = await p2pPage.verifyIntegrationMonitoringToolOpportunityStatus();
    expect(opportunityIntegrationStatus).toContain('Success');

    // Step 4: Verify Zuora Subscription is created/updated correctly.
    // Assuming a method to navigate to and verify data in Zuora exists in P2PPage
    const zuoraProductName = await p2pPage.verifyZuoraSubscriptionProductName();
    expect(zuoraProductName).toBe('Expected Product Name'); // Replace with the expected product name

    // Step 6: Verify Zuora Invoice is generated correctly.
    const zuoraInvoiceLineItem = await p2pPage.verifyZuoraInvoiceLineItem();
    expect(zuoraInvoiceLineItem).toBe('Expected Line Item'); // Replace with the expected line item

     // Step 7: Check integration monitoring tool for Invoice Data.
     const invoiceIntegrationStatus = await p2pPage.verifyIntegrationMonitoringToolInvoiceStatus();
     expect(invoiceIntegrationStatus).toContain('Success');

    // Step 8: Verify SAP AR invoice is created.
    const sapARInvoiceNumber = await p2pPage.verifySAPARInvoiceNumber();
    expect(sapARInvoiceNumber).not.toBeNull();

    // Step 10: Verify Payment Posted in SAP


    // Step 11: Verify Payment Integration Status
     const paymentIntegrationStatus = await p2pPage.verifyIntegrationMonitoringToolPaymentStatus();
     expect(paymentIntegrationStatus).toContain('Success');

    // Step 12: Verify Zuora Payment is recorded
     const zuoraPaymentAmount = await p2pPage.verifyZuoraPaymentAmount();
     expect(zuoraPaymentAmount).not.toBeNull();

     //Step 8: Verify SAP AR Invoice
     const sapPaymentReference = await p2pPage.verifySAPPaymentReference();
     expect(sapPaymentReference).not.toBeNull();

    // Add more steps and assertions to cover the entire test case, including SAP verification and data consistency checks.
  });
});