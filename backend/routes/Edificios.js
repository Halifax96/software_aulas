const exp = require("express");
const Edificios_facultades = require("../modelo/Edificios");
var app = exp.Router();

app.get("/", (req, res) => {
  console.log("Listado de edificios");
  Edificios_facultades.findAll({}).then((response) => {
    res.send(response);
  });
});

module.exports = app;

