import { HomePage } from '../pageObjects/homePage';
import { LoginPage } from '../pageObjects/loginPage';
import { RegisterPage } from '../pageObjects/registerPage';

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

    it.only('Search 500ml and validate cards', () => {
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


    // Create scenario - Search 500ml and validate cards
    // Click on search icon
    // Search for 500ml
    // Select a product card - Eggfruit Juice (500ml)
    // Validate that the card (should) contains "Now with even more exotic flavour."
    // Close the card
    // Select a product card - Lemon Juice (500ml)
    // Validate that the card (should) contains "Sour but full of vitamins."
    // Close the card
    // Select a product card - Strawberry Juice (500ml)
    // Validate that the card (should) contains "Sweet & tasty!"

    // Create scenario - Read a review
    // Click on search icon
    // Search for King
    // Select a product card - OWASP Juice Shop "King of the Hill" Facemask
    // Click expand reviews button/icon (wait for reviews to appear)
    // Validate review - K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!

    // Create scenario - Add a review
    // Click on search icon
    // Search for Raspberry
    // Select a product card - Raspberry Juice (1000ml)
    // Type in review - "Tastes like metal"
    // Click Submit
    // Click expand reviews button/icon (wait for reviews to appear)
    // Validate review -  "Tastes like metal"

    // Create scenario - Validate product card amount
    // Validate that the default amount of cards is 12
    // Change items per page (at the bottom of page) to 24
    // Validate that the amount of cards is 24
    // Change items per page (at the bottom of page) to 36
    // Validate that the amount of cards is 35

    // Create scenario - Buy Girlie T-shirt
    // Click on search icon
    // Search for Girlie
    // Add to basket "Girlie"
    // Click on "Your Basket" button
    // Create page object - BasketPage
    // Click on "Checkout" button
    // Create page object - SelectAddressPage
    // Select address containing "United Fakedom"
    // Click Continue button
    // Create page object - DeliveryMethodPage
    // Select delivery speed Standard Delivery
    // Click Continue button
    // Create page object - PaymentOptionsPage
    // Select card that ends with "5678"
    // Click Continue button
    // Create page object - OrderSummaryPage
    // Click on "Place your order and pay"
    // Create page object - OrderCompletionPage
    // Validate confirmation - "Thank you for your purchase!"

    // Create scenario - Add address
    // Click on Account
    // Click on Orders & Payment
    // Click on My saved addresses
    // Create page object - SavedAddressesPage
    // Click on Add New Address
    // Create page object - CreateAddressPage
    // Fill in the necessary information
    // Click Submit button
    // Validate that previously added address is visible

    // Create scenario - Add payment option
    // Click on Account
    // Click on Orders & Payment
    // Click on My payment options
    // Create page object - SavedPaymentMethodsPage
    // Click Add new card
    // Fill in Name
    // Fill in Card Number
    // Set expiry month to 7
    // Set expiry year to 2090
    // Click Submit button
    // Validate that the card shows up in the list
  });
});
