module.exports = {
  //New Lead Button
  newButton: "button[name='New']",

  //Lead Information Section
  firstNameInput: "lightning-input-field[field-name='FirstName'] input",
  lastNameInput: "lightning-input-field[field-name='LastName'] input",
  companyInput: "lightning-input-field[field-name='Company'] input",
  titleInput: "lightning-input-field[field-name='Title'] input",
  leadSourceCombobox: "lightning-combobox[field-name='LeadSource']",
  industryCombobox: "lightning-combobox[field-name='Industry']",

  //Address Information Section
  streetInput: "lightning-textarea[field-name='Street'] textarea",
  cityInput: "lightning-input-field[field-name='City'] input",
  postalCodeInput: "lightning-input-field[field-name='PostalCode'] input",
  countryInput: "lightning-input-field[field-name='Country'] input",
  stateInput: "lightning-input-field[field-name='State'] input",

  //Additional Information Section
  statusCombobox: "lightning-combobox[field-name='Status']",

  //Buttons
  saveButton: "button[name='SaveEdit']",
  cancelButton: "button[name='CancelEdit']",

  //Success Message
  successToast: "div.forceToastMessage",
  successMessage: "span.toastMessage",

  //Lead Details Verification
  leadName: "lightning-formatted-text[data-output-element-id='output-field'][slot='outputField']",
  leadCompany: "lightning-formatted-text[data-output-element-id='output-field'][slot='outputField']" 
};
