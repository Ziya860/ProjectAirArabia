describe('Claim', () => {
    it('Claim.issue', () => {
        cy.visit('https://www.airarabia.com/')
        cy.get('#onetrust-accept-btn-handler').click();
        cy.wait(1000)
        cy.xpath("//a[normalize-space()='Customer Claim']").click();
        cy.wait(1000)
        cy.xpath("//a[normalize-space()='Click here']").click();
        cy.wait(30000)
        cy.origin('https://claims.airarabia.com', () => {
            cy.get("#root\\.F_QbtCY").type("34343gyr")
            cy.get("#root\\.F_Q29r0")
                .click()
                .type("Emin Mammadov");
            
            cy.get("input[id='root.F_eetzh']").click({ force: true });


            cy.get("ul[role='listbox'] li").first().click();

            cy.get("#root\\.F_ZQoEi").click().type("2025-12-22T10:00", { force: true });
            cy.get("button[value='Next']").click();
            cy.wait(5000)
            cy.contains("We could not find a booking against your given details. Please try again.")
                .should("be.visible");

        });
    });
});
 