/// Desafio -> testar a aplicação
/// <reference types="cypress" />
const faker = require("faker")
faker.locale = "pt_BR";
var name;
var email;
const senha = 'abc1234'
const usarFaker = false //Alterar conforme necessidade

import '../../support/commandsContas'

if (usarFaker) {
    name = faker.name.findName(); //gera um nome aleatório
    email = faker.internet.email(); //gera um email aleatório
}
else {
    name = 'Vitor Hugo'
    email = 'vitor@notasdovitor.top'
}


describe('BarrigaReact', () => { 
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.resetApp()
    })
    it('Criar um cadastro', () => {
        if (usarFaker){
            cy.get(':nth-child(2) > .nav-link').click()
            cy.get('.jumbotron > :nth-child(1) > .form-control').type(name)
            cy.get('.input-group > .form-control').type(email)
            cy.get(':nth-child(3) > .form-control').type(senha)
            cy.get('.btn').click()
            cy.get('.toast').should('be.visible')
            cy.get('.toast').should('not.exist')
        }
        else{
            console.log('Faker está desativado!')
            cy.log('Faker está desativado!')
        }
    })
    it('Inserir conta', () => {
        cy.get('[data-test=email]').type(email)
        cy.get('[data-test=passwd]').type(senha)
        cy.get('.btn').click()
        cy.get('.toast').should('be.visible')
        cy.get('.toast-message').should('contain', `Bem vindo, ${name}`)
        cy.get('.toast').should('not.exist')

        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test=nome]').type('Banco Conta Movimento')
        cy.get('.btn').click()
        cy.get('.toast').should('be.visible')
        cy.get('.toast').should('contain', 'sucesso')
        cy.get('.toast').should('not.exist')
    })
    it('Alterar conta', () => {
        cy.get('.fa-edit').click()
        cy.get('[data-test=nome]').clear()
        cy.get('[data-test=nome]').type('Banco Conta Movimento 2')
        cy.get('.btn').click()
        cy.get('.toast').should('be.visible')
        cy.get('.toast').should('contain', 'sucesso')
        cy.get('.toast').should('not.exist')
    })
    it('Inserir conta repetida', () => {
        cy.get('[data-test=nome]').clear()
        cy.get('[data-test=nome]').type('Conta mesmo nome')
        cy.get('.btn').click()
        cy.get('.toast').should('be.visible')
        cy.get('.toast').should('contain', '400')
        cy.get('.toast').should('not.exist')
    })
    it('Inserir movimentação', () => {
        cy.get('[data-test=menu-movimentacao]').click()
        cy.get('[data-test=descricao]').type('Renda de Agiotagem')
        cy.get('[data-test=envolvido]').type('Igor 3K Agiota')
        cy.get('[data-test=valor]').type('2500')
        cy.get('[data-test=status]').click()
        cy.get('.btn-primary').click()
        cy.get('.toast').should('be.visible')
        cy.get('.toast').should('contain', 'sucesso')
        cy.get('.toast').should('not.exist')
    })
    it('Calculo de saldo', () => {
        cy.get('[data-test=menu-home]').click()
        if(usarFaker){
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain', '2.500')
        }
        else{
            cy.log('Pulando este teste')
        }
        cy.wait(1000)
    })
    it('Remover movimentação', () => {
        cy.get('[data-test=menu-extrato]').click()
        cy.get('.col > .far').click()
        cy.get('.toast').should('be.visible')
        cy.get('.toast').should('contain', 'sucesso')
        cy.get('.toast').should('not.exist')
    })
    it('Verifica saldo novamente', () => {
        cy.get('[data-test=menu-home]').click()
        if(usarFaker){
            cy.get('tbody > tr > :nth-child(2)').should('contain', '0,00')
        }
        else{
            cy.log('Pulando este teste')
        }
        cy.wait(1000)
    })
})