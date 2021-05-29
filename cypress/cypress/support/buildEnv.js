const buildEnv = () => {
    cy.intercept({
        method: 'POST',
        url: '/signin',
    },
    {id: 1000,nome: "Usuario Falso",token: "String muito grande"}
    )
    cy.intercept({
        method: 'GET',
        url: '/contas'
    },
    [{"id":1,"nome":"Conta 1","visivel":true,"usuario_id":21309},
    {"id":610861,"nome":"Conta mesmo nome","visivel":true,"usuario_id":21309}]
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
    {"conta":"Bco conta movimento","id":567175,"descricao":"Pagamento do Revolvi","envolvido":"Igor Agiota","observacao":null,"tipo":"REC","data_transacao":"2021-05-28T03:00:00.000Z","data_pagamento":"2021-05-28T03:00:00.000Z","valor":"500.00","status":true,"conta_id":610866,"usuario_id":21309,"transferencia_id":null,"parcelamento_id":null}]
    )
}

export default buildEnv