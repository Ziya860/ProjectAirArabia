describe('CarHire', () => {
    it('Car.Hire', () => {
        cy.visit('https://www.airarabia.com/')
        cy.get('#onetrust-accept-btn-handler').click();
        cy.wait(1000)
        cy.xpath("//a[@id='ui-id-4']").click();
        cy.wait(5000)
        cy.xpath("//select[@id='carhirecountries']").select("Azerbaijan");
        cy.xpath("//input[@id='pickupDate']")
            .click()
            .clear()
            .type("19/12/2025", { force: true });
        cy.wait(1000)
        cy.xpath("//select[@id='pickupTime']").select("07:00");
        cy.xpath("//input[@id='returnDate']").clear().type("25/12/2025");
        cy.xpath("//select[@id='returnTime']").select("12:00");
        cy.xpath("//input[@value='Search car hire']").click();
    });
});