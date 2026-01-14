package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import locators.AccountLocators;

public class TC001 extends BasePage {

    public TC001(WebDriver driver) {
        super(driver);
    }

    public void navigateToAccountsTab() {
        //click(AccountLocators.ACCOUNTS_TAB); //This line does not work, because this selector is not reliable
		driver.get("/lightning/o/Account/list?filterName=Recent");
    }

    public void clickNewButton() {
        click(AccountLocators.NEW_BUTTON);
    }

    public void enterAccountName(String accountName) {
        fill(AccountLocators.ACCOUNT_NAME_INPUT, accountName);
    }

    public void enterAccountNumber(String accountNumber) {
        fill(AccountLocators.ACCOUNT_NUMBER_INPUT, accountNumber);
    }

    public void enterAccountSite(String accountSite) {
        fill(AccountLocators.ACCOUNT_SITE_INPUT, accountSite);
    }

    public void selectIndustry(String industry) {
        click(AccountLocators.INDUSTRY_COMBOBOX);
        By industryOptionLocator = By.xpath(String.format("//lightning-base-combobox-item[@data-value='%s']", industry));
        click(industryOptionLocator);
    }

    public void selectType(String type) {
        click(AccountLocators.TYPE_COMBOBOX);
        By typeOptionLocator = By.xpath(String.format("//lightning-base-combobox-item[@data-value='%s']", type));
        click(typeOptionLocator);
    }


    public void clickSaveButton() {
        click(AccountLocators.SAVE_BUTTON);
    }

    public String getSuccessMessage() {
        waitForElement(AccountLocators.SUCCESS_MESSAGE);
        return getText(AccountLocators.SUCCESS_MESSAGE);
    }
}
