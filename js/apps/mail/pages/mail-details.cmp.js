import { mailService } from "../services/mail.service.js"
// import mailNav from "../cmps/mail-nav.cmp.js";

export default {
    //   props: ["mail"],
    template: `

        <!-- <mail-nav  v-if="mails"  @status-changed="setStatus" :mails="mailsForDisplay" />    -->
        <section v-if="mail" class="mail-details main-layout">
          <div class="mail-details-btns">
          <button class="return-btn" @click="returnInbox" class="fa fa-arrow-left"></button>
          </div>
          <hr>
          <h1>{{mail.subject}}</h1>
          <div class="sender-details">
              <div class="sender-img"><i class="fas fa-user"></i></div>
              <section class="sender-mail">
                     <p>from: {{mail.from}}@gmail.com</p>
                     <p>to: me</p>
             </section>
          </div>  
          <hr>
         <pre>{{mail.body}}</pre>
        </section>
        <section v-else class="load-error">
          <h1>Error!</h1>
        </section>
          
    `,
    components: {
        // mailNav
    },
    created() {
        const id = this.$route.params.mailId;
        mailService.getMail(id)
            .then(mail => this.mail = mail)

        mailService._createMails()
            .then(mails => {
                this.mails = mails
            })
    },
    data() {
        return {
            mail: null,
            // mails: null
        }
    },
    methods: {
        returnInbox() {
            this.$router.push(`/mail`)
        }
    },
    computed: {},
    unmounted() {

    },
}