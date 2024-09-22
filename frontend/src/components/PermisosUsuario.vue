<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form
      name="formPermisoNueva"
      class="formPermisoNueva"
      @submit="nuevoPermiso"
    >
      <h1>Permisos de usuario</h1>
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
      <div class="check">
        <input type="radio" name="rol" value="E" />
        <label> Estudiante</label>
      </div>
      <div class="check">
        <input type="radio" name="rol" value="P" />
        <label> Profesor</label>
      </div>
      <div class="check">
        <input type="radio" name="rol" value="A" />
        <label> Administrador</label>
      </div>
      <input type="submit" value="Cambiar permisos" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PermisosUsuario",
  data: () => ({
    email: "",
  }),
  props: {
    relacionUsuarios: {
      type: Array,
    },
  },
  methods: {
    setUsuario(usuario) {
      document.querySelector(
        ".check > [value=" + usuario.rol + "]"
      ).checked = true;
      this.email = usuario.email;
    },

    nuevoPermiso(event) {
      event.preventDefault();

      const c = document.querySelector('input[name="rol"]:checked');
      console.log(c);
      if (this.edificio === "") alert("No se ha seleccionado un edificio");
      else {
        axios
          .put("http://localhost:5050/usuario/permisos", {
            email: this.email,
            rol: document.querySelector('input[name="rol"]:checked').value,
          })
          .then((response) => {
            this.salir(response);
          })

          .catch((err) => {
            console.log(err);
            this.$emit("menu", err.data);
          });
      }
    },
    salir(response) {
      this.$emit("menu", response.data);
    },
  },
};
</script>

<style scoped>
.formPermisoNueva {
  width: 40%;
  margin-left: 30%;
  margin-top: 0%;
}

.submenu input,
.submenu select {
  width: 90%;
  height: 30px;
  margin-top: 4vh;
}

.check {
  width: 100%;
  height: 6vh;
  display: flex;
  text-align: left;
  position: relative;
}

.check input,
.check label {
  margin-top: 10px;
  position: absolute;
  margin-left: 10%;
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
}
</style>
