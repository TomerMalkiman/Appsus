import { eventBus } from '../../../services/eventBus-service.js'
import { utilService } from '../../../services/util.service.js'

export default {
    template: `
        <section class="add-note">
            <div class="add-note-cmd">
                <input v-if="note.type=== 'note-txt'" v-model="note.info.txt" type="text" :placeholder="noteType">
                <input v-if="note.type === 'note-img' || note.type === 'note-video'" v-model="note.info.url" type="text" :placeholder="noteType">
                <input v-if="note.type === 'note-todos'" v-model="note.info.label" type="text" :placeholder="noteType">
                <div class="add-note-types">
                    <img src="../../../../img/keep-icons/text.png" @click="setNote('note-txt')"/>
                    <img src="../../../../img/keep-icons/video.png" @click="setNote('note-video')"/>
                    <img src="../../../../img/keep-icons/image.png" @click="setNote('note-img')"/>
                    <img src="../../../../img/keep-icons/list.png" @click="setNote('note-todos')"/>
                </div>
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
                type: 'note-txt',
                info: {
                    url: null,
                    title: null,
                    txt: null,
                    todos: null,
                    label: null,
                }
            },
        }
    },
    methods: {
        setNote(type) {
            this.note.type = type
            if (this.note.type === 'note-img') {
                this.note = {
                    type: this.note.type,
                    info: {
                        url: '',
                        title: 'Image',
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
                            { id: utilService.makeId(), txt: 'Todo', doneAt: null },
                        ],
                    }
                }
            } else if (this.note.type === 'note-video') {
                this.note = {
                    type: this.note.type,
                    info: {
                        url: '',
                        title: 'Video',
                    }
                }
            }
        },
        addTodo() {
            this.note.info.todos.push({ id: utilService.makeId(), txt: 'Todo', doneAt: null })
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
            this.note = {
                type: 'note-txt',
                info: {
                    url: null,
                    title: null,
                    txt: null,
                    todos: null,
                    label: null,
                }

            }
        },
    },
    computed: {
        noteType() {
            if (this.note.type === 'note-txt') return 'Take a note..';
            if (this.note.type === 'note-video') return 'Enter Youtube URL';
            if (this.note.type === 'note-img') return 'Enter Image URL';
            if (this.note.type === 'note-todos') return 'Enter Title';

        }
    },
    unmounted() {},
}