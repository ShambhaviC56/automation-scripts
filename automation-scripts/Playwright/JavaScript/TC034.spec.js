const { test, expect } = require('@playwright/test');

test.describe('Salesforce Object Search', () => {
  test('FAIL - Object issue while searching Session object', async ({ page }) => {

    // 🔹 Increase timeout (Lightning is slow)
    test.setTimeout(120000);

    // ✅ Start directly on Lightning Home
    await page.goto(
      'https://orgfarm-5694adb5bf-dev-ed.develop.lightning.force.com/lightning/page/home'
    );

    // ---------------- APP LAUNCHER ----------------
    await page.waitForSelector('button[title="App Launcher"]', { timeout: 60000 });
    await page.click('button[title="App Launcher"]');

    // Click View All
    await page.waitForSelector('button:has-text("View All")', { timeout: 60000 });
    await page.click('button:has-text("View All")');

    // Click Sales App
    await page.waitForSelector(
      'one-app-launcher-app-tile[data-name="Sales"]',
      { timeout: 60000 }
    );
    await page.click('one-app-launcher-app-tile[data-name="Sales"]');

    // ---------------- GLOBAL SEARCH ----------------
    await page.waitForSelector(
      'input[placeholder="Search apps and items..."]',
      { timeout: 60000 }
    );

    await page.fill(
      'input[placeholder="Search apps and items..."]',
      'Session'
    );

    // ❌ OBJECT ISSUE (INTENTIONAL)
    // "Session" object does NOT exist in Salesforce metadata
    // Hence it will never appear in search results
    await page.waitForSelector(
      'a[title="Session"]',
      { timeout: 5000 }   // <-- Expected failure point
    );
  });
});
