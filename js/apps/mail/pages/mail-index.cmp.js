import mailList from "../cmps/mail-list.cmp.js"
import { mailService } from "../services/mail.service.js"

export default {
    // props: [""],
    template: `
        <section class="main-layout">
          <mail-list :mails="mails"></mail-list>
        </section>
    `,
    components: {
        mailList,

    },
    created() {
        mailService._createMails()
            .then(mails => {
                this.mails = mails
            })
    },
    data() {
        return {
            mails: null,
            filtrBy:null
        }
    },
    methods: {
        loadMails(){
            mailService.query()
            .then(mails => this.mails = mails);
        },


    },
    computed: {
      
    },
    unmounted() {},
}