export default {
    props: ["note"],
    template: `
        <section :style="bgc" class="note-txt">
            {{note.info.txt}}
        </section>
    `,
    components: {},
    created() {},
    data() {},
    methods: {},
    computed: {},
    unmounted() {},
}