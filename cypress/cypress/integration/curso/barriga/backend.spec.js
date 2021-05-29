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
        cy.wait(2500)
    })
    it('Should update an account', () => {
        cy.getAccountByName('Conta para alterar', token).then(contaId => {
            cy.request({
                url: `https://barrigarest.wcaquino.me/contas/${contaId}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: { nome: 'Conta alterada via API2 ' }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
        cy.wait(2500)
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
        })
            .then(res => console.log(res)).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
        cy.wait(2500)
    })
    it('Should create a transaction', () => {
        cy.getAccountByName('Conta para movimentacoes', token)
            .then(contaId => {
                cy.request({
                    method: 'POST',
                    url: 'https://barrigarest.wcaquino.me/transacoes',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        tipo: "REC",
                        data_transacao: '27/06/2020',
                        data_pagamento: '27/06/2021',
                        descricao: "Pagamento do Agiota",
                        valor: "200",
                        envolvido: "Igor Agiota",
                        conta_id: contaId,
                        status: true
                    }
                }).then(res => expect(res.status).to.be.equal(201))
            })
        cy.wait(2500)

    })
    it('Should get balance', () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/saldo',
            headers: { Authorization: `JWT ${token}` },
        }).then(res => {
            let saldoConta
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/transacoes/',
            headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res => {
            console.log(res)
            cy.request({
                method: 'PUT',
                url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_transacao: '26/05/2021',
                    data_pagamento: '26/05/2021',
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/saldo',
            headers: { Authorization: `JWT ${token}` },
        }).then(res => {
            let saldoConta
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
        cy.wait(2500)
    })
    it('Should remove a transaction', () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/transacoes/',
            headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                method: 'DELETE',
                url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}` },
            }).its('status').should('be.equal', 204)
        })
        cy.wait(2500)
    })

})