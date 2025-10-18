import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import 'element-plus/theme-chalk/dark/css-vars.css';


const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(createPinia());
app.mount('#app');
