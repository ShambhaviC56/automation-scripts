const { test } = require('@playwright/test');
const path = require('path');

test.use({
  storageState: path.join(__dirname, '../storageState.json'),
});

test('FAIL - Object issue while searching Session object', async ({ page }) => {

  // Navigate to Salesforce Lightning Home
  await page.goto('https://orgfarm-5694adb5bf-dev-ed.develop.lightning.force.com/lightning/page/home');

  // Open App Launcher (waffle icon)
  await page.click('//div[@role="navigation"]//button[@title="App Launcher"]');

  // Click "View All"
  await page.click('//button[text()="View All"]');

  // Select Sales App
  await page.click('//p[text()="Sales"]');

  // Wait for Sales app to load
  await page.waitForLoadState('networkidle');

  // Search for Session object in navigation search
  await page.fill(
    '//input[@placeholder="Search apps and items..."]',
    'Session'
  );

  // ❌ OBJECT ISSUE HERE
  // Session object does not exist in Salesforce metadata
  // Hence it will not appear in search results

});
