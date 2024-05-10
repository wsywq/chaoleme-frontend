import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementUIPlus from 'element-plus';
import router from "@/router/index.js";
import axios from "axios";
// import VueWaterfallNext from "vue-waterfall-plugin-next";

const app = createApp(App);
app.use(ElementUIPlus);
app.use(router);
// app.use(VueWaterfallNext);
app.provide('$axios',axios);
app.mount('#app');

