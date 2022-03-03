import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteImg from "./note-img.cmp.js"


export default {
    props: ["note"],
    template: `
    <section v-if="note" >
        <section  :style="bgc" class="note">
            <img @click="deleteNote(note.id)" class="note delete-note" src="../../../../img/keep-icons/delete.png"/>
            <component :is="note.type" :note="note" @todo-done="toggleTodo"/>
            <div class="options">
                <input v-model="note.style.backgroundColor" @input="updateBgc(note.id)" type="color" :id="note.id">
                <label :for="note.id"><img class="note-icon paintbrush" src="../../../../img/keep-icons/paintbrush.png" /></label>
                <img @click="togglePin(note.id)" class="note-icon pin" :class="isPinned" src="../../../../img/keep-icons/pin.png" />
                <img @click="duplicateNote(note.id)" class="note-icon duplicate" src="../../../../img/keep-icons/duplicate.png" />
                <img @click="openEditor(note.id)" class="note-icon edit" src="../../../../img/keep-icons/edit.png" />
            </div>
            <div v-if="editedNote" class="editing-cmd">
                <input @input="editNote(note.id)" v-if="editedNote.type === 'note-img' || editedNote.type === 'note-video'" type="text" placeholder="Edit Title" v-model="editedNote.info.title">
                <input @input="editNote(note.id)" v-if="editedNote.type === 'note-img' || editedNote.type === 'note-video'" type="text" placeholder="Enter New Url" v-model="editedNote.info.url">
                <input @input="editNote(note.id)" v-if="editedNote.type === 'note-txt'" type="text" placeholder="Enter New Txt" v-model="editedNote.info.txt">
                <input @input="editNote(note.id)" v-if="editedNote.type === 'note-todos'" type="text" placeholder="Enter New Label" v-model="editedNote.info.label">
            </div>
        </section>
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
        return {
            editedNote: null,
        }
    },
    methods: {
        deleteNote(noteId) {
            this.$emit('note-deleted', noteId)
        },
        togglePin(noteId) {
            this.$emit('note-pinned', noteId)
        },
        updateBgc(noteId) {
            this.$emit('note-bgc-updated', noteId, this.note.style.backgroundColor)
        },
        toggleTodo(todoId, noteId) {
            this.$emit('todo-done', todoId, noteId)
        },
        duplicateNote(noteId) {
            this.$emit('note-duplicate', noteId)
        },
        openEditor(noteId) {
            if (this.editedNote) {
                this.editedNote = null;
                return
            }
            switch (this.note.type) {
                case 'note-txt':
                    this.editedNote = {
                        id: this.note.id,
                        type: "note-txt",
                        isPinned: this.note.isPinned,
                        info: {
                            txt: this.note.info.txt,
                        },
                        style: {
                            backgroundColor: this.note.backgroundColor
                        }
                    }
                    break
                case 'note-video':
                    this.editedNote = {
                        id: this.note.id,
                        type: 'note-video',
                        isPinned: this.note.isPinned,
                        info: {
                            url: this.note.info.url,
                            title: this.note.info.title
                        },
                        style: {
                            backgroundColor: this.note.backgroundColor
                        }
                    }
                    break;
                case 'note-img':
                    this.editedNote = {
                        id: this.note.id,
                        type: 'note-img',
                        isPinned: this.note.isPinned,
                        info: {
                            url: this.note.info.url,
                            title: this.note.info.title
                        },
                        style: {
                            backgroundColor: this.note.backgroundColor
                        }
                    }
                    break;
                case 'note-todos':
                    this.editedNote = {
                        id: this.note.id,
                        type: "note-todos",
                        isPinned: this.note.isPinned,
                        info: {
                            label: this.note.info.label,
                            todos: this.note.info.todos
                        },
                        style: {
                            backgroundColor: this.note.style.backgroundColor
                        }
                    }
            }
        },
        editNote(noteId) {
            this.$emit('note-edited', noteId, this.editedNote)
        }
    },
    computed: {
        bgc() {
            return this.note.style.backgroundColor ? `background-color: ${this.note.style.backgroundColor}` : ''

        },
        isPinned() {
            return this.note.isPinned ? 'pinned' : ''
        }
    },
}