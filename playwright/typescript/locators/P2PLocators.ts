export const P2PLocators = {
  opportunityStagePicklist: "lightning-picklist[field-name='StageName']",
  opportunityClosedWonOption: "lightning-base-combobox-item[data-value='Closed Won']",
  opportunitySaveButton: "button[name='SaveEdit']",
  opportunitySuccessMessage: "div.forceToastMessage",
  zuoraSubscriptionProductName: "//td[contains(text(), 'Subscription')]/following-sibling::td",
  zuoraInvoiceLineItem: "//td[contains(text(), 'Invoice')]/following-sibling::td",
  zuoraPaymentAmount: "//td[contains(text(), 'Payment')]/following-sibling::td",
  sapARInvoiceNumber: "//td[contains(text(), 'AR Invoice')]/following-sibling::td",
  sapPaymentReference: "//td[contains(text(), 'Payment Reference')]/following-sibling::td",
  integrationMonitoringToolOpportunity: "//td[contains(text(), 'Opportunity')]/following-sibling::td",
  integrationMonitoringToolInvoice: "//td[contains(text(), 'Invoice')]/following-sibling::td",
  integrationMonitoringToolPayment: "//td[contains(text(), 'Payment')]/following-sibling::td",
  integrationMonitoringToolStatus: "//td[contains(text(), 'Status')]/following-sibling::td",
  // Add more locators as needed for Zuora, SAP, and the integration monitoring tool.
} as const;

export type P2PLocatorKey = keyof typeof P2PLocators;