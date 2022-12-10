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

const serverBaseUrl = 'http://127.0.0.1:8000'

const pinia = createPinia()

const axiosInstance = axios.create({
  baseURL: serverBaseUrl + '/api',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
})

const toasterInstance = {
  position: 'top',
  timeout: 3000,
  pauseOnHover: true,
}

const app = createApp(App)

app.provide('serverBaseUrl', serverBaseUrl)
app.provide('axios', axiosInstance)

app.use(vuetify)
app.use(router)
app.use(pinia)

app.use(Toaster, toasterInstance)
app.provide('toast', app.config.globalProperties.$toast)

app.mount('#app')
