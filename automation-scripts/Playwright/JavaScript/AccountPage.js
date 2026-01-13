const BasePage = require('./BasePage');
const locators = require('./AccountLocators');
const { click, fill, waitForElement, getText } = require('./utils/CommonActions');

class AccountPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async createAccountWithInvalidData(accountName, website) {
    await click(this.page, locators.newButton);
    await fill(this.page, locators.accountNameInput, accountName);
    await fill(this.page, locators.websiteInput, website);
    await click(this.page, locators.saveButton);
  }

  async getAccountNameErrorMessage() {
    await waitForElement(this.page, locators.accountNameError);
    return await getText(this.page, locators.accountNameError);
  }

  async getWebsiteErrorMessage() {
    await waitForElement(this.page, locators.websiteError);
    return await getText(this.page, locators.websiteError);
  }

  async isErrorMessageDisplayed() {
    return await this.page.locator(locators.errorMessage).isVisible();
  }

  async isAccountNameInputPopulated() {
        return await this.page.locator(locators.accountNameInput).inputValue();
  }

  async isWebsiteInputPopulated() {
        return await this.page.locator(locators.websiteInput).inputValue();
  }

}

module.exports = AccountPage;