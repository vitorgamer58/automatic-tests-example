/*
Este código foi escrito pelo instrutor do curso de Cypress
Apenas copíei seguindo as orientações.
*/
/// <reference types="cypress" />
import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a functional level', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('vitor@notasdovitor.top', 'abc1234')
        cy.resetApp()
    })
    /*
    it('Login', () => {
        cy.get('[data-test=email]').type('vitor@notasdovitor.top')
        cy.get('[data-test=passwd]').type('abc1234')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })
    */
    it('Should create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de Teste')
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
    it('Should update an account', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta de Teste')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN).click()
        cy.get(loc.MESSAGE).should('contain', '400')
    })
    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('IGOR')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.CONTAS).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.BTN).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })
    it('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para movimentacoes')).should('contain', '1.377')
    })

})