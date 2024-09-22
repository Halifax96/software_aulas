<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form
      name="fomEliminarUsuario"
      class="formBorrarusuario"
      @submit="eliminarUsuario"
    >
      <h1>Eliminar un usuario</h1>
      <select value="Usuario" name="borrarUsuario">
        <option
          v-for="(usuario, index) in relacionUsuarios"
          :index="index"
          :key="index"
          @click="setUsuario(usuario)"
        >
          {{ usuario.idUsuario }} {{ usuario.Nombre }} {{ usuario.Apellido1 }}
          {{ usuario.email }}
        </option>
      </select>
      <input type="submit" value="Eliminar" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EliminadoUsuario",
  data: () => ({
    email: "",
  }),
  props: {
    relacionUsuarios: {
      type: Array,
    },
  },
  methods: {
    eliminarUsuario(event) {
      alert(this.email);
      event.preventDefault();
      axios
        .delete("http://localhost:5050/usuario", {
          params: {
            email: this.email,
          },
        })
        .then((response) => {
          this.salir(response);
        });
    },

    salir(response) {
      this.$emit("menu", response.data);
    },
    setUsuario(usuario) {
      console.log(usuario);
      alert("Desea borrar al usuario " + usuario.email);
      this.email = usuario.email;
    },
  },
};
</script>

<style scoped>
.formEliminarUsuario {
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
