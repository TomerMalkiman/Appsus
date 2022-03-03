export default {
    props: ["note"],
    template: `
        <section class="note-img">
            <h4>{{note.info.title}}</h4>
            <img :src="note.info.url"/>
        </section>
    `,
    data() {
        return {}
    },
}