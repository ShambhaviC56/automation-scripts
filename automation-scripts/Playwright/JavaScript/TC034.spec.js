const { test } = require('@playwright/test');

test('FAIL: Object issue using New button', async ({ page }) => {

  await page.goto(
    'https://orgfarm-5694adb5bf-dev-ed.develop.lightning.force.com/lightning/o/Contact/list'
  );

  // Click New button (standard Salesforce Lightning button)
  await page.click('button[name="New"]');

  // ❌ OBJECT / LOCATOR ISSUE HERE:
  // This input field does NOT exist on the Contact form
  await page.fill(
    '//input[@name="ThisObjectDoesNotExist"]',
    'Test User'
  );

});
