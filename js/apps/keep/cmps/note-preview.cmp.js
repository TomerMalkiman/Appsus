import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteImg from "./note-img.cmp.js"


export default {
    props: ["note"],
    template: `
        <section  v-if="note" :style="bgc" class="note">
            <button @click="deleteNote(note.id)">X</button>
            <component :is="note.type" :note="note"/>
            <div class="options">
                <input v-model="note.style.backgroundColor" type="color" :id="note.id">
                <label :for="note.id"><img class="note-icon" src="../../../img/keep-icons/paintbrush.png" /></label>
            </div>
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
            console.log(noteId)
            this.$emit('note-deleted', noteId)
        }
    },
    computed: {
        bgc() {
            return `background-color: ${this.note.style.backgroundColor}`
        },
    },
    unmounted() {},
}