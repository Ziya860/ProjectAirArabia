describe('Subscribe', () => {
    it('Subscribe News', () => {
        cy.visit('https://www.airarabia.com/')
        cy.get('#onetrust-accept-btn-handler').click();
        cy.wait(1000);
        cy.get('#edit-submitted-title')
            .select('Mr')
            .should('have.value', 'Mr')
        cy.get('#edit-submitted-your-name')
            .type('Ziyad')
            .should('have.value', 'Ziyad')
        cy.get('#edit-submitted-email-address')
            .type('zabilov12@gmail.com')
            .should('have.value', 'zabilov12@gmail.com')
        cy.wait(1000);
        cy.get('#edit-submitted-country-and-language-country')
            .select('AZ')
            .should('have.value', 'AZ')
        cy.wait(1000);
        cy.get('#edit-submitted-country-and-language-language')
            .select('English')
            .should('have.value', 'English')
        cy.get("input[value='Subscribe']")
            .click()

    });
});