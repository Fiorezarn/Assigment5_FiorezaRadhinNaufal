"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = [];

    for (let i = 1; i <= 20; i++) {
      customers.push({
        cs_firstname: faker.person.firstName(),
        cs_lastname: faker.person.lastName(),
        cs_gender: faker.helpers.arrayElement(["female", "male"]),
        cs_birth: faker.date.birthdate(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Customers", customers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
