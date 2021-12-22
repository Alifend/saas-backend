const model = require("../models");
const { QueryTypes } = require("sequelize");

exports.ultimosUsers = async (req, res) => {
  const tenant = await model.Tenant.findOne({
    where: {
      hostname: req.body.domain,
    },
  });
  if (!tenant) {
    res.send("tenant no encontrado");
  }
  const query =
    "SELECT u.nombre, u.createdAt FROM Tenants t INNER JOIN User_Tenant ut on t.id = ut.TenantId INNER JOIN Users u  on u.id = ut.UserId WHERE t.id = :id AND u.rol != 'admin' LIMIT 10";

  const result = await model.sequelize.query(query, {
    replacements: { id: tenant.id },
  });
  res.send(result[0]);
};

exports.bestSeller = async (req, res) => {
  const tenant = await model.Tenant.findOne({
    where: {
      hostname: req.body.domain,
    },
  });
  if (!tenant) {
    res.send("tenant no encontrado");
  }
  const query =
    "SELECT p.nombre, SUM(dv.cantidad) as contador FROM DetalleVenta dv INNER JOIN Products p ON dv.ProductId = p.id GROUP BY ProductId ORDER BY contador DESC LIMIT 10;";
  const result = await model.sequelize.query(query);
  res.send(result[0]);
};

exports.bestBuyer = async (req, res) => {
  const tenant = await model.Tenant.findOne({
    where: {
      hostname: req.body.domain,
    },
  });
  if (!tenant) {
    res.send("tenant no encontrado");
  }
  const query =
    "SELECT u.nombre, SUM(v.Total) as contador FROM Venta v  INNER JOIN Users u ON v.UserId = u.id GROUP BY UserId ORDER BY contador DESC LIMIT 10;";

  const result = await model.sequelize.query(query);
  res.send(result[0]);
};
