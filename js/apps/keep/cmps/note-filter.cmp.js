export default {
    // props: [""],
    template: `
        <section class="note-filter">
            <nav>
                <div :style="filterBy.type === 'all' ? 'background-color: #3b5998' : ''" @click="setFilter('all')" class="text"><img src="../../../../img/keep-icons/all.png"/> All</div>
                <div :style="filterBy.type === 'note-txt' ? 'background-color: #3b5998' : ''" @click="setFilter('note-txt')" class="text"><img src="../../../../img/keep-icons/text.png"/> Text</div>
                <div :style="filterBy.type === 'note-video' ? 'background-color: #3b5998' : ''" @click="setFilter('note-video')" class="video"><img src="../../../../img/keep-icons/video.png"/>Video</div>
                <div :style="filterBy.type === 'note-img' ? 'background-color: #3b5998' : ''" @click="setFilter('note-img')" class="img"><img src="../../../../img/keep-icons/image.png"/>Image</div>
                <div :style="filterBy.type === 'note-todos' ? 'background-color: #3b5998' : ''" @click="setFilter('note-todos')" class="todos"><img src="../../../../img/keep-icons/list.png"/>Todo Lists</div>
                <div @input="setFilter(filterBy.type)" class="text-search"><input type="text" placeholder="Search By Text.." v-model="filterBy.txt"></div>
            </nav>
        </section>
    `,
    components: {},
    created() {},
    data() {
        return {
            filterBy: {
                type: 'all',
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