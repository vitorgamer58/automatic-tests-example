/// <reference types="Cypress" />
// //td[contains(., 'Braziliex')]
/* O uso de xpath permite que o código fique menor e mais dinâmico,
pois, o xpath não amarra a assertiva a um elemento específico do HTML,
desta forma, o código vai precisar de menos manutenção, e quando precisar,
esta pode ser feita de forma mais rápida. */

describe('Bitcao', () => {
    const exchanges = ['Braziliex', 'Bitcoin Trade', 'Walltime', 'Bitcoin to you', 'Mercado Bitcoin', 'NovaDax', 'Pagcripto']
    before(() => {
        cy.visit('https://bitcao.notasdovitor.top/cotacao/')
    })
    it('Teste Bitcao', () => {
        /*
        cy.get('h3').should('contain', 'R$')
        cy.get(':nth-child(3) > :nth-child(1)').should('have.text', 'Braziliex')
        cy.get('tbody > :nth-child(4) > :nth-child(1)').should('have.text', 'Bitcoin Trade')
        cy.get('tbody > :nth-child(5) > :nth-child(1)').should('have.text', 'Walltime')
        cy.get(':nth-child(6) > :nth-child(1)').should('have.text', 'Bitcoin to you')
        cy.get(':nth-child(7) > :nth-child(1)').should('have.text', 'Mercado Bitcoin')
        cy.get(':nth-child(8) > :nth-child(1)').should('have.text', 'NovaDax')
        cy.get('tbody > :nth-child(9) > :nth-child(1)').should('have.text', 'Pagcripto')
        */

        exchanges.forEach((exchange) => {
            cy.xpath(`//td[contains(., '${exchange}')]`).should('contain', `${exchange}`)
        })
    })
})
