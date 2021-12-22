const express = require("express");

//import controaldor
const {
  ultimosUsers,
  bestSeller,
  bestBuyer,
} = require("../controllers/reportesController");

const reportesRouter = express.Router();

reportesRouter.post("/lastusers", ultimosUsers);
reportesRouter.get("/bestseller", bestSeller);
reportesRouter.get("/bestbuyer", bestBuyer);

module.exports = reportesRouter;
