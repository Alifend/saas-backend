const model = require("../models");
const userServices = require("../services/userServices");
const tenantServices = require("../services/tenantServices");
const productServices = require("../services/productServices");
const { where } = require("sequelize/dist");

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
        const newStock = product.stock - element.cantidad;
        await productServices.editProduct(newStock, element.id, domain);
        await venta.setDetalleVenta(detalleVenta);
        await detalleVenta.setProduct(product);
      });
      res.send(venta);
    } else res.status(400).send("el usuario no existe");
  } else res.status(400).send("el tenant no existe");
};

exports.getVentas = async (req, res) => {
  const { domain, email } = req.body;
  const venta = await model.Venta.findAll({
    include: {
      model: model.User,
      include: {
        model: model.Tenant,
        where: {
          hostname: domain,
        },
      },
      where: {
        email,
      },
    },
  });
  !venta ? res.status(400).send("venta not found!") : res.send(venta);
};
