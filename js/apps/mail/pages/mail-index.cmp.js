import { mailService } from "../services/mail.service.js"

export default {
    // props: [""],
    template: `
        <section class="main-layout">
            <pre>{{mails}}
                
            </pre>
        </section>
    `,
    components: {},
    created() {
        mailService._createMails()
            .then(mails => {
                this.mails = mails
                console.log(mails)
            })
    },
    data() {
        return {
            mails: null,
        }
    },
    methods: {},
    computed: {},
    unmounted() {},
}