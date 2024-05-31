# Simple Commerce 

Simples aplicação com o objetivo de simular backend de um e-commerce. 
Composta por três Microsserviços. 

### Products 
CRUD de produtos
Desenvolvido com o Node.JS + AdonisJS + banco de dados MySQL.

Pode ser acessado na URL:
``localhost:8001/products``

### Orders 
Microsserviço para realizar os pedidos 
Desenvolvido com o Node.JS + Express + banco de dados MySQL.

Pode ser acessado na URL somente em método POST para fazer novo pedido:
``localhost:8002/orders``

### Shipping Calculator 
Microsserviço para realizar o cálculo de frete. 
Desenvolvido com o PHP. 
 
Pode ser acessado na URL somente em método POST para calcular o frete: 
``localhost:8003``

## Rodando o projeto com o Docker 

No diretório raiz do projeto execute o comando 'docker-compose build': 

``docker-compose build``

Após fazer o build, use o comando 'docker-compose up' para iniciar os containers:

``docker-compose build`` 

## Banco de Dados

### Criando as tabelas do banco de dados 
#### Entre no container do MySQL 
``docker exec -it products_database bash`` 

#### Entre no diretório scripts 
``cd scripts`` 

#### Execute o comando para importar as tabelas via terminal 
``mysql -u root -p products < tables.sql`` 

#### Populando dados na tabela Products 
``mysql -u root -p products < products_insert.sql`` 


## Rodando os Unit Tests 

### Products 
#### Entre no container 
``docker exec -it products_api bash`` 

#### Execute o comando para rodar o teste 
``node ace test``

### Orders 
#### Entre no container 
``docker exec -it orders_api bash`` 

#### Execute o comando para rodar o teste 
``npx mocha app.spec.js`` 

### Shipping Calculator 
#### Entre no container 
``docker exec -it shipping_calculator_service bash`` 

#### Execute o comando para rodar o teste 
``php test_shipping_calculator.php``