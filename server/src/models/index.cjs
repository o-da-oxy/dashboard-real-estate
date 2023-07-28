'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-4) === '.cjs' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    console.log(file);
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

// проверка подключения к бд + логирование таблиц
(async () => {
  try {
    if (config.use_env_variable) {
      sequelize = new Sequelize(process.env[config.use_env_variable], {
        ...config,
        logging: false,
      });
    } else {
      sequelize = new Sequelize(config.database, config.username, config.password, {
        ...config,
        logging: false,
      });
    }

    await sequelize.authenticate();
    console.log('База данных успешно подключена');

    const tables = await sequelize.query(
      "SELECT table_name, column_name, data_type, character_maximum_length, is_nullable FROM information_schema.columns WHERE table_schema = 'public';",
      { type: QueryTypes.SELECT }
    );

    const tableInfo = {};

    tables.forEach((table) => {
      const { table_name, column_name, data_type, character_maximum_length, is_nullable } = table;
      if (!tableInfo[table_name]) {
        tableInfo[table_name] = [];
      }
      tableInfo[table_name].push({
        column_name,
        data_type,
        character_maximum_length,
        is_nullable,
      });
    });

    Object.entries(tableInfo).forEach(([table_name, columns]) => {
      console.log('////////////////////////////////////////');
      console.log('Таблица:', table_name,);
      console.log('////////////////////////////////////////');
      columns.forEach((column) => {
        console.log(`Поле: ${column.column_name} Тип: ${column.data_type}`);
      });
    });

  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  }
})();

module.exports = db;
