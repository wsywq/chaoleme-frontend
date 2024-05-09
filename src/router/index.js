import {createRouter, createWebHistory} from "vue-router";

// import Home from "@/components/views/Home.vue";
// import About from "@/components/views/About.vue";

let routes = [
    {
        path: "/",
        name: 'home',
        component: ()=> import("@/views/Home.vue"),
    },
    {
        path: "/about",
        name: 'about',
        component: ()=> import("@/views/About.vue"),
    },
];

const route = createRouter({
    history: createWebHistory(),
    routes,
});

export default route;
