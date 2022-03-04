export default {
    props: ["note"],
    template: `
        <section v-if="note" class="note-todo">
            <h4>{{note.info.label}}</h4>
            <ul>
                <li v-for="todo in note.info.todos" :style="todo.doneAt ? 'text-decoration: line-through' : ''" @click="toggleTodo(todo.id, note.id)">{{todo.txt}}</li>
            </ul>
        </section>
    `,
    components: {},
    created() {},
    data() {
        return {}
    },
    methods: {
        toggleTodo(todoId, noteId) {
            this.$emit('todo-done', todoId, noteId)
        }
    },
    computed: {},
    unmounted() {},
}