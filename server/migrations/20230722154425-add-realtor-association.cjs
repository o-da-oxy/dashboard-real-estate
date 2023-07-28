'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('properties', {
      fields: ['realtor_id'],
      type: 'foreign key',
      name: 'properties_realtor_id_foreign_key',
      references: {
        table: 'realtors',
        field: 'realtor_id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('properties', 'properties_realtor_id_foreign_key');
  }
};
