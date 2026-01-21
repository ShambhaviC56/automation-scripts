package locators;

import org.openqa.selenium.By;

public class OpportunityManagementLocators {

    public static final By NEW_BUTTON = By.cssSelector("a[title='New']");
    public static final By OPPORTUNITY_NAME_INPUT = By.cssSelector("lightning-input[name='Opportunity Name'] input");
    public static final By ACCOUNT_NAME_LOOKUP = By.xpath("//label[text()='Account Name']/following::input");
    public static final By ACCOUNT_NAME_OPTION = By.xpath("//div[contains(@class, 'slds-lookup__menu')]//lightning-base-combobox-item");
    public static final By CLOSE_DATE_INPUT = By.cssSelector("lightning-input[name='CloseDate'] input");
    public static final By STAGE_COMBOBOX = By.xpath("//label[text()='Stage']/following::button");
    public static final By STAGE_PROSPECTING_OPTION = By.xpath("//span[@title='Prospecting']");
    public static final By SAVE_BUTTON = By.cssSelector("button[name='SaveEdit']");
    public static final By OPPORTUNITY_NAME_DISPLAY = By.xpath("//span[text()='Opportunity Name']/following::lightning-formatted-text");
    public static final By ERROR_MESSAGE = By.cssSelector(".slds-text-color_error");

    private OpportunityManagementLocators() {}
}
