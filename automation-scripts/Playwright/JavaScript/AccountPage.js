const BasePage = require('./BasePage');
const locators = require('./AccountLocators');
const { click, fill, waitForElement, getText, selectComboboxOption } = require('./utils/CommonActions');

class AccountPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async navigateToAccountsTab() {
    // Implementation depends on your application's navigation
    // This might involve clicking a menu item or navigating to a specific URL
    console.log('Navigating to Accounts Tab - Implementation Required');
  }

  async createAccount(accountName, accountNumber, accountType, accountIndustry, accountSite) {
    await click(this.page, locators.newButton);
    await fill(this.page, locators.accountNameInput, accountName);
    await fill(this.page, locators.accountNumberInput, accountNumber);

    await click(this.page, locators.accountTypeCombobox);
    await this.page.locator(locators.accountTypeOption, {hasText: accountType}).click();

    await click(this.page, locators.accountIndustryCombobox);
    await this.page.locator(locators.accountIndustryOption, {hasText: accountIndustry}).click();

    await fill(this.page, locators.accountSiteInput, accountSite);

    await click(this.page, locators.saveButton);
    await waitForElement(this.page, locators.successToast);
  }

  async getSuccessMessage() {
    await this.page.waitForSelector(locators.successMessage);
    return await this.page.locator(locators.successMessage).innerText();
  }
}

module.exports = AccountPage;
