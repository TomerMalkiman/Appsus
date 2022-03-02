export default {
    props: ["note"],
    template: `
        <section class="note-txt">
            {{note.info.txt}}
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