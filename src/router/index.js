import {createRouter, createWebHistory} from 'vue-router'


const routes = [
    {
        path: '/', component: () => import('../components/Home.vue')
    },
    {
        path: '/editor', component: () => import('../components/Maincontain.vue')
    },
    {
        path: '/settings', component: () => import('../components/Settings.vue')
    }
]
const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)
export default router