import homePage from './pages/app-home.cmp.js';
import aboutPage from './pages/app-about.cmp.js';
import mailApp from './apps/mail/pages/mail-index.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/mail',
        component: mailApp
    },
    // {
    //     path: '/',
    //     component: 
    // },
];

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})