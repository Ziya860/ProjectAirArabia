describe('Subscribe', () => {
    it('Subscribe News', () => {
        cy.visit('https://www.airarabia.com/')
        cy.get('#onetrust-accept-btn-handler').click();
        cy.wait(1000)
        cy.xpath("//span[normalize-space()='Login']").click();
        cy.get('#ui-accordion-3-header-0').click();
        cy.wait(1000);
        cy.get("a[href='https://reservationsma.airarabia.com/service-app/ibe/reservation.html#/signIn/en/MAD/MA']")
            .click();
        cy.origin('https://reservationsma.airarabia.com', () => {
            
            


        });
    });
});