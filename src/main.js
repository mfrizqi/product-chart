import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import routes from './routes'

import VueFeather from 'vue-feather';

const app = createApp(App);

app.use(routes);
app.component(VueFeather.name, VueFeather);
app.mount('#app');

// createApp(App).use(routes).mount('#app')
