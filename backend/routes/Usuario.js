const exp = require("express");
const Usuario = require("../modelo/Usuarios");
var app = exp.Router();

app.get("/", (req, res) => {
  console.log("usuarios");
  let users;
  Usuario.findAll({}).then((data) => {
    res.send(data);
  });
});

app.get("/correo", (req, res) => {
  console.log(req);
  /*const { email } = req.body;
  Usuario.findAll({
    where: {
      email: email,
    },
  }).then((response) => {
    console.log(response);
    res.send(response);
  });*/
});

app.get("/login", (req, res) => {
  console.log(req.query);
  const { email, contrasena } = req.query;
  console.log("Solicitud de logeo para " + email);
  Usuario.findAll({
    where: {
      email: email,
      contrasena: contrasena,
    },
  }).then((data) => {
    if (data.length == 0) res.sendStatus(404);
    else res.send(data);
    //res.send(data);
  });
});

app.post("/", async (req, res) => {
  const {
    nombre,
    apellido1,
    apellido2,
    telefono,
    nif,
    email,
    contrasena,
    rol,
  } = req.body;
  console.log("Solicitud de nuevo usuario para: " + email);

  let nuevo = false;

  await Usuario.findAll({
    where: {
      email: email,
    },
  }).then((response) => {
    if (response.length == 0) {
      const u = new Usuario({
        email: email,
        Nombre: nombre,
        Apellido1: apellido1,
        Apellido2: apellido2,
        telefono: telefono,
        NIF: nif,
        contrasena: contrasena,
        rol: rol,
      });
      u.save().then((response) => {
        console.log("Usuario guardado en la base de datos");
        Usuario.findAll({
          where: {
            email: email,
          },
        }).then((resp) => {
          res.send(resp);
        });
      });
    } else {
      res.sendStatus(500);
    }
  });
});

app.delete("/", (req, res) => {
  const { email } = req.query;
  console.log("Solicitud de borrado de usuario para: " + email);

  Usuario.findAll({
    where: {
      email: email,
    },
  }).then((response) => {
    if (response.length != 0) {
      response[0].destroy();
      res.send("Usuario borrado correctamente");
    } else {
      res.sendStatus(500);
    }
  });
});

app.put("/", (req, res) => {
  const { nombre, apellido1, apellido2, telefono, nif, email, emailAntiguo } =
    req.body;
  console.log("Solicitud de cambio de datos de usuario para: " + emailAntiguo);

  Usuario.findAll({
    where: {
      email: emailAntiguo,
    },
  }).then((response) => {
    if (response.length != 0) {
      response[0].email = email;
      response[0].Nombre = nombre;
      response[0].Apellido1 = apellido1;
      response[0].Apellido2 = apellido2;
      response[0].telefono = telefono;
      response[0].NIF = nif;
      response[0]
        .save()
        .then((respuesta) => {
          res.send("Usuario modificado correctamente");
        })
        .catch((err) => {
          res.send("Ya existe un usuario con ese correo");
        });
    } else {
      res.send("Usuario no localizado");
    }
  });
});

app.put("/permisos", (req, res) => {
  const { email, rol } = req.body;
  console.log("Solicitud de cambio de permisos de usuario para: " + email);

  Usuario.findAll({
    where: {
      email: email,
    },
  }).then((response) => {
    response[0].rol = rol;
    response[0]
      .save()
      .then((respuesta) => {
        res.send(
          "Permisos actualizados ahora " + email + " tiene el rol de " + rol
        );
      })
      .catch((err) => {
        res.send(err + "*******************");
      });
  });
});

app.get("/datos", (req, res) => {
  const { email } = req.body;
  console.log("Solicitud de datos para el usuario: " + email);
  Usuario.findAll({
    where: {
      email: email,
    },
  }).then((data) => {
    if (data.length == 0) res.sendStatus(404);
    else res.send(data).sendStatus(200);
  });
});

app.get("/idUsuario", (req, res) => {
  const { idUsuario } = req.body;
  console.log("Solicitud de logeo");
  Usuario.findAll({
    where: {
      idUsuario: idUsuario,
    },
  }).then((data) => {
    if (data.length == 0) res.sendStatus(404);
    else res.send(data).sendStatus(200);
    //res.send(data);
  });
});

module.exports = app;

