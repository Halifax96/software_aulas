<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form
      name="formAsignaturaNueva"
      class="formAsignaturaNueva"
      @submit="nuevaAsignatura"
    >
      <h1>Alta de Asignatura nueva</h1>
      <input
        type="text"
        placeHolder="Nombre"
        name="altaAsignaturaNombre"
        required
      />

      <select
        value="Edificio"
        name="altaAsignaturaCurso"
        placeholder="Seleccione curso"
      >
        <option>Seleccione Curso</option>
        <option
          v-for="(curso, index) in relacionCursos"
          :index="index"
          :key="index"
          @click="setCurso(curso)"
        >
          {{ curso.grado }}
        </option>
      </select>

      <input
        type="text"
        placeHolder="Departamento"
        name="altaAsignaturaDepartamento"
        required
      />
      <input type="submit" value="Nueva Asignatura" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NuevaAsignatura",
  data: () => ({
    edificios: [],
    edificio: "",
    curso: Object,
  }),
  props: {
    relacionCursos: {
      type: Array,
    },
  },
  methods: {
    setCurso(valor) {
      this.curso = valor;
    },
    nuevaAsignatura(event) {
      event.preventDefault();
      if (this.curso === "") alert("No se ha seleccionado un curso");
      else {
        axios
          .post("http://localhost:5050/asignaturas", {
            nombre: document.formAsignaturaNueva.altaAsignaturaNombre.value,
            curso: this.curso.id,
            departamento:
              document.formAsignaturaNueva.altaAsignaturaDepartamento.value,
          })
          .then((response) => {
            console.log(response);
            this.salir(response);
          })

          .catch((err) => {
            console.log(err);
            this.$emit(
              "menu",
              "Hay un error al registrar la asignatura, compruebe que no está repetida"
            );
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
.formAsignaturaNueva {
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
