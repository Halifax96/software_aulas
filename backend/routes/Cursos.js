const exp = require("express");

const Cursos = require("../modelo/Curso");

var app = exp.Router();

app.get("/", (req, res) => {
  console.log("Listado de cursos");
  Cursos.findAll({}).then((response) => {
    res.send(response);
  });
});

app.post("/", (req, res) => {
  const { nivel, facultad, grado } = req.body;
  console.log("Nuevo curso " + nivel + " " + facultad + " " + grado);
  Cursos.findAll({
    where: {
      nivel: nivel,
      facultad: facultad,
      grado: grado,
    },
  }).then((response) => {
    if (response.length == 0) {
      const b = new Cursos({
        nivel: nivel,
        facultad: facultad,
        grado: grado,
      });
      b.save();
      res.send("Curso añadido exitosamente");
    } else {
      res.sendStatus("El curso ya está en la base de datos");
    }
  });
});

app.put("/", (req, res) => {

  console.log("Actualizando curso: " + req.body.id);
  const { id, nivel, facultad, grado } = req.body;


  Cursos.findAll({
    where: {
      id: id,
    },
  }).then((response) => {
    if (response.length != 0) {
      (response[0].nivel = nivel),
        (response[0].facultad = facultad),
        (response[0].grado = grado);

      response[0]
        .save()
        .then((r) => {
          res.send("Curso modificado correctamente");
        })
        .catch((error) => {
          res.send("Error: " + error);
        });
    }
  });
});

app.delete("/", (req, res) => {
  console.log("Eliminando Curso");
  const { id } = req.body;

  Cursos.findAll({
    where: {
      id: id,
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

