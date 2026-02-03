package tests.Opportunity Management;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.OpportunityManagementPage;
import tests.BaseTest;

public class TC314Test extends BaseTest {
    @Test(description = "TC314 - Verify Opportunity Creation with Invalid Data (Past Close Date)")
    public void TC314() {
        OpportunityManagementPage opportunityPage = new OpportunityManagementPage(driver);
        
        //Provide test data
        String opportunityName = "Test Opportunity";
        String accountName = "Acme";
        String pastCloseDate = "10/26/2023";
        String stage = "Prospecting";

        //Create Opportunity with Invalid data
        opportunityPage.createOpportunityWithInvalidCloseDate(opportunityName, accountName, pastCloseDate, stage);

        //Verify error message
        String errorMessage = opportunityPage.getErrorMessage();
        Assert.assertTrue(errorMessage.contains("Close Date must be today or a date in the future"), "Error message should indicate Close Date is invalid.");
    }
}
