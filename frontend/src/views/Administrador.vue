<template>
  <div class="Registro">
    <article class="articulo">
      <div class="titulo">
        <h1>Administración</h1>
      </div>
      <form name="formulario">
        <div v-if="menu == 'menu'" class="data">
          <article class="menuPrincipal">
            <h1>Menu</h1>
            <button @click="GAulas()">Gestionar aulas</button>
            <button @click="GUsuarios()">Gestionar usuarios</button>
            <button @click="GOperaciones()">Operaciones</button>
            <button @click="GSalir()">Salir</button>

          </article>
          <article class="datos">
            <h1>{{ opcionMenu }}</h1>
            <div v-if="opcionMenu == 'Aulas'" class="botonesAdmin">
              <button @click="altaAula()">Alta aula</button>
              <button @click="modificaAula()">Modificar aula</button>
              <button @click="bajaAula()">Baja aula</button>
            </div>
            <div v-else-if="opcionMenu == 'Usuarios'" class="botonesAdmin">
              <button @click="altaUsuario()">Alta Usuario</button>
              <button @click="bajaUsuario()">Baja Usuario</button>
              <button @click="modificaUsuario()">Modificar Usuario</button>
              <button @click="permisosUsuario()">Cambiar privilegios</button>
            </div>
            <div v-else-if="opcionMenu == 'Operaciones'" class="botonesAdmin">
              <button @click="altaCurso()">Crear curso</button>
              <button @click="altaAsignatura()">Crear asignatura</button>
              <button @click="modificarCurso()">Modificar curso</button>
              <button @click="modificarAsignatura()">
                Modificar asignatura
              </button>
              <button @click="eliminarCurso()">Eliminar curso</button>
              <button @click="eliminarAsignatura()">Eliminar asignatura</button>
              <button @click="anula()">Anular reserva</button>
            </div>
            <div v-else>
              <h1>Seleccione una opción de la izquierda</h1>
            </div>
          </article>
        </div>

        <NuevaAula v-show="menu == 'altaAula'" @menu="cierraMenu"></NuevaAula>

        <CambiadoAula
          v-show="menu == 'cambiadoAula'"
          :relacionAulas="aulas"
          @menu="cierraMenu"
        ></CambiadoAula>

        <EliminadoAula
          v-show="menu == 'borradoAula'"
          :relacionAulas="aulas"
          @menu="cierraMenu"
        ></EliminadoAula>

        <NuevoUsuario
          v-show="menu == 'nuevoUsuario'"
          @menu="cierraMenu"
        ></NuevoUsuario>

        <CambiadoUsuario
          v-show="menu == 'cambiadoUsuario'"
          :relacionUsuarios="usuarios"
          @menu="cierraMenu"
        ></CambiadoUsuario>

        <EliminadoUsuario
          v-show="menu == 'borradoUsuario'"
          :relacionUsuarios="usuarios"
          @menu="cierraMenu"
        ></EliminadoUsuario>

        <PermisosUsuario
          v-show="menu == 'permisosUsuario'"
          :relacionUsuarios="usuarios"
          @menu="cierraMenu"
        ></PermisosUsuario>

        <NuevoCurso
          v-show="menu == 'nuevoCurso'"
          :profesores="profesores"

          @menu="cierraMenu"
        ></NuevoCurso>

        <CambiadoCurso
          v-show="menu == 'cambiadoCurso'"
          :relacionCursos="cursos"
          @menu="cierraMenu"
        ></CambiadoCurso>

        <EliminadoCurso
          v-show="menu == 'borradoCurso'"
          :relacionCursos="cursos"
          @menu="cierraMenu"
        ></EliminadoCurso>

        <NuevaAsignatura
          v-show="menu == 'nuevaAsignatura'"
          :relacionCursos="cursos"
          @menu="cierraMenu"
        ></NuevaAsignatura>

        <CambiadoAsignatura
          v-show="menu == 'cambiadoAsignatura'"
          :relacionCursos="cursos"
          :relacionAsignaturas="asignaturas"
          @menu="cierraMenu"
        ></CambiadoAsignatura>

        <EliminadoAsignatura
          v-show="menu == 'borradoAsignatura'"
          :relacionAsignaturas="asignaturas"
          @menu="cierraMenu"
        ></EliminadoAsignatura>
        <AnularReserva
          v-show="menu == 'anuladoReserva'"
          :relacionReservas="reservas"
          :relacionAulas="aulas"
          :relacionHoras="horas"
          @menu="cierraMenu"
          @getReservas="reservasPorFecha"
        ></AnularReserva>

      </form>
    </article>
  </div>
</template>

<script>
import NuevaAula from "../components/NuevaAula";
import CambiadoAula from "../components/ModificarAula";
import EliminadoAula from "../components/BorradoAula";
import NuevoUsuario from "../components/NuevoUsuario";
import CambiadoUsuario from "../components/ModificarUsuario";
import EliminadoUsuario from "../components/BorradoUsuario";
import PermisosUsuario from "../components/PermisosUsuario";
import NuevoCurso from "../components/NuevoCurso";
import CambiadoCurso from "../components/ModificarCurso";
import EliminadoCurso from "../components/BorradoCurso";
import NuevaAsignatura from "../components/NuevaAsignatura";
import CambiadoAsignatura from "../components/ModificarAsignatura";
import EliminadoAsignatura from "../components/BorradoAsignatura";
import AnularReserva from "../components/AnularReserva";

import axios from "axios";
export default {
  name: "RegistroApp",
  components: {
    NuevaAula,
    CambiadoAula,
    EliminadoAula,
    NuevoUsuario,
    CambiadoUsuario,
    EliminadoUsuario,
    PermisosUsuario,
    NuevoCurso,
    EliminadoCurso,
    CambiadoCurso,
    NuevaAsignatura,
    EliminadoAsignatura,
    CambiadoAsignatura,
    AnularReserva,

  },
  data: () => ({
    opcionMenu: "",
    menu: "menu",
    edificios: [],
    aulas: [],
    usuarios: [],
    cursos: [],
    asignaturas: [],
    reservas: [],
    horas: [],
    profesores: [],

  }),
  methods: {
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
    altaAula() {
      this.menu = "altaAula";
    },
    async bajaAula() {
      await this.cargarAulas();
      this.menu = "borradoAula";
    },
    async modificaAula() {
      await this.cargarAulas();
      this.menu = "cambiadoAula";
    },
    async cargarAulas() {
      await axios.get("http://localhost:5050/aulas", {}).then((response) => {
        console.log(response.data);
        this.aulas = [];
        this.aulas = response.data;
      });
    },
    async cargaUsuarios() {
      await axios.get("http://localhost:5050/usuario", {}).then((response) => {
        console.log(response.data);
        this.usuarios = [];
        this.usuarios = response.data;
        console.log(this.usuarios);
      });
    },
    async cargaCursos() {
      await axios.get("http://localhost:5050/cursos", {}).then((response) => {
        console.log(response.data);
        this.cursos = [];
        this.cursos = response.data;
      });
    },
    async cargaAsignaturas() {
      await axios
        .get("http://localhost:5050/asignaturas", {})
        .then((response) => {
          console.log(response.data);
          this.asignaturas = [];
          this.asignaturas = response.data;
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
    async cargaProfesores() {
      await axios.get("http://localhost:5050/profesor", {}).then((response) => {
        console.log(response.data);
        this.profesores = [];
        this.profesores = response.data;
      });
      await axios.get("http://localhost:5050/usuario", {}).then;
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
    altaUsuario() {
      this.menu = "nuevoUsuario";
    },
    async bajaUsuario() {
      await this.cargaUsuarios();
      this.menu = "borradoUsuario";
    },
    async modificaUsuario() {
      await this.cargaUsuarios();
      this.menu = "cambiadoUsuario";
    },
    async permisosUsuario() {
      await this.cargaUsuarios();
      this.menu = "permisosUsuario";
    },
    async altaCurso() {
      await this.cargaProfesores();

      this.menu = "nuevoCurso";
    },
    async modificarCurso() {
      await this.cargaCursos();
      this.menu = "cambiadoCurso";
    },
    async eliminarCurso() {
      await this.cargaCursos();
      this.menu = "borradoCurso";
    },
    async altaAsignatura() {
      await this.cargaCursos();
      console.log(this.cursos);
      this.menu = "nuevaAsignatura";
    },
    async modificarAsignatura() {
      await this.cargaAsignaturas();
      await this.cargaCursos();
      for (var i = 0; i < this.asignaturas.length; i++) {
        for (var j = 0; j < this.cursos.length; j++) {
          if (this.asignaturas[i].curso === this.cursos[j].id) {
            this.asignaturas[i].grado = this.cursos[j].grado;
          }
        }
      }

      this.menu = "cambiadoAsignatura";
    },
    async eliminarAsignatura() {
      await this.cargaAsignaturas();
      this.menu = "borradoAsignatura";
    },
    async anula() {
      await this.cargaReservas();
      await this.cargarAulas();
      this.menu = "anuladoReserva";
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  width: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

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
  margin-top: 4vh;

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

.botonesAdmin {
  position: absolute;
  margin-top: 10%;
  height: 80%;
  width: 95%;
  display: inline-block;
  margin-left: -5%;
}

.botonesAdmin button {
  margin-top: 5%;
  margin-left: 10%;
  width: 35%;
  height: 30px;
}
</style>
