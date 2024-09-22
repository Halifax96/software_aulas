
const Sequelize = require("sequelize");
const mysql = require("mysql2");
const Conexion = require("./conexion");
const sequelize = Conexion.conexion;

const Model = Sequelize.Model;
class Usuarios extends Model {}
//TABLA Usuario
Usuarios.init(
  {
    // attributes
    idUsuario: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    Nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Apellido1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Apellido2: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    NIF: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefono: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rol: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contrasena: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "usuarios",
    timestamps: false,

    // options
  }
);

module.exports = Usuarios;

