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
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class TC001 {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver"); // Replace with your chromedriver path
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }

    @Test
    public void TestAccountCreation_001_1735008000() {
        // Login
        driver.get("_");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
        driver.findElement(By.id("username")).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("password")).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("Login")).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-global-header")));

        // Navigate to Accounts tab
        driver.get("_/lightning/o/Account/home");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-page-header")));

        // Click 'New' button
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[title='New']"))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='Name'] input")));

        // Enter valid values in required fields
        WebElement accountNameField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='Name'] input")));
        accountNameField.clear();
        accountNameField.sendKeys("Test Account Name");

        // Owner is required - lookup and select current user to create account. 
        WebElement ownerLookupInput = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-lookup[field-name='OwnerId'] input")));
        ownerLookupInput.click();
        // Get currently logged in user to set as the owner. Setting a static value will cause the test to fail when the user does not exist.
        WebElement loggedInUser = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("button[title='User']")));
        String userName = loggedInUser.getText();
        ownerLookupInput.sendKeys(userName);
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//lightning-base-combobox-item[contains(., '" + userName + "')] "))).click();


        // Enter Account Number (Optional Field)
        WebElement accountNumberField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='AccountNumber'] input")));
        accountNumberField.clear();
        accountNumberField.sendKeys("12345");

        //Enter Account Site (Optional Field)
         WebElement accountSiteField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='Site'] input")));
         accountSiteField.clear();
         accountSiteField.sendKeys("Test Account Site");

        //Select Industry (Optional Field)
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("lightning-combobox[field-name='Industry'] button"))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("lightning-base-combobox-item[data-value='Banking']"))).click();

        // Click 'Save' button
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[name='SaveEdit']"))).click();

        // Verify success message
        WebElement toast = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".forceToastMessage")));
        Assert.assertTrue(toast.getText().contains("was created"));

        //Verify Account Name is displayed
        WebElement fieldValue = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-formatted-text[slot='outputFieldValue']")));
        Assert.assertEquals(fieldValue.getText(), "Test Account Name");

        // Logout
        driver.findElement(By.cssSelector("button.branding-userProfile-button")).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[href*='logout']"))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
