import notePreview from "./note-preview.cmp.js"

export default {
    props: ["pinnedNotes", "unPinnedNotes"],
    template: `
        <section class="notes main-layout" v-if="pinnedNotes || unPinnedNotes">
            <section class="note-list">
                <h4 class="pinned-headline">Pinned</h4>
                <note-preview v-for="note in pinnedNotes" :key="note.id" :note="note" @note-deleted="deleteNote"/>
            </section>
            <section class="note-list">
                <h4 class="pinned-headline">Other</h4>
                <note-preview v-for="note in unPinnedNotes" :key="note.id" :note="note" @note-deleted="deleteNote"/>
            </section>
        </section>
    `,
    components: {
        notePreview
    },
    created() {},
    data() {
        return {}
    },
    methods: {
        deleteNote(noteId) {
            this.$emit('note-deleted', noteId)
        }
    },
    computed: {},
    mounted() {},
    unmounted() {},
}