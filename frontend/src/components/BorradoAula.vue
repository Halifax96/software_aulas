<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form name="fomAulaNueva" class="formAulaNueva" @submit="eliminarAula">
      <h1>Eliminar un aula</h1>
      <select value="Edificio" name="altaAulaEdificio">
        <option
          v-for="(aula, index) in relacionAulas"
          :index="index"
          :key="index"
          @click="setAula(aula)"
        >
          {{ aula.idaula }} ({{ aula.edificio }})
        </option>
      </select>
      <input type="submit" value="Eliminar" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EliminadoAula",
  data: () => ({
    numero: 0,
    edificio: "",
  }),
  props: {
    relacionAulas: {
      type: Array,
    },
  },
  methods: {
    eliminarAula(event) {
      event.preventDefault();
      axios
        .delete("http://localhost:5050/aulas", {
          params: {
            numero: this.numero,
            edificio: this.edificio,
          },
        })
        .then((response) => {
          this.salir(response);
        });
    },

    salir(response) {
      this.$emit("menu", response.data);
    },
    setAula(aula) {
      console.log(aula);
      alert(aula.numero_aula);
      this.numero = aula.numero_aula;
      this.edificio = aula.edificio;
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
