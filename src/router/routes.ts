import type {RouteRecordRaw} from 'vue-router'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/tauri',
        name: 'tauri',
        component: () => import('@view/Tauri.vue'),
    },
    {
        path: '/header',
        name: 'header',
        component: () => import('@cp/TitleBar.vue'),
    },
    {
        path: '/overleaf',
        name: 'Editor',
        alias: '/',
        component: () => import('@view/OverLeaf.vue'),
    },
    {
        path: '/:pathMatch(.*)*\'',
        name: 'Not Found',
        component: () => import('@view/NotFound.vue'),
    },
]


export default routes