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

const serverBaseUrl = 'http://127.0.0.1:8000'
app.provide(
  'axios',
  axios.create({
    baseURL: serverBaseUrl + '/api',
    headers: {
      'Content-type': 'application/json',
    },
  }),
)
app.provide('serverBaseUrl', serverBaseUrl)

app.use(Toaster, {
  position: 'top',
  timeout: 3000,
  pauseOnHover: true,
})
app.provide('toast', app.config.globalProperties.$toast)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
