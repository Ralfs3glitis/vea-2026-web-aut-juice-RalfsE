import { BasePage } from '../pageObjects/basePage';

export class DeliveryMethodPage extends BasePage {
static get url() {
    return '/#/delivery-method';
}

static get deliverySpeedOptions(){
    return cy.get('mat-table[role="table"] mat-row[role="row"]')
}
static get continueButton(){
    return cy.get('button[aria-label="Proceed to delivery method selection"]')
}
}
