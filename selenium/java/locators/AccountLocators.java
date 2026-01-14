package locators;

import org.openqa.selenium.By;

public class TC001 {

    public static final By ACCOUNTS_TAB = By.xpath("//span[contains(text(),'Account'");
    public static final By NEW_BUTTON = By.cssSelector("a[title='New']");
    public static final By ACCOUNT_NAME_INPUT = By.cssSelector("lightning-input-field[field-name='Name'] input");
    public static final By ACCOUNT_NUMBER_INPUT = By.cssSelector("lightning-input-field[field-name='AccountNumber'] input");
    public static final By ACCOUNT_SITE_INPUT = By.cssSelector("lightning-input-field[field-name='Site'] input");
    public static final By INDUSTRY_COMBOBOX = By.cssSelector("lightning-combobox[field-name='Industry'] button");
    public static final By INDUSTRY_COMBOBOX_OPTION = By.xpath("//lightning-base-combobox-item[@data-value='%s']");
    public static final By SAVE_BUTTON = By.cssSelector("button[name='SaveEdit']");
    public static final By SUCCESS_MESSAGE = By.cssSelector("div.forceToastMessage");
    public static final By TYPE_COMBOBOX = By.cssSelector("lightning-combobox[field-name='Type'] button");
    public static final By TYPE_COMBOBOX_OPTION = By.xpath("//lightning-base-combobox-item[@data-value='%s']");

    private TC001() {}
}
