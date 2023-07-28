'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('properties', {
      property_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false
      },
      square_meters: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      price: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      date_built: {
        type: Sequelize.DATE,
        allowNull: false
      },
      property_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      realtor_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('properties');
  }
};
