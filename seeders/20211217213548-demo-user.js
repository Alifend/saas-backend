"use strict";

const { TokenExpiredError } = require("jsonwebtoken");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          nombre: "Andres Celis",
          email: "andres.celis@correounivalle.edu.co",
          tipo: "C.C",
          password:
            "$2a$10$mARD/qq0PY4YJwTG85HyZORkVISq7CZwT2Y3F/I1vU89UGnspnW620",
          documento: "1114468755",
          rol: "superAdmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "Tenants",
      [
        {
          id: 1,
          hostname: "localhost",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "User_Tenant",
      [
        {
          TenantId: 1,
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
