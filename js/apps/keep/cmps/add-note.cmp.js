import { eventBus } from '../../../../services/eventBus-service.js'

export default {
    // props: [""],
    template: `
        <section class="add-note">
            <select @change="setNote" v-model="note.type">
                <option value="note-txt">Text</option>
                <option value="note-img">Image</option>
                <option value="note-video">Youtube Video</option>
                <option value="note-todos">Todo List</option>
            </select>
            <div v-if="note.type === 'note-txt'">
                <textarea v-model="note.info.txt" placeholder="Take a note.."></textarea>
            </div>
            <div v-if="note.type === 'note-video'">
                <input type="text" placeholder="Give me a title" v-model="note.info.title">
                <input type="text" placeholder="Please Enter Youtube url" v-model="note.info.url">
            </div>
            <div v-if="note.type === 'note-img'">
                <input type="text" placeholder="Give me a title" v-model="note.info.title">
                <input type="text" placeholder="Please Enter Photo url" v-model="note.info.url">
            </div>
            <div v-if="note.type === 'note-todos'">
                <input v-for="todo in note.info.todos" type="text" v-model="todo.txt">
                <button @click="addTodo">+</button>
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
        setNote() {
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