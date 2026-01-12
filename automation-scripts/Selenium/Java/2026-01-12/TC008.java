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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TC008 {

    private WebDriver driver;
    private WebDriverWait wait;
    private String accountId = "0015g00000XXXXXXX"; // Replace with an actual Account ID

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver"); // Replace with your chromedriver path
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }

    @Test
    public void TestAccountWorkflowTriggerExecution_008() {
        // Login
        driver.get("_");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
        driver.findElement(By.id("username")).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("password")).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("Login")).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-global-header")));

        // Navigate to Account record
        driver.get("https://yourInstance.lightning.force.com/lightning/r/Account/" + accountId + "/view"); //Replace yourInstance with actual instance
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-page-header")));

        // Edit Account record
        driver.get("https://yourInstance.lightning.force.com/lightning/r/Account/" + accountId + "/edit"); //Replace yourInstance with actual instance
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='AccountNumber'] input")));

        //Edit Account Number
        WebElement accountNumberField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='AccountNumber'] input")));
        accountNumberField.clear();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");  
        LocalDateTime now = LocalDateTime.now();  
        accountNumberField.sendKeys("TestAccNum" + dtf.format(now));

        // Save Account record
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[name='SaveEdit']"))).click();

        //Verify successful account update
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-page-header")));
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("lightning-spinner")));

        WebElement successMessage = driver.findElement(By.xpath("//span[contains(text(),'Account') and contains(text(),'saved')]"));
        Assert.assertTrue(successMessage.isDisplayed(), "Account record should be updated successfully");


        //Verify the Account Number is updated.  
        driver.get("https://yourInstance.lightning.force.com/lightning/r/Account/" + accountId + "/view"); //Replace yourInstance with actual instance
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-page-header")));
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("lightning-spinner")));

        WebElement updatedAccountNumber = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//span[text()='Account Number']/following::lightning-formatted-text")));
        Assert.assertTrue(updatedAccountNumber.getText().contains("TestAccNum"), "Account Number was not updated.");


        // Monitor workflow/trigger execution (This part requires manual verification or more complex automation)
        // For example, check for email notifications in a separate email client automation.
        // Check for field updates performed by workflows/triggers by querying the Account record.
        // This example assumes an email is sent and there are no visible errors.
        System.out.println("Please manually check for email notifications and field updates triggered by the Account update.");
        System.out.println("Verify that no errors related to existing automation are observed.");

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