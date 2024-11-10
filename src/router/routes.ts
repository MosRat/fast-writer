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
        alias: '/h',
        component: () => import('@cp/TitleBar.vue'),
    },
    {
        path: '/config',
        name: 'config',
        component: () => import('@view/configs/Config.vue'),
        children:[
            {
                path:"general",
                name:"general",
                component:()=>import('@view/configs/GeneralConfig.vue')
            }
        ]
    },
    {
        path: '/screenshot',
        name: 'screenshot',
        component: () => import('@view/Screenshot.vue'),
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