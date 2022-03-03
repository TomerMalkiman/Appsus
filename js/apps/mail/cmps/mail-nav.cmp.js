// import unreadCounter from "./unread-counter.cmp.js"

export default {
    // props: [""],
    template: `
          <section>
              <nav class="mail-nav">
                  <button class="compose-btn">Compose</button>
                  <div @click="setStatus('inbox')" class="inbox">Inbox</div>
                  <div @click="setStatus('starred')" class="starred">Starred</div>
                  <div @click="setStatus('sent-mails')" class="sent-mails">Sent</div>
                  <div @click="setStatus('deleted-mails')" class="deleted-mails">Deleted</div>
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
    methods: {
        setStatus(status) {
            this.$emit('status-changed', status)
        }
    },
    computed: {},
    unmounted() {},
}