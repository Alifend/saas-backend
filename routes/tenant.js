const express = require("express");

//import controaldor
const {
  getTenants,
  editTenants,
  deleteTenant,
} = require("../controllers/tenantController");

const tenantsRouter = express.Router();

tenantsRouter.get("/", getTenants);
tenantsRouter.put("/:id/edit", editTenants);
tenantsRouter.delete("/:id", deleteTenant);

module.exports = tenantsRouter;
