const BasePage = require('./BasePage');
const locators = require('../locators/QuoteLocators');
const { click, fill, waitForElement, getText, searchAndSelectLookup } = require('../utils/CommonActions');

class QuotePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToNewQuotePage() {
    await click(this.page, locators.createDropdown);
    await click(this.page, locators.quotesOption);
    await this.page.waitForURL(url => url.href.includes(locators.createQuotePageUrlCheck));
  }

  async isQuotePageLoaded() {
    return await waitForElement(this.page, locators.quotePageHeader);
  }

  async createQuote(quoteName, accountName) {
    await this.navigateToNewQuotePage();
    await fill(this.page, locators.quoteNameInput, quoteName);
    await searchAndSelectLookup(this.page, locators.accountLookup, accountName, locators.accountLookupResult);
  }

}

module.exports = QuotePage;