<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form
      name="formBorrarCurso"
      class="formBorrarCurso"
      @submit="eliminarCurso"
    >
      <h1>Eliminar un Curso</h1>
      <select value="Curso" name="borrarCurso">
        <option
          v-for="(curso, index) in relacionCursos"
          :index="index"
          :key="index"
          @click="setCurso(curso)"
        >
          {{ curso.idCurso }} - {{ curso.nivel }} - {{ curso.facultad }}
          {{ curso.grado }}
        </option>
      </select>
      <input type="submit" value="Eliminar" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EliminadoCurso",
  data: () => ({
    idCurso: -1,
  }),
  props: {
    relacionCursos: {
      type: Array,
    },
  },
  methods: {
    eliminarCurso(event) {
      event.preventDefault();
      axios
        .delete("http://localhost:5050/cursos", {
          params: {
            id: this.id,
          },
        })
        .then((response) => {
          this.id = "";
          document.formBorrarCurso.borrarCurso.value = "";
          this.salir(response);
        });
    },

    salir(response) {
      this.$emit("menu", response.data);
    },
    setCurso(curso) {
      console.log(curso);
      alert("Desea borrar al Curso " + curso.nivel + " de " + curso.grado);
      this.id = curso.id;
    },
  },
};
</script>

<style scoped>
.formEliminarCurso {
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

