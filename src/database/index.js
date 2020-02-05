import Sequelize from 'sequelize';

import Recipient from '../app/models/Recipient';
import User from '../app/models/User';
import Deliverer from '../app/models/Deliverer';
import File from '../app/models/File';
import Order from '../app/models/Order';
import databaseConfig from '../config/database';

const models = [Deliverer, File, Order, Recipient];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    User.init(this.connection);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
