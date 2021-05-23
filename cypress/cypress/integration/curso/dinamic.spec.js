/// <reference types="cypress" />

describe('Dinamic tests', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach(() => {
        cy.reload()
    })

    const foods = ['Carne','Frango','Pizza','Vegetariano']
    foods.forEach((food) => {
        it(`Cadastro com comida ${food}`, function () {
            cy.fixture('userData.json').as('usuario').then(() => {
                //console.log(this.usuario)
                cy.get('#formNome').type(this.usuario.nome)
                cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome)
                cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
                //cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
                cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
                cy.get('#formEscolaridade').select(this.usuario.escolaridade)
                cy.get('#formEsportes').select(this.usuario.esportes)
                cy.get('#formCadastrar').click()
                cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
            })
        })
        it.only('Deve selecionar todos usando o each', () => {
            cy.get('#formNome').type('nome')
            cy.get('[data-cy=dataSobrenome]').type('Sobrenome')
            cy.get(`[name=formSexo][value=F]`).click(),
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
        })
    })
})