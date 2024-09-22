<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form
      name="fomAsignaturaNueva"
      class="formAsignaturaNueva"
      @submit="eliminarAsignatura"
    >
      <h1>Eliminar una asignatura</h1>
      <select value="Edificio" name="altaAsignaturaEdificio">
        <option
          v-for="(asignatura, index) in relacionAsignaturas"
          :index="index"
          :key="index"
          @click="setAsignatura(asignatura)"
        >
          {{ asignatura.idasignatura }} ({{ asignatura.nombre }})
        </option>
      </select>
      <input type="submit" value="Eliminar" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EliminadoAsignatura",
  data: () => ({
    id: 0,
  }),
  props: {
    relacionAsignaturas: {
      type: Array,
    },
  },
  methods: {
    eliminarAsignatura(event) {
      event.preventDefault();
      axios
        .delete("http://localhost:5050/asignaturas", {
          params: {
            id: this.id,
          },
        })
        .then((response) => {
          this.salir(response);
        });
    },

    salir(response) {
      this.$emit("menu", response.data);
    },
    setAsignatura(asignatura) {
      this.id = asignatura.idasignatura;
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
