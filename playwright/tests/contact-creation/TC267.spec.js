const { test } = require('../../fixtures/auth.fixture');
const { expect } = require('@playwright/test');
const ContactCreationPage = require('../../pages/ContactCreationPage');

test.describe('TC267 - Verify that existing Contact records can still be viewed successfully.', () => {
  test('Verify existing contact record can be viewed successfully', async ({ authenticatedPage }) => {
    const contactPage = new ContactCreationPage(authenticatedPage);
    const contactName = 'Amy Taylor'; // Replace with an actual contact name in your org

    await contactPage.navigateToContactsTab();
    await contactPage.openContact(contactName);
    await contactPage.verifyContactDetailsDisplayed();

    // Add assertions here to verify specific fields are displayed
  });
});
