describe('Air Arabia book find', () => {
    it('should visit the book ticket price', () => {
        cy.visit('https://www.airarabia.com/en');

        cy.get('#onetrust-accept-btn-handler').click();
        cy.get('.swiper-slide-active > .banner-overlay > .row > .panel_content > .panel_inner > .show-for-medium').click()
        cy.get('input[name="flying-from"]').first().click().type('GYD');
        cy.get("#journey_type_rt").check({ force: true });
        cy.wait(2000);
        cy.get('input[name="flying-to"]', { timeout: 10000 })
            .should('be.visible')
            .click({ force: true })
            .type('Phuket');
        cy.contains('.airport-list .airportoption', 'Phuket').click({ force: true });
        cy.wait(2000);
        cy.get('input[name="deptdate"]')
            .invoke('val', '10/12/2025')
            .trigger('change');
        cy.get('input[name="rtndate"]')
            .invoke('val', '17/12/2025')
            .trigger('change');
        cy.wait(2000);

        cy.get('select[name="search_currency"] option[value="USD"]')
            .should('exist')       // make sure the option exists
            .then(() => {
                cy.get('select[name="search_currency"]')
                    .select('USD', { force: true });
            });


        cy.wait(2000);
        cy.get('.search-button-contain > .btn-filled-red').click();
       
        
    });
});
