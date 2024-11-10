"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Customers", {
      cs_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      cs_firstname: { type: Sequelize.STRING, allowNull: false },
      cs_lastname: { type: Sequelize.STRING, allowNull: false },
      cs_gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cs_birth: { type: Sequelize.DATE, allowNull: true },
      cs_status: { type: Sequelize.BOOLEAN, defaultValue: true },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Customers");
  },
};
