'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'ADMINISTRATOR'
      },
      {
        name: 'DELIVERY'
      },
      {
        name: 'CLIENT'
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
