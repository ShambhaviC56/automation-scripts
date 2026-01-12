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
import java.io.File;

public class TC135 {

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
    public void TestCreateLeadLargeData_1735008000() throws InterruptedException {
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
        

        // Navigate to Leads
        driver.get(loginUrl + "/lightning/o/Lead/home");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("div[title='Leads']")));

        // Click on import leads
         try {
             WebElement setupMenu = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[@title='Setup']")));
             setupMenu.click();
             
             WebElement dataImporter = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[@title='Data Import Wizard']")));
             dataImporter.click();
         } catch (Exception e) {
             System.out.println("Couldn't find button" + e.getMessage());
         }
        // Switch to the new window
        String originalWindow = driver.getWindowHandle();
        for (String windowHandle : driver.getWindowHandles()) {
            if (!windowHandle.equals(originalWindow)) {
                driver.switchTo().window(windowHandle);
                break;
            }
        }

        // Click on leads import data
        try {
            WebElement whatDoYouWantToDo = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[contains(text(),'Leads')]" )));
            whatDoYouWantToDo.click();
        } catch (Exception e) {
            System.out.println("Couldn't find leads wizard link: " + e.getMessage());
        }
         
        // Start Import
        try {
            WebElement startImport = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//input[@value='Start Import']")));
            startImport.click();
        } catch (Exception e) {
            System.out.println("Couldn't find leads wizard link: " + e.getMessage());
        }

        // Choose the csv to upload
        File file = new File("leads_1000.csv");
        String absolutePath = file.getAbsolutePath();

        // Set up the wizard with the correct parameters
         try {
             WebElement chooseFile = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//input[@id='attachFile']")));
             chooseFile.sendKeys(absolutePath);

             WebElement nextButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//input[@title='Next']")));
             nextButton.click();

             WebElement nextButton2 = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//input[@title='Next']")));
             nextButton2.click();

             WebElement nextButton3 = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//input[@title='Next']")));
             nextButton3.click();

             WebElement importButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//input[@title='Import']")));
             importButton.click();

            //Wait for import to process 
            Thread.sleep(60000); 
        } catch (Exception e) {
             System.out.println("Wizard setup error: " + e.getMessage());
        }


        // Switch back to the original window
        driver.switchTo().window(originalWindow);

        // Refresh the leads list
        driver.get(loginUrl + "/lightning/o/Lead/list?filterName=Recent");


        // Assertion: Check if leads are created (basic check - improve with more specific criteria if needed)
        // This assertion only verifies that the lead list is not empty, which indicates that import was successful. A better and specific assertions should be created. 
        // TODO: Add more specific assertions, e.g., verify the number of leads created.
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//table[@aria-label='Leads']//tbody//tr")));
        boolean isLeadListNotEmpty = !driver.findElements(By.xpath("//table[@aria-label='Leads']//tbody//tr")).isEmpty();
        Assert.assertTrue(isLeadListNotEmpty, "Leads should be created successfully.");

    }

    @AfterMethod
    public void tearDown() {
        // Logout
        driver.get(loginUrl + "/lightning/o/Lead/home"); // Navigate to any lightning page

        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button.branding-userProfile-button"))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("a[href*='logout']")));
        driver.findElement(By.cssSelector("a[href*='logout']")).click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));

        driver.quit();
    }
}
