import { BasePage } from '../pageObjects/basePage';

export class PaymentOptionsPage extends BasePage {
static get url() {
    return '/#/payment/shop';
}

    static get cardOptions(){
        return cy.get('mat-table[role="table"] mat-row[role="row"]')
    }
    static get continueButton(){
        return cy.get('button[aria-label="Proceed to review"]')
    }
}
