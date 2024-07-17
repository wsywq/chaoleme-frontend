import {createRouter, createWebHistory} from "vue-router";

let routes = [
    {
        path: "",
        redirect: "/home"
    },
    {
        path: "",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/home",
        name: 'home',
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/about",
        name: 'about',
        component: () => import("@/views/DishList.vue"),
    },
    {
        path: "/food",
        name: 'food',
        component: () => import("@/components/Food.vue"),
    },
];

const route = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active"
});

export default route;
