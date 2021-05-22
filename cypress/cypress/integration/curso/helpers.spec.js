/// <reference types="Cypress" />

describe('Helpers...', () => {
    it('Wrap', () => {
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        //cy.get('#formNome').type('Funciona?')

        cy.get('#formNome').then($el => {
            //$el.type('Funciona?') - Type é um elemento do cypress
            //$el.val('Funciona via Jquery') // O log se perde
            cy.wrap($el).type('Funciona via Cypress')
        })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        //promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)
    })

    it('Its...', () => {
        const obj = {nome: 'User', idade: 20, endereco: { rua: 'dos bobos' }}
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        
        cy.wrap(obj).its('endereco').should('have.property', 'rua')
        cy.wrap(obj).its('endereco.rua').should('contain', 'bobo')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    })

    it('Invoke...', () => {
        const getValue = () => 1;
        const soma = (a, b) => a + b;
        cy.wrap({ fn: getValue}).invoke('fn').should('be.equal', 1)
        cy.wrap({ fn: soma}).invoke('fn', 2, 5).should('be.equal', 7)

        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#formNome').invoke('val', 'Texto via invoke')
        cy.window().invoke('alert', 'Dá pra ver?')

        cy.get('#resultado')
            .invoke('html', '<input type="button" value="Hackeado" />')
    })



})