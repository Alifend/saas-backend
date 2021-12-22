const model = require("../models");

exports.ultimosUsers = async (req, res) => {
  model.User.findAll({
    attributes: {
      include: [
        [
          // Note the wrapping parentheses in the call below!
          sequelize.literal(`(
                    SELECT Users.nombre, Users.createdAt
FROM Users INNER JOIN User_Tenant ut on ut.UserId = id 
INNER JOIN Tenants t on ut.TenantId = 2
ORDER BY createdAt DESC
LIMIT 10;
                )`),
        ],
      ],
    },
  });
};
