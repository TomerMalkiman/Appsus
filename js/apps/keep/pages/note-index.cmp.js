import { noteService } from "../services/note-service.js"
import noteList from "../cmps/note-list.cmp.js"
import addNote from "../cmps/add-note.cmp.js"
import noteFilter from "../cmps/note-filter.cmp.js"

export default {
    template: `
        <section v-if="pinnedNotes || unPinnedNotes" class="main-keep-app main-layout">
            <note-filter @filter-set="setFilter"/>
            <div class="right-side">
                <add-note @save-note="saveNote"/>
                <note-list :unPinnedNotes="unPinnedNotesForDisplay" :pinnedNotes="pinnedNotesForDisplay" @note-pinned="togglePin" @note-deleted="deleteNote" @note-bgc-updated="updateBgc" @todo-done="toggleTodo" @note-edited="editNote" @note-duplicate="duplicateNote" />
            </div>
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
                type: 'all',
                txt: '',
            }
        }
    },
    methods: {
        saveNote(note) {
            noteService.saveNote(note)
                .then(note => this.unPinnedNotes.push(note))
        },
        deleteNote(noteId) {
            console.log(noteId)
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
        duplicateNote(noteId) {
            noteService.duplicateNote(noteId)
                .then(note => {
                    if (note.isPinned) this.pinnedNotes.push(note)
                    else this.unPinnedNotes.push(note)
                })
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        editNote(noteId, newNote) {
            noteService.editNote(noteId, newNote)
                .then(note => {
                    if (note.isPinned) {
                        var renderedNoteIdx = this.pinnedNotes.findIndex(note => note.id === noteId);
                        this.pinnedNotes[renderedNoteIdx] = newNote
                    } else {
                        var renderedNoteIdx = this.unPinnedNotes.findIndex(note => note.id === noteId);
                        this.unPinnedNotes[renderedNoteIdx] = newNote
                    }
                })
        }
    },
    computed: {
        pinnedNotesForDisplay() {
            return this.pinnedNotes.filter(note => {
                let regex = new RegExp(this.filterBy.txt, 'i')
                if (this.filterBy.type === 'all') {
                    if (note.type === 'note-img' || note.type === 'note-video') return note
                    if (note.type === 'note-txt') {
                        if (regex.test(note.info.txt)) return note
                    }
                    if (note.type === 'note-todos') {
                        if (regex.test(note.info.label)) return note
                    }
                } else {
                    if (this.filterBy.type === note.type) {
                        if (this.filterBy.type === 'note-txt' && regex.test(note.info.txt)) return note;
                        if (this.filterBy.type === 'note-todos' && regex.test(note.info.label)) return note;
                        if (note.type === 'note-img' || note.type === 'note-video') return note
                    }
                }
            })
        },
        unPinnedNotesForDisplay() {
            return this.unPinnedNotes.filter(note => {
                let regex = new RegExp(this.filterBy.txt, 'i')
                if (this.filterBy.type === 'all') {
                    if (note.type === 'note-img' || note.type === 'note-video') return note
                    if (note.type === 'note-txt') {
                        if (regex.test(note.info.txt)) return note
                    }
                    if (note.type === 'note-todos') {
                        if (regex.test(note.info.label)) return note
                    }
                } else {
                    if (this.filterBy.type === note.type) {
                        if (this.filterBy.type === 'note-txt' && regex.test(note.info.txt)) return note;
                        if (this.filterBy.type === 'note-todos' && regex.test(note.info.label)) return note;
                        if (note.type === 'note-img' || note.type === 'note-video') return note
                    }
                }
            })
        }
    },
    unmounted() {},
}