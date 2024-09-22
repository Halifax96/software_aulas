<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form
      name="formBorrarReserva"
      class="formBorrarReserva"
      @submit="eliminarReserva"
    >
      <article class="datos">
        <select value="aula" class="entrada">
          <option value="Seleccione el aula">Seleccione Aula</option>
          <option
            v-for="(aula, index) in relacionAulas"
            :index="index"
            :key="index"
            @click="setAula(aula)"
          >
            {{ aula.numero_aula }} ({{ aula.edificio }})
          </option>
        </select>

        <label>Año de la reserva</label>
        <input
          type="number"
          min="2024"
          max="2356"
          value="2024"
          name="anio"
          @click="carga"
        />
        <label>Mes de la reserva</label>
        <input
          type="number"
          min="1"
          max="12"
          value="1"
          name="mes"
          @click="carga"
        />
        <label>Día de la reserva</label>
        <input
          type="number"
          min="1"
          max="31"
          value="1"
          name="dia"
          @click="carga"
        />
      </article>
      <article class="calendario">
        <div
          v-for="(hora, i) in relacionHoras"
          :index="i"
          :key="i"
          class="hora"
          @click="marcarBorrar(i)"
        >
          <p v-if="hora.reservada === 0" class="nReservada">
            {{ hora.hora }}:00
          </p>
          <p v-else class="reservada">{{ hora.hora }}:00</p>
        </div>
      </article>
      <!--input type="submit" :value="horaBorrar" /-->
    </form>
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

.datos {
  display: block;
  width: 32%;
  margin-left: 1%;
  margin-top: 10px;
  height: 40vh;
  border-radius: 10px;
  padding: 10px;
}

.calendario {
  width: 90%;
  margin-left: 1%;
  margin-top: 10px;
  height: 40vh;
  border-radius: 10px;
  padding: 10px;
  display: grid;
  grid-template-columns: 48% 48%;
}

.hora {
  width: 95%;
  height: 80%;
  margin-left: 20px;
}

.hora:hover {
  background: rgb(255, 183, 0);
}

p {
  margin-top: -1px;
  width: 100%;
  padding-top: 4%;
  height: 80%;
}

.nReservada {
  background: #0f04;
}

.reservada {
  background: #f004;
}
</style>
