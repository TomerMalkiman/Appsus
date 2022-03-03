import { noteService } from "../services/note-service.js"
import noteList from "../cmps/note-list.cmp.js"
import addNote from "../cmps/add-note.cmp.js"
import noteFilter from "../cmps/note-filter.cmp.js"

export default {
    template: `
        <section v-if="pinnedNotes || unPinnedNotes" class="main-layout">
            <add-note @save-note="saveNote"/>
            <note-filter/>
            <note-list :unPinnedNotes="unPinnedNotes" :pinnedNotes="pinnedNotes" @note-pinned="togglePin" @note-deleted="deleteNote" @note-bgc-updated="updateBgc" @todo-done="toggleTodo"/>
        </section>
    `,
    components: {
        noteList,
        addNote,
        noteFilter,
    },
    created() {
        noteService._createNotes()
            .then(notes => {
                this.pinnedNotes = notes.filter(note => note.isPinned)
                this.unPinnedNotes = notes.filter(note => !note.isPinned)
            })
    },
    data() {
        return {
            pinnedNotes: null,
            unPinnedNotes: null,
            filterBy: {
                type: 'All',

            }
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
        },
        togglePin(noteId) {
            console.log(noteId)
            noteService.togglePin(noteId)
            var pinnedIdx = this.pinnedNotes.findIndex(note => note.id === noteId);
            var unPinnedIdx = this.unPinnedNotes.findIndex(note => note.id === noteId);
            if (pinnedIdx >= 0) {
                this.pinnedNotes[pinnedIdx].isPinned = !this.pinnedNotes[pinnedIdx].isPinned
                this.unPinnedNotes.push(this.pinnedNotes[pinnedIdx])
                this.pinnedNotes.splice(pinnedIdx, 1)
            } else {
                this.unPinnedNotes[unPinnedIdx].isPinned = !this.unPinnedNotes[unPinnedIdx].isPinned
                this.pinnedNotes.push(this.unPinnedNotes[unPinnedIdx])
                this.unPinnedNotes.splice(unPinnedIdx, 1)
            }
        },
        updateBgc(noteId, bgc) {
            noteService.updateBgc(noteId, bgc)
        },
        toggleTodo(todoId, noteId) {
            noteService.toggleTodo(todoId, noteId)
                .then(note => {
                    var pinnedIdx = this.pinnedNotes.findIndex(note => note.id === noteId);
                    var unPinnedIdx = this.unPinnedNotes.findIndex(note => note.id === noteId);
                    if (pinnedIdx >= 0) {
                        const todo = this.pinnedNotes[pinnedIdx].info.todos.find(todo => todo.id === todoId)
                        if (!todo.doneAt) todo.doneAt = Date.now();
                        else todo.doneAt = null
                    } else {
                        const todo = this.unPinnedNotes[unPinnedIdx].info.todos.find(todo => todo.id === todoId)
                        if (!todo.doneAt) todo.doneAt = Date.now();
                        else todo.doneAt = null
                    }

                })
        },
    },
    computed: {},
    unmounted() {},
}