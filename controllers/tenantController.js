const model = require("../models");
const { Op } = require("sequelize");

exports.getTenants = async (req, res) => {
  const tenant = await model.Tenant.findAll({
    where: {
      id: {
        [Op.not]: 1,
      },
    },
  });
  res.send(tenant);
};

exports.editTenants = async (req, res) => {
  const id = req.params.id;
  const tenant = await model.Tenant.findByPk(id);
  if (tenant) {
    await model.Tenant.update(
      { estado: !tenant.estado },
      {
        where: {
          id,
        },
      }
    );
    res.send("tenant modificado con exito");
  } else res.status(400).send("no existe el tenant");
};

exports.deleteTenant = async (req, res) => {
  const id = req.params.id;
  const tenant = await model.Tenant.findByPk(id);
  if (tenant) {
    await tenant.destroy();
    res.send("tenant eliminado con exito");
  } else res.status(400).send("no existe el tenant");
};
