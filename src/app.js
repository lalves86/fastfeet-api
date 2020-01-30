// Importações de pacotes
import express from 'express';

// Importações de arquivos
import routes from './routes';

// Criação da classe App
class App {
  // Método construtor instanciando o express
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // Métodos da classe App
  // definição dos middlewares
  middlewares() {
    this.server.use(express.json());
  }

  // definição das rotas
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
