const exp = require("express");
const Aula = require("../modelo/Aula");
var app = exp.Router();

app.get("/", (req, res) => {
  console.log("Listado de aulas");
  Aula.findAll({}).then((response) => {
    res.send(response);
  });
});

app.post("/", (req, res) => {
  console.log("Añadir aula");
  const { numero, aforo, edificio } = req.body;
  console.log(edificio);
  Aula.findAll({
    where: {
      numero_aula: numero,
      aforo: aforo,
      edificio: edificio,
    },
  }).then((response) => {
    if (response.length == 0) {
      const a = new Aula({
        numero_aula: numero,
        edificio: edificio,
        aforo: aforo,
      });
      a.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

app.put("/", (req, res) => {
  console.log(req);
  const { id, numero, aforo, edificio } = req.body;
  console.log("Cambio del aula: " + id);
  Aula.findAll({
    where: {
      idaula: id,
    },
  }).then((response) => {
    response[0].numero_aula = numero;
    response[0].aforo = aforo;
    response[0].edificio = edificio;
    response[0]
      .save()
      .then((r) => {
        res.send("Aula modificada correctamente");
      })
      .catch((err) => {
        res.send(
          "No se ha podido modificar el aula " +
            id +
            " del edificio " +
            edificio
        );
      });
  });
});

app.delete("/", (req, res) => {
  console.log("Borrado de aula");
  const { numero, edificio } = req.query;
  Aula.findAll({
    where: {
      numero_aula: numero,
      edificio: edificio,
    },
  }).then((response) => {
    if (response.length > 0) {
      response[0].destroy();
      res.send("Aula borrada correctamente");
    } else {
      res.send("No se ha podido borrar el aula");
    }
  });
});

module.exports = app;
