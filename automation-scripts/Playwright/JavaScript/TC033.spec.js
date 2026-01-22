const { test } = require('@playwright/test');
const path = require('path');

test.use({
  storageState: path.join(__dirname, '../storageState.json'),
});

test('TC33: FAIL - Contact creation timeout', async ({ page }) => {

  test.setTimeout(10000);

  // Open Contacts list
  await page.goto(
    'https://orgfarm-5694adb5bf-dev-ed.develop.lightning.force.com/lightning/o/Contact/list'
  );

  // ✅ Correct New button for Contacts
  await page.click('button[name="NewContact"]');

  // Fill required field
  await page.fill(
    '//label[text()="Last Name"]/following::input[1]',
    'TimeoutTest'
  );

  // Click Save
  await page.click('button[name="SaveEdit"]');

  // ❌ INTENTIONAL TIMEOUT (toast appears late in Salesforce)
  await page.waitForSelector('span.toastMessage', { timeout: 2000 });

});
