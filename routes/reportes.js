const express = require("express");

//import controaldor
const {
  ultimosUsers,
  lastClients,
  lastProducts,
} = require("../controllers/reportesController");

const reportesRouter = express.Router();

reportesRouter.post("/lastusers", ultimosUsers);
reportesRouter.post("/lastproducts", lastProducts);
reportesRouter.post("/lastclients", lastClients);

module.exports = reportesRouter;
