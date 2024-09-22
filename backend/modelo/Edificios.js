const Sequelize = require("sequelize");
const Conexion = require("./conexion");
const sequelize = Conexion.conexion;
const mysql = require("mysql2");

const Model = Sequelize.Model;
//TABLA edificios
class Edificios_facultades extends Model {}
Edificios_facultades.init(
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    direccion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    N_Aulas: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "edificios_facultades",
    timestamps: false,

    // options
  }
);

module.exports = Edificios_facultades;
