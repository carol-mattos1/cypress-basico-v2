/// <reference types="Cypress" />"

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.get('#firstName').type('Carol')
        cy.get('#lastName').type('Bennin')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function (){

        cy.get('#firstName').type('Carol')
        cy.get('#lastName').type('Bennin')
        cy.get('#email').type('teste@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    }) 

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

        cy.get('#firstName').type('Carol')
        cy.get('#lastName').type('Bennin')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Carol')
            .should('have.value', 'Carol')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Bennin')
            .should('have.value', 'Bennin')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('teste@gmail.com')
            .should('have.value', 'teste@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')
    })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
            cy.contains('button', 'Enviar').click()

            cy.get('.error').should('be.visible')
        })

        it('envia o formulário com sucesso usando um comando customizado', () => {
            cy.fillMandatoryFieldsAndSubmit()

            cy.get('.success').should('be.visible')
        })
        it('seleciona um produto (YouTube) por seu texto', () => {
            cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
        })

        it('seleciona um produto (Mentoria) por seu valor (value)', () => {
            cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
        })
        it('seleciona um produto (Blog) por seu índice', () => {
            cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
        })

        it('marca o tipo de atendimento "Feedback"', () => {
            cy.get('input[type="radio"] [value="feedback"]') 
            .check()
            .should('be.checked')
        })
        it('marca o tipo de atendimento', () => {
            cy.get('input[type="radio"]')
            .each(typeOfService => {
                cy.wrap(typeOfService)
                .check()
                .should('be.checked')
            })

        })
        it('marca ambos os checkboxes, depois desmarca o ultimo', () => {
            cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

        })
        it('seleciona um arquivo da pasta fixtures', () => {
            cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
        })
        it('seleciona um arquivo simulando um drag-and-drop', () => {
            cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
        })

        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
            cy.fixture('example.json').as('sampleFile')
            cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
        
            })
        })

        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
            cy.contains('a', 'Política de Privacidade')
            .should('have.attr', 'href', 'privacy.html')
            .and('have.attr', 'target', '_blank')
        })

        
        it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
            cy.contains('a', 'Política de Privacidade')
            .invoke('removeAttr', 'target')
            .click()

            // cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
        })
        
    })
