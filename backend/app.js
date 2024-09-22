const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5050;
// eslint-disable-next-line no-unused-vars
const cors = require("cors");
const Sequelize = require("sequelize");


const sequelize = new Sequelize("portal", "root", "root", {

  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("\nConexion con la base de datos correcta\n");
  })
  .catch((err) => {
    console.error(
      "\nError: La conexión con la base de datos no ha sido posible\n",
      err
    );
  });

sequelize.sync({
  force: false,
}); //poner a true para sincronizar cambios

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/usuario", require("./routes/Usuario"));
app.use("/estudiante", require("./routes/Estudiante"));
app.use("/profesor", require("./routes/Profesor"));
app.use("/aulas", require("./routes/Aulas"));
app.use("/asignaturas", require("./routes/Asignaturas"));
app.use("/faltas", require("./routes/Faltas_asistencia"));
app.use("/reservas", require("./routes/Reserva_aula"));
app.use("/edificios", require("./routes/Edificios"));
app.use("/cursos", require("./routes/Cursos"));

app.listen(port, function () {
  console.log("Servidor de base de datos en puerto: " + port + "!\n\n");
});
