import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import firebase from 'firebase'

import VCalendar from 'v-calendar'
import VueGoodTablePlugin from 'vue-good-table-next'

import 'vue-good-table-next/dist/vue-good-table-next.css'
import 'v-calendar/style.css'
import './assets/main.css'

let app: any = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia())
    app.use(router).use(VCalendar).use(VueGoodTablePlugin)
    app.mount('#app')
  }
})

