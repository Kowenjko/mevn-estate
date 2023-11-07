import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import 'swiper/css'
import App from './App.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { router } from './router'

library.add(fas, fab)

const app = createApp(App)
const pinia = createPinia()
app.component('fa-icon', FontAwesomeIcon)

app.use(pinia)
app.use(router)

app.mount('#app')
