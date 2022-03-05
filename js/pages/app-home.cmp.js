export default {
    // props: [""],
    template: `
        <section class="main-layout home-page">
          <img class="horse" src="img/horse.png" alt="">
          <h1 class="header">Welcome to Appsus</h1>
          <h4 class="description">The home of our amazing apps</h4>
          <div class="links-container">
            <section class="mail-app">
              <h1>Want to read some mails?</h1>
              <p>You are welcome to try our mail app</p>
          <router-link to="/mail"><img src="img/gmail.png" alt=""></router-link>
            </section>
            <section class="keep-app">
              <h1>Need to take some notes?</h1>
              <p>Go ahead and be amazed</p>
              <router-link to="/notes"><img src="img/keep-icon.png" alt=""></router-link>
            </section>
          </div>
          </section>
    `,
    components: {},
    created() {},
    data() {
        return {}
    },
    methods: {},
    computed: {},
    unmounted() {},
}