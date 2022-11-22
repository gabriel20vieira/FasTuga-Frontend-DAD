import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    // {
    //   path: "/redirect/:redirectTo",
    //   name: "Redirect",
    //   component: RouteRedirector,
    //   props: (route) => ({ redirectTo: route.params.redirectTo }),
    // },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/auth/Login.vue"),
    },
    {
      path: "/password",
      name: "ChangePassword",
      component: () => import("../views/auth/ChangePassword.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/auth/Register.vue"),
    },
    {
      path: "/board",
      name: "Board",
      component: () => import("../views/Board.vue"),
    },
    {
      path: "/employees",
      name: "Employees",
      component: () => import("../views/Users.vue"),
    },
    {
      path: "/users/:id",
      name: "User",
      component: () => import("../views/User.vue"),
      props: (route) => ({ id: parseInt(route.params.id) }),
    },
    {
      path: "/oders",
      name: "Orders",
      component: () => import("../views/OrdersHistory.vue"),
    },
    {
      path: "/statistics",
      name: "Statistics",
      component: () => import("../views/Statistics.vue"),
    },
    {
      path: "/menu",
      name: "Menu",
      component: () => import("../views/Menu.vue"),
    },
  ],
});

export default router;
