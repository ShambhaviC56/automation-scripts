package tests.Opportunity_Management;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.OpportunityManagementPage;
import tests.BaseTest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class TC313Test extends BaseTest {
    @Test(description = "TC313 - Verify Opportunity Creation with Minimal Required Fields")
    public void testOpportunityCreationWithMinimalRequiredFields() {
        OpportunityManagementPage opportunityPage = new OpportunityManagementPage(driver);

        //Generate Today's Date
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        String todayFormatted = today.format(formatter);

        String opportunityName = "Test Opportunity " + System.currentTimeMillis();
        String accountName = "Test Account"; // Or any existing account name

        opportunityPage.createOpportunityWithRequiredFields(opportunityName, accountName, todayFormatted);

        Assert.assertEquals(opportunityPage.getOpportunityName(), opportunityName.toUpperCase(), "Opportunity Name should match.");

        Assert.assertFalse(opportunityPage.isErrorMessageDisplayed(), "No error messages should be displayed.");

    }
}
