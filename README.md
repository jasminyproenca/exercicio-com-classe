# Exercício: Gestão de Pagamentos com Classes em JavaScript

Este repositório foi desenvolvido como exercício prático para a conclusão da disciplina de **Programação para Automação de Testes** da **Pós-graduação em Automação de Testes**.

O objetivo principal deste projeto é exercitar a criação de classes em JavaScript modernas (ES Modules), encapsulamento de atributos privados, validações de entrada de dados e a elaboração de testes automatizados unitários robustos com relatórios ricos de execução.

---

## 🚀 Funcionalidades

O projeto simula um sistema simplificado de gestão de pagamentos por meio da classe `Pagamento` (em [gestaoDePagamento.js](file:///c:/projetos/exercicio-com-classe/src/gestaoDePagamento.js)).

### Classe `Pagamento`
- **Atributos Privados**:
  - `#listaDePagamentos`: Lista encapsulada que armazena os pagamentos efetuados.
- **Métodos Públicos**:
  - `realizarPagamento(codigoDeBarras, empresa, valor)`: Efetua um pagamento contendo código de barras, empresa e valor.
    - **Regra de Categoria**: Se o valor for maior que `100.00`, a propriedade `categoria` do pagamento é definida como `"cara"`. Caso contrário, é definida como `"padrão"`.
    - **Validações (Tratamento de Erros)**: Lança erros explicativos caso algum dos parâmetros obrigatórios esteja ausente ou seja inválido.
  - `consultarUltimoPagamento()`: Retorna o último pagamento inserido na lista, ou `undefined` se a lista estiver vazia.

---

## 🧪 Estrutura de Testes Automatizados

Os testes estão localizados em [gestaoDePagamento.test.js](file:///c:/projetos/exercicio-com-classe/test/gestaoDePagamento.test.js) e utilizam as seguintes ferramentas:
- **Mocha**: Framework executor de testes.
- **Node.js Assert**: Módulo nativo para asserções estritas (`strictEqual`, `throws`).
- **Mochawesome**: Gerador de relatórios visuais em HTML para visualização dos resultados de teste.

### Casos de Teste Cobertos:
1. **Teste 1**: Deve adicionar um pagamento com sucesso e validar suas propriedades (categoria padrão).
2. **Teste 2**: Deve categorizar o pagamento como `"cara"` se o valor for superior a `100.00`.
3. **Teste 3**: Deve categorizar o pagamento como `"padrão"` se o valor for menor ou igual a `100.00`.
4. **Teste 4**: Deve retornar corretamente apenas o último pagamento inserido.
5. **Teste 5**: Deve retornar `undefined` se nenhuma transação tiver sido realizada.
6. **Teste 6**: Validação negativa — Erro se o código de barras for omitido.
7. **Teste 7**: Validação negativa — Erro se a empresa for omitida.
8. **Teste 8**: Validação negativa — Erro se o valor for omitido.

---

## 🛠️ Instalação e Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior recomendada).

### Passo 1: Instalar as Dependências
Execute no terminal da raiz do projeto para baixar os pacotes necessários:
```bash
npm install
```

### Passo 2: Executar os Testes Automatizados
Para rodar a suíte de testes e gerar o relatório do Mochawesome:
```bash
npm test
```

Após a execução, o relatório interativo estará disponível no diretório `mochawesome-report/mochawesome.html`.
