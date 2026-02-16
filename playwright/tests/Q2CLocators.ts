export const Q2CLocators = {
  flowList: "CSS=.flow-list",
  flowItemName: "CSS=.flow-item-name",
  flowItemDescription: "CSS=.flow-item-description",
  successMessage: "CSS=div.slds-theme--success",
  newQuoteButton: "button[name='New']",
  saveQuoteButton: "button[name='SaveEdit']",
  generateDocumentButton: "button:has-text('Generate Document')",
  addProductsButton: "button:has-text('Add Products')"
} as const;

export type Q2CLocatorKey = keyof typeof Q2CLocators;