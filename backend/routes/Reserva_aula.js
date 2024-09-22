const exp = require("express");
const Reservar_aula = require("../modelo/Reserva_aula");
const Estudiante = require("../modelo/Estudiantes");
const Asignatura = require("../modelo/Asignatura");
var app = exp.Router();

app.get("/", (req, res) => {
  console.log("Todas las reservas");
  Reservar_aula.findAll({}).then((response) => {
    res.send(response);
  });
});

app.get("/aula", (req, res) => {
  const { aula } = req.body;
  console.log("Reservas para el aula " + aula);
  Reservar_aula.findAll({
    where: {
      aula: aula,
      cancelado: 0,
    },
  }).then((response) => {
    res.send(response);
  });
});

app.get("/profesor", (req, res) => {
  const { profesor } = req.body;
  console.log("Reservas del profesor " + profesor);
  Reservar_aula.findAll({
    where: {
      profesor: profesor,
      cancelado: 0,
    },
  }).then((response) => {
    res.send(response);
  });
});

app.get("/fecha", (req, res) => {
  const { fecha } = req.body;
  console.log("Faltas fecha " + fecha);
  Reservar_aula.findAll({
    where: {
      fecha: fecha,
      cancelado: 0,
    },
  }).then((response) => {
    res.send(response);
  });
});

app.post("/", (req, res) => {
  console.log("Nueva falta de asistencia");
  const { aula, fecha_reserva, hora_inicio, hora_fin, profesor } = req.body;
  Reservar_aula.findAll({
    where: {
      aula: aula,
      fecha_reserva: fecha_reserva,
      hora_inicio: hora_inicio,
      cancelado: 0,
    },
  }).then((response) => {
    if (response.length == 0) {
      const r = new Reservar_aula({
        aula: aula,
        fecha_reserva: fecha_reserva,
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        cancelado: 0,
        profesor: profesor,
      });
      r.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

app.put("/", (req, res) => {
  const { idreserva } = req.body;
  console.log("Cancelación de reserva=" + idreserva);
  Reservar_aula.findAll({
    where: {
      idreserva: idreserva,
    },
  }).then((response) => {
    if (response.length > 0) {
      response[0].cancelado = 1;
      response[0].save();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = app;

