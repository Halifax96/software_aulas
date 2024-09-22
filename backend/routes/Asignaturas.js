
const exp = require("express");
const Asignatura = require("../modelo/Asignatura");
var app = exp.Router();

app.get("/", (req, res) => {
  console.log("Listado de asignaturas");
  Asignatura.findAll({}).then((response) => {
    res.send(response).sendStatus(200);
  });
});

app.post("/", (req, res) => {
  console.log("Nueva asigntura");
  const { nombre, curso, departamento } = req.body;
  Asignatura.findAll({
    where: {
      nombre: nombre,
      curso: curso,
    },
  }).then((response) => {
    if (response.length == 0) {
      const a = new Asignatura({
        nombre: nombre,
        curso: curso,
        departamento: departamento,
      });
      a.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

app.delete("/", (req, res) => {
  console.log("Eliminación de asignatura");
  const { id } = req.body;
  Asignatura.findAll({
    where: {
      idAsignatura: id,
    },
  }).then((response) => {
    if (response.length > 0) {
      response[0].destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = app;

