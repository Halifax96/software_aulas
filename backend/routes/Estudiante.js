const exp = require("express");
const Estudiante = require("../modelo/Estudiantes");
const Usuario = require("../modelo/Usuarios");
var app = exp.Router();

app.get("/", (req, res) => {
  console.log("Estudiante");
  Estudiante.findAll({}).then((data) => {
    res.send(data);
  });
});

app.post("/", async (req, res) => {
  const { curso, padre_tutor, telefono_padre_tutor, email } = req.body;

  console.log("Solicitud de nuevo alumno para: " + email);
  var idUsuario = null;
  var existe = false;

  await Usuario.findAll({
    where: { email: email },
  }).then((response) => {
    if (response.length != 0) idUsuario = response[0].idUsuario;
  });

  await Estudiante.findAll({
    where: { idUsuario: idUsuario },
  }).then((estudiantes) => {
    if (estudiantes.length != 0) existe = true;
  });

  if (existe === false) {
    const e = new Estudiante({
      curso: curso,
      padre_tutor: padre_tutor,
      telefono_padre_tutor: telefono_padre_tutor,
      idUsuario: idUsuario,
    });
    e.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.delete("/", async (req, res) => {
  const { idUsuario } = req.body;
  console.log("Solicitud de borrado de estudiante para: " + idUsuario);

  if (idUsuario !== null) {
    await Estudiante.findAll({
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
  const { idEstudiante, curso, padre_tutor, telefono_padre_tutor } = req.body;
  console.log(
    "Solicitud de cambio de datos de usuario para el estudiante: " +
      idEstudiante
  );

  Estudiante.findAll({
    where: {
      idEstudiante: idEstudiante,
    },
  }).then((response) => {
    console.log(response);
    if (response.length != 0) {
      response[0].curso = curso;
      response[0].padre_tutor = padre_tutor;
      response[0].telefono_padre_tutor = telefono_padre_tutor;
      response[0].save();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = app;
