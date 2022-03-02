export default {
    props: ["note"],
    template: `
        <section v-if="note" class="note-todo">
            <h4>{{note.info.label}}</h4>
            <ul>
                <li v-for="todo in note.info.todos">{{todo.txt}}</li>
            </ul>
        </section>
    `,
    components: {},
    created() {},
    data() {
        return {}
    },
    methods: {},
    computed: {},
    unmounted() {},
}