<template>
  <div class="data submenu">
    <button class="salir" @click="salir">X</button>
    <form name="formulario2" @submit="registra">
      <div class="data">
        <article class="datos">
          <h1>Datos personales</h1>
          <input type="text" name="nombre" placeholder="Nombre" required />
          <input
            type="text"
            name="apellido1"
            placeholder="Primer apellido"
            required
          />
          <input type="text" name="apellido2" placeholder="Segundo apellido" />
          <input type="text" name="nif" placeholder="N.I.F./N.I.E." required />
        </article>
        <article class="datos">
          <h1>Contacto y seguridad</h1>
          <input
            type="text"
            name="correo"
            placeholder="Correo electrónico"
            required
          />
          <input type="text" name="telefono" placeholder="Telefono" required />
          <input
            type="password"
            name="contra"
            placeholder="Contraseña"
            required
          />
          <input
            type="password"
            name="contra2"
            placeholder="Repita la contraseña"
            required
          />
        </article>
        <article class="datos">
          <h1>Tipo de cuenta</h1>
          <select value="Tipo de usuario" v-model="tipoUsuario" name="rol">
            <option value="Tipo de usuario">Tipo de Usuario</option>
            <option value="E">E</option>
            <option value="P">P</option>
          </select>
          <div v-if="tipoUsuario == 'E'">
            <input type="text" name="curso" placeholder="Curso" required />
            <input
              type="text"
              name="tutor"
              placeholder="Padre/madre/tutor"
              required
            />
            <input
              type="text"
              name="tlfTutor"
              placeholder="Teléfono tutor"
              required
            />
          </div>
          <div v-else-if="tipoUsuario == 'P'">
            <input
              type="text"
              name="fecha_contrato"
              placeholder="Fecha de contratación"
              required
            />
            <div class="divTitular">
              <input type="checkbox" name="titular" />
              <label for="vehicle3"> Titular del curso</label><br />
            </div>
          </div>
          <div v-else></div>
        </article>
      </div>
      <input type="submit" value="Registrar nuevo usuario" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NuevoUsuario",
  data: () => ({
    tipoUsuario: "Tipo de usuario",
  }),
  props: {},
  methods: {
    async registra(event) {
      let id = -1;
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target));

      if (data.contra !== data.contra2) {
        alert("las contraseñas no son iguales");
      } else {
        await axios
          .post("http://localhost:5050/usuario", {
            nombre: data.nombre,
            apellido1: data.apellido1,
            apellido2: data.apellido2,
            nif: data.nif,
            telefono: data.telefono,
            email: data.correo,
            contrasena: data.contra,
            rol: data.rol,
          })
          .then((response) => {
            if (response.status === 200) {
              id = response.data[0].idUsuario;
            } else alert("El usuario ya está en la base de datos");
          })
          .catch((err) => {
            alert("Se ha producido el siguiente error: " + err);
          });

        if (id !== -1) {
          if (data.rol === "E") {
            await axios
              .post("http://localhost:5050/estudiante", {
                email: data.correo,
                curso: data.curso,
                padre_tutor: data.tutor,
                telefono_padre_tutor: data.tlfTutor,
              })
              .then((resp) => {
                console.log(resp);
                this.salir(
                  "Usuario registrado correctamente, no se olvide de recomendar cambiar la contraseña"
                );
              });
          } else {
            axios.post("http://localhost:5050/profesor", {
              email: data.correo,
              fecha_contrato: data.fecha_contrato,
              titular_curso: document.formulario2.titular.checked,
            });
          }
        }
      }
    },

    salir(response) {
      this.$emit("menu", response.data);
    },
  },
};
</script>

<style scoped>
.articulo {
  position: relative;
  top: 10vh;
  height: 60vh;
  width: 60vw;
  left: 20vw;
  display: block;

  /*border-radius: 20px;
  box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.6);
  background-color: #ccc;*/
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
  top: 0vh;
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

.divTitular {
  position: relative;
  display: flex;
  margin-top: 2vh;
  height: 4vh;
}

.divTitular label {
  position: absolute;
  margin-top: 0.6vh;
  margin-left: 3vw;
  width: 8vw;
}

form input[type="checkbox"] {
  position: absolute;
  top: -3vh;
  width: 2vw;
}

.data {
  display: flex;
  width: 90%;
  margin-left: 5%;
}

.datos {
  width: 32%;
  margin-left: 1%;
  margin-top: 10px;
  height: 40vh;
  /*border-style: solid;
  border-color: #ddd;
  border-radius: 10px;*/
  padding: 10px;
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
  z-index: 20;
}
</style>
