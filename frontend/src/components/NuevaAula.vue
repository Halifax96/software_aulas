<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form name="formAulaNueva" class="formAulaNueva" @submit="nuevaAula">
      <h1>Alta de aula nueva</h1>
      <input type="text" placeHolder="Número" name="altaAulaNumero" required />
      <input type="text" placeHolder="Aforo" name="altaAulaAforo" required />
      <select value="Edificio" name="altaAulaEdificio">
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
      <input type="submit" value="Nueva aula" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NuevaAula",
  data: () => ({
    edificios: [],
    edificio: "",
  }),
  props: {},
  mounted() {
    this.cargaEdificios();
  },
  methods: {
    cargaEdificios() {
      axios.get("http://localhost:5050/edificios", {}).then((response) => {
        this.edificios = response.data;
      });
    },
    setEdificio(valor) {
      this.edificio = valor;
    },
    nuevaAula(event) {
      event.preventDefault();
      if (this.edificio === "") alert("No se ha seleccionado un edificio");
      else {
        axios
          .post("http://localhost:5050/aulas", {
            numero: document.formAulaNueva.altaAulaNumero.value,
            aforo: document.formAulaNueva.altaAulaAforo.value,
            edificio: this.edificio,
          })
          .then((response) => {
            console.log(response);
            this.salir(response);
          })

          .catch((err) => {
            console.log(err);
            this.$emit(
              "menu",
              "Hay un error al registrar el aula, compruebe que no está repetida"
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
