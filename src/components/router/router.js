import Home from '../../pages/Home.vue'
import PostPage from "../../pages/PostPage.vue";
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/posts",
        component: PostPage,
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.Base__URL)
});

export default router;