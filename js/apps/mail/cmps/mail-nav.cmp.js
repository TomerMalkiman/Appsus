// import unreadCounter from "./unread-counter.cmp.js"

export default {
    // props: [""],
    template: `
          <section>
              <nav class="mail-nav">
                  <button class="compose-btn">Compose</button>
                  <div class="inbox">Inbox</div>
                  <div class="starred">Starred</div>
                  <div class="sent-mails">Sent</div>
                  <div class="deleted-mails">Deleted</div>
                  <!-- <unread-counter></unread-counter> -->
              </nav>
          </section>
      `,
    components: {
        // unreadCounter
    },
    created() {},
    data() {
      return {}
    },
    methods: {},
    computed: {},
    unmounted() {},
  }