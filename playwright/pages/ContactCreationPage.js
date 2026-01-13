const BasePage = require('./BasePage');
const locators = require('../locators/ContactCreationLocators');
const { click, waitForElement, getText } = require('../utils/CommonActions');

class ContactCreationPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToContactsTab() {
    await click(this.page, locators.contactsTab);
  }

  async openContact(contactName) {
    const contactLinkLocator = locators.contactNameLink(contactName);
    await click(this.page, contactLinkLocator);
    await waitForElement(this.page, locators.contactDetailsPage);
  }

  async verifyContactDetailsDisplayed() {
    await waitForElement(this.page, locators.contactDetailsName);
    await waitForElement(this.page, locators.contactDetailsPhone);
    await waitForElement(this.page, locators.contactDetailsEmail);
  }
}

module.exports = ContactCreationPage;
