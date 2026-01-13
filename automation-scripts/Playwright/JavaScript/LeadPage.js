const BasePage = require('./BasePage');
const locators = require('./LeadLocators');
const { click, fill, selectComboboxOption, waitForElement, getText } = require('./utils/CommonActions');

class LeadPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async createLead(firstName, lastName, company, leadSource) {
    await click(this.page, locators.newButton);
    await fill(this.page, locators.firstNameInput, firstName);
    await fill(this.page, locators.lastNameInput, lastName);
    await fill(this.page, locators.companyInput, company);
    await selectComboboxOption(this.page, locators.leadSourceCombobox, leadSource);
    await click(this.page, locators.saveButton);
    await waitForElement(this.page, locators.successToast);
  }

  async getSuccessMessage() {
    return await getText(this.page, locators.successMessage);
  }

  async getLeadName() {
    return await getText(this.page, locators.leadName);
  }

  async getLeadCompany() {
    return await getText(this.page, locators.leadCompany);
  }
}

module.exports = LeadPage;