
const Sequelize = require("sequelize");
const Conexion = require("./conexion");
const sequelize = Conexion.conexion;
const Estudiantes = require("./Estudiantes");
const Asignatura = require("./Asignatura");

const Model = Sequelize.Model;
//TABLA faltas_asistencia
class Faltas_asistenciales extends Model {}
Faltas_asistenciales.init(
  {
    // attributes
    idfaltas_asistencia: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    alumno: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Estudiantes,
        key: "idEstudiante",
      },
    },
    asignatura: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Asignatura,
        key: "idasignatura",
      },
    },
    fecha: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    justificada: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "faltas_asistenciales",
    timestamps: false,

    // options
  }
);
module.exports = Faltas_asistenciales;

