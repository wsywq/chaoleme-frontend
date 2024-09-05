import {createRouter, createWebHistory} from "vue-router";

let routes = [
    {
        path: "/",
        name: "",
        redirect: "dish"
    },
    {
        path: "",
        name: "",
        // component: () => import("@/views/DishList.vue"),
        redirect: "dish"
    },
    {
        path: "/home",
        name: 'home',
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/dish",
        name: 'dish',
        component: () => import("@/views/DishList.vue"),
    },
    {
        path: "/about",
        name: 'about',
        component: () => import("@/views/About.vue"),
    }
];

const route = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active"
});

export default route;
