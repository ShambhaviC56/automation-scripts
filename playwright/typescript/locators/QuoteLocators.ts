export const QuoteLocators = {
  newButton: "button[name='New']",
  quoteNameInput: "lightning-input-field[field-name='Name'] input",
  expirationDateInput: "lightning-input-field[field-name='ExpirationDate'] input",
  statusCombobox: "lightning-combobox[field-name='Status']",
  descriptionTextarea: "lightning-textarea[field-name='Description'] textarea",
  saveButton: "button[name='SaveEdit']",
  cancelButton: "button[name='CancelEdit']",
  accountLookup: "lightning-input-field[field-name='AccountId'] input",
  opportunityLookup: "lightning-input-field[field-name='OpportunityId'] input",
  successToast: "div.forceToastMessage",
  createQuotePageHeader: "h2[title='New Quote']"
} as const;

export type QuoteLocatorKey = keyof typeof QuoteLocators;