const model = require("../models");

exports.findVentaInDomain = async (domain, id) => {
  const tenant = await model.Venta.findOne({
    where: {
      hostname: domain,
    },
  });

  if (tenant) {
    return tenant;
  } else return null;
};
