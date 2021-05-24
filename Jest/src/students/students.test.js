const student = require('./student')
describe('Testes para alunos', () => {
    it('Deve retornar 10 quando as notas forem 5, 3 e 2', () => {
        const notes = [5, 3, 2]
        expect(student.sum(notes)).toEqual(10)
    })
    it('Deve retornar zero quando uma das notas for zero', () => {
        const notes = [1, 2, 3, 0]
        expect(student.sum(notes)).toEqual(0)
    })
    it('Deve dobrar a nota quando o aluno tiver mais de 5 notas', () => {
        const notes = [10, 10, 10, 10, 10, 10]
        expect(student.sum(notes)).toEqual(120)
    });
})