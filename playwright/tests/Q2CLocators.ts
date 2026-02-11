export const Q2CLocators = {
  flowList: "CSS=.flow-list",
  flowItemName: "CSS=.flow-item-name",
  flowItemDescription: "CSS=.flow-item-description",
  createNewFlowButton: "button:has-text('Create New End to End Flow')",
  flowNameInput: "input[name='FlowName']",
  flowDescriptionInput: "textarea[name='FlowDescription']",
  submitButton: "button:has-text('Submit')",
  successMessage: "div.slds-theme--success"
} as const;

export type Q2CLocatorKey = keyof typeof Q2CLocators;