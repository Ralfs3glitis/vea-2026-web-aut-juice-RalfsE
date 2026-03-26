  import { BasePage } from '../pageObjects/basePage';
  
  export class CreateAddressPage extends BasePage {
    static get url() {
      return '/#/address/create';
    }

    static get countryField() {
    return cy.get('input[placeholder="Please provide a country."]');
    }

    static get nameField() {
        return cy.get('input[placeholder="Please provide a name."]');
    }

    static get numberField() {
        return cy.get('input[placeholder="Please provide a mobile number."]');
    }

    static get zipField() {
        return cy.get('input[placeholder="Please provide a ZIP code."]');
    }

    static get addressField() {
        return cy.get('#address');
    }

    static get cityField() {
        return cy.get('input[placeholder="Please provide a city."]');
    }

    static get submitButton() {
        return cy.get('#submitButton');
    }

}