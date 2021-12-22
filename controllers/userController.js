const bcrypt = require("bcrypt");
const model = require("../models");
const jwt = require("jsonwebtoken");
const tenantServices = require("../services/tenantServices");
const userServices = require("../services/userServices");

exports.registerUser = async function (req, res) {
  const { nombre, email, password, tipo, documento, domain, hostname } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (domain === "localhost") {
    const tenantTemp = await tenantServices.findTenantByHostname(hostname);

    if (!tenantTemp) {
      const user = await model.User.create({
        nombre,
        email,
        tipo,
        password: hashedPassword,
        documento,
        rol: "admin",
      });

      const tenant = await model.Tenant.create({
        hostname,
      });

      await user.addTenant([tenant, 1]);
      res.send(user);
    } else {
      res.status(400).send("El tenant ya existe aa");
    }
  } else {
    const tenantTemp = await tenantServices.findTenantByDomain(domain);

    if (tenantTemp) {
      const user = await model.User.create({
        nombre,
        email,
        tipo,
        password: hashedPassword,
        documento,
        rol: "usuario",
      });

      await user.addTenant([tenantTemp]);

      res.send(user);
    } else {
      res.status(400).send("El tenant no existe");
    }
  }
};

exports.loginUser = async (req, res) => {
  const { email, password, domain } = req.body;
  const user = await userServices.findUserByEmailTenant(email, domain);
  if (user) {
    const realPassword = user.dataValues.password;
    if (await bcrypt.compare(password, realPassword)) {
      const accessToken = generateAccessToken(email);
      res.send({ JWT: accessToken });
    } else {
      res.statusMessage = "contraseña incorrecta";
      res.status(400).end();
    }
  } else {
    res.statusMessage = "Usuario incorrecto";
    res.status(400).end();
  }
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
