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
    "SELECT u.nombre, u.createdAt FROM Tenants t INNER JOIN User_Tenant ut on t.id = ut.TenantId INNER JOIN Users u  on u.id = ut.UserId WHERE t.id = :id AND u.rol != 'admin'";

  const result = await model.sequelize.query(query, {
    replacements: { id: tenant.id },
  });
  res.send(result[0]);
};
