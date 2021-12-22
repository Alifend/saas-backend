const express = require("express");

//import controaldor
const { ultimosUsers } = require("../controllers/reportesController");

const reportesRouter = express.Router();

reportesRouter.get("/lastusers:domain", ultimosUsers);

module.exports = reportesRouter;
