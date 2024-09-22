<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form name="formulario6" @submit="nuevoCurso">
      <div class="data">
        <article class="datos">
          <h1>Actualizar Curso</h1>
          <select>
            <option
              v-for="(curso, index) in relacionCursos"
              :key="index"
              :index="index"
              @click="rellenaCampos(curso)"
            >
              {{ curso.facultad }} ----------- {{ curso.grado }}
            </option>
          </select>
          <input
            type="text"
            name="nivel"
            placeholder="Nivel"
            required
            class="entrada"
          />

          <select
            value="Edificio"
            name="cursoEdificio"
            required
            class="entrada"
          >
            <option>Seleccione edificio</option>
            <option
              v-for="(edificio, index) in edificios"
              :index="index"
              :key="index"
              @click="setEdificio(edificio.nombre)"
            >
              {{ edificio.nombre }}
            </option>
          </select>

          <input
            type="text"
            name="grado"
            placeholder="Grado"
            required
            class="entrada"
          />
        </article>
      </div>
      <input type="submit" value="Nuevo curso" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NuevoUsuario",
  data: () => ({
    edificios: Array,
    edificio: String,
    id: Number,
    grado: String,
  }),
  props: {
    relacionCursos: {
      type: [],
    },
  },
  mounted() {
    this.cargaEdificios();
  },
  methods: {
    cargaEdificios() {
      axios.get("http://localhost:5050/edificios", {}).then((response) => {
        this.edificios = response.data;
      });
    },
    setEdificio(edificio) {
      this.edificio = edificio;
    },
    async nuevoCurso(event) {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target));
      var borrar = document.getElementsByClassName("entrada");
      await axios
        .put("http://localhost:5050/cursos", {
          id: this.id,
          nivel: data.nivel,
          facultad: this.edificio,
          grado: data.grado,
        })
        .then((response) => {
          for (var i = 0; i < borrar.length; i++) {
            borrar[i].value = "";
          }

          this.salir(response);
        })
        .catch((err) => {
          alert("Se ha producido el siguiente error: " + err);
        });
    },
    rellenaCampos(curso) {
      this.id = curso.id;
      this.edificio = curso.facultad;
      this.grado = curso.grado;
      document.formulario6.nivel.value = curso.nivel;
      document.formulario6.cursoEdificio.value = curso.facultad;
      document.formulario6.grado.value = curso.grado;
    },

    salir(response) {
      this.$emit("menu", response.data);
    },
  },
};
</script>

<style scoped>
.articulo {
  position: relative;
  top: 10vh;
  height: 60vh;
  width: 60vw;
  left: 20vw;
  display: block;
}

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

form input[type="checkbox"] {
  position: absolute;
  top: -3vh;
  width: 2vw;
}

.data {
  display: flex;
  width: 90%;
  margin-left: 5%;
}

.datos {
  width: 32%;
  margin-left: 33%;
  margin-top: 10px;
  height: 40vh;
  padding: 10px;
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
