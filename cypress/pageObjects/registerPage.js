import { BasePage } from '../pageObjects/basePage';

export class RegisterPage extends BasePage {
  static get url() {
    return '/#/register';
  }
  
  static get notYetCustomerLink() {
    return cy.get('#newCustomerLink');
  }
  static get emailField() {
    return cy.get('#emailControl');
  }

  static get passwordField() {
    return cy.get('#passwordControl');
  }

  static get repeatPasswordField() {
    return cy.get('#repeatPasswordControl');
  }

  static get securityQuestionDropdown() {
    return cy.get('mat-select[name="securityQuestion"]');
  }

  static get securityQuestionOptions() {
    return cy.get('[role="option"]');
  }

  static get securityAnswerField() {
    return cy.get('#securityAnswerControl');
  }

  static get registerButton() {
    return cy.get('#registerButton');
  }
}