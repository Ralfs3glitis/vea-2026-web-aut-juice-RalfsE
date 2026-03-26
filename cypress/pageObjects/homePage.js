import { BasePage } from '../pageObjects/basePage';

export class HomePage extends BasePage {
  static get url() {
    return '/#/';
  }

  static get dismissButton() {
    return cy.get("[aria-label='Close Welcome Banner']");
  }

  static get meWantItButton() {
    return cy.get("[aria-label='dismiss cookie message']");
  }

  static get accountButton() {
    return cy.get('#navbarAccount');
  }

  static get loginButton() {
    return cy.get('#navbarLoginButton');
  }

  static get userProfileButton() {
    return cy.get("button[aria-label='Go to user profile']").find('span');
  }


  static get searchIcon() {
    return cy.get('#searchQuery');
  }

  static get searchField() {
    return cy.get('#searchQuery input');
  }

  static get productCards(){
    return cy.get('[class="mat-grid-tile ng-star-inserted"]')
  }

  static get productNames() {
    return this.productCards.find('[class="info-box"]');
  }
  static get productDescription() {
    return cy.get('mat-dialog-content .details-row');
  }
  static get closeButton() {
    return cy.get('.close-dialog');
  }
  static get reviewHeader() {
    return cy.get('.mat-expansion-panel[aria-label="Expand for Reviews"]');
  }
  static get cardReviewText() {
    return cy.get('.review-text');
  }
  static get reviewInputField() {
    return cy.get('textarea[aria-label="Text field to review a product"]');
  }
  static get reviewPostButton(){
    return cy.get('#submitButton')
  }
  static get changePageSizeSelect(){
    return cy.get('.mat-mdc-paginator-page-size-select')
  }
  static get pageSizeOptions(){
    return cy.get('mat-option');
  }
  static get addToBasketButton(){
    return cy.get('button[aria-label="Add to Basket"]')
  }
  static get yourBasketButton(){
    return cy.get('button[aria-label="Show the shopping cart"]')
  }
  static get ordersAndPaymentButton(){
    return cy.get('button[aria-label="Show Orders and Payment Menu"]')
  }
  static get mySavedAddressesButton(){
    return cy.get('button[aria-label="Go to saved address page"]')
  }
  static get myPaymentOptionsButton(){
    return cy.get('button[aria-label="Go to saved payment methods page"]')
  }
}