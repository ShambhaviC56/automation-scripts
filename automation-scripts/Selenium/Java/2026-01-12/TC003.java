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

public class TC003 {

    private WebDriver driver;
    private WebDriverWait wait;
    private String loginUrl = "_";

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        driver.manage().window().maximize();
    }

    @Test
    public void TestAccountCreationFailsInvalidData_003_1735008000() {
        // 1. Login to Salesforce
        driver.get(loginUrl);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username"))).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("password")).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("Login")).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-global-header")));

        // 1. Navigate to the Accounts tab.
        driver.get(loginUrl + "/lightning/o/Account/list?filterName=Recent");

        // 2. Click 'New' button.
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[title='New']"))).click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='Name'] input")));

        // 3. Enter an invalid email address in the 'Website' field.
        WebElement websiteField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='Website'] input[type='url']")));
        websiteField.clear();
        websiteField.sendKeys("invalid-email");

        // 4. Enter a number in the 'Account Name' field if it is not allowed based on validation rules.
        WebElement accountNameField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='Name'] input")));
        accountNameField.clear();
        accountNameField.sendKeys("12345");

        // 5. Click 'Save' button.
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[name='SaveEdit']"))).click();

        // Expected Results:
        // 1. Account creation fails.
        // 2. Error message(s) are displayed indicating the invalid data in respective fields.
        // 3. User remains on the Account creation page.
        // 4. The entered data in other valid fields is preserved.

        // Assertion for Website error message
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[contains(@class, 'slds-has-error') and .//label[text()='Website']]")));
        WebElement websiteError = driver.findElement(By.xpath("//div[contains(@class, 'slds-has-error') and .//label[text()='Website']]//div[@class='slds-form-element__help']"));
        Assert.assertTrue(websiteError.isDisplayed(), "Website error message is not displayed");

         //Assertion for Account Name error message
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[contains(@class, 'slds-has-error') and .//label[text()='Account Name']]")));

        // Check if user remains on the same page by verifying the presence of the Account Name field
        Assert.assertTrue(accountNameField.isDisplayed(), "User is not on the Account creation page");
    }

    @AfterMethod
    public void tearDown() {
        // Logout from Salesforce
        WebElement userProfileButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button.branding-userProfile-button")));
        userProfileButton.click();
        WebElement logoutLink = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[href*='logout']")));
        logoutLink.click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));

        driver.quit();
    }
}
