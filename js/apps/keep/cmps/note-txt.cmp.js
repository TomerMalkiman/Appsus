export default {
    props: ["note"],
    template: `
        <section class="note-txt">
            {{note.info.txt}}
        </section>
    `,
    data() {
        return {}
    },
}