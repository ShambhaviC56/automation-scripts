package pages;

import org.openqa.selenium.WebDriver;
import locators.OpportunityManagementLocators;
import org.openqa.selenium.By;

public class OpportunityManagementPage extends BasePage {

    public OpportunityManagementPage(WebDriver driver) {
        super(driver);
    }

    public void createOpportunityWithInvalidCloseDate(String opportunityName, String accountName, String closeDate, String stage) {
        fill(OpportunityManagementLocators.OPPORTUNITY_NAME_INPUT, opportunityName);
        fill(OpportunityManagementLocators.ACCOUNT_NAME_LOOKUP, accountName);
        waitForElement(OpportunityManagementLocators.ACCOUNT_NAME_OPTION);
        click(By.xpath("//div[contains(@class, 'slds-lookup__menu')]//lightning-base-combobox-item[@title='" + accountName + "']"));
        fill(OpportunityManagementLocators.CLOSE_DATE_INPUT, closeDate);
        click(OpportunityManagementLocators.STAGE_PICKLIST);
        click(By.xpath("//span[@title='" + stage + "']"));
        click(OpportunityManagementLocators.SAVE_BUTTON);
    }

    public String getErrorMessage() {
        waitForElement(OpportunityManagementLocators.ERROR_MESSAGE);
        return getText(OpportunityManagementLocators.ERROR_MESSAGE);
    }
}
