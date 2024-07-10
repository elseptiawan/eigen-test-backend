'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('borrowing_books',
      { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        member_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        book_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        is_returned: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('borrowing_books');
  }
};
