import { noteService } from "../services/note-service.js"
import noteList from "../cmps/note-list.cmp.js"
import addNote from "..//cmps/add-note.cmp.js"

export default {
    // props: [""],
    template: `
        <section v-if="pinnedNotes || unPinnedNotes" class="main-layout">
            <add-note @save-note="saveNote"/>
            <note-list :unPinnedNotes="unPinnedNotes" :pinnedNotes="pinnedNotes" @note-deleted="deleteNote"/>
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
        },
        deleteNote(noteId) {
            noteService.deleteNote(noteId)
            var pinnedIdx = this.pinnedNotes.findIndex(note => note.id === noteId);
            var unPinnedIdx = this.unPinnedNotes.findIndex(note => note.id === noteId);
            if (pinnedIdx >= 0) {
                this.pinnedNotes.splice(pinnedIdx, 1)
            } else {
                this.unPinnedNotes.splice(unPinnedIdx, 1)
            }
        }
    },
    computed: {},
    unmounted() {},
}