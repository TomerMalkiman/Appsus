export default {
    props: ["note"],
    template: `
        <section :style="bgc" class="note-img">
            <h4>{{note.info.title}}</h4>
            <img :src="note.info.url"/>
        </section>
    `,
    components: {},
    created() {},
    data() {},
    methods: {},
    computed: {},
    unmounted() {},
}