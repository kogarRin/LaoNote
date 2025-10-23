import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/', name: 'home', component: () => import('../components/home/Home.vue')
    },
    {
        path: '/edit/:id', name: 'edit' , component: () => import('../components/editAndShow/Edit.vue')
    },
    {
        path: '/settings', name:'settings', component: () => import('../components/setting/Settingdialog.vue')
    },
    {
        path: '/showNote/:id', name: 'showNote', props: true, component: ()=> import('../components/editAndShow/showForm.vue')
    }
]
const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)
export default router