<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form name="formulario4" @submit="modifica">
      <div class="data">
        <article class="datos">
          <select value="Seleccione usuario" name="select">
            <option value="Seleccione usuario"></option>
            <option
              v-for="(usuario, index) in relacionUsuarios"
              :index="index"
              :key="index"
              @click="setUsuario(usuario)"
            >
              {{ usuario.Nombre }} {{ usuario.Apellido1 }}
              {{ usuario.email }}
            </option>
          </select>
        </article>
        <article class="datos">
          <h1>Datos personales</h1>
          <input type="text" name="nombre" placeholder="Nombre" required />
          <input
            type="text"
            name="apellido1"
            placeholder="Primer apellido"
            required
          />
          <input type="text" name="apellido2" placeholder="Segundo apellido" />
          <input type="text" name="nif" placeholder="N.I.F./N.I.E." required />
        </article>
        <article class="datos">
          <h1>Contacto</h1>
          <input
            type="text"
            name="correo"
            placeholder="Correo electrónico"
            required
          />
          <input type="text" name="telefono" placeholder="Telefono" required />
        </article>
      </div>
      <input type="submit" value="Modificar nuevo usuario" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ModificarUsuario",
  data: () => ({
    tipoUsuario: "Tipo de usuario",
    emailAntiguo: "",
  }),
  props: {
    relacionUsuarios: {
      type: Array,
    },
  },
  methods: {
    async modifica(event) {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target));
      await axios
        .put("http://localhost:5050/usuario", {
          nombre: data.nombre,
          apellido1: data.apellido1,
          apellido2: data.apellido2,
          nif: data.nif,
          telefono: data.telefono,
          email: data.correo,
          emailAntiguo: this.emailAntiguo,
        })
        .then(async (response) => {
          await this.limpia();
          this.emailAntiguo = "";
          this.$emit("menu", response.data);
        })
        .catch((err) => {
          alert("Se ha producido el siguiente error: " + err);
        });
    },
    async limpia() {
      const borrar = document.getElementsByTagName("input");
      for (var i = 0; i < borrar.length; i++) {
        borrar[i].value = "";
      }
      document.formulario4.select.value = "";
    },
    setUsuario(usuario) {
      document.formulario4.nombre.value = usuario.Nombre;
      document.formulario4.apellido1.value = usuario.Apellido1;
      document.formulario4.apellido2.value = usuario.Apellido2;
      document.formulario4.nif.value = usuario.NIF;
      document.formulario4.telefono.value = usuario.telefono;
      document.formulario4.correo.value = usuario.email;
      this.emailAntiguo = usuario.email;
    },

    async salir(response) {
      await this.limpia();
      this.$emit("menu", response.data);
    },
  },
};
</script>

<style scoped>
.titulo {
  position: absolute;
  background-color: #333;
  height: 7vh;
  width: 100%;
  color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

form {
  position: absolute;
  top: 0vh;
  width: 100%;
  left: 0vw;
}

form input,
form select {
  margin-top: 3vh;
  height: 4vh;
  width: 15vw;
  border-radius: 10px;
}

.divTitular {
  position: relative;
  display: flex;
  margin-top: 2vh;
  height: 4vh;
}

.divTitular label {
  position: absolute;
  margin-top: 0.6vh;
  margin-left: 3vw;
  width: 8vw;
}

.data {
  display: flex;
  width: 90%;
  margin-left: 5%;
}

.datos {
  width: 32%;
  margin-left: 1%;
  margin-top: 10px;
  height: 40vh;
  padding: 10px;
}

.datos select {
  margin-top: 11vh;
}

.salir {
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  right: 10px;
  top: 10px;
  background: #333;
  color: white;
  font-weight: bold;
  z-index: 20;
}
</style>
