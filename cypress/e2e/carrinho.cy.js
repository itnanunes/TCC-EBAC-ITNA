describe('Testes de Carrinho', () => {

    beforeEach(() => {
        cy.visit('/produtos/')
        // ajustar a quantidade no commands.
        cy.adicionarProdutosAoCarrinho();
        cy.get('.single_add_to_cart_button').click()

    });

    it('Deve adicionar produto ao carrinho com sucesso', () => {
        cy.get('.woocommerce-message').should('be.visible')
    });  

    it('Deve permitir a atualização da quantidade de um item já adicionado ao carrinho', () => {
        cy.get('.dropdown-toggle > .mini-cart-items').click();
        cy.get('#cart .view-cart').click();

        // Seleciona todos os campos de quantidade no carrinho
        cy.get('.quantity > .input-text').then($inputs => {
            const itemCount = $inputs.length;

            if (itemCount > 0) {
                // Gera um índice aleatório para selecionar um dos itens do carrinho
                const randomIndex = Math.floor(Math.random() * itemCount);

                // Gera uma quantidade aleatória entre 1 e 10
                const quantidadeMaxima = Math.min(10, itemCount);
                const quantidade = Math.floor(Math.random() * quantidadeMaxima) + 1;

                // Limpa o campo de quantidade e insere a nova quantidade
                cy.wrap($inputs.eq(randomIndex)).clear().type(quantidade);

                // Clica no botão para atualizar o carrinho
                cy.get('.pull-right > .btn').click();
            }
        });
    });

    it('Remover um item do carrinho', () => {
        cy.get('.dropdown-toggle > .mini-cart-items').click()
        cy.get('#cart .view-cart').click();
        cy.get('.product-remove .remove').then($remover => {
            const itemCount = $remover.length;
            if (itemCount === 1) {
                // Se houver apenas um item
                cy.wrap($remover.eq(0)).click();
            } else if (itemCount > 1) {
                // Se houver mais de um item, remove um item aleatório
                const randomIndex = Math.floor(Math.random() * itemCount);
                cy.wrap($remover.eq(randomIndex)).click();
            }
            //else {
            //     // Caso o carrinho esteja vazio (nenhum item)
            //     cy.log('Carrinho está vazio, nenhum item para remover.');
            // }
        });
        cy.get('.woocommerce-message').should('contain', 'removido')
    });

    it('Deve exibir uma mensagem de erro ao tentar adicionar um cupom inválido', () => {
        cy.get('.dropdown-toggle > .mini-cart-items').click();
        cy.get('#cart .view-cart').click();
        cy.get('#coupon_code').type('CUPOMINVALIDO')
        cy.get('.coupon > .btn').click()
        cy.get('.woocommerce-error > li').should('contain', 'não existe!')
    });
});