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
        return {}
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
    unmounted() {},
}