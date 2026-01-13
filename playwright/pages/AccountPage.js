const BasePage = require('./BasePage');
const locators = require('./AccountLocators');
const { click, fill, waitForElement, getText, searchAndSelectLookup } = require('./utils/CommonActions');

class AccountPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async navigateToAccountsTab() {
    // Navigate to Accounts tab - Implement Navigation Logic as necessary
    // For this example, assuming direct navigation to the new account page:
    await this.page.goto('/lightning/o/Account/new');
  }

  async clickNewButton() {
    await click(this.page, locators.newButton);
  }

  async fillOptionalFields(billingCity) {
    await fill(this.page, locators.billingCityInput, billingCity);
  }

  async clickSaveButton() {
    await click(this.page, locators.saveButton);
  }

  async getErrorMessage() {
    await waitForElement(this.page, locators.errorMessage);
    return await getText(this.page, locators.errorMessage);
  }

  async isAccountCreationFailedMessageDisplayed() {
    try {
      await this.page.locator(locators.errorMessage).isVisible({ timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async clearRequiredFields() {
    //Implement clearing mechanism if needed. For this test, we are skipping the filling of required fields intentionally
  }

  async checkIfStillOnAccountCreationPage() {
    // Check if still on account creation page. Assuming if the "new" button is present we are still on the page
    return await this.page.isVisible(locators.newButton);
  }

  async isBillingCityPopulated(billingCity) {
    const billingCityValue = await this.page.$eval(locators.billingCityInput, el => el.value);
    return billingCityValue === billingCity;
  }
}

module.exports = AccountPage;