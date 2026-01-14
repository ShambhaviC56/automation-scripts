package tests.Account;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.AccountPage;
import tests.BaseTest;

public class TC001 extends BaseTest {

    @Test(description = "TC001 - Verify successful account creation with valid data.")
    public void testCreateAccount() {
        AccountPage accountPage = new AccountPage(driver);

        accountPage.navigateToAccountsTab();
        accountPage.clickNewButton();

        String accountName = "Test Account";
        String accountNumber = "12345";
        String accountSite = "Test Site";
        String industry = "Technology";
        String accountType = "Prospect";

        accountPage.enterAccountName(accountName);
        accountPage.enterAccountNumber(accountNumber);
        accountPage.enterAccountSite(accountSite);
        accountPage.selectIndustry(industry);
        accountPage.selectType(accountType);

        accountPage.clickSaveButton();

        String successMessage = accountPage.getSuccessMessage();
        Assert.assertTrue(successMessage.contains("was created"), "Success message should contain 'was created'.");
    }
}
