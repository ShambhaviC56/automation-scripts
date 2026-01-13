const { test } = require('../fixtures/auth.fixture');
const { expect } = require('@playwright/test');
const LeadPage = require('../pages/LeadPage');

test.describe('TC011 - Create Lead - Successful Creation', () => {
  test('Create a new lead successfully', async ({ authenticatedPage }) => {
    const leadPage = new LeadPage(authenticatedPage);
    const firstName = 'Test';
    const lastName = 'Lead';
    const company = 'Test Company';
    const leadSource = 'Web';

    await leadPage.createLead(firstName, lastName, company, leadSource);

    const message = await leadPage.getSuccessMessage();
    expect(message).toContain('was created');

    //Verify the Lead Details
    //expect(await leadPage.getLeadName()).toContain(firstName + ' ' + lastName);
    //expect(await leadPage.getLeadCompany()).toEqual(company);
  });
});