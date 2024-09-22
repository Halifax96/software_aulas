const exp = require("express");
const Faltas_asistenciales = require("../modelo/Faltas_asistencia");
const Estudiante = require("../modelo/Estudiantes");
const Asignatura = require("../modelo/Asignatura");
var app = exp.Router();

app.get("/", (req, res) => {
  console.log("Faltas totales");
  Faltas_asistenciales.findAll({}).then((response) => {
    res.send(response);
  });
});

app.get("/asignatura", (req, res) => {
  const { asignatura } = req.body;
  console.log("Faltas totales de la asignatura " + asignatura);
  Faltas_asistenciales.findAll({
    where: {
      asignatura: asignatura,
    },
  }).then((response) => {
    res.send(response);
  });
});

app.get("/alumno", (req, res) => {
  const { alumno } = req.body;
  console.log("Faltas totales del alumno " + alumno);
  Faltas_asistenciales.findAll({
    where: {
      alumno: alumno,
    },
  }).then((response) => {
    res.send(response);
  });
});

app.get("/fecha", (req, res) => {
  const { fecha } = req.body;
  console.log("Faltas fecha " + fecha);
  Faltas_asistenciales.findAll({
    where: {
      fecha: fecha,
    },
  }).then((response) => {
    res.send(response);
  });
});

app.post("/", (req, res) => {
  console.log("Nueva falta de asistencia");
  const { alumno, asignatura, fecha } = req.body;
  Faltas_asistenciales.findAll({
    where: {
      alumno: alumno,
      asignatura: asignatura,
      fecha: fecha,
    },
  }).then((response) => {
    if (response.length == 0) {
      const f = new Faltas_asistenciales({
        alumno: alumno,
        asignatura: asignatura,
        fecha: fecha,
        justificada: 0,
      });
      f.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

app.put("/", (req, res) => {
  const { alumno, asignatura, fecha } = req.body;
  console.log(
    "Justificacion de falta alumno=" +
      alumno +
      " asignatura=" +
      asignatura +
      " fecha=" +
      fecha
  );
  Faltas_asistenciales.findAll({
    where: {
      alumno: alumno,
      asignatura: asignatura,
      fecha: fecha,
    },
  }).then((response) => {
    if (response.length > 0) {
      response[0].justificada = 1;
      response[0].save();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = app;

