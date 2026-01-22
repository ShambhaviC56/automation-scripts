const { test } = require('@playwright/test');
const path = require('path');

test.use({
  storageState: path.join(__dirname, '../storageState.json'),
});

test('TC34: FAIL - Contact object / locator issue', async ({ page }) => {

  // Open Contacts list
  await page.goto(
    'https://orgfarm-5694adb5bf-dev-ed.develop.lightning.force.com/lightning/o/Contact/list'
  );

  // ✅ Correct New button
  await page.click('button[name="NewContact"]');

  // ❌ OBJECT ISSUE HERE
  // This field does NOT exist on Contact form
  await page.fill(
    '//input[@name="ThisObjectDoesNotExist"]',
    'Test User'
  );

});
