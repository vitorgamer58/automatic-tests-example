const faker = require("faker")
const cpf = require('cpf');
faker.locale = "pt_BR";
const name = faker.name.findName(); //gera um nome aleatório
const email = faker.internet.email();
const GenCPF = cpf.generate();
const CEP = faker.address.zipCode();
console.log(name);
console.log(email);
console.log(GenCPF);