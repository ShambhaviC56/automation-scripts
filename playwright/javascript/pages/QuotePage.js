const BasePage = require('./BasePage');
const locators = require('../locators/QuoteLocators');
const { click, fill, waitForElement, searchAndSelectLookup } = require('../utils/CommonActions');

class QuotePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToQuotes() {
    await this.page.goto('/lightning/o/Quote/home');
    await waitForElement(this.page, locators.quotePageHeader);
  }

  async clickNewButton() {
    await waitForElement(this.page, locators.newButton);
    await click(this.page, locators.newButton);
    await waitForElement(this.page, locators.quoteNameInput);
  }

  async enterQuoteName(quoteName) {
    await fill(this.page, locators.quoteNameInput, quoteName);
  }

  async searchAndSelectAccount(accountName) {
    await searchAndSelectLookup(this.page, locators.accountLookup, accountName, locators.accountLookupResult);
  }

  async saveQuote() {
    await click(this.page, locators.saveButton);
  }

  async cancelQuote() {
    await click(this.page, locators.cancelButton);
  }
  async searchAndSelectOpportunity(opportunityName) {
    await searchAndSelectLookup(this.page, locators.opportunityLookup, opportunityName, locators.accountLookupResult);
  }
}

module.exports = QuotePage;