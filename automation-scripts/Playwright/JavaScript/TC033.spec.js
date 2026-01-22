const { test } = require('@playwright/test');
const path = require('path');

test.use({
  storageState: path.join(__dirname, '../storageState.json'),
});

test('FAIL: Contact creation timeout', async ({ page }) => {

  test.setTimeout(10000);

  // Open Contacts list
  await page.goto(
    'https://orgfarm-5694adb5bf-dev-ed.develop.lightning.force.com/lightning/o/Contact/list'
  );

  await page.click('button[name="New"]');

  await page.fill(
    '//label[text()="Last Name"]/following::input[1]',
    'TimeoutTest'
  );

  // ❌ INTENTIONAL TIMEOUT
  // Salesforce save spinner / button never completes within 2s
  await page.click('button[name="SaveEdit"]');

  await page.waitForSelector(
    'span.toastMessage',
    { timeout: 2000 }
  );

});
