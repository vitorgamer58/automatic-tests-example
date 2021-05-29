/// <reference types='cypress' />

describe('Work with popup', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('Deve verificar se popup foi invocado', () => {
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
    })

})

describe('Work with links', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('Check popup url', () => {
        cy.contains('Popup2')
            .should('have.prop', 'href')
            .and('equal', 'https://wcaquino.me/cypress/frame.html')
    })
    it('Should access popup dinamically', () => {
        cy.contains('Popup2').then($a => {
            const href = $a.prop('href')
            cy.visit(href)
        })
        cy.get('#tfield')
            .should('exist')
            .type('Funciona!!!')
    })
    it('Should force link on same page', () => {
        cy.contains('Popup2')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.get('#tfield')
            .should('exist')
            .type('Funciona!!!')
    })
})