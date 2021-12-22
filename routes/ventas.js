const express = require("express");

// import venta controller.
const { addVenta, getVentas } = require("../controllers/ventaController");

const ventasRouter = express.Router();

ventasRouter.post("/historial", getVentas);

ventasRouter.post("/", addVenta);

module.exports = ventasRouter;
