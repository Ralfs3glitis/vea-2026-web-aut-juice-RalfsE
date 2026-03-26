  import { BasePage } from '../pageObjects/basePage';
  
  export class SavedAddressesPage extends BasePage {
    static get url() {
      return '/#/address/saved';
    }

    static get addNewAddressButton(){
        return cy.get('button[aria-label="Add a new address"]')
    }
    static get addressTableEntries(){
        return cy.get('mat-table[role="table"] mat-row[role="row"]')
    }
}