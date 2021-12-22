const model = require("../models");
const userServices = require("../services/userServices");
const tenantServices = require("../services/tenantServices");
const productServices = require("../services/productServices");

exports.addVenta = async (req, res) => {
  const { email, domain, direccion, telefono, total, productos } = req.body;
  const userTemp = await userServices.findUserByEmailTenant(email, domain);
  const tenant = await tenantServices.findTenantByDomain(domain);
  const productList = productos;
  if (tenant) {
    if (userTemp) {
      const venta = await model.Venta.create({
        direccion,
        telefono,
        Total: total,
      });
      await venta.setUser(userTemp);

      productList.forEach(async (element) => {
        const product = await productServices.findProductInTenant(
          element.id,
          domain
        );
        if (!product) {
          {
          }
        }
        const detalleVenta = await model.DetalleVenta.create({
          cantidad: element.cantidad,
        });

        await venta.setDetalleVenta(detalleVenta);
        await detalleVenta.setProduct(product);
      });
      res.send(venta);
    } else res.status(400).send("el usuario no existe");
  } else res.status(400).send("el tenant no existe");
};

exports.getVenta = async (req, res) => {
  const venta = await model.Venta.findOne(req.body.id);
  !venta ? res.status(400).send("venta not found!") : res.send(venta);
};

exports.getVentas = async (req, res) => {
  res.send("en construccion");
};

exports.editVenta = async (req, res) => {
  res.send("en construccion");
};

exports.deleteVenta = async (req, res) => {
  res.send("en construccion");
};
