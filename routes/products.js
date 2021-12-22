const express = require("express");

//import controaldor
const {
  addProduct,
  getProduct,
  getProducts,
  editProduct,
  deleteProduct,
} = require("../controllers/productController.js");

const productsRouter = express.Router();

productsRouter.post("/", getProducts);

productsRouter.post("/crear", addProduct);

productsRouter.post("/:id", getProduct);

productsRouter.put("/:id/edit", editProduct);

productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
