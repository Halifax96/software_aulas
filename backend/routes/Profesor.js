const exp = require("express");
const Profesor = require("../modelo/Profesores");
const Usuario = require("../modelo/Usuarios");
var app = exp.Router();

app.get("/", (req, res) => {
  console.log("Profesor");
  Profesor.findAll({}).then((data) => {
    res.send(data);
  });
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const { email, fecha_contrato, titular_curso } = req.body;
  const d = new Date(
    fecha_contrato
    /*fecha_contrato.split("-")[0],
    fecha_contrato.split("-")[1] - 1,
    fecha_contrato.split("-")[2] + 1*/
  );

  console.log("Solicitud de nuevo profesor para: " + email);
  var idUsuario = null;
  var existe = false;

  await Usuario.findAll({
    where: { email: email },
  }).then((response) => {
    if (response.length != 0) idUsuario = response[0].idUsuario;
  });

  await Profesor.findAll({
    where: { idUsuario: idUsuario },
  }).then((profesores) => {
    if (profesores.length != 0) existe = true;
  });

  if (existe === false) {
    const p = new Profesor({
      fecha_contrato: d,
      titular_curso: titular_curso,
      idUsuario: idUsuario,
    });
    p.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.delete("/", async (req, res) => {
  const { idUsuario } = req.body;
  console.log("Solicitud de borrado de profesor para: " + idUsuario);

  if (idUsuario !== null) {
    await Profesor.findAll({
      where: {
        idUsuario: idUsuario,
      },
    }).then((response) => {
      console.log(response.length);
      response[0].destroy();
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.put("/", (req, res) => {
  const { idProfesor, fecha_contrato, titular_curso } = req.body;
  console.log(
    "Solicitud de cambio de datos de usuario para el profesor: " + idProfesor
  );

  Profesor.findAll({
    where: {
      idProfesor: idProfesor,
    },
  }).then((response) => {
    if (response.length != 0) {
      response[0].fecha_contrato = fecha_contrato;
      response[0].titular_curso = titular_curso;
      response[0].save();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = app;

