/* Exemplo usando assertivas do chai em vez das
assertivas do Jest.
Motivo: estou acostumado com Chai no Cypress */
const sum = require('./sum');
var expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

/* test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
}); */

describe('Teste', () => {
    it('1 + 2 should be 3', () => {
        expect(sum(1,2)).to.be.equal(3)
    })
    it('Quando os números passados forem igual ou maior que 10, o resultado deve ser multiplicado por 2', () => {
        expect(sum(10, 10)).to.be.equal(40)
    })
})