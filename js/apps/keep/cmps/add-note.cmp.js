import { eventBus } from '../../../../services/eventBus-service.js'

export default {
    template: `
        <section class="add-note">
            <div class="add-note-types">
                <img src="../../../../img/keep-icons/text.png" @click="setNote('note-txt')"/>
                <img src="../../../../img/keep-icons/video.png" @click="setNote('note-video')"/>
                <img src="../../../../img/keep-icons/image.png" @click="setNote('note-img')"/>
                <img src="../../../../img/keep-icons/list.png" @click="setNote('note-todos')"/>
            </div>
            <div v-if="note.type === 'note-txt'" class="note-input">
                <input type="text" v-model="note.info.txt" placeholder="Take a note..">
            </div>
            <div v-if="note.type === 'note-video'" class="note-input">
                <input type="text" placeholder="Give me a title" v-model="note.info.title">
                <input type="text" placeholder="Please Enter Youtube url" v-model="note.info.url">
            </div>
            <div v-if="note.type === 'note-img'" class="note-input">
                <input type="text" placeholder="Give me a title" v-model="note.info.title">
                <input type="text" placeholder="Please Enter Photo url" v-model="note.info.url">
            </div>
            <div v-if="note.type === 'note-todos'" class="note-input">
                <button @click="addTodo">+</button>
                <input v-for="todo in note.info.todos" type="text" v-model="todo.txt">
            </div>
            <button v-if="note.type" @click="saveNote">Save</button>
        </section>
    `,
    components: {},
    created() {},
    data() {
        return {
            note: {
                type: null,
                info: {
                    url: null,
                    title: null,
                    txt: null,
                    todos: null,
                    label: null,
                }
            }
        }
    },
    methods: {
        setNote(type) {
            this.note.type = type
            if (this.note.type === 'note-img' || this.note.type === 'note-video') {
                this.note = {
                    type: this.note.type,
                    info: {
                        url: '',
                        title: '',
                    }
                }
            } else if (this.note.type === 'note-txt') {
                this.note = {
                    type: this.note.type,
                    info: {
                        txt: '',
                    }
                }
            } else if (this.note.type === 'note-todos') {
                this.note = {
                    type: this.note.type,
                    info: {
                        label: "",
                        todos: [
                            { txt: 'Todo', doneAt: null },
                        ],
                    }
                }
            }
        },
        addTodo() {
            this.note.info.todos.push({ txt: 'Todo', doneAt: null })
        },
        saveNote() {
            if (this.note.type === 'note-video') {
                const regex = new RegExp('^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$');
                if (!regex.test(this.note.info.url) || !this.note.info.title) {
                    eventBus.emit('show-msg', { txt: 'Invalid link or no title', type: 'error' })
                    return
                }
            }
            this.$emit('save-note', this.note)
            this.note.type = null;
        }
    },
    computed: {},
    unmounted() {},
}