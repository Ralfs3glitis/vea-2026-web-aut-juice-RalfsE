import { BasePage } from '../pageObjects/basePage';

export class OrderCompletionPage extends BasePage {
static get url() {
    return '/#/order-completion';
}

    static get confirmationText(){
            return cy.get('h1[class="confirmation"]')
        }
}
