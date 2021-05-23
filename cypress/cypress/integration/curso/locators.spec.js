/// <reference types="Cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('teste', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]').click()
        //cy.xpath('//table[@id=\'tabelaUsuarios\']//td[contains(., \'Francisco\')]/following-sibling::td/input')
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='text']").type('123')
    })
})