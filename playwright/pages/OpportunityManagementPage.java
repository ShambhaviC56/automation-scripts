package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import locators.OpportunityManagementLocators;

public class OpportunityManagementPage extends BasePage {

    public OpportunityManagementPage(WebDriver driver) {
        super(driver);
    }

    public void createOpportunityWithInvalidCloseDate(String opportunityName, String accountName, String closeDate) {
        fill(OpportunityManagementLocators.OPPORTUNITY_NAME_INPUT, opportunityName);
        fill(OpportunityManagementLocators.ACCOUNT_NAME_LOOKUP, accountName);
        waitForElement(OpportunityManagementLocators.ACCOUNT_NAME_OPTION);
        click(OpportunityManagementLocators.ACCOUNT_NAME_OPTION);
        fill(OpportunityManagementLocators.CLOSE_DATE_INPUT, closeDate);
        click(OpportunityManagementLocators.STAGE_PICKLIST);
        click(OpportunityManagementLocators.STAGE_VALUE);
        click(OpportunityManagementLocators.SAVE_BUTTON);
    }

    public String getErrorMessage() {
        waitForElement(OpportunityManagementLocators.ERROR_MESSAGE);
        return getText(OpportunityManagementLocators.ERROR_MESSAGE);
    }

    public boolean isErrorMessageDisplayed() {
       return isElementVisible(OpportunityManagementLocators.ERROR_MESSAGE);
    }
}
