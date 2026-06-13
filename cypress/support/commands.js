Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from failing the test
    return false;
});


// cy.findByPlaceholder('Axtar').type('pass',{force:true})
// cy.get('.text-sm.font-bold').eq(0).contains('AM')
Cypress.Commands.add('findByPlaceholder', function (placeholderText) {

    cy.get(`[placeholder="${placeholderText}"]`)

})

