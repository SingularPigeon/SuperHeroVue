import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import CanvasJSChart from '@canvasjs/vue-charts'
const app = createApp(App)

app.use(createPinia())
app.use(CanvasJSChart)
app.mount('#app')
