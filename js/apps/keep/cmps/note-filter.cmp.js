export default {
    // props: [""],
    template: `
        <section class="note-filter">
            <nav>
                    <div :style="filterBy.type === 'all' ? 'background-color: #ff9d93' : ''" @click="setFilter('all')" class="text"><img src="img/keep-icons/all.png"/> <span v-if="width>770">All</span></div>
                    <div :style="filterBy.type === 'note-txt' ? 'background-color: #e8eaed' : ''" @click="setFilter('note-txt')" class="text"><img src="img/keep-icons/text.png"/> <span v-if="width>770"> Text </span></div>
                    <div :style="filterBy.type === 'note-video' ? 'background-color: #e8eaed' : ''" @click="setFilter('note-video')" class="video"><img src="img/keep-icons/video.png"/> <span v-if="width>770"> Video </span></div>
                    <div :style="filterBy.type === 'note-img' ? 'background-color: #e8eaed' : ''" @click="setFilter('note-img')" class="img"><img src="img/keep-icons/image.png"/><span v-if="width>770">Image </span></div>
                    <div :style="filterBy.type === 'note-todos' ? 'background-color: #e8eaed' : ''" @click="setFilter('note-todos')" class="todos"><img src="img/keep-icons/list.png"/><span v-if="width>770">Todo Lists </span></div>
                    <img v-if="width < 1070" src="img/keep-icons/text.png" @click="toggleTextSearch" />
                    <div @input="setFilter(filterBy.type)" class="text-search"><input type="text" @blur="toggleTextSearch" placeholder="Search By Text.." v-model="filterBy.txt" :class="textSearchDisplay"></div>
                </nav>
        </section>
    `,
    components: {},
    created() {
        window.addEventListener("resize", this.updateWidth)
    },
    data() {
        return {
            filterBy: {
                type: 'all',
                txt: '',
            },
            width: window.innerWidth,
            isTextSearch: false,
        }
    },
    methods: {
        setFilter(type) {
            this.filterBy.type = type;
            this.$emit('filter-set', this.filterBy);
        },
        toggleTextSearch() {
            this.isTextSearch = !this.isTextSearch;
        },
        updateWidth() {
            this.width = window.innerWidth
        }
    },
    computed: {
        textSearchDisplay() {
            return (this.isTextSearch && this.width < 1070) ? 'text-search-displayed' : ''
        }
    },
    unmounted() {},
}