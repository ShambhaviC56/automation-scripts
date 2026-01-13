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

public class TC312 {

    private WebDriver driver;
    private WebDriverWait wait;
    private String loginUrl = "_";
    private String username = "/* CREDENTIALS NOT CONFIGURED - Add in Configurations */";
    private String password = "/* CREDENTIALS NOT CONFIGURED - Add in Configurations */";

    @BeforeMethod
    public void setup() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver"); // Replace with your chromedriver path
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        driver.manage().window().maximize();

        // Login
        driver.get(loginUrl);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
        driver.findElement(By.id("username")).sendKeys(username);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("Login")).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-global-header")));

        // Handle any welcome modals or pop-ups (example, adjust as needed)
        try {
            wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[title='Maybe Later']"))).click();
        } catch (Exception e) {
            //Modal did not appear, continue execution
        }
    }

    @Test
    public void testOpportunityCreationWithAllRequiredFields() {

        // 1. Navigate to the Opportunities tab.
        driver.get(loginUrl + "/lightning/o/Opportunity/home");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-page-header")));

        // 2. Click 'New'.
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[title='New']"))).click();

        // 3. Enter valid data for all required Opportunity fields (e.g., Opportunity Name, Account Name, Close Date, Stage).
        // Opportunity Name
        WebElement opportunityNameField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input[name='Opportunity Name'] input")));
        opportunityNameField.clear();
        opportunityNameField.sendKeys("Test Opportunity TC312");

        // Account Name
        WebElement accountNameLookup = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//label[text()='Account Name']/following::input")));
        accountNameLookup.sendKeys("Test Account");
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@class, 'slds-lookup__menu')]//mark[text()='Test Account']"))).click();


        // Close Date
        WebElement closeDateField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input[name='CloseDate'] input")));
        closeDateField.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("td[aria-selected='true']"))).click();

        // Stage
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//label[text()='Stage']/following::button"))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//span[@title='Prospecting']"))).click();

        // 4. Click 'Save'.
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[name='SaveEdit']"))).click();

        // Expected Results:
        // 1. Opportunity is created successfully and redirected to the Opportunity detail page.
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-page-header__title")));
        Assert.assertTrue(driver.getCurrentUrl().contains("/lightning/r/Opportunity/"));

        // 2. All entered data is displayed correctly on the Opportunity detail page.
        WebElement opportunityNameDetail = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//span[text()='Opportunity Name']/following::lightning-formatted-text")));
        Assert.assertEquals(opportunityNameDetail.getText(), "Test Opportunity TC312");


        // 3. System-generated fields (e.g., Created By, Last Modified By) are populated correctly. (Check only Created By)
        WebElement createdByField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-output-field[field-name='CreatedById'] lightning-formatted-text")));
        Assert.assertNotNull(createdByField.getText());

        // 4. No error messages are displayed.
        Assert.assertTrue(driver.findElements(By.cssSelector(".slds-text-color_error")).isEmpty());
    }

    @AfterMethod
    public void teardown() {
        // Logout
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button.branding-userProfile-button"))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[href*='logout']"))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username"))); // Wait for logout to complete
        driver.quit();
    }
}
