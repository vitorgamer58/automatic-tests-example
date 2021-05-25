/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    let token
    before(() => {
        cy.getToken('vitor@notasdovitor.top', 'abc1234')
            .then(tkn => {
                token = tkn
            })
    })
    beforeEach(() => {
        cy.resetRest(token)
    })
    it('Should create an account', () => {
        cy.request({
            method: 'post',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: "Movimento"
            }
        }).then(res => console.log(res)).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            //cy.wrap(res.status).should('be.equal', 201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Movimento')
        })
    })
    it('Should update an account', () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            console.log(res)
            cy.request({
                url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: { nome: 'Conta alterada via API2 ' }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)

    })
    it('Should not create an account with same name', () => {
        cy.request({
            method: 'post',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: "Conta mesmo nome"
            },
            failOnStatusCode: false
        }).then(res => console.log(res)).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })
    it.only('Should create a transaction', () => {
        cy.getAccountByName('Conta para movimentacoes', token)
            .then(contaId => {
                cy.request({
                    method: 'POST',
                    url: 'https://barrigarest.wcaquino.me/transacoes',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        tipo: "REC",
                        data_transacao: "25/05/2021",
                        data_pagamento: "25/05/2021",
                        descricao: "Pagamento do Agiota",
                        valor: "200",
                        envolvido: "Igor Agiota",
                        conta_id: contaId,
                        status: true
                    }
                }).then(res => expect(res.status).to.be.equal(201))
            })
    })
    it('Should get balance', () => {

    })
    it('Should remove a transaction', () => {

    })

})