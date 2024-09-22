
const Sequelize = require("sequelize");
const Conexion = require("./conexion");
const sequelize = Conexion.conexion;

const Model = Sequelize.Model;
//TABLA asignatura
class Asignatura extends Model {}
Asignatura.init(
  {
    // attributes
    idasignatura: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    curso: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    departamento: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "asignatura",
    timestamps: false,

    // options
  }
);
module.exports = Asignatura;
