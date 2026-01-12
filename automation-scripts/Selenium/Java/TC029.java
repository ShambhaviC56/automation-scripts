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

public class TC029 {

    private WebDriver driver;
    private WebDriverWait wait;
    private String loginUrl = "_";

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver"); // Replace with the actual path to your ChromeDriver
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }

    @Test
    public void TestVerifyLeadCreationSecurity_029_1735008000() {
        // Login
        driver.get(loginUrl);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
        driver.findElement(By.id("username")).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("password")).sendKeys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */");
        driver.findElement(By.id("Login")).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-global-header")));

        // Handle potential welcome modal or pop-ups (example - adjust selectors as needed)
        try {
            WebElement closeButton = driver.findElement(By.cssSelector("button[title='Close this window']"));
            closeButton.click();
        } catch (Exception e) {
            // Ignore if the element doesn't exist
        }

        // Navigate to Leads page
        driver.get(loginUrl + "/lightning/o/Lead/home");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("div[title='Leads']")));

        // Click on the New button to create a new lead.
        WebElement newButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("div[title='Leads'] + div.slds-page-header button[title='New']")));
        newButton.click();

        // Enter valid data for the lead, including name, email, phone number, and company.
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input[field-name='FirstName'] input")));
        WebElement firstNameField = driver.findElement(By.cssSelector("lightning-input[field-name='FirstName'] input"));
        firstNameField.sendKeys("Test Lead First Name");

        WebElement lastNameField = driver.findElement(By.cssSelector("lightning-input[field-name='LastName'] input"));
        lastNameField.sendKeys("Test Lead Last Name");

        WebElement emailField = driver.findElement(By.cssSelector("lightning-input[field-name='Email'] input"));
        emailField.sendKeys("testlead@example.com");

        WebElement phoneField = driver.findElement(By.cssSelector("lightning-input[field-name='Phone'] input"));
        phoneField.sendKeys("123-456-7890");

        WebElement companyField = driver.findElement(By.cssSelector("lightning-input[field-name='Company'] input"));
        companyField.sendKeys("Test Company");

        // Save the lead.
        WebElement saveButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[name='SaveEdit']")));
        saveButton.click();

        // Verify that the lead is created successfully with all fields populated correctly and the lead's details are displayed on the Lead page.
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("span[class*='toastMessage']")));
        WebElement successMessage = driver.findElement(By.cssSelector("span[class*='toastMessage']"));
        Assert.assertTrue(successMessage.getText().contains("was created"));

        // Verify lead details
        WebElement leadName = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-formatted-text[slot='outputField']")));
        Assert.assertEquals(leadName.getText(), "Test Lead First Name Test Lead Last Name");

    }

    @AfterMethod
    public void tearDown() {
        // Logout
        WebElement userProfileButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button.branding-userProfile-button")));
        userProfileButton.click();

        WebElement logoutLink = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[href*='logout']")));
        logoutLink.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
        driver.quit();
    }
}
