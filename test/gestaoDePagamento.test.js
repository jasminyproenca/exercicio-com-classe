import gestaoDePagamentoPagamento from '../src/gestaoDePagamento.js';
import assert from 'node:assert';

describe("Teste Gestao de Pagamento", () => {

    it("Teste 1: Deve adicionar um pagamento", () => {
        // Arrange: Configuração do teste
        const gestorDePagamento = new gestaoDePagamentoPagamento();
        const codigoDeBarras = "1234567890";
        const empresa = "Empresa 1";
        const valor = 100.00;

        // Act: Ação que será testada
        gestorDePagamento.realizarPagamento(codigoDeBarras, empresa, valor);
        const pagamento = gestorDePagamento.consultarUltimoPagamento();

        // Assert: Verificação do resultado
        assert.strictEqual(pagamento.codigoDeBarras, codigoDeBarras);
        assert.strictEqual(pagamento.empresa, empresa);
        assert.strictEqual(pagamento.valor, valor);
        assert.strictEqual(pagamento.categoria, "padrão");
    });

    it("Teste 2: Deve adicionar um pagamento com categoria 'cara'", () => {
        // Arrange: Configuração do teste
        const gestorDePagamento = new gestaoDePagamentoPagamento();
        const codigoDeBarras = "1234567890";
        const empresa = "Empresa 1";
        const valor = 200.00;

        // Act: Ação que será testada
        gestorDePagamento.realizarPagamento(codigoDeBarras, empresa, valor);
        const pagamento = gestorDePagamento.consultarUltimoPagamento();

        // Assert: Verificação do resultado
        assert.strictEqual(pagamento.categoria, "cara");
    });

    it("Teste 3: Deve adicionar um pagamento com categoria 'padrão'", () => {
        // Arrange: Configuração do teste
        const gestorDePagamento = new gestaoDePagamentoPagamento();
        const codigoDeBarras = "1234567890";
        const empresa = "Empresa 1";
        const valor = 50.00;

        // Act: Ação que será testada
        gestorDePagamento.realizarPagamento(codigoDeBarras, empresa, valor);
        const pagamento = gestorDePagamento.consultarUltimoPagamento();

        // Assert: Verificação do resultado
        assert.strictEqual(pagamento.categoria, "padrão");
    });

    it("Teste 4: Deve retornar o ultimo pagamento", () => {
        // Arrange: Configuração do teste
        const gestorDePagamento = new gestaoDePagamentoPagamento();
        const codigoDeBarras = "1234567890";
        const empresa = "Empresa 1";
        const valorPrimeiro = 100.00;
        const valorUltimo = 200.00;

        // Act: Ação que será testada
        gestorDePagamento.realizarPagamento(codigoDeBarras, empresa, valorPrimeiro);
        gestorDePagamento.realizarPagamento(codigoDeBarras, empresa, valorUltimo);
        const pagamento = gestorDePagamento.consultarUltimoPagamento();

        // Assert: Verificação do resultado
        assert.strictEqual(pagamento.valor, valorUltimo);
    });

    it("Teste 5: Deve retornar undefined ao consultar último pagamento com a lista vazia", () => {
        // Arrange: Configuração do teste
        const gestorDePagamento = new gestaoDePagamentoPagamento();

        // Act: Ação que será testada
        const pagamento = gestorDePagamento.consultarUltimoPagamento();

        // Assert: Verificação do resultado
        assert.strictEqual(pagamento, undefined);
    });

    it("Teste 6: Deve lançar erro se o código de barras não for informado (Teste Negativo)", () => {
        // Arrange: Configuração do teste
        const gestorDePagamento = new gestaoDePagamentoPagamento();
        const codigoDeBarras = ""; // Vazio
        const empresa = "Empresa 1";
        const valor = 100.00;

        // Act & Assert: Ação e Verificação juntas usando assert.throws
        assert.throws(() => {
            gestorDePagamento.realizarPagamento(codigoDeBarras, empresa, valor);
        }, {
            message: "Código de barras é obrigatório"
        });
    });

    it("Teste 7: Deve lançar erro se a empresa não for informada (Teste Negativo)", () => {
        // Arrange: Configuração do teste
        const gestorDePagamento = new gestaoDePagamentoPagamento();
        const codigoDeBarras = "1234567890";
        const empresa = ""; // Vazio
        const valor = 100.00;

        // Act & Assert: Ação e Verificação juntas usando assert.throws
        assert.throws(() => {
            gestorDePagamento.realizarPagamento(codigoDeBarras, empresa, valor);
        }, {
            message: "Empresa é obrigatória"
        });
    });

    it("Teste 8: Deve lançar erro se o valor não for informado (Teste Negativo)", () => {
        // Arrange: Configuração do teste
        const gestorDePagamento = new gestaoDePagamentoPagamento();
        const codigoDeBarras = "1234567890";
        const empresa = "Empresa 1";
        const valor = undefined; // Sem valor

        // Act & Assert: Ação e Verificação juntas usando assert.throws
        assert.throws(() => {
            gestorDePagamento.realizarPagamento(codigoDeBarras, empresa, valor);
        }, {
            message: "Valor é obrigatório"
        });
    });
});