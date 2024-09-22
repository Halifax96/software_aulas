
const Sequelize = require("sequelize");
const Usuario = require("./Usuarios");
const Conexion = require("./conexion");
const sequelize = Conexion.conexion;

const Model = Sequelize.Model;

class Estudiantes extends Model {}
//TABLA estudiante
Estudiantes.init(
  {
    // attributes
    idEstudiante: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    curso: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    padre_tutor: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    telefono_padre_tutor: {
      type: Sequelize.STRING,
      allowNull: true,
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
    modelName: "estudiantes",
    timestamps: false,

    // options
  }
);

module.exports = Estudiantes;
