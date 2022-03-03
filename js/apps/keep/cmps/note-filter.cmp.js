export default {
    // props: [""],
    template: `
        <section class="note-filter">
            <nav>
                <div @click="setFilter('all')" class="text"><img src="../../../../img/keep-icons/all.png"/> All</div>
                <div @click="setFilter('note-txt')" class="text"><img src="../../../../img/keep-icons/text.png"/> Text</div>
                <div @click="setFilter('note-video')" class="video"><img src="../../../../img/keep-icons/video.png"/>Video</div>
                <div @click="setFilter('note-img')" class="img"><img src="../../../../img/keep-icons/image.png"/>Image</div>
                <div @click="setFilter('note-todos')" class="todos"><img src="../../../../img/keep-icons/list.png"/>Todo Lists</div>
                <div @input="setFilter(filterBy.type)" class="text-search"><input type="text" placeholder="Search By Text.." v-model="filterBy.txt"></div>
            </nav>
        </section>
    `,
    components: {},
    created() {},
    data() {
        return {
            filterBy: {
                type: 'note-txt',
                txt: '',
            }
        }
    },
    methods: {
        setFilter(type) {
            this.filterBy.type = type
            this.$emit('filter-set', this.filterBy)
        }
    },
    computed: {},
    unmounted() {},
}