const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN: '.btn',
    },
    MESSAGE: '.toast-message',
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        BTN: '.btn'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        XP_BTN_ALTERAR: "//table//td[contains(., 'Conta para alterar')]/..//i[@class='far fa-edit']",
        BTN: '.btn'
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        BTN: '.btn-primary',
        STATUS: '[data-test=status]',
        CONTAS: '[data-test=conta]'
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        XP_BUSCA_ELEMENTO: "//span[contains(., 'Desc')]/following-sibling::small[contains(., '123')]"
    },
    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]`
    }
}

export default locators