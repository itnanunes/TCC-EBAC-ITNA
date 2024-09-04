//login na plataforma
// cypress/support/commands.js

Cypress.Commands.add('login', (usuario, senha) => {
    if (usuario) {
        cy.get('#username').type(usuario)
    }
    if (senha) {
        cy.get('#password').type(senha, { log: false })
    }
    cy.get('.woocommerce-form > .button').click()
});


Cypress.Commands.add('selecionarProdutoAleatorio', () => {
    // Seleciona todos os produtos na página
    cy.get('.product-block.grid')
        .then((produtos) => {
            // Gera um índice aleatório
            const randomIndex = Math.floor(Math.random() * produtos.length);
            // Seleciona o produto aleatório
            cy.wrap(produtos[randomIndex]).find('.product-image').click();
        });
});

// Cypress.Commands.add('adicionarProdutoAoCarrinho', (produto, quantidade) => {
//     cy.visit('/produtos');
//     cy.contains(produto).click();
//     cy.get('input[name="quantidade"]').clear().type(quantidade);
//     cy.get('button[name="adicionar-carrinho"]').click();


// })

    Cypress.Commands.add('clicarItemAleatorio', () => {
        // Encontra todos os elementos `.block-inner` e seleciona um índice aleatório
        cy.get('.block-inner').then($items => {
            const count = $items.length;
            if (count > 0) {
                const randomIndex = Math.floor(Math.random() * count);
                cy.wrap($items.eq(randomIndex)).click();
            } else {
                throw new Error('Nenhum item encontrado para clicar.');
            }
        });
    });

    Cypress.Commands.add('selecionarVariacoesAleatorias', () => {
        // Seleciona tamanho aleatório
        cy.get('.variations > tbody > :nth-child(1) .variable-items-wrapper .variable-item')
            .then($tamanho => {
                const count = $tamanho.length;
                if (count > 0) {
                    const randomIndex = Math.floor(Math.random() * count);
                    cy.wrap($tamanho.eq(randomIndex)).click();
                } else {
                    throw new Error('Nenhum tamanho encontrado para selecionar.');
                }
            });

        // Seleciona cor aleatória
        cy.get('.variations > tbody > :nth-child(2) .variable-items-wrapper .variable-item')
            .then($cores => {
                const count = $cores.length;
                if (count > 0) {
                    const randomIndex = Math.floor(Math.random() * count);
                    cy.wrap($cores.eq(randomIndex)).click();
                } else {
                    throw new Error('Nenhuma cor encontrada para selecionar.');
                }
            });
        // quantidade do produto
        cy.get('.input-text').then($input => {
            const quantidade = Math.floor(Math.random() * 5) + 1; // adicionar a quantidade
            cy.wrap($input).clear().type(quantidade);

        });
    });
    Cypress.Commands.add('adicionarProdutosAoCarrinho', (numeroDeProdutos) => {
        // Define o número padrão de produtos se não for fornecido
        const quantidade = numeroDeProdutos || 2;
    
        cy.visit('/produtos/');
    
        for (let i = 0; i < quantidade; i++) {
            // Seleciona um produto aleatório
            cy.clicarItemAleatorio();
    
            // Seleciona variações aleatórias (cor e tamanho)
            cy.selecionarVariacoesAleatorias();
    
            // Adiciona o produto ao carrinho
            cy.get('.single_add_to_cart_button').click();
    
            // Retorna à página de produtos para selecionar o próximo item, exceto no último loop
            if (i < quantidade - 1) {
                cy.visit('/produtos/');
            }
        }
    });



