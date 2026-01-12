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
import java.util.List;

public class TC002 {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver"); // Replace with your chromedriver path
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        driver.manage().window().maximize();
    }

    @Test
    public void TestAccountCreationFailsMissingRequired_002_1735008000() {
        // Login
        driver.get("_");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
        driver.findElement(By.id("username")).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("password")).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("Login")).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-global-header")));

        // 1. Navigate to the Accounts tab.
        driver.get("_"); // Replace "_" with actual Accounts tab URL if needed, otherwise can skip, since SF usually remembers last tab.

        // 2. Click 'New' button.
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@class, 'forceChangeRecordTypeModal')]//button[text()='Cancel']"))).click();

        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[@title='Accounts']"))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[@title='New']"))).click();
        //wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("div[title='New']"))).click();

        // 3. Leave required fields (e.g., Account Name) blank.
        // 4. Enter valid values in optional fields.
        WebElement billingCityField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='BillingCity'] input")));
        billingCityField.sendKeys("Test City");

        // 5. Click 'Save' button.
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[name='SaveEdit']"))).click();

        // Expected Results:
        // 1. Account creation fails.
        // 2. Error message(s) are displayed indicating which required fields are missing.
        // 3. User remains on the Account creation page.
        // 4. The entered data in optional fields is preserved.

        // Verify error message for missing Account Name
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[contains(@class, 'slds-text-color_error')]//span[text()='These required fields must be completed: Account Name']")));
        WebElement accountNameError = driver.findElement(By.xpath("//div[contains(@class, 'slds-text-color_error')]//span[text()='These required fields must be completed: Account Name']"));
        Assert.assertTrue(accountNameError.isDisplayed(), "Account Name error message is not displayed.");

        // Verify that user remains on Account creation page (check for specific element on the page).
        Assert.assertTrue(wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='BillingCity'] input"))).isDisplayed(), "User is not on the Account creation page.");

        //Verify data in optional field is still present. 
        Assert.assertEquals(billingCityField.getAttribute("value"), "Test City", "Billing City field value is not preserved.");
    }

    @AfterMethod
    public void tearDown() {
        // Logout
        driver.findElement(By.cssSelector("button.branding-userProfile-button")).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[href*='logout']"))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
        driver.quit();
    }
}
