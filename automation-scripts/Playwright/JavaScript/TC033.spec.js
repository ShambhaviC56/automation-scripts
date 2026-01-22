const { test, expect } = require('@playwright/test');

test.describe('Salesforce Lead - Click New', () => {
  test('Click New button reliably', async ({ page }) => {

    // Assume storageState.json is already applied
    await page.goto('https://orgfarm-5694adb5bf-dev-ed.develop.lightning.force.com/lightning/page/home');

    // Navigate to Leads tab
    await page.locator('a[title="Leads"]').click();

    // Wait for list view container (Lightning specific)
    await page.waitForSelector('div[role="main"]', { timeout: 30000 });

    // Wait for New button properly
    const newButton = page.locator('button[name="New"]');

    await expect(newButton).toBeVisible({ timeout: 10000 });
    await expect(newButton).toBeEnabled();

    await newButton.click();
  });
});
