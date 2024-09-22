<template>
  <div class="login">
    <article class="articulo">
      <div class="titulo">
        <h1>Login</h1>
      </div>
      <form name="formulario" @submit="identifica">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="pass" placeholder="Contraseña" />
        <div class="botones">
          <label @click="registra()">Soy nuevo</label>
          <input type="submit" value="Acceder" />
        </div>
      </form>
    </article>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginApp",
  props: {
    msg: String,
  },
  methods: {
    async identifica(event) {
      event.preventDefault();
      const email = document.formulario.email.value;
      const pass = document.formulario.pass.value;
      axios
        .get("http://localhost:5050/usuario/login", {
          params: {
            email: email,
            contrasena: pass,
          },
        })
        .then((response) => {
          localStorage.setItem("usuario", response.data[0].idUsuario);
          if (response.status === 200) {
            if (response.data[0].rol === "E") {
              this.abrirEstudiante();
            } else if (response.data[0].rol === "P") {
              this.abrirProfesor();
            } else {
              this.abrirAdministrador();
            }
          }
        })
        .catch((err) => {
          alert("Usuario o contraseña incorrectos");
          console.log(err);
        });
    },
    registra() {
      this.$router.push("/registro");
    },
    abrirEstudiante() {
      this.$router.push("/estudiante");
    },
    abrirProfesor() {
      this.$router.push("/profesor");
    },
    abrirAdministrador() {
      this.$router.push("/administrador");
    },
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

article {
  position: relative;
  top: 25vh;
  height: 35vh;
  width: 20vw;
  left: 40vw;
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
  width: 17vw;
  left: 1.5vw;
}

form input {
  margin-top: 3vh;
  height: 4vh;
  width: 15vw;
  border-radius: 10px;
}

.botones {
  display: inline;
  width: 100%;
}

.botones input {
  width: 8vw;
  margin-left: 3vw;
}

.botones label:hover {
  color: #099;
  text-decoration: underline;
}
</style>
