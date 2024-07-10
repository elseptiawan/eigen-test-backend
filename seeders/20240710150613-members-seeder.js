'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('members', [
      {
        code: "M001",
        name: "Angga",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        code: "M002",
        name: "Ferry",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        code: "M003",
        name: "Putri",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('members', null, {});
  }
};
