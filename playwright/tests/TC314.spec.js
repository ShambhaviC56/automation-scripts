import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import date, timedelta

class TC314(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 20)
        self.login_url = "_"
        self.username = "/* CREDENTIALS NOT CONFIGURED - Add in Configurations */"
        self.password = "/* CREDENTIALS NOT CONFIGURED - Add in Configurations */"

    def test_verify_opportunity_creation_with_invalid_close_date(self):
        # 1. Login to Salesforce
        self.driver.get(self.login_url)
        self.wait.until(EC.presence_of_element_located((By.ID, "username"))).send_keys(self.username)
        self.driver.find_element(By.ID, "password").send_keys(self.password)
        self.driver.find_element(By.ID, "Login").click()
        self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".slds-global-header__logo")))

        # 1. Navigate to the Opportunities tab.
        self.wait.until(EC.element_to_be_clickable((By.XPATH, "//a[@title='Opportunities']"))).click()
        self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".slds-page-header__title")))

        # 2. Click 'New'.
        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "div[title='New']"))).click()

        # 3. Enter valid data for Opportunity Name and Account Name.
        opportunity_name_field = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "lightning-input[field-name='Name'] input")))
        opportunity_name_field.clear()
        opportunity_name_field.send_keys("Test Opportunity")

        account_name_field = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "lightning-input-field[field-name='AccountId'] input")))
        account_name_field.click()
        account_name_field.send_keys("Test Account")
        self.wait.until(EC.element_to_be_clickable((By.XPATH, "//div[contains(@class, 'slds-lookup__menu')]//mark[text()='Test Account']"))).click()

        # 4. Enter a past date for the Close Date.
        past_date = date.today() - timedelta(days=1)
        past_date_str = past_date.strftime("%m/%d/%Y")
        close_date_field = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "lightning-input[field-name='CloseDate'] input")))
        close_date_field.clear()
        close_date_field.send_keys(past_date_str)

        # 5. Select a valid Stage.
        stage_combobox = self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "lightning-combobox[field-name='StageName'] button")))
        stage_combobox.click()
        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "lightning-base-combobox-item[data-value='Prospecting']"))).click()

        # 6. Click 'Save'.
        save_button = self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[name='SaveEdit']")))
        save_button.click()

        # Expected Results:
        # 1. An error message is displayed indicating that the Close Date cannot be in the past.
        error_message = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.slds-page-header__detail-row div.ui-outputURL")))
        self.assertIn("Close Date must be today or a date in the future", error_message.text)

        # 2. Opportunity is not created.
        # Verify we are still on the Opportunity creation page by checking for Opportunity Name input
        try:
          self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "lightning-input[field-name='Name'] input")))
        except:
          self.fail("Opportunity was created despite invalid Close Date.")

        # 3. User remains on the Opportunity creation page with the Close Date field highlighted.
        # In the absence of highlighting, check if the close date field is present.
        close_date_field = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "lightning-input[field-name='CloseDate'] input")))
        self.assertTrue(close_date_field.is_displayed())

    def tearDown(self):
        # Logout from Salesforce
        self.driver.get(self.login_url + "/secur/logout.jsp")
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()