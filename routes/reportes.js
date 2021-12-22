const express = require("express");

//import controaldor
const { ultimosUsers } = require("../controllers/reportesController");

const reportesRouter = express.Router();

reportesRouter.post("/lastusers", ultimosUsers);

module.exports = reportesRouter;
