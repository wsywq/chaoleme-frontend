import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementUIPlus from 'element-plus';
import 'element-plus/dist/index.css'
import router from "@/router/index.js";
import axios from "axios";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
app.use(ElementUIPlus);
app.use(router);
// app.use(VueWaterfallNext);
app.provide('$axios',axios);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');

