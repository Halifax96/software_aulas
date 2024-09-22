
const Sequelize = require("sequelize");

const conexion = new Sequelize("portal", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { conexion };

