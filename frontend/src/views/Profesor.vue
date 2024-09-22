<template>
  <div class="Registro">
    <article class="articulo">
      <div class="titulo">
        <h1>Hola profesor {{ profesor.idprofesor }}</h1>
      </div>
      <form name="formulario">
        <div v-if="menu == 'menu'" class="data">
          <article class="menuPrincipal">
            <h1>Menu</h1>
            <button @click="GSalir()">Salir</button>
          </article>
          <article class="datos">
            <h1>Opciones de profesor</h1>

            <div class="botonesProfe">
              <button @click="reservar()">Reservar aula</button>
              <button @click="anula()">Anular reserva</button>
              <button @click="ver()">Ver reservas</button>
              <button @click="estudiantes()">Lista estudiantes</button>
              <button @click="falta()">Poner falta</button>
            </div>
          </article>
        </div>
        <AnularReservaProfesor
          v-show="menu == 'anuladoReserva'"
          :relacionReservas="reservas"
          :relacionAulas="aulas"
          :relacionHoras="horas"
          @menu="cierraMenu"
          @getReservas="reservasPorFecha"
        ></AnularReservaProfesor>

        <ReservarHora
          v-show="menu == 'nuevaReserva'"
          :relacionReservas="reservas"
          :relacionAulas="aulas"
          :relacionHoras="horas"
          :profesor="profesor.idprofesor"
          @menu="cierraMenu"
          @getReservas="reservasPorFecha"
        ></ReservarHora>

        <VerReservas
          v-show="menu == 'verReservas'"
          :relacionReservas="reservas"
          :relacionAulas="aulas"
          :profesor="profesor.idprofesor"
          @menu="cierraMenu"
          @getReservas="reservasPorFecha"
        ></VerReservas>
      </form>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import AnularReservaProfesor from "../components/AnularReservaProfesor";
import ReservarHora from "../components/NuevaReserva";
import VerReservas from "../components/VerReservas";
export default {
  name: "RegistroApp",
  components: {
    AnularReservaProfesor,
    ReservarHora,
    VerReservas,
  },
  data: () => ({
    opcionMenu: "",
    menu: "menu",
    profesor: 0,
    idUsuario: -1,
    aulas: [],
    reservas: [],
    horas: [],
  }),
  mounted() {
    this.idUsuario = localStorage.getItem("usuario");
    this.buscaProfesor();
  },
  methods: {
    buscaProfesor() {
      axios
        .get("http://localhost:5050/profesor/id", {
          params: {
            idUsuario: this.idUsuario,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.profesor = response.data;
        });
    },
    GAulas() {
      this.opcionMenu = "Aulas";
    },
    GUsuarios() {
      this.opcionMenu = "Usuarios";
    },
    GOperaciones() {
      this.opcionMenu = "Operaciones";
    },
    GSalir() {
      localStorage.clear();
      this.$router.push("/");
    },
    cierraMenu(dev) {
      if (dev !== undefined) alert(dev);
      this.menu = "menu";
    },
    async cargarAulas() {
      await axios.get("http://localhost:5050/aulas", {}).then((response) => {
        console.log(response.data);
        this.aulas = [];
        this.aulas = response.data;
      });
    },
    async cargaReservas() {
      await axios.get("http://localhost:5050/reservas", {}).then((response) => {
        console.log(response.data);
        this.reservas = [];
        this.reservas = response.data;
      });
      this.horas = [];
      for (var i = 8; i < 15; i++) {
        this.horas.push({ hora: i, reservada: 0, idReserva: -1 });
        this.horas.push({ hora: i + 7, reservada: 0, idReserva: -1 });
      }
    },
    reservasPorFecha(dia, mes, anio, aula) {
      axios
        .get("http://localhost:5050/reservas/fecha", {
          params: {
            year: anio,
            month: mes,
            day: dia,
            aula: aula,
          },
        })
        .then((response) => {
          this.reservas = response.data;
          for (var j = 0; j < this.horas.length; j++) {
            this.horas[j].reservada = 0;
          }
          for (var i = 0; i < this.reservas.length; i++) {
            var horaInicio = this.reservas[i].hora_inicio;
            for (j = 0; j < this.horas.length; j++) {
              //console.log(this.horas[j].hora + " " + horaInicio);
              if (this.horas[j].hora == horaInicio.split(":")[0]) {
                this.horas[j].reservada = 1;
                this.horas[j].idReserva = this.reservas[i].idreserva;
              }
              console.log(this.horas[j].reservada);
            }
          }
        });
    },
    async reservar() {
      await this.cargarAulas();
      await this.cargaReservas();
      this.menu = "nuevaReserva";
    },
    async anula() {
      await this.cargarAulas();
      await this.cargaReservas();
      this.menu = "anuladoReserva";
    },
    async ver() {
      await axios
        .get("http://localhost:5050/reservas/profesor", {
          params: { profesor: this.profesor.idprofesor },
        })
        .then((response) => {
          console.log(response.data);
          this.reservas = [];
          this.reservas = response.data;
        });
      await this.cargarAulas();
      for (var i = 0; i < this.reservas.length; i++) {
        var ida = this.reservas[i].aula;
        for (var j = 0; j < this.aulas.length; j++) {
          if (this.aulas[j].idaula == ida) {
            this.reservas[i].aula = this.aulas[j];
          }
        }
        console.log("****************************");
        console.log(this.reservas);
      }

      this.menu = "verReservas";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.articulo {
  position: relative;
  top: 10vh;
  height: 60vh;
  width: 60vw;
  left: 20vw;
  display: block;

  border-radius: 20px;
  box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.6);
  background-color: #ccc;
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
  top: 7vh;
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

.data {
  display: flex;
  width: 90%;
  margin-left: 5%;
}

.menuPrincipal {
  display: block;
  width: 32%;
  margin-left: 1%;
  margin-top: 10px;
  height: 40vh;
  border-style: solid;
  border-color: #ddd;
  border-radius: 10px;
  padding: 10px;
}

.menuPrincipal button {
  width: 15vw;
  height: 4vh;
  margin-top: 5vh;
}

.datos {
  position: relative;
  display: flex;
  margin-top: 10px;
  width: 90%;
  margin-left: 5%;
  border-style: solid;
  border-color: #ddd;
  border-radius: 10px;
  padding: 10px;
}

.botonesProfe {
  position: absolute;
  margin-top: 10%;
  height: 80%;
  width: 95%;
  display: inline-block;
  margin-left: -5%;
}

.botonesProfe button {
  margin-top: 5%;
  margin-left: 10%;
  width: 30%;
  height: 30px;
}
</style>