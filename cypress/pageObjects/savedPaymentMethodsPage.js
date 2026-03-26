import { BasePage } from '../pageObjects/basePage';

export class SavedPaymentMethodsPage extends BasePage {
  
  static get url() {
    return '/#/saved-payment-methods';
  }

  static get addNewCardButton(){
    return cy.get('mat-expansion-panel-header[role="button"]')
  }

  static get nameField() {
  return cy.get('mat-form-field').contains('Name').parents('mat-form-field').find('input');
}

  static get cardNumberField() {
    return cy.get('input[type="number"]');
  }

  static get expiryMonthField() {
    return cy.get('select').first();
  }

  static get expiryYearField() {
    return cy.get('select').last();
  }

  static get submitButton() {
    return cy.get('#submitButton');
  }
  
  static get paymentTable(){
    return cy.get('mat-table[role="table"] mat-row[role="row"]')
  }
}