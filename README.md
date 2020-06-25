![logo fastfeet](https://github.com/lalves86/fastfeet-api/blob/master/public/images/logo.png)

# Desafio 02 - Início

Este projeto é parte do processo de avaliação do Bootcamp Gostack da [Rocketseat](https://github.com/Rocketseat).

API para uma transportadora fictícia, estabelecendo a estrutura de conexão com banco de dados relacional, usando o ORM sequelize, e node.js.

## Rotas

Foram criadas rotas e controllers para operações de CRUD em usuários e destinatários, incluindo um usuário administrador.
Aplicação permite o cadastro e manutenção de endereços de destinatários para entregas da transportadora.

###### Rotas e métodos de usuários

* GET /users - Retorna todos os usuários cadastrados;
* GET /users/id - Retorna o usuário com o id requisitado;
* POST /users - Cadastra um novo usuário;
* PUT /users/id - Altera o cadastro de um usuário específico;
* DELETE /users/id - Remove o cadastro de um usuário específico.

###### Rotas e métodos de destinatários

* GET /recipients - Retorna todos os destinatários cadastrados;
* GET /recipients/id - Retorna o destinatário com o id requisitado;
* POST /recipients - Cadastra um novo destinatário;
* PUT /recipients/id - Altera o cadastro de um destinatário específico;
* DELETE /recipients/id - Remove o cadastro de um destinatário específico.

###### Rotas e métodos de Entregadores

* GET /deliverers - Retorna todos os entregadores cadastrados;
* GET /deliverers/id - Retorna o entregador com o id requisitado;
* POST /deliverers - Cadastra um novo entregador;
* PUT /deliverers/id - Altera o cadastro de um entregador específico;
* DELETE /deliverers/id - Remove o cadastro de um entregador específico.

###### Rotas e métodos de Entregas (para usuário)

* GET /problems - Lista todos os problemas na entrega (administradores);
* GET /problems/id - Permite ao entregador verificar os problemas em uma entrega específica;
* POST /problems - Permite cadastrar um novo problema na entrega;
* DELETE /orders/id - Altera o status do pedido para cancelado.

###### Rotas e métodos de problemas na entrega

* GET /delivery/id - Permite ao entregador listar as próprias entregas;
* GET /deliveries/id - Permite ao entregador listar as próprias entregas;
* PUT /deliveries/id - Permite ao entregador alterar o status da sua entrega;

###### Rotas e métodos de Entregas

* GET /orders - Retorna todos os pedidos cadastrados;
* GET /orders/id - Retorna o pedido com o id requisitado;
* POST /orders - Cadastra um novo pedido;
* PUT /orders/id - Altera um pedido específico;
* DELETE /orders/id - Apagar um pedido específico.

###### Rota de login

* POST /session - Autentica o usuário a partir de login e senha, estabelecendo um token para a sessão.

###### Uoload de arquivos

* POST /files - Permite enviar um arquivo para o servidor, armazenando o endereço no banco de dados.

## Corpo das requisições

* /sessions
```
{
  "email": "email@email.com",
  "password": xxxxxx
}
```
* /users
```
{
  "name": "username,
  "email": "email@email.com",
  "password": xxxxxx
}
```
* /recipients
```
{
  "name": "username,
  "street": "Main St.",
  "number": xx,
  "complement": "xxxxx",
  "state": "xxxxx",
  "city": "xxxxx",
  "zip": "xxxxxxxxx"
}
```

* /deliverers
```
{
	"name": "Road Runner",
	"email": "rrunner@email.com"
}
```

## Validação de sessão

A aplicação só permite que usuários logados acessem as rotas disponíveis, então um processo de login é implementado utilizando JWT.

## Uso

Para usar o repositório, basta cloná-lo através do terminal ou prompt através dos seguintes comandos:

```
> git clone https://github.com/lalves86/fastfeet-api.git
> yarn
> yarn dev (servidor principal)
> yarn queue (serviço de fila)
```

É necessário estabelecer uma conexão com um banco de dados postgres para que o servidor inicie corretamente.

Acessar url local: http://localhost:3333
