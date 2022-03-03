import homePage from './pages/app-home.cmp.js';
import aboutPage from './pages/app-about.cmp.js';
import mailApp from './apps/mail/pages/mail-index.cmp.js';
import keepApp from './apps/keep/pages/note-index.cmp.js';
import mailDetails from './apps/mail/pages/mail-details.cmp.js';

const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/mail',
        component: mailApp,
    },
    {
        path: '/mail/:mailId',
        component: mailDetails
    },
    {
        path: '/notes',
        component: keepApp
    },
];

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})