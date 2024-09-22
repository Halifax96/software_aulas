<template>
  <div class="Registro">
    <article class="articulo">
      <div class="titulo">
        <h1>Administración</h1>
      </div>
      <form name="formulario">
        <div class="data">
          <article class="menuPrincipal">
            <h1>Menu</h1>
            <button @click="GSalir()">Salir</button>
          </article>
          <article class="datos">
            <h1>Opciones de estudiante</h1>

            <div class="botonesProfe">
              <button @click="perfil()">Perfil</button>
              <button @click="inscribirseAsignatura()">
                Inscribirse en asignatura
              </button>
              <button @click="cancelarInscripcion()">
                Cancelar inscripcion
              </button>
            </div>
          </article>
        </div>
        <input type="submit" />
      </form>
    </article>
  </div>
</template>

<script>
export default {
  name: "RegistroApp",
  props: {
    msg: String,
  },
  data: () => ({
    opcionMenu: "",
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
    perfil() {},
    inscribirseAsignatura() {},
    cancelarInscripcion() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
