/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import Toaster from '@meforma/vue-toaster'
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
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2Q1MWY0ZC0xZTE1LTRlYjItOTZhNy0yZjE4ODY2ZjNkYTEiLCJqdGkiOiI2YjRkNWMyMmFiZjg5YWNjODU2MDRlNzFlNGE3OWYwM2MwMjY2Y2U0YTNkNzg2M2Q2MzA4ZTY0YzNiZWZjN2RhY2Y2YTEzMDFlMWQxNWFlZCIsImlhdCI6MTY2OTQ3OTg3OS43MzI1ODEsIm5iZiI6MTY2OTQ3OTg3OS43MzI1ODQsImV4cCI6MTcwMTAxNTg3OS43MDA0MzksInN1YiI6IjEiLCJzY29wZXMiOltdfQ.pFsHIF7ToXUJQT7M0RqCZeVVz4hBXFJwRVQcjBd1YX8ISACkcvlYaJjO4lmZkddpP6UFnUn5UbFGIggL22t3uX6t4jFBC86FrHS2raoUUvWucXJYt-X_0fcQ2rGXKrep7qBBcFb7GRA6AWSL4XqQD0VCj17u0_HJ36Fznh2G2E1KNiloHXq1vBybtwLy34R-0POAwJ3eCBTGWkVS01MRpKfWEDwBSrIwGOofg5wHQD9FDYMijforpavC7nzf1mFzSsf9LvDRigrhjKJYMCzbQbih-H3xDYAnPtycwlX5xLq8o1pUZcpZsZL3sBac3MKvOyDc8YhbK4TIh6N10EQs7M3zy34KoK8zsctGwKIhZortVXTs-jxxV0NRLv51-sYKAWsI0xD1b6kj_srsUNT0TkJVDqKD_zTtLa0SRt4TiRWrg_qU07EIjCj1blZpzrDzoBDY9Z9Qt9zwzFrHvJx6jkagzdlsarxb8zibMGoxN5F3tnPfxJPL99JdY0jHMQSny90EPb9ll0Lqu67Z3e1-Alp-PGK2-z7hXzn3-Y1WkL8Pqga80HEQNs38oEF1P0-3CmAMPJi7JcthBRbc4GUY0r15BMxzlEKE5YPZiXoPFyTt7b-PdsxO1UUl-cLCz5n9N3YCE-4niey4i1-G0DnU17oA8x0QKYIRzWVKOqhiS44"
    },
  })
);
app.provide("serverBaseUrl", serverBaseUrl);

app.use(Toaster, {
  position: 'top',
  timeout: 3000,
  pauseOnHover: true
})
app.provide('toast', app.config.globalProperties.$toast);

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
