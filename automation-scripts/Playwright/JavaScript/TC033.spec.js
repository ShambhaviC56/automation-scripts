const { test } = require('@playwright/test');

test.describe('Salesforce New Button Test', () => {
  test('Click New button - Timeout issue', async ({ page }) => {
    await page.goto('https://orgfarm-5694adb5bf-dev-ed.develop.lightning.force.com/lightning/page/home');
    
    await page.waitForLoadState('networkidle');
    
    await page.getByRole('link', { name: 'Leads' }).click();
    await page.waitForLoadState('networkidle');
    
    // ❌ TIMEOUT ISSUE: Very short timeout (2000ms) will fail
    // Salesforce Lightning New button takes 3-8 seconds to appear
    
    await page.waitForSelector('button[name="New"]', { timeout: 2000 });
    
    await page.click('button[name="New"]');
  });
});
