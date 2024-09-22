import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import Registro from "../views/Registro";
import Administrador from "../views/Administrador";
import Estudiante from "../views/Estudiante";
import Profesor from "../views/Profesor";

const routes = [
  {
    path: "/",
    name: "home",
    component: Login,
  },
  {
    path: "/registro",
    name: "registro",
    component: Registro,
  },
  {
    path: "/administrador",
    name: "administrador",
    component: Administrador,
  },
  {
    path: "/estudiante",
    name: "estudiante",
    component: Estudiante,
  },
  {
    path: "/profesor",
    name: "profesor",
    component: Profesor,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
