const Sequelize = require("sequelize");
const Conexion = require("./conexion");
const sequelize = Conexion.conexion;

const Model = Sequelize.Model;
//TABLA reservar_aula
class Reservar_aula extends Model {}
Reservar_aula.init(
  {
    // attributes
    idreserva: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    aula: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "aula",
        key: "idaula",
      },
    },
    fecha_reserva: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    hora_inicio: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    hora_fin: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    cancelado: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    profesor: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "profesor",
        key: "idprofesor",
      },
    },
  },
  {
    sequelize: sequelize,
    modelName: "reservar_aula",
    timestamps: false,

    // options
  }
);

module.exports = Reservar_aula;

