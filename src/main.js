/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import axios from 'axios'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

loadFonts()
const app = createApp(App)

const serverBaseUrl = "http://127.0.0.1:8000";
app.provide(
  "axios",
  axios.create({
    baseURL: serverBaseUrl + "/api/v1",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2Q1MWY0ZC0xZTE1LTRlYjItOTZhNy0yZjE4ODY2ZjNkYTEiLCJqdGkiOiJmZDYwODlhZDBmMWI5YWIxMjk4MjM4YjU5MTQ0MWEzNmY4ZTVjMGYzZGE4YTc3MjE0YmEyNzRiMTM4MTAxMTY1NTYzN2ZhMWU0ZThkOTY4ZiIsImlhdCI6MTY2OTQxNjEwMC43ODM3MDYsIm5iZiI6MTY2OTQxNjEwMC43ODM3MDgsImV4cCI6MTcwMDk1MjEwMC43ODAwNjksInN1YiI6IjEiLCJzY29wZXMiOltdfQ.kCN9ypiRGsY9R86OBJrR-rwMOmy60wfIXanm4aIfIZV9Gxw3uJ3Dn3lMb-Uz03y2F-NCdKjTKCsykgDJUvADk5O1xAExRyGfrO1hLe0kEsH3vIxecgLFUllN9vqs_3oFdbN-JIF2Qk4ULrf8Lho9RQKSMr1w0OzjP8FVwiM0Hspk90wAfFB0GhJdW2lCb268UZKY-G56c0HIQJbmxqWly73vBrHidU1CWiMk5FLpoxQ6MJt5okCAXnh8TpjOC-G93KLGglrmrEJ4sCy4jP8t3OzSsdua2AsBPcXl7xNtS6HRRjb34ny3PTK0Ki1-Uo_grN6PiCjbO6ugHGbhRmIVZwG47LM22cq6eaZQsJ7ggrqOhaHg3fOMLfiKrBIGvjExeboWlnka5gmiawpHIEPcNyhzXtBe0Xl7K6Bi5vST_H42Gjz7MvJoT7DwMcVRlba1ylHRzwCBLNDF53olk8EqQ2T9cE69oZWIle0PI0d-vO-mXTWDo_oLRbQsRoFIb1nSiKfhs89GcPajm2AUgR15TVGjAsNCjsbGe9YVzNa1N-pBjAODsPtGq4gOaC5F7qEii7M5ct2PgxdKL10jhMMPXvRc6xH9e8mBrRXbTeIrK5X_PCDloonxfucZ12_6XC47q2_n49c6QNHp_XURFN134ssHqEGpfNs4OvMXnn5lLFI"
    },
  })
);
app.provide("serverBaseUrl", serverBaseUrl);

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
