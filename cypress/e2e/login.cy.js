// cypress/e2e/login.spec.js

describe('Testes de Login', () => {
    beforeEach(() => {
        cy.visit('/minha-conta/')
    });

    it('Deve Fazer login com sucesso!', () => {

    });

    it('Deve exibir uma mensagem de erro ao tentar login com campos vazios', () => {
        cy.login('', '')
        cy.get('.woocommerce-error').should('contain', 'Erro: Nome de usuário é obrigatório.')
    });

    it('Deve permitir redefinir senha através da opção "Esqueci minha senha".', () => {
        cy.fixture('perfil').then((perfil) => {
            cy.get('.lost_password > a').click()
            cy.get('#user_login').type(perfil.usuario1.usuario)
            cy.get('.woocommerce-Button').click()
            cy.get('.woocommerce-message').should('contain', 'O e-mail de redefinição de senha foi enviado.')
        });
    });

    it('Deve exibir uma mensagem de erro ao tentar login com senha inválida', () => {
        cy.fixture('perfil').then((perfil) => {
            cy.login(perfil.usuario1.usuario, 'senha_incorreta')
            cy.get('.woocommerce-error').should('contain', `Erro: A senha fornecida para o e-mail ${perfil.usuario1.usuario} está incorreta. Perdeu a senha?`)
        });
    });

});