const bcrypt = require("bcrypt");
const model = require("../models");
const jwt = require("jsonwebtoken");


exports.registerUser = async function (req, res) {
  const { nombre, email, password, tipo, documento, domain, hostname } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (domain === "localhost") {
    const tenantTemp = await model.Tenant.findOne({
      where: {
        hostname
      }
    });
    if (!tenantTemp) {
      const user = await model.User.create({
        nombre,
        email,
        tipo,
        password: hashedPassword,
        documento,
      })

      const tenant = await model.Tenant.create({
        hostname
      })

      await user.addTenant([tenant, 1]);
      res.send(user)
    } else {
      res.status(400).send("El tenant " + hostname + " ya existe");
    }
  } else {
    const tenantTemp = await model.Tenant.findOne({
      where: {
        hostname: domain
      }
    });
    if (tenantTemp) {
      const user = await model.User.create({
        nombre,
        email,
        tipo,
        password: hashedPassword,
        documento,
      })

      await user.addTenant([tenantTemp]);

      res.send(user)
    } else {
      res.status(400).send("El tenant no existe");
    }
  }
};

exports.loginUser = async (req, res) => {
  const { email, password, domain } = req.body;
  const response = await model.User.findOne({
    include: {
      model: model.Tenant,
      where: {
        hostname: domain
      }
    },
    where: {
      email
    }
  });
  if (response) {
    const realPassword = response.dataValues.password;
    if (await bcrypt.compare(password, realPassword)) {
      const accessToken = generateAccessToken(email);
      res.send({ JWT: accessToken });
    } else {
      res.send("contraseña incorrecta");
    }
  }else res.send("Usuario incorrecto");
};

const generateAccessToken = (email) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: email,
    },
    "process.env.TOKEN_ADMIN"
  );
};