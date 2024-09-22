<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form
      name="formAsignaturasModificar"
      class="formAsignaturasNueva"
      @submit="modificarAsignaturas"
    >
      <h1>Modificar una Asignatura</h1>
      <select
        value="Asignaturas"
        class="entrada"
        name="modificarAsignaturaNombre"
      >

        <option value="Seleccione Asignatura a modificar">
          Seleccione asignaturas a modificar
        </option>
        <option
          v-for="(Asignatura, index) in relacionAsignaturas"
          :index="index"
          :key="index"
          @click="setAsignaturas(Asignatura)"
        >

          {{ Asignatura.idasignatura }}: {{ Asignatura.nombre }} ({{
            Asignatura.grado
          }})

        </option>
      </select>
      <input
        type="text"
        name="modificarAsignaturaDepartamento"

        class="entrada"
        :value="numero"
        placeHolder="Departamento"
      />

      <select
        name="modificarAsignaturaCurso"
        id="edificio"
        class="entrada"
        value=""

      >
        <option>Seleccione curso</option>
        <option
          v-for="(curso, index) in relacionCursos"
          :index="index"
          :key="index"
          @click="setCurso(curso)"
        >
          {{ curso.facultad }} --------- {{ curso.grado }}

        </option>
      </select>

      <input type="submit" value="Modificar" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CambiadoAsignaturas",
  data: () => ({
<<<<<<< HEAD
    materia: Object,
    cursos: Array,
    curso: Object,
=======
    id: "",
>>>>>>> f95f0f829a9387b02076e728e5b6c3aec870034c
  }),
  props: {
    relacionAsignaturas: {
      type: Array,
    },
    relacionCursos: {
      type: Array,
    },
  },
  mounted() {
<<<<<<< HEAD
    this.cargaCursos();
  },
  methods: {
    nombre(curso) {
      axios
        .get("http://localhost:5050/cursos/curso", {
          params: {
            id: curso,
          },
        })
        .then((response) => {
          console.log(response.data);
          return response.data[0].grado;
        });
    },

    async cargaCursos() {
      await axios.get("http://localhost:5050/cursos", {}).then((response) => {
        this.cursos = response.data;
      });
    },
    async setCurso(curso) {
      this.cargaCursos();
      this.curso = curso;
      console.log(this.curso);
    },
    setAsignaturas(asignatura) {
      var curso = Object;
      for (var i = 0; i < this.cursos.length; i++) {
        if (this.relacionCursos[i].id === asignatura.curso)
          curso = this.relacionCursos[i];
      }
      console.log(curso);
      this.materia = asignatura;
      document.formAsignaturasModificar.modificarAsignaturaDepartamento.value =
        this.materia.departamento;
      document.formAsignaturasModificar.modificarAsignaturaCurso.value =
        this.curso.facultad;
=======
    this.cargaEdificios();
  },
  methods: {
    cargaEdificios() {
      axios.get("http://localhost:5050/edificios", {}).then((response) => {
        this.edificios = response.data;
      });
    },
    setAsignaturas(asignatura) {
      this.id = asignatura.idasignaturas;
>>>>>>> f95f0f829a9387b02076e728e5b6c3aec870034c
    },
    modificarAsignaturas(event) {
      event.preventDefault();
      var borrar = document.getElementsByClassName("entrada");
<<<<<<< HEAD
      alert(this.curso.id);
=======

>>>>>>> f95f0f829a9387b02076e728e5b6c3aec870034c
      if (this.id === "") {
        alert("Seleccione una asignaturas");
      } else {
        axios
          .put("http://localhost:5050/asignaturas", {
<<<<<<< HEAD
            id: this.materia.idasignatura,
            nombre: this.materia.nombre,
            curso: this.curso.id,
            departamento:
              document.formAsignaturasModificar.modificarAsignaturaDepartamento
                .value,
=======
            id: this.id,
            nombre: document.formAsignaturasModificar.nombre.value,
            curso: document.formAsignaturasModificar.modifAsignaturaCurso.value,
            departamento:
              document.formAsignaturasModificar.modifAsignaturasNumero.value,
>>>>>>> f95f0f829a9387b02076e728e5b6c3aec870034c
          })
          .then((response) => {
            console.log(response);
            for (var i = 0; i < borrar.length; i++) {
              borrar[i].value = "";
            }
            this.aforo = "";
            this.numero = "";
            this.salir(response);
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
.formAsignaturasNueva {
  width: 40%;
  margin-left: 30%;
  margin-top: 0%;
}

.submenu input,
.submenu select {
  width: 90%;
  height: 30px;
  margin-top: 3vh;
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
