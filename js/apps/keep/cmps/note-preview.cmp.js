import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteImg from "./note-img.cmp.js"


export default {
    props: ["note"],
    template: `
    <section v-if="note" >
        <section  :style="bgc" class="note">
            <button class="delete-note" @click="deleteNote(note.id)">X</button>
            <component :is="note.type" :note="note" @todo-done="toggleTodo"/>
            <div class="options">
                <input v-model="note.style.backgroundColor" @input="updateBgc(note.id)" type="color" :id="note.id">
                <label :for="note.id"><img class="note-icon paintbrush" src="../../../../img/keep-icons/paintbrush.png" /></label>
                <img @click="togglePin(note.id)" class="note-icon pin" :class="isPinned" src="../../../../img/keep-icons/pin.png" />
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