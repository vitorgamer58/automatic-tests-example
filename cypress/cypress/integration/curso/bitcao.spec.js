/// <reference types="Cypress" />

describe('Bitcao', () => {
    before(() => {
        cy.visit('https://bitcao.notasdovitor.top/cotacao/')
    })
    it('Teste Bitcao', () => {
        cy.get('h3').should('contain', 'R$')
        cy.get(':nth-child(3) > :nth-child(1)').should('have.text', 'Braziliex')
        cy.get('tbody > :nth-child(4) > :nth-child(1)').should('have.text', 'Bitcoin Trade')
        cy.get('tbody > :nth-child(5) > :nth-child(1)').should('have.text', 'Walltime')
        cy.get(':nth-child(6) > :nth-child(1)').should('have.text', 'Bitcoin to you')
        cy.get(':nth-child(7) > :nth-child(1)').should('have.text', 'Mercado Bitcoin')
        cy.get(':nth-child(8) > :nth-child(1)').should('have.text', 'NovaDax')
        cy.get('tbody > :nth-child(9) > :nth-child(1)').should('have.text', 'Pagcripto')
    })
})