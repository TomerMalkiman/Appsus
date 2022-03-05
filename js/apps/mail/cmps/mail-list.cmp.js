import mailPreview from "./mail-preview.cmp.js"

export default {
    props: ["mails"],
    template: `
        <section class="mail-list">
            <ul class="clean-list">
                <li v-for="mail in mails" :key="mail.id">
                        <mail-preview  @mark-star="toggleStar(mail.id)" 
                        @remove="remove(mail.id)" @toggle-read="toggleRead(mail.id)" :mail="mail"/>
                </li>

            </ul>


        </section>
    `,
    components: {
        mailPreview
    },
    created() { 
        this.mails.sort((a,b)=> (a.sentAt > b.sentAt) ? -1 : ((b.sentAt > a.sentAt) ? 1 : 0))
       
    },
    data() {
        return {
            currMail: null
        }
    },
    methods: {
        toggleRead(mailId) {
            this.$emit('toggle-read', mailId)

        },
        toggleStar(mailId) {
            this.$emit('mark-star', mailId)

        },
        remove(mailId) {
            this.currMail = this.mails.find(mail => mail.id === mailId);
            if(this.currMail.status === 'deleted')  this.$emit('remove', mailId);
            else this.$emit('delete',mailId);
        },
    },
    computed: {},
    unmounted() { },
}


