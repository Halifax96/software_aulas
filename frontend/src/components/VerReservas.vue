<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <div name="formBorrarReserva" class="Reservas" @submit="eliminarReserva">
      <article class="datos">
        <div
          v-for="(reserva, index) in relacionReservas"
          :key="index"
          class="reserva"
        >
          <input
            type="text"
            disabled
            class="numero"
            :value="reserva.aula.numero_aula"
          />
          <input
            type="text"
            disabled
            class="letras"
            :value="reserva.aula.edificio"
          />
          <input
            type="text"
            disabled
            class="letras"
            :value="reserva.fecha_reserva"
          />
          <input
            type="text"
            disabled
            class="numero"
            :value="reserva.hora_inicio"
          />
          <input
            type="text"
            disabled
            class="numero"
            :value="reserva.hora_fin"
          />
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EliminadoReserva",
  data: () => ({
    idReserva: -1,
    aula: null,
    horaBorrar: "Seleccione reserva en el horario ",
  }),
  props: {
    relacionReservas: {
      type: Array,
    },
    relacionAulas: {
      type: Array,
    },
    relacionHoras: {
      type: Array,
    },
  },
  methods: {
    async carga() {
      if (this.aula != null) {
        //var horas = document.querySelector(".horas");
        var anio = document.formBorrarReserva.anio.value;
        var mes = document.formBorrarReserva.mes.value;
        var dia = document.formBorrarReserva.dia.value;
        this.$emit("getReservas", dia, mes, anio, this.aula.idaula);
      } else alert("Seleccione aula");
    },

    eliminarReserva(event) {
      event.preventDefault();
      axios
        .delete("http://localhost:5050/reservas", {
          params: {
            idReserva: this.idReserva,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.id = "";
            this.salir("reserva anulada");
          }
        });
    },

    salir(response) {
      this.$emit("menu", response.data);
    },
    setReserva(reserva) {
      console.log(reserva);
      alert(
        "Desea borrar al Reserva " + reserva.nivel + " de " + reserva.grado
      );
      this.id = reserva.id;
    },
    setAula(aula) {
      this.aula = aula;
    },
    marcarBorrar(i) {
      if (this.relacionHoras[i].reservada === 1) {
        this.idReserva = this.relacionHoras[i].idReserva;
        this.horaBorrar = "Anular reserva de las " + this.relacionHoras[i].hora;
      } else {
        alert("No puede anular una reserva que no está hecha");
        this.horaBorrar = "Seleccione reserva en el horario";
      }
    },
  },
};
</script>

<style scoped>
.formBorrarReserva {
  display: flex;
  width: 90%;
  margin-left: 1%;
  margin-top: 0%;
}

.submenu input[type="number"],
.submenu select {
  width: 90%;
  height: 30px;
  margin-top: 1vh;
  margin-bottom: 3vh;
}

input[type="submit"] {
  position: absolute;
  bottom: -6vh;
  width: 30vw;
  height: 4vh;
  margin-left: 27%;
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

.datos[data-v-71c2b27e] {
  display: block;
  width: 90%;
  margin-left: 1%;
  margin-top: 10px;
  height: 40vh;
  border-radius: 10px;
  padding: 10px;
}
.calendario[data-v-71c2b27e] {
  width: 90%;
  margin-left: 1%;
  margin-top: 10px;
  height: 40vh;
  border-radius: 10px;
  padding: 10px;
  display: grid;
  grid-template-columns: 48% 48%;
}
.numero {
  width: 10%;
  text-align: center;
  color: black;
}
.letras {
  width: 40%;
  color: black;
}
.Reservas {
  width: 90%;
  overflow-y: scroll;
  overflow-x: hiddens;
}
.reserva {
  display: flex;
  width: 100%;
}
</style>
