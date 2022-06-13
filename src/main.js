import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import routes from './routes'

createApp(App).use(routes).mount('#app')
