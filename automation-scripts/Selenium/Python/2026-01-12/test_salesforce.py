import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestAccountCreation(unittest.TestCase):

    def setUp(self):        
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 20)

    def tearDown(self):        
        self.driver.quit()

    def test_account_creation_missing_fields_002_1735008000(self):
        # Login
        self.driver.get("_")
        self.wait.until(EC.presence_of_element_located((By.ID, "username")))
        self.driver.find_element(By.ID, "username").send_keys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */")
        self.driver.find_element(By.ID, "password").send_keys("/* CREDENTIALS NOT CONFIGURED - Add in Configurations */")
        self.driver.find_element(By.ID, "Login").click()
        self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".slds-global-header")))

        # Handle potential welcome modal
        try:
            time.sleep(2)
            self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button.slds-button[title='Maybe Later']"))).click()
        except:
            pass # Modal did not appear. proceed
        
        # 1. Navigate to the Accounts tab.
        self.driver.get("/lightning/o/Account/home")

        # 2. Click 'New' button.
        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a[title='New']"))).click()
        self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "lightning-input-field[field-name='Name']")))

        # 3. Leave required fields (e.g., Account Name) blank.

        # 4. Enter valid values in optional fields.
        # Enter Billing City
        billing_city_field = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "lightning-input-field[field-name='BillingCity'] input")))
        billing_city_field.clear()
        billing_city_field.send_keys("Test City")

        # 5. Click 'Save' button.
        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[title='Save']"))).click()

        # Expected Results:
        # 1. Account creation fails.
        # 2. Error message(s) are displayed indicating which required fields are missing.
        # Verify error message is displayed for missing Account Name
        self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.slds-text-color_error")))

        # 3. User remains on the Account creation page.
        # Verify that the Account Name field is still present
        self.assertTrue(self.driver.find_elements(By.CSS_SELECTOR, "lightning-input-field[field-name='Name'] input"))

        # 4. The entered data in optional fields is preserved.
        # Verify Billing City value is preserved
        billing_city_value = self.driver.find_element(By.CSS_SELECTOR, "lightning-input-field[field-name='BillingCity'] input").get_attribute("value")
        self.assertEqual(billing_city_value, "Test City")

        # Logout
        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button.branding-userProfile-button"))).click()
        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a[href*='logout']"))).click()
        self.wait.until(EC.presence_of_element_located((By.ID, "username")))

if __name__ == '__main__':
    unittest.main()