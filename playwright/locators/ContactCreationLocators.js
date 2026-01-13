module.exports = {
  contactsTab: "a[title='Contacts']",
  contactListView: "table[aria-label='Contacts']",
  contactNameLink: (contactName) => `//a[text()='${contactName}']`,
  contactDetailsPage: "//div[contains(@class, 'record-page')]",
  contactDetailsName: "lightning-formatted-name",
  contactDetailsPhone: "lightning-formatted-phone",
  contactDetailsEmail: "lightning-formatted-email"
};
