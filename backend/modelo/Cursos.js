const Sequelize = require("sequelize");
const Conexion = require("./conexion");
const sequelize = Conexion.conexion;
const Edificios = require("./Edificios");

const Model = Sequelize.Model;
//TABLA asignatura
class Curso extends Model {}
Curso.init(
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nivel: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    facultad: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Edificios,
        key: "Nombre",
      },
    },
    grado: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "curso",
    timestamps: false,

    // options
  }
);
module.exports = Curso;
