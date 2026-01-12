import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TC112(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 20)
        self.login_url = "_"
        self.username = "/* CREDENTIALS NOT CONFIGURED - Add in Configurations */"
        self.password = "/* CREDENTIALS NOT CONFIGURED - Add in Configurations */"

    def tearDown(self):
        self.driver.quit()

    def test_verify_new_feature_does_not_disrupt_existing_workflows(self):
        # 1. Login to Salesforce
        self.driver.get(self.login_url)
        username_field = self.wait.until(EC.presence_of_element_located((By.ID, "username")))
        username_field.send_keys(self.username)
        password_field = self.wait.until(EC.presence_of_element_located((By.ID, "password")))
        password_field.send_keys(self.password)
        login_button = self.wait.until(EC.element_to_be_clickable((By.ID, "Login")))
        login_button.click()
        self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".slds-global-header__item")))

        # Navigate to Quotes
        try:
            app_launcher = self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".slds-icon-waffle")))
            app_launcher.click()
            view_all = self.wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='View All']")))
            view_all.click()
            search_app = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Search apps and items...']")))
            search_app.send_keys("Quotes")
            quotes_link = self.wait.until(EC.element_to_be_clickable((By.XPATH, "//p[@class='slds-truncate' and text()='Quotes']")))
            quotes_link.click()
        except Exception as e:
            print(f"Error navigating to Quotes: {e}")
            self.fail("Failed to navigate to Quotes")

        #Create Quote
        try:
            new_button = self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "div[title='New']")))
            new_button.click()

            # Verify redirection by checking for specific element on new quote page
            time.sleep(2)
            quote_name_field = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[name='Name']")))

            #Enter Quote Name
            quote_name_field.send_keys("Test Quote")

            #Look for account lookup
            account_lookup = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[title='Search Accounts']")))
            account_lookup.click()
            account_lookup.send_keys("Test Account")

            #Select Account. Note: Replace 'Test Account' with a valid existing account
            self.wait.until(EC.element_to_be_clickable((By.XPATH, "//div[contains(@class, 'listContent')]//span[contains(text(), 'Test Account')]"))).click()

            #Verify Save functionality
            save_button = self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[name='SaveEdit']")))
            save_button.click()

            # Assertion for successful creation and existing functionalities
            success_message = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".slds-theme--success"))) # Adjusted selector for success message
            self.assertTrue("Quote" in success_message.text, "Quote was not created successfully or message not found.")
        except Exception as e:
            print(f"Error creating Quote: {e}")
            self.fail("Failed to create Quote")

        # Logout
        try:
            user_menu = self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".slds-user-profile-badge--circle")))
            user_menu.click()
            logout_button = self.wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Log Out")))
            logout_button.click()
        except Exception as e:
            print(f"Error logging out: {e}")
            self.fail("Failed to logout")

if __name__ == '__main__':
    unittest.main()