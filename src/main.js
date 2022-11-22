import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import Toaster from "@meforma/vue-toaster";
import FieldErrorMessage from "./components/FieldErrorMessage.vue";
import ConfirmationDialog from "./components/ConfirmationDialog.vue";

import App from "./App.vue";
import router from "./router";

//import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

const app = createApp(App);

const serverBaseUrl = "http://127.0.0.1:8000";
app.provide(
  "axios",
  axios.create({
    baseURL: serverBaseUrl + "/api",
    headers: {
      "Content-type": "application/json",
    },
  })
);
app.provide("serverBaseUrl", serverBaseUrl);

app.use(Toaster, {
  position: "top",
  timeout: 3000,
  pauseOnHover: true,
});

app.provide("toast", app.config.globalProperties.$toast);

app.use(createPinia());
app.use(router);

app.component("FieldErrorMessage", FieldErrorMessage);
app.component("ConfirmationDialog", ConfirmationDialog);

app.mount("#app");
