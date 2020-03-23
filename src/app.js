// Importações de pacotes
import express from 'express';
import path from 'path';
import cors from 'cors';

// Importações de arquivos
import routes from './routes';
import './database';

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
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // definição das rotas
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
