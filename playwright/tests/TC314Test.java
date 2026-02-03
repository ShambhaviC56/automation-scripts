package tests.opportunitymanagement;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.OpportunityManagementPage;
import tests.BaseTest;

public class TC314Test extends BaseTest {

    @Test(description = "TC314 - Verify Opportunity Creation with Invalid Data in Specific Fields (Close Date in Past)")
    public void TC314() {
        OpportunityManagementPage opportunityManagementPage = new OpportunityManagementPage(driver);
        opportunityManagementPage.createOpportunityWithInvalidCloseDate("Test Opportunity", "Edge Communications", "10/10/2022");

        Assert.assertTrue(opportunityManagementPage.isErrorMessageDisplayed(), "Error message should be displayed.");
        String errorMessage = opportunityManagementPage.getErrorMessage();
        Assert.assertTrue(errorMessage.contains("Close Date must be today or later"), "Error message is incorrect.");
    }
}
