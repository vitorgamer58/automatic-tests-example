/*
Este código foi escrito pelo instrutor do curso de Cypress
Apenas copíei seguindo as orientações.
*/
/// <reference types="cypress" />
import loc from '../../../support/locators'
import '../../../support/commandsContas'
import buildEnv from '../../../support/buildEnv'

describe('Should test at a functional level', () => {
    after(() => {
        cy.clearLocalStorage()
    })
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        buildEnv()
        cy.login('vitor@notasdovitor.top', 'abc1234')
        /* cy.intercept({
            method: 'GET',
            url: '/reset'
        },
        {}) */
        //cy.resetApp()
        cy.intercept({
            method: 'GET',
            url: '/saldo'
        },
        [{
            conta_id: 1000,
            conta: 'Banco Inter',
            saldo: "1020000.00"
        },
        {
            conta_id: 1001,
            conta: 'Banco Inter2',
            saldo: "1020000.00"
        }])
    })
    beforeEach(() => {
        buildEnv()
        //cy.get(loc.MENU.HOME).click()
        
        //cy.resetApp()
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
        cy.intercept({
            method: 'POST',
            url: '/contas',
        },
        {"id":3,"nome":"Conta de Teste","visivel":true,"usuario_id":21309}
        )
        cy.acessarMenuConta()

        cy.intercept({
            method: 'GET',
            url: '/contas'
        },
        [{"id":1,"nome":"Conta 1","visivel":true,"usuario_id":21309},
        {"id":610861,"nome":"Conta mesmo nome","visivel":true,"usuario_id":21309},
        {"id":3,"nome":"Conta de Teste","visivel":true,"usuario_id":21309}])


        cy.inserirConta('Conta de Teste')
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
    it('Should update an account', () => {
        /* cy.intercept({
            method: 'GET',
            url: '/contas'
        },
        [{"id":1,"nome":"Conta 1","visivel":true,"usuario_id":21309},
        {"id":610861,"nome":"Conta mesmo nome","visivel":true,"usuario_id":21309}]
        ) */
        cy.intercept({
            method: 'PUT',
            url: '/contas/**',
        },
        {"id":1,"nome":"Conta alterada","visivel":true,"usuario_id":21309}
        )

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta 1')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
    it('Should not create an account with same name', () => {
        cy.intercept('POST', '/contas', (req) => {
            req.reply({
                statusCode: 400,
                body: {"error":"Já existe uma conta com esse nome!"}
            })
        })
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN).click()
        cy.get(loc.MESSAGE).should('contain', '400')
    })
    it('Should create a transaction', () => {
        cy.intercept({
            method: 'POST',
            url: '/transacoes',
        },
        {"id":567175,"descricao":"Desc","envolvido":"Igor Agiota","observacao":null,"tipo":"REC","data_transacao":"2021-05-28T03:00:00.000Z","data_pagamento":"2021-05-28T03:00:00.000Z","valor":"123.00","status":true,"conta_id":610866,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null}
        )

        cy.intercept({
            method: 'GET',
            url: '/extrato/**',
        },
        [{"conta":"Bco conta movimento","id":566463,"descricao":"Pagamento do Revolvi","envolvido":"Igor Agiota","observacao":null,"tipo":"REC","data_transacao":"2021-05-28T03:00:00.000Z","data_pagamento":"2021-05-28T03:00:00.000Z","valor":"500.00","status":true,"conta_id":610866,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para movimentacoes","id":565518,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2021-05-27T03:00:00.000Z","data_pagamento":"2021-05-27T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":610862,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta com movimentacao","id":565519,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-05-27T03:00:00.000Z","data_pagamento":"2021-05-27T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":610863,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":565520,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-05-27T03:00:00.000Z","data_pagamento":"2021-05-27T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":610864,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":565521,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-05-27T03:00:00.000Z","data_pagamento":"2021-05-27T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":610864,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":565522,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2021-05-27T03:00:00.000Z","data_pagamento":"2021-05-27T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":610864,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Bco conta movimento","id":567175,"descricao":"Desc","envolvido":"Igor Agiota","observacao":null,"tipo":"REC","data_transacao":"2021-05-28T03:00:00.000Z","data_pagamento":"2021-05-28T03:00:00.000Z","valor":"123.00","status":true,"conta_id":610866,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null}]
        )

        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('IGOR')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.CONTAS).select('Conta 1')
        cy.get(loc.MOVIMENTACAO.BTN).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')



        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })
    it('Should get balance', () => {
        cy.intercept({
            method: 'GET',
            url: '/saldo'
        },
        [{
            conta_id: 1000,
            conta: 'Banco Inter',
            saldo: "1020000.00"
        },
        {
            conta_id: 1001,
            conta: 'Banco Inter2',
            saldo: "1020000.00"
        },
        {
            conta_id: 1002,
            conta: 'Conta para movimentacoes',
            saldo: '1337.00'
        }])
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para movimentacoes')).should('contain', '1.337')
    })
    it('Should remove a transaction', () => {
        cy.intercept('DELETE', '/transacoes/**', (res) => {
            res.reply({statusCode: 201})
        })
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
    it('Should validate data send to create an account', () => {
        cy.intercept('POST', '/contas', (req) => {
            req.reply({"id":3,"nome":"Conta de Teste","visivel":true,"usuario_id":21309})
            console.log(req)
            expect(req.body.nome).to.be.not.empty
            expect(req.headers).to.have.property('authorization')
        })
        cy.acessarMenuConta()

        cy.intercept({
            method: 'GET',
            url: '/contas'
        },
        [{"id":1,"nome":"Conta 1","visivel":true,"usuario_id":21309},
        {"id":610861,"nome":"Conta mesmo nome","visivel":true,"usuario_id":21309},
        {"id":3,"nome":"Conta de Teste","visivel":true,"usuario_id":21309}])


        cy.inserirConta('Conta de Teste')
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
    it('Should test colors', () => {
        cy.intercept({
            method: 'GET',
            url: '/extrato/**',
        },
        [{"conta":"Bco conta movimento","id":566463,"descricao":"Receita paga","envolvido":"Igor Agiota","observacao":null,"tipo":"REC","data_transacao":"2021-05-28T03:00:00.000Z","data_pagamento":"2021-05-28T03:00:00.000Z","valor":"500.00","status":true,"conta_id":610866,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para movimentacoes","id":565518,"descricao":"Receita pendente","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2021-05-27T03:00:00.000Z","data_pagamento":"2021-05-27T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":610862,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta com movimentacao","id":565519,"descricao":"Despesa paga","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-05-27T03:00:00.000Z","data_pagamento":"2021-05-27T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":610863,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":565520,"descricao":"Despesa pendente","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2021-05-27T03:00:00.000Z","data_pagamento":"2021-05-27T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":610864,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null}]
        )
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')

    })
    it.only('Should test responsiveness', () => {
        cy.get('[data-test=menu-home]')
            .should('exist')
            .and('be.visible')
        
        cy.viewport(500, 700)
        cy.get('[data-test=menu-home]')
            .should('exist')
            .and('not.be.visible')
        
        cy.viewport('iphone-5')
        cy.get('[data-test=menu-home]')
            .should('exist')
            .and('not.be.visible')
        
        cy.viewport('ipad-2')
        cy.get('[data-test=menu-home]')
            .should('exist')
            .and('be.visible')
        
        

    })

})