/*

Crie uma classe que possua dois métodos: um para realizar pagamento e outro para consultar o último pagamento. 

Os pagamentos serão armazenados como objetos Javascript dentro de uma lista de pagamentos. 
Cada pagamento terá as propriedades: 

- Código de Barras
- Empresa
- Valor

Quando um pagamento for realizado e o valor for maior que 100.00, o pagamento também terá a propriedade categoria como 'cara', caso contrário, 
a propriedade categoria ficará como 'padrão'. 
- categoria: cara
- categoria: padrao


O método de consultar trará apenas o último pagamento.

*/

class Pagamento {
    #listaDePagamentos // Propriedade Privada

    constructor() { // Primeiro método a ser executado quando usar a Classe
        this.#listaDePagamentos = []; // Inicializa a lista de pagamentos
    }

    realizarPagamento(codigoDeBarras, empresa, valor) { // Métodos públicos para manipular os dados da Classe
        let categoria; // Estou usando let pois o valor de "categoria" pode mudar dependendo do valor do pagamento
        if (valor > 100.00) {
            categoria = "cara";
        } else {
            categoria = "padrão";
        }

        const pagamento = {  // Objeto Javascript que armazenará os dados do pagamento
            codigoDeBarras,
            empresa,
            valor,
            categoria,
        };
        this.#listaDePagamentos.push(pagamento); // Adiciona o pagamento à lista de pagamentos
    }

    consultarUltimoPagamento() { // Método para consultar o último pagamento
        return this.#listaDePagamentos.at(-1); // Retorna o último pagamento
    }
}

// Utilizando a Classe:

const pagamento = new Pagamento(); // Instancia a classe, ou seja, cria um objeto
pagamento.realizarPagamento("1234567890", "Empresa 1", 100.00); // Realiza o primeiro pagamento
pagamento.realizarPagamento("1234567890", "Empresa 1", 200.00); // Realiza o segundo pagamento
pagamento.realizarPagamento("1234567890", "Empresa 1", 50.00); // Realiza o terceiro pagamento

console.log(pagamento.consultarUltimoPagamento()); // Exibe o último pagamento realizado