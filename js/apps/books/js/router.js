import bookDetails from "./views/book-details.cmp.js";
import booksApp from "./views/books-app.cmp.js";
import homePage from "./views/home-page.cmp.js";
import aboutPage, {cat, dog} from "./views/about-page.cmp.js";


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: 'cat',
                component: cat                
            },
            {
                path: 'dog',
                component: dog                
            },
        ]
    },
    {
        path: '/book',
        component: booksApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})