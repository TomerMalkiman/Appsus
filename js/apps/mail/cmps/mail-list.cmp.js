import mailPreview from "./mail-preview.cmp.js"

export default {
    props: ["mails"],
    template: `
        <section class="mail-list">
            <ul class="clean-list">
                <li v-for="mail in mails" :key="mail.id">
                        <mail-preview @remove="remove(mail.id)" @toggle-read="toggleRead(mail.id)" :mail="mail"/>
                </li>

            </ul>


        </section>
    `,
    components: {
        mailPreview
    },
    created() { },
    data() {
        return {}
    },
    methods: {
        toggleRead(mailId) {
            this.$emit('toggle-read', mailId)

        },
        remove(mailId) {
            this.$emit('remove', mailId);

        },
    },
    computed: {},
    unmounted() { },
}


