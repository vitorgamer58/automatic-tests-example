/// <reference types="Cypress" />

const resposta = {"message":"","data":{"last":10999.78}}

describe('Intercept', () => {
    it('Interceptar a requisição', () => {
        cy.intercept(
            {
                method: 'GET',
                url: '/v1/ticker'
            },
            resposta
        )
        cy.visit('https://bitcao.notasdovitor.top/cotacao-js/')
        /*
        Refer to: https://github.com/vitorgamer58/Estatistica-e-Rascunhos/tree/master/Javascript/Bitcoin
        */
        cy.get('#preco')
            .should('have.text', '10999.78')
            .then(() =>{
                console.log('get interceptado com sucesso!')
            })
    })
})