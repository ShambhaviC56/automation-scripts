const BasePage = require('./BasePage');
const locators = require('./locators/AccountLocators');
const { click, waitForElement, isElementVisible } = require('./utils/CommonActions');

class AccountPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToAccountsTab() {
    await click(this.page, locators.accountTab);
  }

  async isNewButtonVisible() {
    return await isElementVisible(this.page, locators.newButton);
  }

  async navigateToAccountCreationUrl(url) {
    await this.page.goto(url);
    await waitForElement(this.page, locators.insufficientPrivilegesMessage);
  }

  async getInsufficientPrivilegesMessage() {
      await waitForElement(this.page, locators.insufficientPrivilegesMessage);
      return await this.page.locator(locators.insufficientPrivilegesMessage).textContent();
  }
}

module.exports = AccountPage;