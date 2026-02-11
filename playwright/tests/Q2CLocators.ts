export const Q2CLocators = {
  createNewFlowButton: "button:has-text('Create New End to End Flow')",
  flowNameInput: "lightning-input[data-field='flowName'] input",
  descriptionInput: "lightning-textarea[data-field='description'] textarea",
  submitButton: "button[name='Submit']",
  flowList: ".flow-list", // Example list container
  flowItemName: ".flow-item-name", // Example item name
  flowItemDescription: ".flow-item-description", // Example item description
} as const;

export type Q2CLocatorKey = keyof typeof Q2CLocators;