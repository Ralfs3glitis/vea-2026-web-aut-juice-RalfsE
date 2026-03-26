  import { BasePage } from '../pageObjects/basePage';
  
  export class SelectAddressPage extends BasePage {
    static get url() {
      return '/#/address/select';
    }

    static get addressTableEntries(){
        return cy.get('mat-table[role="table"] mat-row[role="row"]')
    }
    static get continueButton(){
        return cy.get('button[aria-label="Proceed to payment selection"]')
    }
}