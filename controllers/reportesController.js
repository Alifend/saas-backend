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

  const result = await model.sequelize.query(
    "SELECT Users.nombre, Users.createdAt " +
      "FROM Users INNER JOIN User_Tenant on User_Tenant.UserId = Users.id " +
      "INNER JOIN Tenants on User_Tenant.TenantId = :id " +
      "ORDER BY createdAt DESC " +
      "LIMIT 10",
    {
      replacements: { id: tenant.id },
    }
  );
  console.log(result[0]);
  res.send(result[0]);
};
