/// <reference types="Cypress" />
const faker = require("faker")
const cpf = require('cpf');
faker.locale = "pt_BR";
const primeironome = faker.name.firstName();
const sobrenome = faker.name.lastName();

describe('Desafio', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload
    })

    it('Cadastrar', () => {

        ///cy.on('window:alert', msg => {
        ///    console.log(msg)
        ///})

        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)

        cy.get('#formCadastrar')
            .click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
        cy.wait(500)

        cy.get('#formNome').type(primeironome, { delay: 100 })
        cy.get('#formCadastrar')
            .click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
        cy.wait(500)

        cy.get('[data-cy=dataSobrenome]').type(sobrenome, { delay: 100 })
        cy.get('#formCadastrar')
            .click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
        cy.wait(500)
        
        cy.get('#formSexoMasc')
            .click()
            .should('be.checked')
        cy.wait(300)
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')
        cy.wait(300)
        cy.get('[data-test=dataEscolaridade]')
            .select('superior')
            .should('have.value', 'superior')
        cy.wait(300)
        cy.get('[data-testid=dataEsportes]').select('nada')
        cy.wait(300)
        cy.get('#elementosForm\\:sugestoes').type('NENHUMA')
        cy.get('#formCadastrar').click()
        cy.wait(500)

        cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')

    })
})