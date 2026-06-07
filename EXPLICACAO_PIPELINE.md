# Explicação Detalhada do Arquivo de Configuração do CircleCI (`config.yml`)

Este documento descreve detalhadamente cada bloco e linha do arquivo de configuração da pipeline de Integração Contínua (CI) do projeto, localizado em `.circleci/config.yml`.

---

## Estrutura do Arquivo de Configuração

### 1. Versão da Sintaxe
```yaml
version: 2.1
```
* **O que faz:** Especifica a versão da sintaxe da API do CircleCI utilizada no arquivo. A versão `2.1` habilita recursos modernos, como o uso de workflows avançados, cache aprimorado e reutilização de comandos (Orbs).

---

### 2. Definição das Tarefas (`jobs`)
```yaml
jobs:
  build-and-test:
    docker:
      - image: cimg/node:18.16.0
```
* **`jobs:`**: Agrupa todas as tarefas isoladas que a esteira pode executar.
* **`build-and-test:`**: É o nome arbitrário que demos ao nosso job de compilação e teste.
* **`docker:`**: Define o "Executor", que indica onde os comandos serão executados. Neste caso, indicamos um ambiente baseado em container Docker.
* **`- image: cimg/node:18.16.0`**: Escolhe a imagem Docker oficial mantida pelo CircleCI com a versão do Node.js `18.16.0` já pré-configurada e pronta para rodar comandos do Node/npm.

---

### 3. Passos da Execução (`steps`)
Os `steps` definem o passo a passo lógico que ocorre sequencialmente dentro do container Docker:

```yaml
    steps:
      - checkout
```
* **`- checkout`**: Um comando interno nativo do CircleCI. Ele acessa o repositório vinculado no GitHub, copia os arquivos do projeto e os coloca dentro da pasta de trabalho do container.

```yaml
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package-lock.json" }}
            # fallback to using the latest cache if no exact match is found
            - v1-dependencies-
```
* **`- restore_cache`**: Busca um cache de dependências de execuções passadas.
* **`keys:`**: Ele calcula um "hash" exclusivo baseado no conteúdo do arquivo `package-lock.json`. 
  * Se o arquivo `package-lock.json` não mudou, ele restaura a pasta `node_modules` salva anteriormente, poupando tempo de download.
  * O segundo item (`v1-dependencies-`) é uma alternativa (fallback) para carregar o último cache disponível caso o arquivo de dependências tenha tido alguma mudança.

```yaml
      - run:
          name: Instalar Dependências
          command: npm install
```
* **`- run`**: Executa um comando de terminal.
* **`name`**: O título amigável que aparecerá no painel visual do CircleCI.
* **`command: npm install`**: O comando real executado para baixar e instalar as dependências de testes (Mocha, Mochawesome, etc.) descritas no `package.json`.

```yaml
      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package-lock.json" }}
```
* **`- save_cache`**: Salva um novo cache de arquivos.
* **`paths: - node_modules`**: Indica que queremos salvar a pasta `node_modules` gerada após o `npm install`.
* **`key`**: Associa essa pasta à chave hash do arquivo `package-lock.json` atualizado.

```yaml
      - run:
          name: Executar Testes Automatizados
          command: npm test
```
* **`command: npm test`**: Executa o script de testes definido no `package.json` (que no seu caso executa `npx mocha test/gestaoDePagamento.test.js --reporter mochawesome`). Se algum teste falhar, o comando retorna um erro e a pipeline é marcada como falha.

---

### 4. Fluxo de Trabalho (`workflows`)
```yaml
workflows:
  commit-workflow:
    jobs:
      - build-and-test
```
* **`workflows:`**: Define a orquestração e as regras de disparo de execução dos jobs.
* **`commit-workflow:`**: Nome do fluxo de trabalho.
* **`jobs: - build-and-test`**: Declara que o job `build-and-test` deve ser executado como parte deste workflow toda vez que um commit for enviado para qualquer branch do repositório no GitHub.
