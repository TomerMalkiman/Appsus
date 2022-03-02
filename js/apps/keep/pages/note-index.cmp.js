import { noteService } from "../services/note-service.js"
import noteList from "../cmps/note-list.cmp.js"
import addNote from "..//cmps/add-note.cmp.js"

export default {
    // props: [""],
    template: `
        <section v-if="pinnedNotes || unPinnedNotes" class="main-layout">
            <add-note @save-note="saveNote"/>
            <note-list :unPinnedNotes="unPinnedNotes" :pinnedNotes="pinnedNotes" />
        </section>
    `,
    components: {
        noteList,
        addNote,
    },
    created() {
        noteService._createNotes()
            .then(notes => {
                this.pinnedNotes = notes.filter(note => note.isPinned)
                this.unPinnedNotes = notes.filter(note => !note.isPinned)
                console.log(this.pinnedNotes)
                console.log(this.unPinnedNotes)
            })
    },
    data() {
        return {
            pinnedNotes: null,
            unPinnedNotes: null,
        }
    },
    methods: {
        saveNote(note) {
            noteService.saveNote(note)
                .then(note => this.unPinnedNotes.push(note))
        }
    },
    computed: {},
    unmounted() {},
}