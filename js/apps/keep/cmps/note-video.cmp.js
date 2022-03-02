export default {
    props: ["note"],
    template: `
        <section :style="bgc" class="note-video">
            <h4>{{note.info.title}}</h4>
            <iframe width="210"
                :src="note.info.url">
            </iframe>
        </section>
    `,
    components: {},
    created() {},
    data() {
        return {
            backgroundcolor: '#ffffff',
        }
    },
    methods: {},
    computed: {},
    unmounted() {},
}