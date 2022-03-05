import { router } from './router.js';
import appFooter from './views/app-footer.js';
import appHeader from './views/app-header.js';
import userMsg from './cmps/user-msg.cmp.js';

const options = {
    template: `
        <app-header :txt="txt" />
        <user-msg />
        <router-view />
        <app-footer />
    `,
    components: {
        appHeader,
        appFooter,
        userMsg
    },
    data(){
        return{
        txt: 'BookShop'
        }
    }
};

const app = Vue.createApp(options);
app.use(router)
app.mount('#app');