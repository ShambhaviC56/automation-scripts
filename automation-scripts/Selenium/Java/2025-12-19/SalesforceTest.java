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

public class SalesforceTest {

    private WebDriver driver;
    private WebDriverWait wait;
    private String baseUrl = "https://fa-esev-dev18-saasfademo1.ds-fa.oraclepdemos.com/xmlpserver/services/ExternalReportWSSService";
    private String username = "/* CREDENTIALS NOT CONFIGURED - Add in Configurations */";
    private String password = "/* CREDENTIALS NOT CONFIGURED - Add in Configurations */";

    @BeforeMethod
    public void setup() {
        // Set up ChromeDriver path
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Login
        driver.get(baseUrl);
        WebElement usernameField = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
        usernameField.sendKeys(username);
        WebElement passwordField = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("password")));
        passwordField.sendKeys(password);
        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("Login")));
        loginButton.click();

        // Wait for successful login (adjust locator as needed)
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Home')]")));

        // Navigate to Quote Object
        driver.get(baseUrl + "/lightning/o/Quote/list");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-page-header")));

    }

    @Test
    public void testCreateQuote() {
        // 1. Click on 'New' button to start creating a new quote.
        WebElement newButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("div[title='New']")));
        newButton.click();

        // Assertion 1: A form should open with necessary fields for entering the quote details.
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-modal__container")));
        WebElement quoteNameField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='Name'] input")));
        Assert.assertTrue(quoteNameField.isDisplayed(), "Quote Name field is not displayed.");


        // Enter some quote data
        String quoteName = "Test Quote";
        quoteNameField.sendKeys(quoteName);

        // Click Save
        WebElement saveButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[name='SaveEdit']")));
        saveButton.click();

        // Verify that the quote was saved (adjust locator as needed)
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), '" + quoteName + "')]")));

        // Go back to quote list view
        driver.get(baseUrl + "/lightning/o/Quote/list");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-page-header")));

        // Click on 'New' button to start creating a new quote again.
        WebElement newButton2 = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("div[title='New']")));
        newButton2.click();

        //Assertion
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-modal__container")));

        WebElement quoteNameField2 = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("lightning-input-field[field-name='Name'] input")));

        // Click Cancel
        WebElement cancelButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[title='Cancel']")));
        cancelButton.click();



    }

    @AfterMethod
    public void teardown() {

        //Logout
        driver.get(baseUrl + "/secur/logout.jsp");

        driver.quit();
    }
}
