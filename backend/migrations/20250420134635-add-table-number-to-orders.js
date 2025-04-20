'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add the table_number column to orders
    await queryInterface.addColumn('orders', 'table_number', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove the table_number column from orders
    await queryInterface.removeColumn('orders', 'table_number');
  }
};
