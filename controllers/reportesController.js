const model = require("../models");
const { QueryTypes } = require("sequelize");

exports.ultimosUsers = async (req, res) => {
  const { domain, fechaInicial, fechaFinal } = req.body;
  const tenant = await model.Tenant.findOne({
    where: {
      hostname: domain,
    },
  });
  if (!tenant) {
    res.send("tenant no encontrado");
  }
  const query =
    "SELECT u.nombre, u.createdAt FROM Tenants t INNER JOIN User_Tenant ut on t.id = ut.TenantId INNER JOIN Users u  on u.id = ut.UserId WHERE t.id = 2 AND u.rol != 'admin' AND CAST(u.createdAt as date) BETWEEN :fechaIncial And :fechaFinal  LIMIT 10";

  const result = await model.sequelize.query(query, {
    replacements: { id: tenant.id, fechaFinal, fechaInicial },
  });
  res.send(result[0]);
};

exports.lastProducts = async (req, res) => {
  const { domain, fechaInicial, fechaFinal } = req.body;
  const date = new Date();
  console.log(req.body);
  const tenant = await model.Tenant.findOne({
    where: {
      hostname: domain,
    },
  });
  if (!tenant) {
    res.send("tenant no encontrado");
  }
  const query =
    "SELECT p.nombre, SUM(dv.cantidad) as contador FROM DetalleVenta dv INNER JOIN Products p ON dv.ProductId = p.id INNER JOIN Tenants t ON t.id = p.TenantId WHERE t.hostname = :hostname AND CAST(p.createdAt as date) BETWEEN :fechaInicial And :fechaFinal GROUP BY ProductId ORDER BY contador DESC LIMIT 10;";
  const result = await model.sequelize.query(query, {
    replacements: {
      hostname: domain,
      fechaFinal: fechaFinal,
      fechaInicial: fechaInicial,
    },
  });
  res.send(result[0]);
};

exports.lastClients = async (req, res) => {
  const { domain, fechaInicial, fechaFinal } = req.body;
  const tenant = await model.Tenant.findOne({
    where: {
      hostname: domain,
    },
  });
  if (!tenant) {
    res.send("tenant no encontrado");
  }
  const query =
    "SELECT u.nombre, SUM(v.Total) as contador FROM Venta v  INNER JOIN Users u ON v.UserId = u.id 	INNER JOIN User_Tenant ut ON  u.id = ut.UserId	INNER JOIN Tenants t ON ut.TenantId = t.id WHERE t.hostname = :hostname AND CAST(v.createdAt as date) BETWEEN :fechaIncial And :fechaFinal GROUP BY v.UserId ORDER BY contador DESC LIMIT 10;";

  const result = await model.sequelize.query(query, {
    replacements: {
      hostname: domain,
      fechaFinal,
      fechaInicial,
    },
  });
  res.send(result[0]);
};
