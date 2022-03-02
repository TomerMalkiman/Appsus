import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteImg from "./note-img.cmp.js"

export default {
    props: ["notes"],
    template: `
        <section v-if="notes">
            <!-- {{notes}} -->
            <component v-for="note in notes" :is="note.type" :note="note"/>
        </section>
    `,
    components: {
        noteTodos,
        noteImg,
        noteTxt,
        noteVideo
    },
    created() {},
    data() {
        return {}
    },
    methods: {},
    computed: {},
    unmounted() {},
}