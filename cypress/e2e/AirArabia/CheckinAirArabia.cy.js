describe('Checkin AirArabia validation', () => {
    it('should check checkin AirArabia', () => {
        cy.visit('https://www.airarabia.com/')
        cy.get('#onetrust-accept-btn-handler').click();
        cy.get('.menu-514 > .attached-block').should('be.visible').click();
        cy.origin('https://webcheckin.airarabia.com', () => {
            cy.get("[ng-model='login.model.prams.pnr']").type('ABC123');
            cy.get("[ng-model='login.model.prams.airportcode']")
                .clear()       // clear if it has a default value
                .type('Baku');
            cy.contains('button', 'Find booking').click();
            cy.contains('WC024').should('be.visible');
        
        });
    });
});
