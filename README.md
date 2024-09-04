# PROJETO AUTOMAÇÃO EBAC

## 1. Escolha da Ferramenta de Teste

### Ferramenta Escolhida: Cypress

**Motivo da Escolha:**

#### Vantagens:
- Integração direta com JavaScript e Node.js, amplamente usados no desenvolvimento web.
- Interface intuitiva que permite visualizar os testes em tempo real, facilitando a identificação de erros.
- Monitoramento e interceptação de requisições HTTP, útil para verificar o carregamento de páginas e respostas da API.
- Suporte robusto a testes end-to-end, com comandos simplificados para interação com elementos da interface do usuário.
- Suporte a testes assíncronos e esperas automáticas, facilitando a sincronização com o tempo de carregamento dos elementos da página.

### Ferramentas Não Escolhidas:

#### Selenium:
- **Desvantagens:** Configuração mais complexa, requer instalação de drivers específicos para cada navegador. Testes podem ser mais lentos em cenários complexos.

#### Robot Framework:
- **Desvantagens:** Curva de aprendizado mais acentuada, especialmente para quem não está familiarizado com a sintaxe baseada em palavras-chave. Indicado para grandes suítes de testes envolvendo múltiplos tipos de sistemas.

#### Ghost Inspector:
- **Desvantagens:** Ferramenta baseada em nuvem que pode limitar a flexibilidade de customização e integração com pipelines de CI/CD.

## 2. Tecnologias Usadas

- **Linguagem:** JavaScript
- **Framework de Teste:** Cypress
- **Plugins:** Mochawesome para geração de relatórios
- **Biblioteca para Dados Fictícios:** Faker

## 3. Como Instalar e Usar o Projeto

- Clone o repositório: `git clone https://github.com/itnanunes/TCC-EBAC-ITNA`
- Instale as dependências: `npm install`
- Execute os testes: `npx cypress open` para interface gráfica ou `npx cypress run` para execução em linha de comando.
- Gere o relatório: `npx cypress run --reporter mochawesome`.

## 6. .gitignore

Adicionar as seguintes entradas ao `.gitignore` para evitar versionamento de arquivos desnecessários:
- `node_modules/`
- `cypress/videos/`
- `cypress/screenshots/`
- `report/`
