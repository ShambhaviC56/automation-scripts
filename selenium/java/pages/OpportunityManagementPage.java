package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import locators.OpportunityManagementLocators;

public class OpportunityManagementPage extends BasePage {

    public OpportunityManagementPage(WebDriver driver) {
        super(driver);
    }

    public void createOpportunityWithRequiredFields(String opportunityName, String accountName, String closeDate) {
        click(OpportunityManagementLocators.NEW_BUTTON);
        fill(OpportunityManagementLocators.OPPORTUNITY_NAME_INPUT, opportunityName);
        fill(OpportunityManagementLocators.ACCOUNT_NAME_LOOKUP, accountName);
        waitForElement(OpportunityManagementLocators.ACCOUNT_NAME_OPTION);
        click(OpportunityManagementLocators.ACCOUNT_NAME_OPTION);
        fill(OpportunityManagementLocators.CLOSE_DATE_INPUT, closeDate);
        click(OpportunityManagementLocators.STAGE_COMBOBOX);
        click(OpportunityManagementLocators.STAGE_PROSPECTING_OPTION);
        click(OpportunityManagementLocators.SAVE_BUTTON);
    }

    public String getOpportunityName() {
        waitForElement(OpportunityManagementLocators.OPPORTUNITY_NAME_DISPLAY);
        return getText(OpportunityManagementLocators.OPPORTUNITY_NAME_DISPLAY);
    }

    public boolean isErrorMessageDisplayed() {
        return isElementPresent(OpportunityManagementLocators.ERROR_MESSAGE);
    }
}
