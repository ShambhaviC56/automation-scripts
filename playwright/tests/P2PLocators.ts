export const P2PLocators = {
  opportunityStagePicklist: "lightning-picklist[field-name='StageName']",
  opportunityClosedWonOption: "lightning-base-combobox-item[data-value='Closed Won']",
  saveButton: "button[name='SaveEdit']",
  opportunitySuccessMessage: "div.forceToastMessage",
  // Add more locators as needed
} as const;

export type P2PLocatorKey = keyof typeof P2PLocators;