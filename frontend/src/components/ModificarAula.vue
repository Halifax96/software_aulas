<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form
      name="formAulaModificar"
      class="formAulaNueva"
      @submit="modificarAula"
    >
      <h1>Modificar un aula</h1>
      <select value="Edificio" class="entrada">
        <option value="Seleccione Aula">Seleccione Aula</option>
        <option
          v-for="(aula, index) in relacionAulas"
          :index="index"
          :key="index"
          @click="setAula(aula)"
        >
          {{ aula.numero_aula }} ({{ aula.edificio }})
        </option>
      </select>
      <input
        type="text"
        name="modifAulaNumero"
        class="entrada"
        :value="numero"
      />
      <input type="text" name="modifAulaAforo" class="entrada" :value="aforo" />
      <select
        value="Edificio"
        name="modifAulaEdificio"
        id="edificio"
        class="entrada"
      >
        <option>{{ edificio }}</option>
        <option
          v-for="(edificio, index) in edificios"
          :index="index"
          :key="index"
          @click="setEdificio(edificio.nombre)"
        >
          {{ edificio.nombre }}
        </option>
      </select>

      <input type="submit" value="Modificar" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CambiadoAula",
  data: () => ({
    aulas: [],
    edificios: [],
    id: "",
    edificio: "",
    numero: "",
    aforo: "",
  }),
  props: {
    relacionAulas: {
      type: Array,
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
    setAula(aula) {
      console.log(aula);
      this.id = aula.idaula;
      this.edificio = aula.edificio;
      this.numero = aula.numero_aula;
      this.aforo = aula.aforo;
      document.getElementById("edificio").value = aula.edificio;
    },
    setEdificio(valor) {
      this.edificio = valor;
    },
    modificarAula(event) {
      event.preventDefault();
      var borrar = document.getElementsByClassName("entrada");

      if (this.id === "") {
        alert("Seleccione un aula");
      } else {
        axios
          .put("http://localhost:5050/aulas", {
            id: this.id,
            edificio: this.edificio,
            aforo: document.formAulaModificar.modifAulaAforo.value,
            numero: document.formAulaModificar.modifAulaNumero.value,
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
.formAulaNueva {
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
