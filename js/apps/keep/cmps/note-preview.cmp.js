import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteImg from "./note-img.cmp.js"
import { eventBus } from "../../../services/eventBus-service.js"


export default {
    props: ["note"],
    template: `
    <section class="note-container" v-if="note" >
        <section :style="bgc" class="note">
            <component :is="note.type" :note="note" @click="openEditor(note.id)" @todo-done="toggleTodo"/>
            <div class="options">
                <img class="note-icon paintbrush" src="img/keep-icons/paintbrush.png" @mouseover="openPalette" @mouseleave="closePalette"/>
                <img @click="togglePin(note.id)" class="note-icon pin" :class="isPinned" src="img/keep-icons/pin.png" />
                <img @click="duplicateNote(note.id)" class="note-icon duplicate" src="img/keep-icons/duplicate.png" />
                <img @click="openEditor(note.id)" class="note-icon edit" src="img/keep-icons/edit.png" />
                <img @click="deleteNote(note.id)" class="note-icon delete" src="img/keep-icons/delete.png"/>
            </div>
            <div v-if="isPaletteOpen || isMouseOverPalette" class="color-palette" @mouseover="mouseOnPalette" @mouseleave="mouseLeftPalette">
                <div class="color-choice" v-for="color in options" @click="updateBgc(note.id,color.color)" :style="'background-color:'+color.color"></div>
            </div>
        </section>
    </section>
    <div v-if="editedNote" class="editing-cmd" :style="bgc">
        <div class="img-video-container">
            <img v-if="editedNote.type==='note-img'" :src="editedNote.info.url" alt="">
            <iframe v-if="editedNote.type === 'note-video'" width="250px"
            :src="note.info.url">
        </iframe>
        </div>
        <input @input="editNote(note.id)" v-if="editedNote.type === 'note-img' || editedNote.type === 'note-video' || editedNote.type === 'note-txt'" type="text" class="title-input" placeholder="Enter Title" v-model="editedNote.info.title">
        <input @input="editNote(note.id)" v-if="editedNote.type === 'note-img' || editedNote.type === 'note-video'" type="text" class="url-input" placeholder="Enter New Url" v-model="editedNote.info.url">
        <input @input="editNote(note.id)" v-if="editedNote.type === 'note-txt'" class="txt-input" type="text" placeholder="Enter New Txt" v-model="editedNote.info.txt">
        <input @input="editNote(note.id)" v-if="editedNote.type === 'note-todos'" type="text" placeholder="Enter New Label" v-model="editedNote.info.label">
        <input v-if="editedNote.type === 'note-todos'" v-for="todo in note.info.todos" v-model="todo.txt" type="text" :style="todo.doneAt? 'text-decoration: line-through;' : ''">
        <div class="options-editing">
                <img @click="deleteNote(note.id)" class="note-icon delete" src="img/keep-icons/delete.png"/>
        </div>
    </div>
        `,
    components: {
        noteTodos,
        noteImg,
        noteTxt,
        noteVideo
    },
    created() {
        eventBus.on('screen-closed', this.closeEditor)

    },
    data() {
        return {
            editedNote: null,
            options: [{ color: '#aecbfa' }, { color: '#e8eaed' }, { color: '#e6c9a8' }, { color: '#fdcfe8' }, { color: '#d7aefb' }, { color: '#cbf0f8' }, { color: '#a7ffeb' }, { color: '#ccff90' }, { color: '#fff475' }, { color: '#fbbc04' }, { color: '#f28b82' }],
            isPaletteOpen: false,
            isMouseOverPalette: false,
        }
    },
    methods: {
        deleteNote(noteId) {
            this.$emit('note-deleted', noteId)
            if (this.editedNote) this.$emit('editor-opened')
            this.editedNote = null
        },
        togglePin(noteId) {
            this.$emit('note-pinned', noteId)
        },
        updateBgc(noteId, color) {
            this.$emit('note-bgc-updated', noteId, color)
            this.note.style.backgroundColor = color
        },
        toggleTodo(todoId, noteId) {
            this.$emit('todo-done', todoId, noteId)
        },
        duplicateNote(noteId) {
            this.$emit('note-duplicate', noteId)
        },
        openEditor(noteId) {
            this.$emit('editor-opened')
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
                            title: this.note.info.title,
                            txt: this.note.info.txt,
                        },
                        style: {
                            backgroundColor: this.note.style.backgroundColor,
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
                            backgroundColor: this.note.style.backgroundColor
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
                            backgroundColor: this.note.style.backgroundColor
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
        },
        closeEditor() {
            this.editedNote = null;
        },
        openPalette() {
            this.isPaletteOpen = true
        },
        closePalette() {
            setTimeout(() => {
                this.isPaletteOpen = false
            }, 1000)
        },
        mouseOnPalette() {
            this.isMouseOverPalette = true
        },
        mouseLeftPalette() {
            setTimeout(() => {
                this.isMouseOverPalette = false
            }, 1000)
        },
    },
    computed: {
        bgc() {
            return this.note.style.backgroundColor ? `background-color: ${this.note.style.backgroundColor}; border: 1px solid ${this.note.style.backgroundColor}` : ''

        },
        isPinned() {
            return this.note.isPinned ? 'pinned' : ''
        },
    },
}