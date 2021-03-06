// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        console.log(msg)
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('login', (user, passwd) => {
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(passwd)
    cy.get(loc.LOGIN.BTN).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()

})

Cypress.Commands.add('getToken', (user, passwd) => {
    cy.request({
        method: 'post',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
            "email": user,
            "senha": passwd,
            "redirecionar": false
        }
    }).its('body.token').should('not.be.empty')
        .then(token => {
            return token
        })
})

Cypress.Commands.add('resetRest', (token) => {
    cy.request({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/reset',
        headers: { Authorization: `JWT ${token}` }
    }).then(res => {
        expect(res.status).to.be.equal(200)
    })

})

Cypress.Commands.add('getAccountByName', (conta, token) => {
    cy.request({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/contas',
        headers: { Authorization: `JWT ${token}` },
        qs: {
            nome: conta
        }
    }).then(res => {
        return res.body[0].id
    })
})