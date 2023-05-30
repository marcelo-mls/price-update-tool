# Ferramenta de Atualizar Preços

## Descrição:

Em qualquer empresa de _e-commerce_, é essencial que os usuários possam atualizar os preços de suas lojas para se manterem competitivos e alinhados com os custos de operação. No entanto, quando se trata de lojas com milhares de produtos, é necessário uma ferramenta que permita a atualização massiva dos preços, com recursos adicionais para evitar erros prejudiciais ao negócio.

O objetivo deste desafio é desenvolver essa ferramenta, a qual, seguindo certas regras de negócio, realizará a atualização em massa dos preços dos produtos no banco de dados com base em um arquivo `.CSV` enviado pelo front-end.

<details>
  <summary>
    
#### Cenário:
  </summary>
  
- O time de Compras fornecerá um arquivo `.CSV` contendo o código do produto e o novo preço;
- O time Financeiro exige que o sistema impeça que o preço de venda dos produtos seja inferior ao custo;
- O time de Marketing solicita que o sistema impeça reajustes maiores ou menores do que 10% do preço atual do produto;
- Em alguns casos, produtos são vendidos em pacotes que consistem em um ou mais itens em quantidades diferentes. Quando o preço de um pacote é ajustado, é necessário que o mesmo arquivo `.CSV` contenha os ajustes dos preços dos itens, de forma que a soma dos preços dos itens resulte no preço total do pacote.
</details>

<details>
  <summary>

#### Requisitos do Sistema:
  </summary>

  - O sistema deve permitir o carregamento do arquivo de precificação;
  - Botão de <button> Validar </button> para verificar os dados do arquivo;
  - Verificar se todos os campos necessários estão presentes e são valores numéricos válidos;
  - Verificar se os códigos de produtos informados existem;
  - Verificar se o arquivo segue as regras estabelecidas no cenário;
  - O botão de <button> Atualizar </button> só estará habilitado se todos os produtos do arquivo forem validados sem nenhuma violação de regras;
  - Ao clicar em <button> Atualizar </button>, os novos preços devem ser salvos no banco de dados e preparar a tela para o envio de um novo arquivo.

  Após a validação, deve-se exibir na tela algumas informações dos produtos enviados. São elas:

  <table>
    <tr>
      <th>Código</th>
      <th>Nome</th>
      <th>Preço Atual</th>
      <th>Novo Preço</th>
      <th>Validação</th>
    </tr>
  </table>
</details>

 No caso de violação de uma ou mais regras de validação, é necessário exibir qual regra foi quebrada ao lado de cada produto. 

<br />

## Desenvolvido com:

O front-end foi desenvolvido com [`React.js`](https://react.dev/).

No back-end foi utilizado com [`Node.js`](https://nodejs.org/en) com [`Express`](https://expressjs.com/), [`MySQL`](https://www.mysql.com/), e [`Docker`](https://www.docker.com/).

<br />

## Demonstração:

<details>
  <summary>
  </summary>
  
  - #### Tela inicial
  ![Tela inicial](https://github.com/marcelo-mls/shopper-teste-tecnico/assets/102492818/7d7ff5d4-d0c3-4420-81fc-29ce6884342e)

  - #### Feedback sobre estrutura do arquivo CSV
  ![Feedback CSV](https://github.com/marcelo-mls/shopper-teste-tecnico/assets/102492818/524b480d-a2a6-42ec-9ed4-0ed4deaf01f0)

  - #### Feedback sobre a qualidade dos dados do CSV
  ![Feedback Dados](https://github.com/marcelo-mls/shopper-teste-tecnico/assets/102492818/01e952fc-24c4-42fd-8ee7-c7dfd813a411)

</details>

<br />

## Como Instalar:

Estas instruções fornecerão a você uma cópia completa do projeto instalado e funcionando em sua máquina local para fins de desenvolvimento.

:warning: Você deve ter uma instância ativa do MySQL (versão 8) em execução em sua máquina.

> Se você usa [**Docker**](https://www.docker.com/) em sua máquina, aqui está um comando para criar rapidamente um contêiner de **MySQL** já configurado com de acordo com as **variáveis de ambiente** de desenvolvimento deste projeto
```sh
docker run --name mysql-dev-base -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=price_update_tool -p 3306:3306 -d mysql:8
```
> Se você for usar outras variáveis de ambiente, na flag `MYSQL_ROOT_PASSWORD` informe a senha definida do arquivo `.env`. Neste EXEMPLO foi utilizada a senha ilustrativa `password` apenas para fins de desenvolvimento e testes.

1. Clone o repositório:
```sh
git clone git@github.com:marcelo-mls/price-update-tool.git
```
2. Entre na pasta do repositório que você acabou de clonar:
```sh
cd price-update-tool
```
3. Acesse as pastas de `frontend` e `backend`, instale as dependências e inicie o projeto:
```sh
cd frontend
npm install
npm run dev
```
```sh
cd ..
```
```sh
cd backend
npm install
npm run dev
```
4. (opcional) Para rapidamente popular as tabelas com alguns dados, execute o comando abaixo dentro do diretório do backend:
```sh
npm run db:seed
```
5. Acesse o link abaixo em seu navegador para testar a interface da ferramenta
[127.0.0.1:5173/](http://127.0.0.1:5173/)

> O servidor irá rodar na porta **3001** e o banco de dados na porta **3306**. mas isso pode ser facilmente alterado nas **Váriáveis de Ambiente**.

<br />

## Variáveis de Ambiente:
Ao fazer o clone do repositório você vai receber um `.env.example`, com as informações abaixo. Basta renomear o arquivo para `.env`.

```env
API_PORT=3001
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=price_update_tool
MYSQL_MULTIPLE_STATEMENTS=true
```
> É importante manter as flags `MYSQL_DATABASE` e `MYSQL_MULTIPLE_STATEMENTS` com esses valores se deseja popular o banco através do comando: `npm run db:seed`

<br />

## Rotas da API:

Você pode testar a API com softwares como [`Insomnia`](https://insomnia.rest/download), [`Postman`](https://www.postman.com/) ou [`Thunder Client`](https://www.thunderclient.com/)

  - POST: `'/products'`
  > Este _endpoint_ recebe no corpo da requisição um `JSON` representando as dados contidos no arquivo `.CSV`. Com esses dados ela busca por todos os produtos e responde a requisição com as devidas validações para cada produto ou pacote listado no arquivo.

  - PATCH: `'/products'`
  > Esta rota é responsável por atualizar no banco de dados apenas o preço dos produtos, de acordo com as informações contidas no corpo da requisição.

<br />

---

Desenvolvido por [Marcelo Marques](https://www.linkedin.com/in/marcelo-mls/), © 2023.
> Teste técnico referente à vaga de Desenvolvedor Full Stack Júnior na [Shopper](https://landing.shopper.com.br/).

<div>
  <a href = "https://www.linkedin.com/in/marcelo-mls/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin" />
  </a>
  <a href="mailto:marcelo-mls@hotmail.com" target="_blank">
    <img src="https://img.shields.io/badge/Hotmail-0077B5?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</div>


