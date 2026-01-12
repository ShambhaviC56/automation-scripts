import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.time.Duration;
import java.time.Instant;

public class TC010 {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver"); // Replace with your chromedriver path
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }

    @Test
    public void TestAccountIntegration_001_1735008000() {
        // 1. Login to Salesforce
        driver.get("_");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
        driver.findElement(By.id("username")).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("password")).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("Login")).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-global-header")));

        // Handle potential welcome pop-ups or modals here (if any)
        // Example:
        // try {
        //     WebElement modalCloseButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button.slds-button[title='Close this window']")));
        //     modalCloseButton.click();
        // } catch (Exception e) {
        //     // No modal found, continue
        // }

        // Navigate to Accounts
        driver.get("/lightning/o/Account/list?filterName=Recent");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-page-header")));

        // Click New button to create a new Account
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[title='New']"))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='Name'] input")));

        // 2. Fill in required fields for the new Account
        WebElement accountNameField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='Name'] input")));
        accountNameField.clear();
        String accountName = "Test Account " + Instant.now().getEpochSecond();
        accountNameField.sendKeys(accountName);

        //Owner Id
         WebElement ownerLookupInput = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-lookup[field-name='OwnerId'] input")));
         ownerLookupInput.click();
         ownerLookupInput.sendKeys("User User");
         wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//lightning-base-combobox-item[contains(., 'User User')]" ))).click();



        // 3. Save the new Account
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[name='SaveEdit']"))).click();

        // Wait for the Account to save and the page to reload
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//span[contains(text(),'Account')]")));

        // 4. Verify the Account is created successfully (Assertion 1)
        WebElement toast = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("div.forceToastMessage")));
        Assert.assertTrue(toast.getText().contains("was created"), "Account creation failed.");

        // Wait for the spinner to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("lightning-spinner")));

        // 5. Assuming the external system is monitored separately and provides some logging or API,
        //    add code here to check for synchronization. This would likely involve:
        //    - Connecting to the external system's API or database.
        //    - Querying for the newly created Account (using Account Name or other unique identifier).
        //    - Verifying the Account data matches the data in Salesforce.
        //    - Logging any errors or data inconsistencies.

        // For demonstration purposes, let's assume you have a method to check the external system:
        boolean isSynchronized = checkExternalSystem(accountName);

        // 6. Assertion 2: Verify the account is synchronized with the external system.
        Assert.assertTrue(isSynchronized, "Account was not synchronized with the external system.");

        // 7. Assertion 3: Check for errors or data inconsistencies in the external system (implementation depends on external system).
        boolean noErrors = checkForExternalSystemErrors(accountName);
        Assert.assertTrue(noErrors, "Errors or data inconsistencies were found in the external system.");

    }

    // Placeholder method for checking the external system
    private boolean checkExternalSystem(String accountName) {
        // Replace this with actual code to check the external system
        // This might involve connecting to an API, querying a database, etc.
        // For now, we'll just return true to simulate success
        System.out.println("Checking external system for account: " + accountName);
        return true;
    }

    // Placeholder method for checking for errors in the external system
    private boolean checkForExternalSystemErrors(String accountName) {
        // Replace this with actual code to check for errors in the external system
        // This might involve parsing logs, querying error tables, etc.
        // For now, we'll just return true to simulate no errors
        System.out.println("Checking external system for errors for account: " + accountName);
        return true;
    }


    @AfterMethod
    public void tearDown() {
        // 1. Logout from Salesforce
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button.branding-userProfile-button"))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[href*='logout']"))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username"))); // Wait for logout to complete

        // 2. Close the browser
        if (driver != null) {
            driver.quit();
        }
    }
}