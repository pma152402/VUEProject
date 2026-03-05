import { createRouter, createWebHistory } from "vue-router";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import PanelView from "../views/PanelView.vue";
import ProjectView from "../views/ProjectView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/projects/:id",
      name: "project",
      component: ProjectView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/panel",
      name: "panel",
      component: PanelView,
      meta: { requiresAuth: true },
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const usuario = localStorage.getItem("usuario");

  if (to.meta.requiresAuth && !usuario) {
    next("/login");
  } else {
    next();
  }
});

export default router;
