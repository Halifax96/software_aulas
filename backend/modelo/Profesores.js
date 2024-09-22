const Sequelize = require("sequelize");
const Usuario = require("./Usuarios");
const Conexion = require("./conexion");
const sequelize = Conexion.conexion;

const Model = Sequelize.Model;

class Profesores extends Model {}
//TABLA profesor
Profesores.init(
  {
    // attributes
    idprofesor: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fecha_contrato: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    titular_curso: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    idUsuario: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "usuario",
        key: "idUsuario",
      },
    },
  },
  {
    sequelize,
    modelName: "profesores",
    timestamps: false,

    // options
  }
);

module.exports = Profesores;
