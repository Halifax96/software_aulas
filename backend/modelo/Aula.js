
const Sequelize = require("sequelize");
const Conexion = require("./conexion");
const sequelize = Conexion.conexion;
const mysql = require("mysql2");

const Model = Sequelize.Model;
//TABLA aula
class Aula extends Model {}
Aula.init(
  {
	// attributes
	idaula: {
	  type: Sequelize.INTEGER,
	  primaryKey: true,
	  allowNull: false,
	  autoIncrement: true,
	},
	numero_aula: {
	  type: Sequelize.INTEGER,
	  allowNull: false,
	},
	aforo: {
	  type: Sequelize.INTEGER,
	  allowNull: false,
	},
	edificio: {
	  type: Sequelize.STRING,
	  allowNull: false,
	},
  },
  {
	sequelize,
	modelName: "aula",
	timestamps: false,

	// options
  }
);


module.exports = Aula;