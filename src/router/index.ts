import { createRouter, createWebHashHistory } from "vue-router";
import Btable from "@/views/Btable/index.vue"; // 导入 Home 组件
import Bform from "@/views/Bform/index.vue"; // 导入 Home 组件
import BformDialog from "@/views/BformDialog/index.vue";
import BnoticeBar from "@/views/BnoticeBar/index.vue";
const routes = [
    {
        path: "/Btable",
        name: "Btable",
        component: Btable,
    },
    {
        path: "/Bform",
        name: "Bform",
        component: Bform,
    },
    {
        path: "/BformDialog",
        name: "BformDialog",
        component: BformDialog,
    },
    {
        path: "/BnoticeBar",
        name: "BnoticeBar",
        component: BnoticeBar,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;


