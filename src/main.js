import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import routes from './routes'

import VueFeather from 'vue-feather';
import infiniteScroll from 'vue-infinite-scroll'

const app = createApp(App);
app.use(routes);
app.use(infiniteScroll)
app.component(VueFeather.name, VueFeather);
app.mount('#app');

// createApp(App).use(routes).mount('#app')
