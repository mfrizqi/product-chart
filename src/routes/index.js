import { createWebHistory, createRouter } from "vue-router";

import Home from '../components/pages/Home.vue'
import Calculator from '../components/pages/Calculator.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/calculator',
        name: 'calculator',
        component: Calculator
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;