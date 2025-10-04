import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/', name: 'home',component: () => import('../components/Home.vue')
    },
    {
        path: '/edit/:id', name: 'edit' ,component: () => import('../components/Edit.vue')
    },
    {
        path: '/settings', component: () => import('../components/Settings.vue')
    },
    {
        path: '/showNote/:id', name: 'showNote',props: true,component: ()=> import('../components/showForm.vue')
    }
]
const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)
export default router