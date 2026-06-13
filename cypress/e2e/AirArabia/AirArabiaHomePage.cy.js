describe('Open AirArabia site', () => {
    it('should visit AirArabia homepage', () => {
        cy.visit('https://www.airarabia.com/')
        cy.get('.pl-1').click();
    })
})
                        