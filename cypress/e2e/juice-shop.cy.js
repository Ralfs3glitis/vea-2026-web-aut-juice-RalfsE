import { HomePage } from '../pageObjects/homePage';
import { LoginPage } from '../pageObjects/loginPage';
import { RegisterPage } from '../pageObjects/registerPage';
import { BasketPage } from '../pageObjects/basketPage';
import { SelectAddressPage } from '../pageObjects/selectAddressPage';
import { DeliveryMethodPage } from '../pageObjects/deliveryMethodPage';
import { PaymentOptionsPage } from '../pageObjects/paymentOptionsPage';
import { OrderSummaryPage } from '../pageObjects/orderSummaryPage';
import { OrderCompletionPage } from '../pageObjects/orderCompletionPage';
import { SavedAddressesPage } from '../pageObjects/savedAddressesPage';
import { CreateAddressPage } from '../pageObjects/createAddressPage';
import { SavedPaymentMethodsPage } from '../pageObjects/savedPaymentMethodsPage';

describe('Juice-shop scenarios', () => {
  context('Without auto login', () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it('Login', () => {
      // Click Account button
      HomePage.accountButton.click();
      // Click Login button
      HomePage.loginButton.click();
      // Set email value to "demo"
      LoginPage.emailField.type('demo');
      // Set password value to "demo"
      LoginPage.passwordField.type('demo');
      // Click Log in
      LoginPage.loginButton.click();
      // Click Account button
      HomePage.accountButton.click();
      // Validate that "demo" account name appears in the menu section
      HomePage.userProfileButton.should('contain.text', 'demo');
  });

    it('Registration', () => {
      // 1. Navigate to Registration page (Account -> Login -> Not yet a customer)
      HomePage.accountButton.click();
      HomePage.loginButton.click();
      RegisterPage.notYetCustomerLink.click();

      // 2. Generate a unique email address
      const randomNum = Math.floor(Math.random() * 10000);
      const userEmail = `email_${randomNum}@inbox.com`;
      const userPassword = 'Password123!';

      // 3. Fill in registration form
      RegisterPage.emailField.type(userEmail);
      RegisterPage.passwordField.type(userPassword);
      RegisterPage.repeatPasswordField.type(userPassword);

      // 4. Handle Security Question
      RegisterPage.securityQuestionDropdown.click();

      RegisterPage.securityQuestionOptions.contains('mat-option', 'Name of your favorite pet?').click();
      RegisterPage.securityAnswerField.type('Jack Sparrow');

      // 5. Click Register
      RegisterPage.registerButton.click();

      // 6. Log in with the new credentials
      LoginPage.emailField.type(userEmail);
      LoginPage.passwordField.type(userPassword);
      LoginPage.loginButton.click();

      // 7. Validate account name appears in the menu
      HomePage.accountButton.click();

      // We check that the user profile button now shows our unique email
      HomePage.userProfileButton.should('contain.text', userEmail);
    });
  });

  context('With auto login', () => {
    beforeEach(() => {
      cy.login('demo', 'demo');
      HomePage.visit();
    });

    it('Search and validate Lemon', () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for Lemon
      HomePage.searchField.type('Lemon{enter}');
      // Select a product card - Lemon Juice (500ml)
      HomePage.productNames.contains('Lemon Juice (500ml)').click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.productDescription.should('contain.text', 'Sour but full of vitamins.');
    });

    it('Search and validate Lemon, while having multiple cards', () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for 500ml
      HomePage.searchField.type('500ml{enter}');
      // Select a product card - Lemon Juice (500ml)
      HomePage.productNames.contains('Lemon Juice (500ml)').click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.productDescription.should('contain.text', 'Sour but full of vitamins.');
    });

    it('Search 500ml and validate cards', () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for 500ml
      HomePage.searchField.type('500ml{enter}');
      // Select a product card - Eggfruit Juice (500ml)
      HomePage.productNames.contains('Eggfruit Juice (500ml)').click();
      // Validate that the card (should) contains "Now with even more exotic flavour."
      HomePage.productDescription.should('contain.text', 'Now with even more exotic flavour.');
      // Close the card
      HomePage.closeButton.click();
      // Select a product card - Lemon Juice (500ml)
      HomePage.productNames.contains('Lemon Juice (500ml)').click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.productDescription.should('contain.text', 'Sour but full of vitamins.');
      // Close the card
      HomePage.closeButton.click();
      // Select a product card - Strawberry Juice (500ml)
      HomePage.productNames.contains('Strawberry Juice (500ml)').click();
      // Validate that the card (should) contains "Sweet & tasty!"
      HomePage.productDescription.should('contain.text', 'Sweet & tasty!');
    });

    it('Read a review', () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for King
      HomePage.searchField.type('King{enter}');
      // Select a product card - OWASP Juice Shop "King of the Hill" Facemask
      HomePage.productNames.contains('OWASP Juice Shop "King of the Hill" Facemask').click();
      // Click expand reviews button/icon (wait for reviews to appear)
      HomePage.reviewHeader.click();
      cy.wait(100);
       // Validate review - K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!
      HomePage.cardReviewText.should('contain.text', 'K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!');
    });

    it('Add a review', () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for Raspberry
      HomePage.searchField.type('Raspberry{enter}');
      // Select a product card - Raspberry Juice (1000ml)
      HomePage.productNames.contains('Raspberry Juice (1000ml)').click();
      // Type in review - "Tastes like metal"
      const reviewText = "Tastes like metal"
      HomePage.reviewInputField.click()
      HomePage.reviewInputField.type(reviewText)
      // Click Submit
      HomePage.reviewPostButton.click();
      // Click expand reviews button/icon (wait for reviews to appear)
      HomePage.reviewHeader.click();
      cy.wait(100);
      // Validate review -  "Tastes like metal"
      HomePage.cardReviewText.should('contain.text', reviewText);
    });


    it('Validate product card amount', () => {
      function isProductCount(amount){
        HomePage.productCards.should("have.length", amount)
      }
      function changeProductCount(amount){
        HomePage.changePageSizeSelect.click()
        HomePage.pageSizeOptions.contains(amount.toString()).click();
      }
      
      // Validate that the default amount of cards is 12
      isProductCount(12)
      // Change items per page (at the bottom of page) to 24
      changeProductCount(24)
      // Validate that the amount of cards is 24
      isProductCount(24)
      // Change items per page (at the bottom of page) to 36
      changeProductCount(36)
      // Validate that the amount of cards is 36
      isProductCount(36)
    });
    
    it('Buy Girlie T-shirt', () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for Girlie
      HomePage.searchField.type('Girlie{enter}');
      // Add to basket "Girlie"
      HomePage.addToBasketButton.click()
      // Click on "Your Basket" button
      HomePage.yourBasketButton.click()
      // Create page object - BasketPage
      // Click on "Checkout" button
      BasketPage.checkoutButton.click()
      // Create page object - SelectAddressPage
      // Select address containing "United Fakedom"
      SelectAddressPage.addressTableEntries.contains('United Fakedom').first().click()
      // Click Continue button
      SelectAddressPage.continueButton.click()
      // Create page object - DeliveryMethodPage
      // Select delivery speed Standard Delivery
      DeliveryMethodPage.deliverySpeedOptions.contains("Standard Delivery").first().click()
      // Click Continue button
      DeliveryMethodPage.continueButton.click()
      // Create page object - PaymentOptionsPage
      // Select card that ends with "5678"
      PaymentOptionsPage.cardOptions.contains("5678").parents('mat-row').find('mat-radio-button').click();
      // Click Continue button
      PaymentOptionsPage.continueButton.click()
      // Create page object - OrderSummaryPage
      // Click on "Place your order and pay"
      OrderSummaryPage.checkoutButton.click()
      // Create page object - OrderCompletionPage
      // Validate confirmation - "Thank you for your purchase!"
      OrderCompletionPage.confirmationText.contains("Thank you for your purchase!")
    });

		it('Add address', () => {
			 // Click on Account
			HomePage.accountButton.click();
			// Click on Orders & Payment
			HomePage.ordersAndPaymentButton.click();
			cy.wait(100)
			// Click on My saved addresses
			HomePage.mySavedAddressesButton.click();
			// Create page object - SavedAddressesPage
			// Click on Add New Address
			SavedAddressesPage.addNewAddressButton.click();
			// Create page object - CreateAddressPage
			// Fill in the necessary information
			CreateAddressPage.countryField.type('Latvija');
      CreateAddressPage.nameField.type('Ralfs');
      CreateAddressPage.numberField.type('12345678');
      CreateAddressPage.zipField.type('LV-1188');
      CreateAddressPage.addressField.type('Giberta iela 13');
      CreateAddressPage.cityField.type('Ventspils');
			// Click Submit button
			CreateAddressPage.submitButton.click();
			// Validate that previously added address is visible
			SelectAddressPage.addressTableEntries.should('contain', 'Giberta iela 13');
		});

		it('Add payment option', () => {
			// Click on Account
      HomePage.accountButton.click();
			// Click on Orders & Payment
      HomePage.ordersAndPaymentButton.click();
			// Click on My payment options
      HomePage.myPaymentOptionsButton.click();
      // Create page object - SavedPaymentMethodsPage
			// Click Add new card
      SavedPaymentMethodsPage.addNewCardButton.click();
      
			// Fill in Name
      SavedPaymentMethodsPage.nameField.type('Ralfs');
			// Fill in Card Number
      SavedPaymentMethodsPage.cardNumberField.type('1111222233334444');
			// Set expiry month to 7
      SavedPaymentMethodsPage.expiryMonthField.select('7');
			// Set expiry year to 2090
      SavedPaymentMethodsPage.expiryYearField.select('2090');
			// Click Submit button
      SavedPaymentMethodsPage.submitButton.click();
      // Validate that the card shows up in the list
      SavedPaymentMethodsPage.paymentTable.should('contain', '4444');
    });
  });
});
