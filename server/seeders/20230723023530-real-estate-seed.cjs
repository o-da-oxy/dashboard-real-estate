'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const realtorsData = [
      {
        first_name: 'Alina',
        last_name: 'Pavlova',
        phone: '89284657483',
        email: 'pavlova@mail.ru',
        registration_date: '2021-01-01'
      },
      {
        first_name: 'Petr',
        last_name: 'Belov',
        phone: '89123456789',
        email: 'belov@mail.ru',
        registration_date: '2021-02-01'
      },
      {
        first_name: 'Gleb',
        last_name: 'Petrov',
        phone: '89654321987',
        email: 'petrov@mail.ru',
        registration_date: '2021-03-01'
      }
    ];

    const propertiesData = [
      {
        district: 'Замоскворечье',
        square_meters: 100.50,
        price: 25000000,
        date_built: '2000-01-01',
        property_type: 'квартира',
        realtor_id: 1
      },
      {
        district: 'Таганский',
        square_meters: 200.75,
        price: 50000000,
        date_built: '2010-01-01',
        property_type: 'квартира',
        realtor_id: 2
      },
      {
        district: 'Тверской',
        square_meters: 50.25,
        price: 125000000,
        date_built: '1995-01-01',
        property_type: 'офисное помещение',
        realtor_id: 3
      }
    ];

    await queryInterface.bulkInsert('realtors', realtorsData);
    await queryInterface.bulkInsert('properties', propertiesData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('properties', null, {});
    await queryInterface.bulkDelete('realtors', null, {});
  }
};
