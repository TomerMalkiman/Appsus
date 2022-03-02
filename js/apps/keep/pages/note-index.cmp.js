import { noteService } from "../services/note-service.js"
import noteList from "../cmps/note-list.cmp.js"


export default {
    // props: [""],
    template: `
        <section v-if="notes" class="main-layout">
            <note-list :notes="notes" />
        </section>
    `,
    components: {
        noteList
    },
    created() {
        noteService._createNotes()
            .then(notes => this.notes = notes)
    },
    data() {
        return {
            notes: null,
        }
    },
    methods: {},
    computed: {},
    unmounted() {},
}