export default {
    template: `
        <header class="app-header">
            <div class="logo">
                <img class="logo-icon" src="img/horse-icon.png" alt="horse icon"><h3>Appsus</h3>
            </div>
            <div class="nav-icon">    
                <img src="img/menu.png" alt="" @click="toggleNav">
            </div>
            <nav class="nav-bar" :class="navOpened">
                <router-link to="/"><img src="img/home.png" alt="" @click="toggleNav"></router-link>
                <!-- <router-link to="/book">Books</router-link> -->
                <router-link to="/mail"><img src="img/gmail.png" alt="" @click="toggleNav"></router-link>
                <router-link to="/notes"><img src="img/keep-icon.png" alt="" @click="toggleNav"></router-link>
                <router-link to="/about"><img src="img/about.png" alt="" @click="toggleNav"></router-link>
            </nav>
        </header>
    `,
    data() {
        return {
            isNavOpen: false,
        }
    },
    methods: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
    },
    computed: {
        navOpened() {
            return this.isNavOpen ? 'open-nav' : ''
        },
    }
}