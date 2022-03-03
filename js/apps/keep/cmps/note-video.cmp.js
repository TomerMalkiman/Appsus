export default {
    props: ["note"],
    template: `
        <section class="note-video">
            <h4>{{note.info.title}}</h4>
            <iframe width="210"
                :src="note.info.url">
            </iframe>
        </section>
    `,
    data() {
        return {}
    },
}