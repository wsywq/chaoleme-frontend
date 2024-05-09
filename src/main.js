import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementUIPlus from 'element-plus';
import router from "@/router/index.js";
import axios from "axios";

const app = createApp(App);
app.use(ElementUIPlus);
app.use(router);
app.provide('$axios',axios);
app.mount('#app');

